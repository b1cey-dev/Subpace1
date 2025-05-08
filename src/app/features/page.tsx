import React from 'react';
import Link from 'next/link';

export default function Features() {
  // Feature categories with their details
  const featureCategories = [
    {
      id: 'community',
      title: 'Community Management',
      description: 'Tools to manage, engage, and grow your community.',
      color: 'from-purple-500 to-blue-500',
      icon: 'fa-users',
      features: [
        {
          title: 'Member Management',
          description: 'Comprehensive tools to manage members, roles, and permissions within your community.',
          icon: 'fa-user-shield'
        },
        {
          title: 'Automated Onboarding',
          description: 'Create custom onboarding flows that welcome new members and guide them through your community.',
          icon: 'fa-user-plus'
        },
        {
          title: 'Engagement Tools',
          description: 'Polls, discussions, and interactive content to keep your community engaged and active.',
          icon: 'fa-comments'
        },
        {
          title: 'Community Analytics',
          description: 'Detailed insights into member activity, growth trends, and engagement metrics.',
          icon: 'fa-chart-line'
        }
      ]
    },
    {
      id: 'monetization',
      title: 'Monetization',
      description: 'Turn your community into a sustainable business with multiple revenue streams.',
      color: 'from-green-500 to-teal-500',
      icon: 'fa-dollar-sign',
      features: [
        {
          title: 'Subscription Management',
          description: 'Create and manage subscription tiers with different access levels and pricing.',
          icon: 'fa-credit-card'
        },
        {
          title: 'Content Gating',
          description: 'Easily gate premium content for paying members only, with flexible access controls.',
          icon: 'fa-lock'
        },
        {
          title: 'Payment Processing',
          description: 'Secure, reliable payment processing with support for multiple payment methods and currencies.',
          icon: 'fa-money-bill-wave'
        },
        {
          title: 'Digital Products',
          description: 'Sell digital products, courses, and resources directly to your community members.',
          icon: 'fa-shopping-cart'
        }
      ]
    },
    {
      id: 'integrations',
      title: 'Platform Integrations',
      description: 'Connect with the tools and platforms your community already uses.',
      color: 'from-blue-500 to-indigo-500',
      icon: 'fa-plug',
      features: [
        {
          title: 'Discord Integration',
          description: 'Seamlessly connect your Discord server with Subpace for enhanced management and monetization.',
          icon: 'fa-brands fa-discord'
        },
        {
          title: 'Slack Integration',
          description: 'Turn your Slack workspace into a premium community with advanced access controls.',
          icon: 'fa-brands fa-slack'
        },
        {
          title: 'WhatsApp Integration',
          description: 'Manage WhatsApp groups and create premium communities on the messaging platform.',
          icon: 'fa-brands fa-whatsapp'
        },
        {
          title: 'API Access',
          description: 'Build custom integrations with our comprehensive API and webhooks system.',
          icon: 'fa-code'
        }
      ]
    },
    {
      id: 'tools',
      title: 'Creator Tools',
      description: 'Purpose-built tools to help creators manage and grow their communities.',
      color: 'from-red-500 to-orange-500',
      icon: 'fa-tools',
      features: [
        {
          title: 'Event Management',
          description: 'Create, promote, and manage events with registration, reminders, and analytics.',
          icon: 'fa-calendar-alt'
        },
        {
          title: 'Resource Library',
          description: 'Organize and share documents, videos, and resources with your community.',
          icon: 'fa-book'
        },
        {
          title: 'Custom Branding',
          description: 'Customize the look and feel of your community with your own branding and colors.',
          icon: 'fa-paint-brush'
        },
        {
          title: 'Moderation Tools',
          description: 'Keep your community safe with powerful, automated moderation and content filtering.',
          icon: 'fa-shield-alt'
        }
      ]
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
      <div className="py-16 px-6 border-b border-[#232229] relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features for<br />Community Growth</h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Discover the tools and capabilities that make Subpace the ultimate platform for community management and monetization.
          </p>
        </div>
        
        {/* Background glow effect */}
        <div className="absolute w-[600px] h-[600px] bg-purple-900/20 blur-[120px] rounded-full top-10 left-1/2 -translate-x-1/2 -z-10"></div>
      </div>

      {/* Feature Categories */}
      <div className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featureCategories.map((category) => (
            <div key={category.id} className="bg-[#111113] rounded-xl border border-[#232229] overflow-hidden">
              <div className={`bg-gradient-to-r ${category.color} p-6`}>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-3">
                    <i className={`fa-solid ${category.icon} text-white`}></i>
                  </div>
                  <h2 className="text-xl font-bold">{category.title}</h2>
                </div>
                <p className="text-gray-100">{category.description}</p>
              </div>
              
              <div className="p-6 space-y-6">
                {category.features.map((feature, index) => (
                  <div key={index} className="flex">
                    <div className="w-10 h-10 bg-[#161618] rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                      <i className={`${feature.icon.includes('fa-brands') ? feature.icon : `fa-solid ${feature.icon}`} text-purple-400`}></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="py-16 px-6 bg-[#0c0c0e] border-t border-[#232229]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Plan Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr>
                  <th className="pb-6 text-left w-1/3 text-gray-400">Features</th>
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
                  { feature: 'Community members', free: '100', pro: 'Unlimited' },
                  { feature: 'Community platforms', free: '1', pro: 'Unlimited' },
                  { feature: 'Events per month', free: '5', pro: 'Unlimited' },
                  { feature: 'Analytics', free: 'Basic', pro: 'Advanced' },
                  { feature: 'Custom branding', free: 'Limited', pro: 'Full customization' },
                  { feature: 'Content gating', free: 'Basic', pro: 'Advanced' },
                  { feature: 'Payment processing', free: '5%', pro: '2%' },
                  { feature: 'Support', free: 'Email', pro: 'Priority + Chat' },
                  { feature: 'API access', free: 'No', pro: 'Yes' },
                  { feature: 'White-labeling', free: 'No', pro: 'Yes' }
                ].map((row, i) => (
                  <tr key={i} className="border-t border-[#232229]">
                    <td className="py-4 text-sm font-medium">{row.feature}</td>
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
          
          <div className="mt-10 flex justify-center">
            <Link href="/sign-up" className="bg-purple-600 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-purple-700">
              Get started with Subpace
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-6 border-t border-[#232229]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                question: "How does the platform integrate with Discord?",
                answer: "Subpace connects to your Discord server via our secure bot. Once connected, you can manage roles, automate member access based on payment status, gate channels, and track community engagement—all from the Subpace dashboard."
              },
              {
                question: "Can I use my own payment processor?",
                answer: "Yes! While Subpace offers built-in payment processing, you can also connect your own Stripe, PayPal, or other payment accounts. We provide flexible options to ensure you maintain control over your revenue stream."
              },
              {
                question: "How does content gating work?",
                answer: "Subpace allows you to gate content based on membership levels. You can create different tiers with unique access permissions, and our platform automatically manages who can see what content across all your integrated platforms."
              },
              {
                question: "Is there a limit to how many communities I can manage?",
                answer: "On the Free plan, you can manage one community. With the Pro plan, you can manage unlimited communities across different platforms, all from a single dashboard."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-[#111113] border border-[#232229] rounded-lg p-5">
                <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                <p className="text-gray-400 text-sm">{faq.answer}</p>
              </div>
            ))}
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