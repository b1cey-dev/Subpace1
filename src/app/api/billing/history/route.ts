import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe-server';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { stripeCustomerId: true },
    });

    if (!dbUser?.stripeCustomerId) {
      return NextResponse.json({ invoices: [] });
    }

    // Fetch invoices from Stripe
    const invoices = await stripe.invoices.list({
      customer: dbUser.stripeCustomerId,
      limit: 24, // Last 24 invoices
      expand: ['data.subscription'],
    });

    // Format invoices for the frontend
    const formattedInvoices = invoices.data.map((invoice: Stripe.Invoice) => ({
      id: invoice.id,
      amount: invoice.amount_paid / 100, // Convert from cents to dollars
      status: invoice.status,
      created: new Date(invoice.created * 1000).toISOString(),
      invoice_pdf: invoice.invoice_pdf,
      subscription_id: typeof invoice.subscription === 'string' ? 
        invoice.subscription : 
        (invoice.subscription as Stripe.Subscription)?.id,
      period_start: new Date(invoice.period_start * 1000).toISOString(),
      period_end: new Date(invoice.period_end * 1000).toISOString(),
    }));

    return NextResponse.json({ invoices: formattedInvoices });
  } catch (error: any) {
    console.error('Error fetching billing history:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 