'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FormData {
  email: string;
  password: string;
  name: string;
  communityName: string;
  communityType: string;
  communityDescription: string;
  plan: 'free' | 'pro';
}

export default function GetStarted() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    communityName: '',
    communityType: 'community', // Default value
    communityDescription: '',
    plan: 'free' // Default value
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    // Validate current step data
    if (step === 1) {
      if (!formData.email || !formData.password || !formData.name) {
        setError('Please fill in all fields');
        return;
      }
      
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    } else if (step === 2) {
      if (!formData.communityName || !formData.communityDescription) {
        setError('Please fill in all fields');
        return;
      }
    }
    
    setError('');
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user data (for demo purposes)
      localStorage.setItem('subpace_user', JSON.stringify({ 
        email: formData.email,
        name: formData.name,
        communityName: formData.communityName,
        plan: formData.plan
      }));
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] flex flex-col justify-center py-12">
      <div className="max-w-lg w-full mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">Subpace</span>
            </h1>
          </Link>
          <p className="mt-3 text-gray-400 text-sm">Create your community in minutes</p>
        </div>
        
        {/* Progress Steps */}
        <div className="max-w-xs mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-purple-600 text-white' : 'bg-[#161618] text-gray-400'}`}>
                1
              </div>
              <span className="text-xs text-gray-500 mt-1">Account</span>
            </div>
            
            <div className={`flex-1 h-0.5 ${step > 1 ? 'bg-purple-600' : 'bg-[#232229]'}`}></div>
            
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-purple-600 text-white' : 'bg-[#161618] text-gray-400'}`}>
                2
              </div>
              <span className="text-xs text-gray-500 mt-1">Community</span>
            </div>
            
            <div className={`flex-1 h-0.5 ${step > 2 ? 'bg-purple-600' : 'bg-[#232229]'}`}></div>
            
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-purple-600 text-white' : 'bg-[#161618] text-gray-400'}`}>
                3
              </div>
              <span className="text-xs text-gray-500 mt-1">Plan</span>
            </div>
          </div>
        </div>
        
        <div className="bg-[#111113] rounded-xl shadow-xl border border-[#232229] overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-xl font-semibold text-white mb-6">
              {step === 1 && 'Create your account'}
              {step === 2 && 'Tell us about your community'}
              {step === 3 && 'Choose your plan'}
            </h2>
            
            {error && (
              <div className="mb-6 p-3 bg-red-900/20 border border-red-900/30 rounded-md text-sm text-red-400">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {/* Step 1: Account Information */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Your name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="appearance-none block w-full px-3 py-2.5 bg-[#161618] border border-[#232229] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2.5 bg-[#161618] border border-[#232229] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="appearance-none block w-full px-3 py-2.5 bg-[#161618] border border-[#232229] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => updateFormData('password', e.target.value)}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Must be at least 6 characters
                    </p>
                  </div>
                </div>
              )}
              
              {/* Step 2: Community Information */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <label htmlFor="communityName" className="block text-sm font-medium text-gray-300 mb-1">
                      Community name
                    </label>
                    <input
                      id="communityName"
                      name="communityName"
                      type="text"
                      required
                      className="appearance-none block w-full px-3 py-2.5 bg-[#161618] border border-[#232229] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="My Awesome Community"
                      value={formData.communityName}
                      onChange={(e) => updateFormData('communityName', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="communityType" className="block text-sm font-medium text-gray-300 mb-1">
                      Community type
                    </label>
                    <select
                      id="communityType"
                      name="communityType"
                      className="appearance-none block w-full px-3 py-2.5 bg-[#161618] border border-[#232229] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={formData.communityType}
                      onChange={(e) => updateFormData('communityType', e.target.value)}
                    >
                      <option value="community">Community</option>
                      <option value="creators">Creator Network</option>
                      <option value="business">Business</option>
                      <option value="education">Education</option>
                      <option value="gaming">Gaming</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="communityDescription" className="block text-sm font-medium text-gray-300 mb-1">
                      Community description
                    </label>
                    <textarea
                      id="communityDescription"
                      name="communityDescription"
                      rows={3}
                      required
                      className="appearance-none block w-full px-3 py-2.5 bg-[#161618] border border-[#232229] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Briefly describe your community and its purpose"
                      value={formData.communityDescription}
                      onChange={(e) => updateFormData('communityDescription', e.target.value)}
                    />
                  </div>
                </div>
              )}
              
              {/* Step 3: Plan Selection */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-400">
                      Choose the plan that best fits your community's needs
                    </p>
                  </div>
                  
                  <div className="grid gap-5">
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer ${
                        formData.plan === 'free' ? 'border-purple-500 bg-purple-900/10' : 'border-[#232229] bg-[#161618] hover:bg-[#1a1a1c]'
                      }`}
                      onClick={() => updateFormData('plan', 'free')}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-white">Free</h3>
                          <p className="text-sm text-gray-400">Perfect for getting started</p>
                        </div>
                        <div className="text-lg font-semibold text-white">$0</div>
                      </div>
                      
                      <ul className="space-y-2 mb-4">
                        {['Up to 100 members', '5 events per month', 'Basic analytics', 'Community forum'].map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-300">
                            <i className="fas fa-check text-green-400 mr-2 text-xs"></i>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex items-center">
                        <div className="h-5 w-5 rounded-full border-2 flex items-center justify-center mr-2 mt-1 
                          border-purple-500">
                          {formData.plan === 'free' && (
                            <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-300">Select Free Plan</span>
                      </div>
                    </div>
                    
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer ${
                        formData.plan === 'pro' ? 'border-purple-500 bg-purple-900/10' : 'border-[#232229] bg-[#161618] hover:bg-[#1a1a1c]'
                      }`}
                      onClick={() => updateFormData('plan', 'pro')}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-white flex items-center">
                            Pro
                            <span className="ml-2 px-2 py-0.5 text-xs bg-purple-600/20 text-purple-400 rounded-full">Recommended</span>
                          </h3>
                          <p className="text-sm text-gray-400">For growing communities</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-white">$29</div>
                          <div className="text-xs text-gray-500">per month</div>
                        </div>
                      </div>
                      
                      <ul className="space-y-2 mb-4">
                        {[
                          'Unlimited members',
                          'Unlimited events',
                          'Advanced analytics',
                          'Custom branding',
                          'Premium content gating',
                          'Direct message support'
                        ].map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-300">
                            <i className="fas fa-check text-green-400 mr-2 text-xs"></i>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex items-center">
                        <div className="h-5 w-5 rounded-full border-2 flex items-center justify-center mr-2 mt-1 
                          border-purple-500">
                          {formData.plan === 'pro' && (
                            <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-300">Select Pro Plan</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-4 py-2 text-sm border border-[#232229] rounded-md bg-[#161618] text-gray-300 hover:bg-[#1a1a1c]"
                  >
                    Back
                  </button>
                ) : (
                  <div></div> // Empty div for spacing
                )}
                
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-4 py-2 text-sm bg-purple-600 rounded-md text-white hover:bg-purple-700"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-8 py-2 text-sm flex items-center bg-purple-600 rounded-md text-white hover:bg-purple-700 ${
                      isLoading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </>
                    ) : (
                      'Get Started'
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
          
          <div className="px-6 py-4 bg-[#0d0d0f] border-t border-[#232229]">
            <p className="text-sm text-center text-gray-400">
              Already have an account?{' '}
              <Link href="/sign-in" className="font-medium text-purple-400 hover:text-purple-300">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* Purple glow effect */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600 rounded-full filter blur-[120px] opacity-10 pointer-events-none"></div>
    </div>
  );
} 