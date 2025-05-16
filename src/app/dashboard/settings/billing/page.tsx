'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentMethodModal } from '@/components/PaymentMethodModal';
import { StripeElementsProvider } from '@/components/StripeElements';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function BillingPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [prices, setPrices] = useState<any[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [setupIntentSecret, setSetupIntentSecret] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscription();
    fetchPaymentMethods();
    fetchPrices();
  }, []);

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/billing/subscription');
      const data = await response.json();
      setSubscription(data.subscription);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const response = await fetch('/api/billing/payment-methods');
      const data = await response.json();
      setPaymentMethods(data.paymentMethods);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    }
  };

  const fetchPrices = async () => {
    try {
      const response = await fetch('/api/billing/prices');
      const data = await response.json();
      setPrices(data.prices);
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  };

  const handleAddPaymentMethod = async () => {
    try {
      const response = await fetch('/api/billing/setup-intent', {
        method: 'POST',
      });
      const data = await response.json();
      setSetupIntentSecret(data.clientSecret);
      setShowPaymentModal(true);
    } catch (error) {
      console.error('Error creating setup intent:', error);
    }
  };

  const handleChangePlan = async (priceId: string) => {
    try {
      setLoading(true);
      const response = await fetch('/api/billing/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      const data = await response.json();
      
      if (data.subscription) {
        setSubscription(data.subscription);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error changing plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/billing/subscription', {
        method: 'DELETE',
      });
      const data = await response.json();
      setSubscription(data.subscription);
      window.location.reload();
    } catch (error) {
      console.error('Error canceling subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePaymentMethod = async (paymentMethodId: string) => {
    try {
      setLoading(true);
      await fetch('/api/billing/payment-methods', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethodId }),
      });
      fetchPaymentMethods();
    } catch (error) {
      console.error('Error removing payment method:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8">Billing Settings</h1>

      <div className="space-y-6">
        {/* Current Plan */}
        <div className="bg-[#161618] border border-[#232229] rounded-xl p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-medium mb-1">
                {subscription?.items?.data[0]?.price?.product?.name || 'No active subscription'}
              </h3>
              <p className="text-sm text-gray-400">
                {subscription?.cancel_at_period_end
                  ? 'Cancels at end of billing period'
                  : subscription?.status === 'active'
                  ? `Renews ${new Date(subscription.current_period_end * 1000).toLocaleDateString()}`
                  : 'No active subscription'}
              </p>
            </div>
            {subscription && (
              <button
                onClick={handleCancelSubscription}
                disabled={loading}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Cancel Subscription
              </button>
            )}
          </div>
        </div>

        {/* Available Plans */}
        <div className="space-y-4">
          <h3 className="text-base font-medium">Available Plans</h3>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {prices.map((price) => (
              <div
                key={price.id}
                className="bg-[#161618] border border-[#232229] rounded-xl p-5"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-medium">{price.name}</h4>
                    <p className="text-sm text-gray-400">{price.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">{price.formattedAmount}</div>
                    <p className="text-xs text-gray-400">per {price.formattedInterval}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleChangePlan(price.id)}
                  disabled={loading || subscription?.items?.data[0]?.price?.id === price.id}
                  className={`w-full py-2 px-4 rounded-md text-sm ${
                    subscription?.items?.data[0]?.price?.id === price.id
                      ? 'bg-purple-600 text-white cursor-not-allowed'
                      : 'bg-[#232229] text-white hover:bg-[#2a2a2c]'
                  }`}
                >
                  {subscription?.items?.data[0]?.price?.id === price.id
                    ? 'Current Plan'
                    : 'Select Plan'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
          <h3 className="text-base font-medium">Payment Methods</h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between bg-[#161618] border border-[#232229] rounded-lg p-4"
              >
                <div className="flex items-center">
                  <div className="w-10 h-6 bg-[#232229] rounded mr-3 flex items-center justify-center">
                    <i className={`fab fa-cc-${method.card.brand.toLowerCase()}`}></i>
                  </div>
                  <div>
                    <div className="text-sm">
                      {method.card.brand.charAt(0).toUpperCase() + method.card.brand.slice(1)} ending in {method.card.last4}
                    </div>
                    <div className="text-xs text-gray-400">
                      Expires {method.card.exp_month.toString().padStart(2, '0')}/{method.card.exp_year}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemovePaymentMethod(method.id)}
                  disabled={loading}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleAddPaymentMethod}
            className="text-sm text-purple-400 hover:text-purple-300 flex items-center"
          >
            <i className="fas fa-plus-circle mr-2"></i>
            Add Payment Method
          </button>
        </div>
      </div>

      {/* Payment Method Modal */}
      {showPaymentModal && setupIntentSecret && (
        <StripeElementsProvider clientSecret={setupIntentSecret}>
          <PaymentMethodModal
            onClose={() => {
              setShowPaymentModal(false);
              setSetupIntentSecret(null);
            }}
            onSuccess={() => {
              setShowPaymentModal(false);
              setSetupIntentSecret(null);
              fetchPaymentMethods();
            }}
          />
        </StripeElementsProvider>
      )}
    </div>
  );
} 