import { NextResponse } from 'next/server';
import { createOrRetrieveCustomer, createSubscription, cancelSubscription, reactivateSubscription, getSubscriptionStatus } from '@/lib/stripe-server';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const status = await getSubscriptionStatus(user.id);
    return NextResponse.json(status);
  } catch (error: any) {
    console.error('Error retrieving subscription:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, priceId } = await req.json();

    // Ensure customer exists
    await createOrRetrieveCustomer(user.id, user.emailAddresses[0].emailAddress);

    switch (action) {
      case 'create': {
        if (!priceId) {
          return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
        }

        const subscription = await createSubscription(user.id, priceId);
        const invoice = subscription.latest_invoice as any;

        return NextResponse.json({
          subscriptionId: subscription.id,
          clientSecret: invoice.payment_intent?.client_secret,
          status: subscription.status,
        });
      }

      case 'cancel': {
        const subscription = await cancelSubscription(user.id);
        return NextResponse.json({
          message: 'Subscription will be canceled at the end of the billing period',
          cancelAt: subscription.cancel_at,
        });
      }

      case 'reactivate': {
        const subscription = await reactivateSubscription(user.id);
        return NextResponse.json({
          message: 'Subscription reactivated',
          status: subscription.status,
        });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error managing subscription:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 