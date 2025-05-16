import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white flex flex-col overflow-hidden">
      {/* Navigation */}
      <nav className="px-6 py-3 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center">
          <div className="w-7 h-7 bg-purple-600 rounded-md mr-2 flex items-center justify-center">
            <i className="fas fa-cube text-white text-xs"></i>
          </div>
          <span className="font-bold text-lg">Subpace</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-sm hover:text-purple-400">Features</a>
          <a href="#resources" className="text-sm hover:text-purple-400">Resources</a>
          <a href="#pricing" className="text-sm hover:text-purple-400">Pricing</a>
        </div>
        <div className="flex space-x-4 items-center">
          <Link href="/sign-in" className="text-sm hover:text-purple-400">Sign in</Link>
          <Link href="/sign-up" className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm hover:bg-purple-700">Get started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center px-4 pt-20 pb-16 relative">
        {/* Purple glow effect */}
        <div className="absolute w-[600px] h-[600px] bg-purple-900/30 blur-[120px] rounded-full top-0 -z-10"></div>
        
        <div className="inline-flex items-center bg-[#232229]/70 rounded-full px-3 py-1 text-xs mb-6 border border-[#36343e]">
          <i className="fas fa-rocket mr-2 text-purple-400"></i>
          <span>Built to elevate your community</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight">
          Elevate Your Community,
          <br />
          <span className="text-purple-400">Amplify Your Revenue</span>
        </h1>
        
        <p className="text-gray-300 max-w-2xl mb-10 text-base leading-relaxed opacity-80">
          Subpace transforms your Discord, WhatsApp, or Slack community into a 
          thriving business ecosystem. Automate, monetize, and analyze with unparalleled 
          precision.
        </p>
        
        <div className="flex space-x-4 mb-16">
          <Link href="/sign-up" className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition">Get started</Link>
          <button className="border border-[#36343e] px-6 py-2 rounded-full text-sm font-medium hover:bg-[#232229] transition">
            <i className="fas fa-play-circle mr-2"></i>
            Watch demo
          </button>
        </div>
        
        <div className="flex items-center mb-8">
          <div className="flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gray-600 border-2 border-[#0A0A0C] overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-700"></div>
              </div>
            ))}
          </div>
          <span className="text-xs text-gray-400 ml-3">Empowering 5,000+ online community leaders</span>
        </div>
        
        <div className="text-xs text-gray-500 font-medium tracking-wider mb-6">TRUSTED BY INDUSTRY LEADERS</div>
        
        <div className="flex space-x-10 mb-24">
          {['discord', 'slack', 'wordpress', 'shopify', 'notion'].map((brand, i) => (
            <div key={i} className="w-7 h-7 opacity-70">
              <i className={`fab fa-${brand === 'notion' ? 'n' : brand} text-gray-400 text-xl`}></i>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Powerful Features</h2>
          <p className="text-center text-gray-400 text-sm mb-16 max-w-2xl mx-auto">Discover how Subpace empowers your community growth and monetization</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#111113] p-6 rounded-xl border border-[#232229]">
              <div className="w-8 h-8 bg-[#1621AB] rounded-full mb-5 flex items-center justify-center">
                <i className="fas fa-chart-line text-white text-sm"></i>
              </div>
              <h3 className="text-lg font-semibold mb-3">Advanced Analytics</h3>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">Gain deep insights into your member's usage, growth, and engagement. Expert dashboard to track all the trends.</p>
              <a href="#" className="text-blue-400 hover:underline text-sm inline-flex items-center">
                Learn more 
                <i className="fas fa-arrow-right ml-1 text-xs"></i>
              </a>
            </div>
            
            <div className="bg-[#111113] p-6 rounded-xl border border-[#232229]">
              <div className="w-8 h-8 bg-[#6C2BD9] rounded-full mb-5 flex items-center justify-center">
                <i className="fas fa-exchange-alt text-white text-sm"></i>
              </div>
              <h3 className="text-lg font-semibold mb-3">Multi-Platform Integration</h3>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">Seamlessly connect and manage your community across channels, devices, and tools from a single dashboard.</p>
              <a href="#" className="text-purple-400 hover:underline text-sm inline-flex items-center">
                Learn more 
                <i className="fas fa-arrow-right ml-1 text-xs"></i>
              </a>
            </div>
            
            <div className="bg-[#111113] p-6 rounded-xl border border-[#232229]">
              <div className="w-8 h-8 bg-[#CC413D] rounded-full mb-5 flex items-center justify-center">
                <i className="fas fa-shield-alt text-white text-sm"></i>
              </div>
              <h3 className="text-lg font-semibold mb-3">Secure Access Control</h3>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">Powerful role-based security designed to protect your community and ensure only paying members have access.</p>
              <a href="#" className="text-red-400 hover:underline text-sm inline-flex items-center">
                Learn more 
                <i className="fas fa-arrow-right ml-1 text-xs"></i>
              </a>
            </div>
          </div>
          
          <div className="flex justify-center mt-16">
            <Link href="/sign-up" className="bg-purple-600/10 text-purple-400 px-6 py-3 rounded-full hover:bg-purple-600/20 transition text-sm font-medium border border-purple-600/20">
              Start empowering your community →
            </Link>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-20 px-6 border-t border-[#1A1A1C]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Free, forever.</h2>
          <p className="text-center text-gray-400 text-sm mb-16">Optional upgrade for additional features</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#111113] p-8 rounded-xl border border-[#232229]">
              <h3 className="font-semibold text-sm mb-1">Free</h3>
              <div className="text-4xl font-bold mb-8">$0</div>
              
              <ul className="space-y-4 text-sm mb-8">
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2 text-xs"></i>
                  <span className="text-gray-300">Unlimited members</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2 text-xs"></i>
                  <span className="text-gray-300">Connect WhatsApp, Discord & Slack</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2 text-xs"></i>
                  <span className="text-gray-300">Accept payments</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2 text-xs"></i>
                  <span className="text-gray-300">No Platform Fees</span>
                </li>
              </ul>
              
              <Link href="/sign-up" className="w-full py-2 border border-[#36343e] rounded-md hover:bg-[#171719] transition text-sm font-medium flex items-center justify-center">
                Get Started
              </Link>
            </div>
            
            <div className="bg-[#111113] p-8 rounded-xl border border-[#232229] relative">
              <div className="absolute top-3 right-3 text-xs bg-[#232229] px-2 py-1 rounded-full text-gray-300">
                Most popular
              </div>
              
              <h3 className="font-semibold text-sm mb-1">Pro</h3>
              <div className="text-4xl font-bold mb-8">$29</div>
              
              <ul className="space-y-4 text-sm mb-8">
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2 text-xs"></i>
                  <span className="text-gray-300">Everything in Free +</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2 text-xs"></i>
                  <span className="text-gray-300">Automation Tools</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2 text-xs"></i>
                  <span className="text-gray-300">CRM export, plans & forms</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2 text-xs"></i>
                  <span className="text-gray-300">Profile support</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2 text-xs"></i>
                  <span className="text-gray-300">Team collaboration</span>
                </li>
              </ul>
              
              <Link href="/sign-up?plan=pro" className="w-full py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition text-sm font-medium flex items-center justify-center">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 px-6 border-t border-[#1A1A1C]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">FAQs answered</h2>
          <p className="text-center text-gray-400 text-sm mb-16">Everything you need to know about Subpace</p>
          
          <div className="space-y-4">
            {[
              "How does it work?",
              "What happens if someone stops paying?",
              "How fast / easy is it to set up?",
              "Can I add free trials, lifetime access, free tiers and form submissions?",
              "How do my users cancel their subscription?",
              "How do my users pay and join?"
            ].map((question, i) => (
              <div key={i} className="border-b border-[#1A1A1C] py-4">
                <button className="flex justify-between items-center w-full text-left hover:text-purple-300 transition">
                  <span className="text-sm">{question}</span>
                  <i className="fas fa-plus text-xs text-gray-400"></i>
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <p className="text-gray-400 text-sm mb-4">Still have questions?</p>
            <button className="text-purple-400 hover:underline text-sm font-medium">
              <i className="fas fa-headset mr-2"></i>
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-6 border-t border-[#1A1A1C] relative">
        <div className="absolute w-[400px] h-[400px] bg-purple-900/20 blur-[100px] rounded-full top-20 left-1/2 -translate-x-1/2 -z-10"></div>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Ready to get moving?</h2>
          <p className="text-center text-gray-400 text-sm mb-12">Connect your favorite platform and start monetizing your community in minutes.</p>
          
          <div className="flex justify-center space-x-8 mb-12">
            <div className="w-12 h-12 bg-[#232229] rounded-full flex items-center justify-center">
              <i className="fab fa-discord text-white text-xl"></i>
            </div>
            <div className="w-12 h-12 bg-[#232229] rounded-full flex items-center justify-center">
              <i className="fab fa-whatsapp text-white text-xl"></i>
            </div>
            <div className="w-12 h-12 bg-[#232229] rounded-full flex items-center justify-center">
              <i className="fab fa-slack text-white text-xl"></i>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Link href="/sign-up" className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition text-sm font-medium">
              Get started free
            </Link>
          </div>
          
          <p className="text-center text-xs text-gray-500 mt-4">No credit card required</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-[#1A1A1C] bg-[#09090B]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center mb-5">
                <div className="w-6 h-6 bg-purple-600 rounded-md mr-2 flex items-center justify-center">
                  <i className="fas fa-cube text-white text-xs"></i>
                </div>
                <span className="font-bold text-sm">Subpace</span>
              </div>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Transform your community into a thriving business with automated 
                member management and seamless monetization.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 bg-[#171719] rounded-full flex items-center justify-center hover:bg-[#232229] transition">
                  <i className="fab fa-twitter text-gray-400 text-sm"></i>
                </a>
                <a href="#" className="w-8 h-8 bg-[#171719] rounded-full flex items-center justify-center hover:bg-[#232229] transition">
                  <i className="fab fa-linkedin-in text-gray-400 text-sm"></i>
                </a>
                <a href="#" className="w-8 h-8 bg-[#171719] rounded-full flex items-center justify-center hover:bg-[#232229] transition">
                  <i className="fab fa-github text-gray-400 text-sm"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm mb-5">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition">Features</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition">Integrations</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm mb-5">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition">API Reference</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm mb-5">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition">About</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition">Team</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition">Careers</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#1A1A1C] pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-xs text-gray-500 mb-4 md:mb-0">© 2023 Subpace All rights reserved.</div>
            <div className="flex space-x-6">
              <a href="#" className="text-xs text-gray-500 hover:text-white transition">Privacy</a>
              <a href="#" className="text-xs text-gray-500 hover:text-white transition">Terms</a>
              <a href="#" className="text-xs text-gray-500 hover:text-white transition">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
