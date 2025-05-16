import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe-server';
import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import Stripe from 'stripe';

interface StripePrice {
  id: string;
  productId: string;
  active: boolean;
  currency: string;
  type: string;
  unitAmount: number;
  interval: string | null;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface FormattedPrice extends StripePrice {
  formattedAmount: string;
  formattedInterval: string;
}

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch prices from Stripe with product data
    const stripePrices = await stripe.prices.list({
      active: true,
      currency: 'gbp',
      expand: ['data.product'],
      product: 'prod_SJrduZXrh5YiDK', // Pro plan product ID
    });

    // Update local database with Stripe prices
    for (const price of stripePrices.data) {
      const product = price.product as Stripe.Product;
      
      await prisma.stripePrice.upsert({
        where: { id: price.id },
        update: {
          productId: product.id,
          active: price.active,
          currency: price.currency,
          type: price.type,
          unitAmount: price.unit_amount || 0,
          interval: price.recurring?.interval,
          name: product.name,
          description: product.description,
        },
        create: {
          id: price.id,
          productId: product.id,
          active: price.active,
          currency: price.currency,
          type: price.type,
          unitAmount: price.unit_amount || 0,
          interval: price.recurring?.interval,
          name: product.name,
          description: product.description,
        },
      });
    }

    // Return active prices from database with formatted amounts
    const prices = await prisma.stripePrice.findMany({
      where: { 
        active: true,
        currency: 'gbp',
        productId: 'prod_SJrduZXrh5YiDK', // Pro plan product ID
      },
      orderBy: { unitAmount: 'asc' },
    });

    // Format prices for display
    const formattedPrices: FormattedPrice[] = prices.map((price: StripePrice) => ({
      ...price,
      formattedAmount: new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
      }).format(price.unitAmount / 100),
      formattedInterval: price.interval === 'month' ? 'monthly' : 'yearly',
    }));

    return NextResponse.json({ prices: formattedPrices });
  } catch (error: any) {
    console.error('Error fetching prices:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 