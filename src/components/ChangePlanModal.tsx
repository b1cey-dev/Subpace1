import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

interface ChangePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  currentPlanId?: string;
}

const PLANS: Plan[] = [
  {
    id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC || '',
    name: 'Basic Plan',
    price: 9,
    features: ['Up to 10 members', 'Basic analytics', 'Standard support'],
  },
  {
    id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO || '',
    name: 'Pro Plan',
    price: 29,
    features: ['Unlimited members', 'Advanced analytics', 'Custom branding', 'API access'],
  },
  {
    id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ENTERPRISE || '',
    name: 'Enterprise Plan',
    price: 99,
    features: ['Everything in Pro', 'Priority support', 'Custom integrations', 'SLA guarantee'],
  },
];

export function ChangePlanModal({ isOpen, onClose, onSuccess, currentPlanId }: ChangePlanModalProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [requiresPaymentMethod, setRequiresPaymentMethod] = useState(false);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !selectedPlan) return;

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create',
          priceId: selectedPlan,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.clientSecret) {
        // Need to confirm the payment
        setRequiresPaymentMethod(true);
      } else {
        // Subscription updated successfully
        onSuccess();
        onClose();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change plan');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#111113] border border-[#232229] rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Change Plan</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {requiresPaymentMethod ? (
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">
                Payment Details
              </label>
              <div className="p-3 bg-[#161618] border border-[#232229] rounded-lg">
                <PaymentElement />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPlan === plan.id
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-[#232229] hover:border-purple-500/50'
                  }`}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  <div className="font-medium mb-2">{plan.name}</div>
                  <div className="text-2xl font-bold mb-4">${plan.price}/mo</div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-400 flex items-center">
                        <span className="text-green-400 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {currentPlanId === plan.id && (
                    <div className="mt-4 text-sm text-purple-400">Current Plan</div>
                  )}
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={!selectedPlan || isProcessing}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : 'Confirm Change'}
          </button>
        </form>
      </div>
    </div>
  );
} 