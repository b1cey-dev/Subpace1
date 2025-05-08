'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would trigger a password reset email
      // Here we just show a success message
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">Subpace</span>
            </h1>
          </Link>
          <p className="mt-3 text-gray-400 text-sm">Reset your password</p>
        </div>
        
        <div className="bg-[#111113] rounded-xl shadow-xl border border-[#232229] overflow-hidden">
          <div className="px-6 py-8">
            {!isSubmitted ? (
              <>
                <h2 className="text-xl font-semibold text-white mb-2">Forgot your password?</h2>
                <p className="text-gray-400 text-sm mb-6">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>
                
                {error && (
                  <div className="mb-4 p-3 bg-red-900/20 border border-red-900/30 rounded-md text-sm text-red-400">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-5">
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                          isLoading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          'Send Reset Instructions'
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-check text-green-500 text-xl"></i>
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">Check your email</h2>
                <p className="text-gray-400 text-sm mb-6">
                  We've sent password reset instructions to:
                </p>
                <div className="p-3 bg-[#161618] rounded-md text-center mb-6">
                  <span className="font-medium">{email}</span>
                </div>
                <p className="text-gray-400 text-sm mb-6">
                  The email contains a link to reset your password. If you don't see it, please check your spam folder.
                </p>
                
                <div className="flex justify-center">
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-purple-400 hover:text-purple-300 font-medium text-sm"
                  >
                    Try a different email
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="px-6 py-4 bg-[#0d0d0f] border-t border-[#232229]">
            <p className="text-sm text-center text-gray-400">
              <Link href="/sign-in" className="font-medium text-purple-400 hover:text-purple-300">
                <i className="fas fa-arrow-left text-xs mr-1.5"></i>
                Back to sign in
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