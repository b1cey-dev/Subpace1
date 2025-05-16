import React from 'react';
import Link from 'next/link';

export default function Integrations() {
  // Define the platform integrations
  const platforms = [
    {
      id: 'discord',
      name: 'Discord',
      icon: 'fa-brands fa-discord',
      iconColor: 'text-indigo-400',
      description: 'Connect your Discord server to Subpace for advanced member management, role-based access, and premium content gating.',
      features: [
        'Automatic role assignment based on membership status',
        'Private channel access control',
        'Member activity analytics',
        'Payment-gated channels and content',
        'Automated onboarding and welcome messages'
      ],
      callToAction: 'Connect Discord',
      bgGradient: 'from-indigo-600 to-indigo-800',
      popular: true
    },
    {
      id: 'slack',
      name: 'Slack',
      icon: 'fa-brands fa-slack',
      iconColor: 'text-emerald-400',
      description: 'Transform your Slack workspace into a premium community with advanced access controls and monetization options.',
      features: [
        'Workspace membership management',
        'Channel access based on subscription tiers',
        'Premium content sharing',
        'Member analytics and engagement metrics',
        'Automated member approval workflows'
      ],
      callToAction: 'Connect Slack',
      bgGradient: 'from-emerald-600 to-emerald-800'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: 'fa-brands fa-whatsapp',
      iconColor: 'text-green-400',
      description: 'Manage WhatsApp groups as premium communities with automated member management and content delivery.',
      features: [
        'Group membership verification',
        'Automated add/remove based on payment status',
        'Scheduled content delivery',
        'Premium broadcast messages',
        'Group analytics and member tracking'
      ],
      callToAction: 'Connect WhatsApp',
      bgGradient: 'from-green-600 to-green-800'
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: 'fa-brands fa-telegram',
      iconColor: 'text-blue-400',
      description: 'Create premium Telegram groups and channels with automated membership management and content delivery.',
      features: [
        'Private channel/group access control',
        'Bot-managed member verification',
        'Scheduled content distribution',
        'Payment-gated access',
        'Member engagement analytics'
      ],
      callToAction: 'Connect Telegram',
      bgGradient: 'from-blue-600 to-blue-800'
    },
    {
      id: 'wordpress',
      name: 'WordPress',
      icon: 'fa-brands fa-wordpress',
      iconColor: 'text-blue-400',
      description: 'Gate your WordPress content behind membership tiers and manage subscribers through Subpace.',
      features: [
        'Content access based on membership level',
        'Single sign-on integration',
        'Member-only comments and forums',
        'Content engagement analytics',
        'Integrated payment processing'
      ],
      callToAction: 'Connect WordPress',
      bgGradient: 'from-cyan-600 to-blue-800'
    },
    {
      id: 'zapier',
      name: 'Zapier',
      icon: 'fa-solid fa-bolt',
      iconColor: 'text-orange-400',
      description: 'Connect Subpace to thousands of other apps and automate your community management workflows.',
      features: [
        'Trigger actions based on membership events',
        'Sync member data with other platforms',
        'Automated onboarding sequences',
        'Custom notification workflows',
        'Data synchronization across platforms'
      ],
      callToAction: 'Connect Zapier',
      bgGradient: 'from-orange-600 to-orange-800'
    }
  ];

  // Define upcoming integrations
  const upcomingIntegrations = [
    { 
      name: 'Notion', 
      icon: 'fa-solid fa-n', 
      description: 'Share Notion workspaces with members based on their subscription tier' 
    },
    { 
      name: 'GitHub', 
      icon: 'fa-brands fa-github', 
      description: 'Manage private repository access for dev communities' 
    },
    { 
      name: 'Circle', 
      icon: 'fa-solid fa-circle-nodes', 
      description: 'Connect your Circle community for enhanced monetization options' 
    },
    { 
      name: 'Patreon', 
      icon: 'fa-brands fa-patreon', 
      description: 'Import existing Patreon supporters into your Subpace community' 
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Integrate with Your Favorite Platforms</h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Connect Subpace to the platforms where your community already lives. Manage members, deliver content, and process payments seamlessly.
          </p>
        </div>
        
        {/* Background glow effect */}
        <div className="absolute w-[600px] h-[600px] bg-purple-900/20 blur-[120px] rounded-full top-10 left-1/2 -translate-x-1/2 -z-10"></div>
      </div>

      {/* Platforms Grid */}
      <div className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {platforms.map((platform) => (
            <div 
              key={platform.id} 
              className={`bg-[#111113] rounded-xl border border-[#232229] overflow-hidden relative ${platform.popular ? 'md:col-span-2' : ''}`}
            >
              {platform.popular && (
                <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className={`bg-gradient-to-r ${platform.bgGradient} p-6`}>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-3">
                    <i className={`${platform.icon} ${platform.iconColor} text-lg`}></i>
                  </div>
                  <h2 className="text-xl font-bold">{platform.name}</h2>
                </div>
                <p className="text-gray-100">{platform.description}</p>
              </div>
              
              <div className="p-6">
                <h3 className="text-sm font-medium uppercase text-gray-400 mb-4">Key Features</h3>
                <ul className="space-y-3 mb-6">
                  {platform.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fa-solid fa-check text-green-500 mr-2 mt-1 text-xs"></i>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`bg-[#161618] hover:bg-[#1d1d20] text-white px-4 py-2 rounded-lg text-sm font-medium border border-[#232229] w-full`}>
                  {platform.callToAction}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Section */}
      <div className="py-16 px-6 bg-[#0c0c0e] border-t border-[#232229]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#111113] border border-[#232229] rounded-xl p-8 md:p-12 relative overflow-hidden">
            <div className="md:flex items-center">
              <div className="md:w-3/5 mb-8 md:mb-0 relative z-10">
                <div className="inline-flex items-center bg-[#232229]/70 rounded-full px-3 py-1 text-xs mb-4 border border-[#36343e]">
                  <i className="fa-solid fa-code mr-2 text-purple-400"></i>
                  <span>Developer Tools</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Build Custom Integrations</h2>
                <p className="text-gray-400 mb-6">
                  Use our comprehensive API and webhooks to build custom integrations for your specific community needs. Connect Subpace to any platform or service.
                </p>
                <a href="#" className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-sm font-medium">
                  View API Documentation
                  <i className="fa-solid fa-arrow-right ml-2"></i>
                </a>
              </div>
              <div className="md:w-2/5 md:pl-8 relative z-10">
                <div className="bg-[#161618] border border-[#232229] rounded-lg p-4 font-mono text-sm text-gray-300 overflow-hidden">
                  <div className="flex text-xs text-gray-500 mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <pre className="text-xs overflow-x-auto">
{`// Example webhook event
{
  "event": "member.subscription.created",
  "member": {
    "id": "mem_12345",
    "email": "user@example.com",
    "name": "Jane Doe"
  },
  "subscription": {
    "id": "sub_67890",
    "plan": "pro",
    "status": "active"
  },
  "timestamp": "2023-07-15T15:30:45Z"
}`}
                  </pre>
                </div>
              </div>
            </div>
            
            {/* Background gradient */}
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-purple-900/10 to-transparent -z-10"></div>
          </div>
        </div>
      </div>

      {/* Upcoming Integrations */}
      <div className="py-16 px-6 border-t border-[#232229]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Coming Soon</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We're constantly expanding our integration catalog. Here's what's coming next to Subpace.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {upcomingIntegrations.map((integration, index) => (
              <div key={index} className="bg-[#111113] border border-[#232229] rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-[#161618] rounded-full flex items-center justify-center mr-3">
                    <i className={`${integration.icon} text-gray-400`}></i>
                  </div>
                  <h3 className="font-medium">{integration.name}</h3>
                </div>
                <p className="text-sm text-gray-400">{integration.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <div className="inline-flex items-center border border-[#232229] rounded-full px-4 py-2 text-sm">
              <span className="text-gray-400 mr-2">Want a specific integration?</span>
              <a href="#" className="text-purple-400 hover:text-purple-300">Request it here</a>
            </div>
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