import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { stripe } from '@/lib/stripe-server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser?.stripeCustomerId || !dbUser?.subscriptionId) {
      return NextResponse.json({ subscription: null });
    }

    const subscription = await stripe.subscriptions.retrieve(dbUser.subscriptionId, {
      expand: ['default_payment_method', 'items.data.price.product'],
    });

    return NextResponse.json({ subscription });
  } catch (error: any) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { priceId } = await request.json();

    let dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser?.stripeCustomerId) {
      // Create a new customer if one doesn't exist
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName}`,
      });

      dbUser = await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customer.id },
      });
    }

    // Check if user already has a subscription
    if (dbUser?.subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(dbUser.subscriptionId);
      
      // Update the subscription if it exists
      const updatedSubscription = await stripe.subscriptions.update(dbUser.subscriptionId, {
        items: [{
          id: subscription.items.data[0].id,
          price: priceId,
        }],
        proration_behavior: 'always_invoice',
      });

      return NextResponse.json({ subscription: updatedSubscription });
    }

    // Create a new subscription
    const subscription = await stripe.subscriptions.create({
      customer: dbUser.stripeCustomerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    // Update the user with the subscription ID
    await prisma.user.update({
      where: { id: user.id },
      data: {
        subscriptionId: subscription.id,
        subscriptionStatus: subscription.status,
        priceId: priceId,
      },
    });

    return NextResponse.json({
      subscription,
      clientSecret: (subscription.latest_invoice as any).payment_intent.client_secret,
    });
  } catch (error: any) {
    console.error('Error managing subscription:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    // Validate Stripe configuration
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Stripe secret key is not configured');
    }

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // First try to find the user, if not found create them
    let dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) {
      // Create the user if they don't exist
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
        },
      });
    }

    if (!dbUser.stripeCustomerId) {
      return NextResponse.json({ error: 'No payment method found' }, { status: 400 });
    }

    if (!dbUser.subscriptionId) {
      return NextResponse.json({ error: 'No active subscription found' }, { status: 400 });
    }

    try {
      // Cancel the subscription at period end
      const subscription = await stripe.subscriptions.update(dbUser.subscriptionId, {
        cancel_at_period_end: true,
      });

      // Update the subscription status in the database
      await prisma.user.update({
        where: { id: user.id },
        data: {
          subscriptionStatus: subscription.status,
        },
      });

      return NextResponse.json({ 
        message: 'Subscription cancelled successfully',
        subscription 
      });
    } catch (stripeError: any) {
      console.error('Stripe error:', stripeError);
      if (stripeError.type === 'StripeInvalidRequestError') {
        return NextResponse.json({ 
          error: 'Invalid subscription ID or subscription already cancelled' 
        }, { status: 400 });
      }
      throw stripeError;
    }
  } catch (error: any) {
    console.error('Error canceling subscription:', error);
    
    if (error.message === 'Stripe secret key is not configured') {
      return NextResponse.json({ 
        error: 'Payment service configuration error',
        details: 'The payment service is not properly configured'
      }, { status: 500 });
    }

    return NextResponse.json({ 
      error: error.message || 'An unexpected error occurred while cancelling the subscription'
    }, { status: 500 });
  }
} 