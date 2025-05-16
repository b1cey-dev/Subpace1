'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser, useClerk } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CommunityActivity from '@/components/CommunityActivity';

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [stats, setStats] = useState<{
    totalMembers: number;
    activeUsers: number;
    revenue: number;
    newSignups: number;
  } | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [recentMembers, setRecentMembers] = useState<any[]>([]);

  useEffect(() => {
    localStorage.removeItem("subpace_user");
    fetch("/api/dashboard/overview")
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.totalMembers === 'number' && typeof data.activeUsers === 'number' && typeof data.revenue === 'number' && typeof data.newSignups === 'number') {
          setStats(data);
          setRecentMembers(Array.isArray(data.recentMembers) ? data.recentMembers : []);
        } else {
          setStats({
            totalMembers: 1247,
            activeUsers: 892,
            revenue: 9432,
            newSignups: 128,
          });
          setRecentMembers([]);
        }
        setLoadingStats(false);
      })
      .catch(() => {
        setStats({
          totalMembers: 1247,
          activeUsers: 892,
          revenue: 9432,
          newSignups: 128,
        });
        setRecentMembers([]);
        setLoadingStats(false);
      });
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => signOut()}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm font-medium"
        >
          Sign out
        </button>
      </div>
      
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">My Community Dashboard</h1>
        <p className="text-gray-400 text-sm">Manage and grow your community</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div className="bg-[#111113] border border-[#232229] rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-xs font-medium">TOTAL MEMBERS</span>
            <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
              <i className="fas fa-users text-blue-400 text-xs"></i>
            </div>
          </div>
          <div className="text-2xl font-bold">{loadingStats || !stats || typeof stats.totalMembers !== 'number' ? '--' : stats.totalMembers.toLocaleString()}</div>
          <div className="text-xs text-green-400 mt-2 flex items-center">
            <i className="fas fa-arrow-up mr-1"></i>
            <span>12% from last month</span>
          </div>
        </div>
        
        <div className="bg-[#111113] border border-[#232229] rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-xs font-medium">ACTIVE USERS</span>
            <div className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center">
              <i className="fas fa-user-check text-purple-400 text-xs"></i>
            </div>
          </div>
          <div className="text-2xl font-bold">{loadingStats || !stats || typeof stats.activeUsers !== 'number' ? '--' : stats.activeUsers.toLocaleString()}</div>
          <div className="text-xs text-green-400 mt-2 flex items-center">
            <i className="fas fa-arrow-up mr-1"></i>
            <span>8% from last month</span>
          </div>
        </div>
        
        <div className="bg-[#111113] border border-[#232229] rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-xs font-medium">REVENUE</span>
            <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
              <i className="fas fa-dollar-sign text-green-400 text-xs"></i>
            </div>
          </div>
          <div className="text-2xl font-bold">{loadingStats || !stats || typeof stats.revenue !== 'number' ? '--' : `$${stats.revenue.toLocaleString()}`}</div>
          <div className="text-xs text-green-400 mt-2 flex items-center">
            <i className="fas fa-arrow-up mr-1"></i>
            <span>23% from last month</span>
          </div>
        </div>
        
        <div className="bg-[#111113] border border-[#232229] rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-xs font-medium">NEW SIGNUPS</span>
            <div className="w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center">
              <i className="fas fa-user-plus text-red-400 text-xs"></i>
            </div>
          </div>
          <div className="text-2xl font-bold">{loadingStats || !stats ? '--' : stats.newSignups.toLocaleString()}</div>
          <div className="text-xs text-red-400 mt-2 flex items-center">
            <i className="fas fa-arrow-down mr-1"></i>
            <span>5% from last month</span>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-[#111113] border border-[#232229] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold">Community Activity</h2>
            <select className="bg-[#232229] text-gray-300 text-xs border border-[#36343e] rounded-md px-2 py-1">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <CommunityActivity />
        </div>
        
        <div className="bg-[#111113] border border-[#232229] rounded-xl p-6">
          <h2 className="font-semibold mb-4">Recent Members</h2>
          <div className="space-y-4">
            {recentMembers.length === 0 ? (
              <div className="text-gray-500 text-sm text-center py-8">No members yet. Welcome to your new community!</div>
            ) : (
              recentMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between py-2 border-b border-[#232229] last:border-0">
                  <div className="flex items-center">
                    <div className="w-9 h-9 bg-[#232229] rounded-full mr-3 flex items-center justify-center">
                      <i className="fas fa-user text-gray-400 text-xs"></i>
                    </div>
                    <div>
                      <div className="text-sm">{member.name || 'User'}</div>
                      <div className="text-gray-500 text-xs">{member.email}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">{member.created_at ? new Date(member.created_at).toLocaleString() : ''}</div>
                </div>
              ))
            )}
          </div>
          <button className="w-full mt-4 text-purple-400 text-xs font-medium hover:text-purple-300">
            View all members →
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </main>
  );
} 