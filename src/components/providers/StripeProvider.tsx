'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { ReactNode, useEffect, useState } from 'react';

interface StripeProviderProps {
  children: ReactNode;
  publishableKey: string;
}

export function StripeProvider({ children, publishableKey }: StripeProviderProps) {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initializeStripe() {
      try {
        const stripe = await loadStripe(publishableKey);
        if (!stripe) {
          throw new Error('Failed to initialize Stripe');
        }
        setStripePromise(Promise.resolve(stripe));
      } catch (err) {
        console.error('Error initializing Stripe:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize Stripe');
      }
    }

    initializeStripe();
  }, [publishableKey]);

  if (error || !stripePromise) {
    // If there's an error, render children without Stripe context
    return <>{children}</>;
  }

  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
} 