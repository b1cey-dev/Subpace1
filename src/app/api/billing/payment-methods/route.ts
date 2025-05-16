import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs';
import { stripe } from '@/lib/stripe-server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the payment method ID from the request body
    const { paymentMethodId } = await request.json();
    if (!paymentMethodId) {
      return NextResponse.json({ error: 'Payment method ID is required' }, { status: 400 });
    }

    // Find or create user in our database
    let dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
        },
      });
    }

    // If user doesn't have a Stripe customer ID, create one
    if (!dbUser.stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.emailAddresses[0].emailAddress,
        metadata: {
          userId: user.id,
        },
      });

      dbUser = await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customer.id },
      });
    }

    // Attach the payment method to the customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: dbUser.stripeCustomerId,
    });

    // Set it as the default payment method
    await stripe.customers.update(dbUser.stripeCustomerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error adding payment method:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to add payment method' 
    }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser?.stripeCustomerId) {
      return NextResponse.json({ paymentMethods: [] });
    }

    const paymentMethods = await stripe.paymentMethods.list({
      customer: dbUser.stripeCustomerId,
      type: 'card',
    });

    return NextResponse.json({ paymentMethods: paymentMethods.data });
  } catch (error: any) {
    console.error('Error fetching payment methods:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to fetch payment methods' 
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { paymentMethodId } = await request.json();
    await stripe.paymentMethods.detach(paymentMethodId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error removing payment method:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 