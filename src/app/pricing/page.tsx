import React from 'react';
import Link from 'next/link';

export default function Pricing() {
  const pricingPlans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for getting started with your community.',
      features: [
        'Up to 100 members',
        '1 community platform',
        '5 events per month',
        'Basic analytics',
        'Community forum',
        'Member management',
        'Standard support'
      ],
      limitations: [
        'Limited integrations',
        'No API access',
        'No custom branding',
        'No team access'
      ],
      cta: 'Start for free',
      highlight: false
    },
    {
      name: 'Pro',
      price: '29',
      description: 'Everything you need to grow and monetize your community.',
      features: [
        'Unlimited members',
        'Unlimited community platforms',
        'Unlimited events',
        'Advanced analytics',
        'Content gating',
        'Custom branding',
        'Team collaboration tools',
        'Direct chat support',
        'API access',
        'White-labeling',
        'Premium member management',
        'Automated workflows'
      ],
      limitations: [],
      cta: 'Get started',
      highlight: true
    }
  ];

  const faqs = [
    {
      question: 'Can I switch plans at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. When upgrading, you\'ll be charged the prorated amount for the remainder of your billing cycle. When downgrading, your new pricing will take effect at the start of your next billing cycle.'
    },
    {
      question: 'Is there a discount for annual billing?',
      answer: 'Yes! When you choose annual billing, you get 2 months free, effectively a 16.7% discount compared to monthly billing. For the Pro plan, this means paying $290/year instead of $29/month ($348/year).'
    },
    {
      question: 'Do you offer custom enterprise plans?',
      answer: 'Absolutely. For larger communities or businesses with specific requirements, we offer custom enterprise plans. These include dedicated support, custom integrations, and tailored features. Contact our sales team for more information.'
    },
    {
      question: 'What happens when I reach the member limit on the Free plan?',
      answer: 'When you reach the 100 member limit on the Free plan, existing members will still have access, but new members won\'t be able to join until you upgrade to Pro or remove some existing members.'
    },
    {
      question: 'Are there any additional fees or charges?',
      answer: 'The Free plan charges a 5% transaction fee on all payments processed through our platform. The Pro plan reduces this to 2%. There are no hidden fees beyond the payment processing fees charged by payment providers (approximately 2.9% + $0.30 per transaction).'
    },
    {
      question: 'How secure is my payment information?',
      answer: 'We take security seriously. We don\'t store your payment information on our servers. All payment processing is handled through Stripe, a PCI-compliant payment processor. Your sensitive data is encrypted and secure.'
    }
  ];

  return (
    <div className="bg-[#0A0A0C] text-white">
      {/* Navigation */}
      <nav className="px-6 py-3 border-b border-[#232229]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="w-7 h-7 bg-purple-600 rounded-md mr-2 flex items-center justify-center">
              <i className="fa-solid fa-cube text-white text-xs"></i>
            </div>
            <span className="font-bold text-lg">Subpace</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/sign-in" className="text-sm text-gray-300 hover:text-white">Sign in</Link>
            <Link href="/sign-up" className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm hover:bg-purple-700">Get started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="py-20 px-6 border-b border-[#232229] relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-6">
            Choose the plan that's right for your community. Start free, upgrade as you grow.
          </p>
        </div>
        
        {/* Background glow effect */}
        <div className="absolute w-[600px] h-[600px] bg-purple-900/20 blur-[120px] rounded-full top-10 left-1/2 -translate-x-1/2 -z-10"></div>
      </div>

      {/* Pricing Toggle */}
      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center bg-[#111113] p-1 rounded-lg border border-[#232229] mb-16">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md">
              Monthly
            </button>
            <button className="text-gray-300 px-4 py-2 hover:bg-[#1a1a1c] rounded-md">
              Annual (Save 16%)
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-[#111113] border rounded-xl overflow-hidden ${plan.highlight ? 'border-purple-500 shadow-xl shadow-purple-900/20' : 'border-[#232229]'}`}
              >
                {plan.highlight && (
                  <div className="bg-purple-600 text-center py-1.5 text-xs font-medium">
                    RECOMMENDED
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-5">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-400 text-lg ml-1">/month</span>
                  </div>
                  
                  <Link 
                    href={`/sign-up${plan.name === 'Pro' ? '?plan=pro' : ''}`} 
                    className={`block w-full py-2 px-4 rounded-lg text-center mb-8 
                      ${plan.highlight 
                        ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                        : 'bg-[#161618] hover:bg-[#1a1a1c] text-white border border-[#232229]'
                      }`}
                  >
                    {plan.cta}
                  </Link>
                  
                  <h4 className="font-medium text-sm mb-4">Includes:</h4>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <i className="fas fa-check text-green-500 mr-2 mt-1 text-xs"></i>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.limitations.length > 0 && (
                    <>
                      <h4 className="font-medium text-sm mb-4 text-gray-400">Limitations:</h4>
                      <ul className="space-y-3">
                        {plan.limitations.map((limitation, i) => (
                          <li key={i} className="flex items-start">
                            <i className="fas fa-times text-gray-600 mr-2 mt-1 text-xs"></i>
                            <span className="text-gray-400 text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="py-20 px-6 bg-[#0c0c0e] border-t border-[#232229]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Compare Plans</h2>
          <p className="text-center text-gray-400 text-sm mb-16 max-w-2xl mx-auto">
            Choose the plan that best fits your community's needs
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr>
                  <th className="pb-6 text-left text-gray-400">Features</th>
                  <th className="pb-6 text-center">
                    <div className="font-semibold text-lg">Free</div>
                    <div className="text-gray-400 text-sm">$0 / month</div>
                  </th>
                  <th className="pb-6 text-center bg-[#111113] rounded-t-lg">
                    <div className="font-semibold text-lg text-purple-400">Pro</div>
                    <div className="text-gray-400 text-sm">$29 / month</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { category: 'Community', feature: 'Community Members', free: 'Up to 100', pro: 'Unlimited' },
                  { category: 'Community', feature: 'Community Platforms', free: '1', pro: 'Unlimited' },
                  { category: 'Community', feature: 'Events per month', free: '5', pro: 'Unlimited' },
                  { category: 'Analytics', feature: 'Basic Analytics', free: 'Yes', pro: 'Yes' },
                  { category: 'Analytics', feature: 'Advanced Analytics', free: 'No', pro: 'Yes' },
                  { category: 'Analytics', feature: 'Member Insights', free: 'Limited', pro: 'Advanced' },
                  { category: 'Monetization', feature: 'Payment Processing', free: 'Yes (5% fee)', pro: 'Yes (2% fee)' },
                  { category: 'Monetization', feature: 'Subscription Management', free: 'Basic', pro: 'Advanced' },
                  { category: 'Monetization', feature: 'Content Gating', free: 'Basic', pro: 'Advanced' },
                  { category: 'Monetization', feature: 'Digital Products', free: 'No', pro: 'Yes' },
                  { category: 'Customization', feature: 'Custom Branding', free: 'No', pro: 'Yes' },
                  { category: 'Customization', feature: 'White-labeling', free: 'No', pro: 'Yes' },
                  { category: 'Customization', feature: 'Custom Domain', free: 'No', pro: 'Yes' },
                  { category: 'Support', feature: 'Email Support', free: 'Yes', pro: 'Yes' },
                  { category: 'Support', feature: 'Priority Support', free: 'No', pro: 'Yes' },
                  { category: 'Support', feature: 'Direct Chat', free: 'No', pro: 'Yes' },
                  { category: 'Advanced', feature: 'API Access', free: 'No', pro: 'Yes' },
                  { category: 'Advanced', feature: 'Team Collaboration', free: 'No', pro: 'Yes' },
                  { category: 'Advanced', feature: 'Integrations', free: 'Limited', pro: 'Advanced' }
                ].map((row, i, arr) => (
                  <tr key={i} className={`${i > 0 && arr[i-1].category !== row.category ? 'border-t-8 border-[#0c0c0e]' : 'border-t border-[#232229]'} ${arr[i-1]?.category !== row.category ? 'group' : ''}`}>
                    <td className="py-4 text-sm font-medium">
                      {arr[i-1]?.category !== row.category && (
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">{row.category}</div>
                      )}
                      {row.feature}
                    </td>
                    <td className="py-4 text-center text-sm text-gray-400">
                      {row.free === 'Yes' ? (
                        <i className="fa-solid fa-check text-green-500"></i>
                      ) : row.free === 'No' ? (
                        <i className="fa-solid fa-times text-gray-600"></i>
                      ) : (
                        row.free
                      )}
                    </td>
                    <td className="py-4 text-center text-sm bg-[#111113]">
                      {row.pro === 'Yes' ? (
                        <i className="fa-solid fa-check text-green-500"></i>
                      ) : row.pro === 'No' ? (
                        <i className="fa-solid fa-times text-gray-600"></i>
                      ) : (
                        row.pro
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Enterprise Section */}
      <div className="py-20 px-6 border-t border-[#232229]">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#111113] border border-[#232229] rounded-xl p-8 md:p-12 relative overflow-hidden">
            <div className="md:flex items-center">
              <div className="md:w-3/5 mb-8 md:mb-0 relative z-10">
                <div className="inline-flex items-center bg-[#232229]/70 rounded-full px-3 py-1 text-xs mb-4 border border-[#36343e]">
                  <i className="fa-solid fa-building mr-2 text-purple-400"></i>
                  <span>For larger communities</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Need a custom solution?</h2>
                <p className="text-gray-400 mb-6">
                  For larger communities or organizations with specific requirements, we offer custom Enterprise plans with dedicated support, advanced security features, and tailored solutions.
                </p>
                <a href="#" className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-sm font-medium">
                  Contact Sales
                  <i className="fa-solid fa-arrow-right ml-2"></i>
                </a>
              </div>
              <div className="md:w-2/5 md:pl-8 text-center relative z-10">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: 'fa-headset', label: 'Dedicated Account Manager' },
                    { icon: 'fa-shield-alt', label: 'Advanced Security' },
                    { icon: 'fa-code', label: 'Custom Integrations' },
                    { icon: 'fa-users-cog', label: 'User Provisioning' }
                  ].map((item, i) => (
                    <div key={i} className="bg-[#161618] p-4 rounded-lg border border-[#232229]">
                      <div className="w-10 h-10 bg-purple-600/10 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <i className={`fa-solid ${item.icon} text-purple-400`}></i>
                      </div>
                      <div className="text-xs text-center">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Background gradient */}
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-purple-900/10 to-transparent -z-10"></div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 px-6 border-t border-[#232229]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Pricing FAQs</h2>
          <p className="text-center text-gray-400 text-sm mb-16 max-w-2xl mx-auto">
            Common questions about our pricing and plans
          </p>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#111113] border border-[#232229] rounded-lg p-5">
                <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                <p className="text-gray-400 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm mb-3">Still have questions about pricing?</p>
            <a href="#" className="text-purple-400 hover:text-purple-300 font-medium">
              <i className="fa-solid fa-envelope mr-2"></i>
              Contact our sales team
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#1A1A1C] bg-[#09090B]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-purple-600 rounded-md mr-2 flex items-center justify-center">
                  <i className="fa-solid fa-cube text-white text-xs"></i>
                </div>
                <span className="font-bold text-sm">Subpace</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Transform your community into a thriving business with automated 
                member management and seamless monetization.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-sm text-gray-400 hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="text-sm text-gray-400 hover:text-white">Pricing</Link></li>
                <li><Link href="/integrations" className="text-sm text-gray-400 hover:text-white">Integrations</Link></li>
                <li><Link href="/changelog" className="text-sm text-gray-400 hover:text-white">Changelog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Guides</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Support</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#1A1A1C] pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-xs text-gray-500 mb-4 md:mb-0">© 2023 Subpace All rights reserved.</div>
            <div className="flex space-x-6">
              <a href="#" className="text-xs text-gray-500 hover:text-white">Privacy</a>
              <a href="#" className="text-xs text-gray-500 hover:text-white">Terms</a>
              <a href="#" className="text-xs text-gray-500 hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 