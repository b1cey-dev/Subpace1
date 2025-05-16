import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe-server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = headers();
  const signature = headersList.get('stripe-signature');

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Missing stripe signature or webhook secret' },
      { status: 400 }
    );
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Store the event in the database
    await prisma.stripeEvent.create({
      data: {
        stripeEventId: event.id,
        type: event.type,
        object: event.data.object as any,
      },
    });

    switch (event.type) {
      case 'account.updated': {
        const account = event.data.object as any;
        await prisma.stripeConnect.update({
          where: { accountId: account.id },
          data: {
            chargesEnabled: account.charges_enabled,
            payoutsEnabled: account.payouts_enabled,
            detailsSubmitted: account.details_submitted,
          },
        });
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as any;
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        
        if (typeof customer === 'string') break;
        
        await prisma.user.update({
          where: { stripeCustomerId: customer.id },
          data: {
            subscriptionId: subscription.id,
            subscriptionStatus: subscription.status,
            priceId: subscription.items.data[0].price.id,
          },
        });
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any;
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        
        if (typeof customer === 'string') break;
        
        await prisma.user.update({
          where: { stripeCustomerId: customer.id },
          data: {
            subscriptionId: null,
            subscriptionStatus: 'canceled',
            priceId: null,
          },
        });
        break;
      }

      case 'account.application.deauthorized': {
        const account = event.data.object as any;
        await prisma.stripeConnect.delete({
          where: { accountId: account.id },
        });
        await prisma.user.update({
          where: { stripeConnectId: account.id },
          data: { stripeConnectId: null },
        });
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Error processing webhook:', err);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }
} 