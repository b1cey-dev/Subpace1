'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');
  
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page Header with Date Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Analytics</h1>
          <p className="text-gray-400 text-sm">Track your community's growth and engagement</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <div className="bg-[#161618] border border-[#232229] rounded-lg flex overflow-hidden">
            <button 
              className={`px-3 py-1.5 text-xs font-medium ${dateRange === '7d' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setDateRange('7d')}
            >
              7D
            </button>
            <button 
              className={`px-3 py-1.5 text-xs font-medium ${dateRange === '30d' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setDateRange('30d')}
            >
              30D
            </button>
            <button 
              className={`px-3 py-1.5 text-xs font-medium ${dateRange === '90d' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setDateRange('90d')}
            >
              90D
            </button>
            <button 
              className={`px-3 py-1.5 text-xs font-medium ${dateRange === 'custom' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setDateRange('custom')}
            >
              Custom
            </button>
          </div>
          
          <button className="p-2 bg-[#161618] border border-[#232229] rounded-lg text-gray-400 hover:text-white">
            <i className="fas fa-download text-sm"></i>
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#111113] border border-[#232229] rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-medium text-gray-400">NEW MEMBERS</h3>
            <div className="flex items-center text-green-400 text-xs">
              <i className="fas fa-arrow-up mr-1"></i>
              <span>24%</span>
            </div>
          </div>
          <div className="flex items-end space-x-2">
            <div className="text-2xl font-bold">+128</div>
            <div className="text-sm text-gray-400 mb-1">past 30 days</div>
          </div>
          <div className="mt-4 h-12 flex items-end space-x-1">
            {[15, 25, 18, 30, 22, 28, 35, 42, 38, 40, 50, 45].map((value, index) => (
              <div 
                key={index}
                className="flex-1 bg-purple-600/20"
                style={{ height: `${value * 2}%` }}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="bg-[#111113] border border-[#232229] rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-medium text-gray-400">ENGAGEMENT</h3>
            <div className="flex items-center text-green-400 text-xs">
              <i className="fas fa-arrow-up mr-1"></i>
              <span>8%</span>
            </div>
          </div>
          <div className="flex items-end space-x-2">
            <div className="text-2xl font-bold">68%</div>
            <div className="text-sm text-gray-400 mb-1">daily active</div>
          </div>
          <div className="mt-4 flex items-center">
            <div className="h-2 rounded-l-full bg-purple-600 w-[68%]"></div>
            <div className="h-2 rounded-r-full bg-[#232229] w-[32%]"></div>
          </div>
        </div>
        
        <div className="bg-[#111113] border border-[#232229] rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-medium text-gray-400">REVENUE</h3>
            <div className="flex items-center text-green-400 text-xs">
              <i className="fas fa-arrow-up mr-1"></i>
              <span>32%</span>
            </div>
          </div>
          <div className="flex items-end space-x-2">
            <div className="text-2xl font-bold">$9,432</div>
            <div className="text-sm text-gray-400 mb-1">past 30 days</div>
          </div>
          <div className="mt-4 h-12 flex items-end space-x-1">
            {[20, 30, 25, 40, 45, 35, 60, 70, 65, 75, 85, 90].map((value, index) => (
              <div 
                key={index}
                className="flex-1 bg-green-500/20"
                style={{ height: `${value}%` }}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="bg-[#111113] border border-[#232229] rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-medium text-gray-400">RETENTION</h3>
            <div className="flex items-center text-red-400 text-xs">
              <i className="fas fa-arrow-down mr-1"></i>
              <span>3%</span>
            </div>
          </div>
          <div className="flex items-end space-x-2">
            <div className="text-2xl font-bold">92%</div>
            <div className="text-sm text-gray-400 mb-1">monthly</div>
          </div>
          <div className="mt-4 text-center">
            <div className="inline-block w-12 h-12 rounded-full border-4 border-[#232229] relative">
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div 
                  className="absolute top-0 left-0 bottom-0 right-0 bg-blue-500/20 origin-bottom-right"
                  style={{ transform: 'rotate(331.2deg)' }} 
                ></div>
              </div>
              <div className="absolute inset-1 rounded-full bg-[#111113] flex items-center justify-center text-xs font-medium">
                92%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analytics Chart Section */}
      <div className="bg-[#111113] border border-[#232229] rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-medium">Growth & Engagement</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span className="text-xs text-gray-400">Members</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-xs text-gray-400">Engagement</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-xs text-gray-400">Revenue</span>
            </div>
            <select className="bg-[#161618] border border-[#232229] rounded-md px-2 py-1 text-xs text-gray-300">
              <option>All metrics</option>
              <option>Members only</option>
              <option>Engagement only</option>
              <option>Revenue only</option>
            </select>
          </div>
        </div>
        
        {/* Chart Visualization */}
        <div className="h-80">
          <div className="w-full h-full bg-[#0d0d0f] rounded-lg p-4">
            {/* Y-axis labels */}
            <div className="relative h-full">
              {/* Grid lines */}
              <div className="absolute left-10 right-4 top-0 bottom-0">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="absolute left-0 right-0 border-t border-dashed border-[#1a1a1c]" style={{ top: `${i * 25}%` }}></div>
                ))}
              </div>
              
              {/* Y-axis labels */}
              <div className="absolute top-0 left-0 bottom-0 w-10 flex flex-col justify-between text-[10px] text-gray-500 py-2">
                <div>2,000</div>
                <div>1,500</div>
                <div>1,000</div>
                <div>500</div>
                <div>0</div>
              </div>
              
              {/* Chart lines */}
              <div className="absolute left-10 right-4 top-4 bottom-4">
                {/* Member growth line (purple) */}
                <svg className="w-full h-full overflow-visible">
                  <path 
                    d="M0,180 C20,160 40,155 60,140 C80,125 100,120 120,100 C140,80 160,70 180,60 C200,50 220,45 240,40 C260,35 280,30 300,25 C320,20 340,15 360,10"
                    fill="none" 
                    stroke="#9061F9" 
                    strokeWidth="2"
                  />
                  {/* Data points */}
                  {[
                    { x: 0, y: 180 }, { x: 60, y: 140 }, { x: 120, y: 100 }, 
                    { x: 180, y: 60 }, { x: 240, y: 40 }, { x: 300, y: 25 }, { x: 360, y: 10 }
                  ].map((point, i) => (
                    <circle key={i} cx={point.x} cy={point.y} r="3" fill="#9061F9" />
                  ))}
                </svg>
              </div>
              
              {/* X-axis labels */}
              <div className="absolute left-10 right-4 bottom-0 flex justify-between text-[10px] text-gray-500">
                <div>Apr 1</div>
                <div>Apr 6</div>
                <div>Apr 11</div>
                <div>Apr 16</div>
                <div>Apr 21</div>
                <div>Apr 26</div>
                <div>May 1</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Segmentation Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Traffic Sources */}
        <div className="bg-[#111113] border border-[#232229] rounded-xl p-6">
          <h2 className="font-medium mb-4">Traffic Sources</h2>
          <div className="space-y-4">
            {[
              { source: 'Direct', value: 42, color: 'bg-purple-500' },
              { source: 'Social Media', value: 28, color: 'bg-blue-500' },
              { source: 'Search', value: 16, color: 'bg-green-500' },
              { source: 'Referral', value: 14, color: 'bg-yellow-500' },
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-24 text-sm">{item.source}</div>
                <div className="flex-1 h-2 bg-[#232229] rounded-full overflow-hidden mr-4">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }}></div>
                </div>
                <div className="text-sm font-medium">{item.value}%</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Member Demographics */}
        <div className="bg-[#111113] border border-[#232229] rounded-xl p-6">
          <h2 className="font-medium mb-4">Member Demographics</h2>
          <div className="flex items-center justify-center h-48">
            <div className="w-40 h-40 rounded-full border-8 border-[#232229] relative">
              <div className="absolute inset-0 overflow-hidden rounded-full">
                {/* Purple segment 40% */}
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-purple-500 origin-bottom-right" style={{ transform: 'rotate(144deg)' }}></div>
                {/* Blue segment 25% */}
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-blue-500 origin-bottom-right" style={{ transform: 'rotate(234deg)' }}></div>
                {/* Green segment 20% */}
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-green-500 origin-bottom-right" style={{ transform: 'rotate(306deg)' }}></div>
                {/* Yellow segment 15% */}
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-yellow-500 origin-bottom-right" style={{ transform: 'rotate(360deg)' }}></div>
              </div>
            </div>
            <div className="ml-8">
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-sm">North America (40%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm">Europe (25%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Asia (20%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm">Other (15%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Reports Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Content */}
        <div className="bg-[#111113] border border-[#232229] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Top Content</h2>
            <button className="text-xs text-purple-400 hover:text-purple-300">View all</button>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Welcome to our community!', views: 1245, engagement: 87 },
              { title: 'How to maximize engagement', views: 862, engagement: 92 },
              { title: 'Community milestone: 1000+ members!', views: 743, engagement: 78 },
              { title: 'Upcoming feature: Advanced Analytics', views: 591, engagement: 64 },
            ].map((content, index) => (
              <div key={index} className="flex items-start border-b border-[#232229] last:border-0 pb-3 last:pb-0">
                <div className="w-8 h-8 rounded-lg bg-[#232229] flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-xs font-medium">#{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium mb-1 truncate">{content.title}</h3>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">{content.views} views</span>
                    <span className="text-green-400">{content.engagement}% engagement</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Device Usage */}
        <div className="bg-[#111113] border border-[#232229] rounded-xl p-6">
          <h2 className="font-medium mb-4">Device Usage</h2>
          <div className="grid grid-cols-3 gap-4 mb-3">
            <div className="flex flex-col items-center justify-center bg-[#161618] rounded-lg p-3">
              <i className="fas fa-mobile-alt text-2xl mb-2"></i>
              <span className="text-xl font-bold">62%</span>
              <span className="text-xs text-gray-400">Mobile</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-[#161618] rounded-lg p-3">
              <i className="fas fa-desktop text-2xl mb-2"></i>
              <span className="text-xl font-bold">31%</span>
              <span className="text-xs text-gray-400">Desktop</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-[#161618] rounded-lg p-3">
              <i className="fas fa-tablet-alt text-2xl mb-2"></i>
              <span className="text-xl font-bold">7%</span>
              <span className="text-xs text-gray-400">Tablet</span>
            </div>
          </div>
          <div className="h-2 bg-[#232229] rounded-full overflow-hidden">
            <div className="h-full flex">
              <div className="bg-purple-500 w-[62%]"></div>
              <div className="bg-blue-500 w-[31%]"></div>
              <div className="bg-green-500 w-[7%]"></div>
            </div>
          </div>
        </div>
        
        {/* Engagement Metrics */}
        <div className="bg-[#111113] border border-[#232229] rounded-xl p-6">
          <h2 className="font-medium mb-4">Engagement Metrics</h2>
          <div className="space-y-4">
            {[
              { metric: 'Avg. Time Spent', value: '14m 32s', change: '+8%', positive: true },
              { metric: 'Comments per User', value: '4.7', change: '+12%', positive: true },
              { metric: 'Reactions per Post', value: '18.3', change: '+5%', positive: true },
              { metric: 'Bounce Rate', value: '24%', change: '-3%', positive: true },
            ].map((metric, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{metric.metric}</span>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{metric.value}</span>
                  <span className={`text-xs ${metric.positive ? 'text-green-400' : 'text-red-400'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 