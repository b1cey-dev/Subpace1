import Stripe from 'stripe';
import prisma from './prisma';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Update to the latest stable version
  typescript: true,
});

export async function createOrRetrieveCustomer(userId: string, email: string) {
  try {
    // First, try to find an existing customer
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { stripeCustomerId: true },
    });

    if (existingUser?.stripeCustomerId) {
      const customer = await stripe.customers.retrieve(existingUser.stripeCustomerId);
      if (customer.deleted) {
        throw new Error('Customer was deleted');
      }
      return customer;
    }

    // Create a new customer if none exists
    const customer = await stripe.customers.create({
      email,
      metadata: {
        userId,
      },
    });

    // Save the customer ID to the database
    await prisma.user.upsert({
      where: { id: userId },
      update: { stripeCustomerId: customer.id },
      create: {
        id: userId,
        stripeCustomerId: customer.id,
      },
    });

    return customer;
  } catch (error) {
    console.error('Error in createOrRetrieveCustomer:', error);
    throw error;
  }
}

export async function createConnectAccount(userId: string, email: string) {
  try {
    // Create a Stripe Connect account
    const account = await stripe.accounts.create({
      type: 'standard',
      email,
      metadata: {
        userId,
      },
    });

    // Save the Connect account ID to the database
    await prisma.stripeConnect.create({
      data: {
        userId,
        accountId: account.id,
      },
    });

    // Update the user record
    await prisma.user.update({
      where: { id: userId },
      data: { stripeConnectId: account.id },
    });

    return account;
  } catch (error) {
    console.error('Error creating Connect account:', error);
    throw error;
  }
}

export async function createConnectAccountLink(accountId: string) {
  try {
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/settings?tab=billing`,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/settings?tab=billing&setup=complete`,
      type: 'account_onboarding',
    });

    return accountLink;
  } catch (error) {
    console.error('Error creating account link:', error);
    throw error;
  }
}

export async function retrieveConnectAccount(accountId: string) {
  try {
    const account = await stripe.accounts.retrieve(accountId);
    
    // Update the account status in the database
    await prisma.stripeConnect.update({
      where: { accountId },
      data: {
        chargesEnabled: account.charges_enabled,
        payoutsEnabled: account.payouts_enabled,
        detailsSubmitted: account.details_submitted,
      },
    });

    return account;
  } catch (error) {
    console.error('Error retrieving Connect account:', error);
    throw error;
  }
}

export async function createSubscription(userId: string, priceId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { stripeCustomerId: true },
    });

    if (!user?.stripeCustomerId) {
      throw new Error('No Stripe customer ID found for user');
    }

    // Check for existing subscription
    const existingSubscription = await prisma.user.findUnique({
      where: { id: userId },
      select: { subscriptionId: true },
    });

    if (existingSubscription?.subscriptionId) {
      // Update existing subscription
      const subscription = await stripe.subscriptions.retrieve(existingSubscription.subscriptionId);
      const updatedSubscription = await stripe.subscriptions.update(subscription.id, {
        items: [{
          id: subscription.items.data[0].id,
          price: priceId,
        }],
        payment_behavior: 'pending_if_incomplete',
        proration_behavior: 'create_prorations',
      });

      await prisma.user.update({
        where: { id: userId },
        data: {
          subscriptionStatus: updatedSubscription.status,
          priceId,
        },
      });

      return updatedSubscription;
    }

    // Create new subscription
    const subscription = await stripe.subscriptions.create({
      customer: user.stripeCustomerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
    });

    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionId: subscription.id,
        subscriptionStatus: subscription.status,
        priceId,
      },
    });

    return subscription;
  } catch (error) {
    console.error('Error in createSubscription:', error);
    throw error;
  }
}

export async function cancelSubscription(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { subscriptionId: true },
    });

    if (!user?.subscriptionId) {
      throw new Error('No subscription found for user');
    }

    const subscription = await stripe.subscriptions.update(user.subscriptionId, {
      cancel_at_period_end: true,
    });

    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionStatus: subscription.status,
      },
    });

    return subscription;
  } catch (error) {
    console.error('Error in cancelSubscription:', error);
    throw error;
  }
}

export async function reactivateSubscription(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { subscriptionId: true },
    });

    if (!user?.subscriptionId) {
      throw new Error('No subscription found for user');
    }

    const subscription = await stripe.subscriptions.update(user.subscriptionId, {
      cancel_at_period_end: false,
      proration_behavior: 'create_prorations',
    });

    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionStatus: subscription.status,
      },
    });

    return subscription;
  } catch (error) {
    console.error('Error in reactivateSubscription:', error);
    throw error;
  }
}

export async function getSubscriptionStatus(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        subscriptionId: true,
        subscriptionStatus: true,
        priceId: true,
      },
    });

    if (!user?.subscriptionId) {
      return {
        status: 'inactive',
        priceId: null,
      };
    }

    const subscription = await stripe.subscriptions.retrieve(user.subscriptionId);

    return {
      status: subscription.status,
      priceId: user.priceId,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    };
  } catch (error) {
    console.error('Error in getSubscriptionStatus:', error);
    throw error;
  }
} 