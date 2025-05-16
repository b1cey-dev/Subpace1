import React from 'react';
import Link from 'next/link';

export default function Changelog() {
  // Define the changelog releases
  const releases = [
    {
      version: 'v1.5.0',
      date: 'November 15, 2023',
      title: 'Platform Analytics & Improved Integrations',
      major: true,
      highlights: [
        'Completely revamped analytics dashboard with member engagement metrics',
        'New Discord bot with improved role management and moderation features',
        'WhatsApp integration for premium communities (beta)'
      ],
      features: [
        {
          title: 'Advanced Analytics Dashboard',
          description: 'New metrics and visualizations to track member engagement, revenue, and community growth over time.'
        },
        {
          title: 'Enhanced Discord Integration',
          description: 'Improved Discord bot with more granular role management, moderation tools, and event scheduling.'
        },
        {
          title: 'WhatsApp Integration (Beta)',
          description: 'Connect WhatsApp groups to your Subpace community for premium content distribution and automated member management.'
        }
      ],
      improvements: [
        'Faster page load times across the platform',
        'More detailed member profiles with activity history',
        'Improved mobile experience for community members'
      ],
      fixes: [
        'Fixed issue with payment webhook processing for some international currencies',
        'Resolved member import functionality for large CSV files',
        'Fixed notification delivery issues on mobile devices'
      ]
    },
    {
      version: 'v1.4.2',
      date: 'October 3, 2023',
      title: 'Bug Fixes & Performance Improvements',
      features: [],
      improvements: [
        'Improved loading times for dashboard components',
        'Enhanced search functionality across the platform',
        'Better error messaging for failed payment processing'
      ],
      fixes: [
        'Fixed display issues with dark mode on Safari browsers',
        'Resolved webhook delivery failure for certain event types',
        'Fixed member count discrepancies in dashboard analytics'
      ]
    },
    {
      version: 'v1.4.0',
      date: 'September 18, 2023',
      title: 'Events & Calendar Features',
      highlights: [
        'New events calendar for community meetups and webinars',
        'Event RSVPs with automated reminders',
        'Premium event ticketing options'
      ],
      features: [
        {
          title: 'Community Events Calendar',
          description: 'Plan and schedule community events with a visual calendar interface, supporting both in-person and virtual gatherings.'
        },
        {
          title: 'Event RSVPs & Reminders',
          description: 'Allow members to RSVP to events and receive automated email/browser reminders.'
        },
        {
          title: 'Premium Event Ticketing',
          description: 'Sell tickets to exclusive community events with different pricing tiers and membership-based discounts.'
        }
      ],
      improvements: [
        'Updated email notification templates with improved deliverability',
        'More customization options for community branding',
        'Streamlined onboarding flow for new community members'
      ],
      fixes: [
        'Fixed timezone issues with scheduled content publishing',
        'Resolved display problems with nested comments in community forums',
        'Fixed payment processing for certain international credit cards'
      ]
    },
    {
      version: 'v1.3.0',
      date: 'August 5, 2023',
      title: 'Content Management & Publishing Tools',
      features: [
        {
          title: 'Content Library',
          description: 'Organize and share documents, videos, and resources with your community members based on their subscription tier.'
        },
        {
          title: 'Scheduled Publishing',
          description: 'Plan and schedule content releases in advance across all your connected platforms.'
        },
        {
          title: 'Content Analytics',
          description: 'Track engagement metrics for all your published content to understand what resonates with your community.'
        }
      ],
      improvements: [
        'Redesigned member dashboard with activity feed',
        'Enhanced search functionality across the platform',
        'Improved mobile experience for community admins'
      ],
      fixes: [
        'Fixed notification delivery issues on certain mobile devices',
        'Resolved payment processing errors with specific payment methods',
        'Fixed content access issues for newly upgraded members'
      ]
    },
    {
      version: 'v1.2.0',
      date: 'June 22, 2023',
      title: 'Improved Monetization & Slack Integration',
      features: [
        {
          title: 'Multiple Subscription Tiers',
          description: 'Create and manage up to 5 subscription tiers with different pricing and access levels.'
        },
        {
          title: 'Slack Integration',
          description: 'Connect your Slack workspace to Subpace for premium channel access and member management.'
        },
        {
          title: 'Coupon Codes & Promotions',
          description: 'Create custom coupon codes for discounts and promotional pricing for your community memberships.'
        }
      ],
      improvements: [
        'Streamlined checkout process for new members',
        'Enhanced subscription management interface',
        'Improved platform performance and stability'
      ],
      fixes: [
        'Fixed display issues with member profiles on mobile',
        'Resolved webhook delivery issues for certain event types',
        'Fixed email template rendering in some email clients'
      ]
    },
    {
      version: 'v1.0.0',
      date: 'May 8, 2023',
      title: 'Initial Release',
      major: true,
      highlights: [
        'Official launch of Subpace platform',
        'Core community management features',
        'Discord integration and membership monetization'
      ],
      features: [
        {
          title: 'Community Management',
          description: 'Tools to manage members, roles, and permissions within your community.'
        },
        {
          title: 'Discord Integration',
          description: 'Connect your Discord server to Subpace for role-based access and member management.'
        },
        {
          title: 'Membership Monetization',
          description: 'Create paid membership tiers with different access levels and pricing options.'
        },
        {
          title: 'Member Profiles',
          description: 'Customizable member profiles with activity tracking and engagement metrics.'
        }
      ],
      improvements: [],
      fixes: []
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Changelog</h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Track the evolution of Subpace. See our latest features, improvements, and bug fixes.
          </p>
        </div>
        
        {/* Background glow effect */}
        <div className="absolute w-[600px] h-[600px] bg-purple-900/20 blur-[120px] rounded-full top-10 left-1/2 -translate-x-1/2 -z-10"></div>
      </div>

      {/* Subscribe to Updates */}
      <div className="py-8 px-6 bg-[#111113] border-b border-[#232229]">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-medium mb-1">Stay updated</h2>
            <p className="text-sm text-gray-400">Get notified about new features and updates.</p>
          </div>
          <div className="flex w-full md:w-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-[#1A1A1C] border border-[#232229] rounded-l-lg px-4 py-2 text-sm w-full md:w-64 focus:outline-none focus:border-purple-500"
            />
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-lg text-sm font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Changelog Timeline */}
      <div className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          {releases.map((release, index) => (
            <div key={index} className="mb-16 last:mb-0">
              <div className="flex items-start mb-6">
                <div className={`w-12 h-12 rounded-full ${release.major ? 'bg-purple-600' : 'bg-[#1A1A1C] border border-[#232229]'} flex-shrink-0 flex items-center justify-center mr-4`}>
                  <i className={`fa-solid fa-${release.major ? 'rocket' : 'code-branch'} ${release.major ? 'text-white' : 'text-purple-400'}`}></i>
                </div>
                <div>
                  <div className="flex flex-col md:flex-row md:items-center mb-2">
                    <h2 className="text-2xl font-bold mr-3">{release.version}</h2>
                    <div className="text-gray-400 text-sm">{release.date}</div>
                  </div>
                  <h3 className="text-xl font-medium mb-2">{release.title}</h3>
                  
                  {release.highlights && release.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 mb-5">
                      {release.highlights.map((highlight, i) => (
                        <div key={i} className="bg-purple-600/10 border border-purple-600/20 text-purple-400 rounded-full px-3 py-1 text-xs">
                          {highlight}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {release.features && release.features.length > 0 && (
                <div className="ml-16 mb-6">
                  <div className="flex items-center mb-3">
                    <div className="w-5 h-5 bg-green-600/20 rounded-full flex items-center justify-center mr-2">
                      <i className="fa-solid fa-plus text-green-500 text-xs"></i>
                    </div>
                    <h4 className="text-sm font-medium uppercase text-gray-400">New Features</h4>
                  </div>
                  
                  <div className="space-y-4">
                    {release.features.map((feature, i) => (
                      <div key={i} className="bg-[#111113] border border-[#232229] rounded-lg p-4">
                        <h5 className="font-medium mb-2">{feature.title}</h5>
                        <p className="text-sm text-gray-400">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {release.improvements && release.improvements.length > 0 && (
                <div className="ml-16 mb-6">
                  <div className="flex items-center mb-3">
                    <div className="w-5 h-5 bg-blue-600/20 rounded-full flex items-center justify-center mr-2">
                      <i className="fa-solid fa-arrow-up text-blue-500 text-xs"></i>
                    </div>
                    <h4 className="text-sm font-medium uppercase text-gray-400">Improvements</h4>
                  </div>
                  
                  <ul className="space-y-2">
                    {release.improvements.map((improvement, i) => (
                      <li key={i} className="flex items-start">
                        <i className="fa-solid fa-circle text-gray-600 text-[5px] mt-2 mr-3"></i>
                        <span className="text-sm text-gray-300">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {release.fixes && release.fixes.length > 0 && (
                <div className="ml-16">
                  <div className="flex items-center mb-3">
                    <div className="w-5 h-5 bg-red-600/20 rounded-full flex items-center justify-center mr-2">
                      <i className="fa-solid fa-bug text-red-500 text-xs"></i>
                    </div>
                    <h4 className="text-sm font-medium uppercase text-gray-400">Bug Fixes</h4>
                  </div>
                  
                  <ul className="space-y-2">
                    {release.fixes.map((fix, i) => (
                      <li key={i} className="flex items-start">
                        <i className="fa-solid fa-circle text-gray-600 text-[5px] mt-2 mr-3"></i>
                        <span className="text-sm text-gray-300">{fix}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {index < releases.length - 1 && (
                <div className="ml-6 h-12 border-l border-dashed border-[#232229]"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap Preview */}
      <div className="py-16 px-6 bg-[#0c0c0e] border-t border-[#232229]">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Coming Soon</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get a glimpse of what's coming next to the Subpace platform.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Mobile App',
                icon: 'fa-solid fa-mobile-screen',
                description: 'Native iOS and Android apps for community members and administrators.'
              },
              {
                title: 'Advanced Automations',
                icon: 'fa-solid fa-robot',
                description: 'Create complex automation workflows for community management and engagement.'
              },
              {
                title: 'AI Content Tools',
                icon: 'fa-solid fa-sparkles',
                description: 'AI-powered tools for content creation, moderation, and member engagement.'
              }
            ].map((item, i) => (
              <div key={i} className="bg-[#111113] border border-[#232229] rounded-lg p-5 text-center">
                <div className="w-10 h-10 bg-purple-600/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <i className={`${item.icon} text-purple-400`}></i>
                </div>
                <h3 className="font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link 
              href="/feedback" 
              className="inline-flex items-center bg-[#1A1A1C] hover:bg-[#232229] text-white px-6 py-3 rounded-lg text-sm font-medium border border-[#232229]"
            >
              <i className="fa-solid fa-lightbulb text-yellow-500 mr-2"></i>
              Suggest a Feature
            </Link>
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