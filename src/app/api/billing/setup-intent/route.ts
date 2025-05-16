import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs';
import { stripe } from '@/lib/stripe-server';
import prisma from '@/lib/prisma';

export async function POST() {
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

    // If user doesn't have a Stripe customer ID, create one
    if (!dbUser.stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.emailAddresses[0].emailAddress,
        metadata: {
          userId: user.id,
        },
      });

      // Update user with Stripe customer ID
      dbUser = await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customer.id },
      });
    }

    // Create a SetupIntent
    const setupIntent = await stripe.setupIntents.create({
      customer: dbUser.stripeCustomerId,
      payment_method_types: ['card'],
      usage: 'off_session', // Allow the payment method to be used for future payments
    });

    return NextResponse.json({
      clientSecret: setupIntent.client_secret,
    });
  } catch (error: any) {
    console.error('Error creating setup intent:', error);
    
    // Handle specific error types
    if (error.type === 'StripeError') {
      return NextResponse.json({ 
        error: 'Payment service error',
        details: error.message 
      }, { status: 400 });
    }
    
    if (error.message === 'Stripe secret key is not configured') {
      return NextResponse.json({ 
        error: 'Payment service configuration error',
        details: 'The payment service is not properly configured'
      }, { status: 500 });
    }

    // Generic error response
    return NextResponse.json({ 
      error: 'Failed to create setup intent',
      details: error.message || 'An unexpected error occurred'
    }, { status: 500 });
  }
} 