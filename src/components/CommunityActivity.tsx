'use client';

import React, { useState } from 'react';

interface ActivityData {
  day: string;
  posts: number;
  comments: number;
}

const activityData: ActivityData[] = [
  { day: 'Mon', posts: 55, comments: 20 },
  { day: 'Tue', posts: 85, comments: 65 },
  { day: 'Wed', posts: 125, comments: 45 },
  { day: 'Thu', posts: 105, comments: 85 },
  { day: 'Fri', posts: 145, comments: 65 },
  { day: 'Sat', posts: 95, comments: 55 },
  { day: 'Sun', posts: 165, comments: 105 },
];

export default function CommunityActivity() {
  const [timeRange, setTimeRange] = useState('Last 7 days');
  const maxValue = Math.max(...activityData.map(d => Math.max(d.posts, d.comments)));
  const totalInteractions = activityData.reduce((sum, day) => sum + day.posts + day.comments, 0);
  const peakDay = activityData.reduce((max, day) => 
    (day.posts + day.comments) > (max.posts + max.comments) ? day : max
  );

  return (
    <div>
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span className="text-gray-400 text-sm">Posts</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-gray-400 text-sm">Comments</span>
        </div>
        <div className="ml-auto text-gray-500 text-sm">
          Total: {totalInteractions.toLocaleString()} interactions
        </div>
      </div>

      <div className="relative h-[200px] mt-8">
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-gray-500 text-xs">
          <span>200</span>
          <span>150</span>
          <span>100</span>
          <span>50</span>
          <span>0</span>
        </div>
        
        <div className="ml-8 h-full flex items-end">
          {activityData.map((day, index) => (
            <div key={day.day} className="flex-1 flex flex-col items-center">
              <div className="relative w-full h-full flex justify-center">
                <div 
                  className="w-4 bg-purple-500 rounded-sm"
                  style={{ height: `${(day.posts / maxValue) * 100}%` }}
                ></div>
                <div 
                  className="w-4 bg-blue-500 rounded-sm ml-1"
                  style={{ height: `${(day.comments / maxValue) * 100}%` }}
                ></div>
              </div>
              <span className="mt-2 text-gray-500 text-sm">{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center text-sm">
        <div>
          <div className="text-gray-500">Peak Activity</div>
          <div className="text-gray-400">{peakDay.day}day ({peakDay.posts + peakDay.comments} interactions)</div>
        </div>
        <div>
          <div className="text-gray-500">Avg. Daily</div>
          <div className="text-gray-400">{Math.round(totalInteractions / 7)} interactions</div>
        </div>
        <button className="text-purple-400 hover:text-purple-300 flex items-center space-x-1">
          <span>View detailed analytics</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
} 