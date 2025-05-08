'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getUserRole } from "@/lib/auth";

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  premiumUsers: number;
  newUsers: number;
  userActivity: {
    date: string;
    activeUsers: number;
    newSignups: number;
  }[];
}

export default function AnalyticsDashboard() {
  const { user, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    activeUsers: 0,
    premiumUsers: 0,
    newUsers: 0,
    userActivity: []
  });

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const role = await getUserRole();
        setIsAdmin(role === 'admin');
        if (role === 'admin') {
          // In a real app, fetch analytics from your API
          setAnalytics({
            totalUsers: 1234,
            activeUsers: 789,
            premiumUsers: 234,
            newUsers: 56,
            userActivity: [
              { date: '2024-03-01', activeUsers: 650, newSignups: 45 },
              { date: '2024-03-02', activeUsers: 720, newSignups: 52 },
              { date: '2024-03-03', activeUsers: 789, newSignups: 56 },
            ]
          });
        }
      }
      setLoading(false);
    };

    checkAdmin();
  }, [user]);

  if (!isLoaded || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Monitor user activity and growth</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{analytics.totalUsers}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{analytics.activeUsers}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Premium Users</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{analytics.premiumUsers}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">New Users (24h)</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{analytics.newUsers}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">User Activity</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Active Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  New Signups
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analytics.userActivity.map((activity) => (
                <tr key={activity.date}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.activeUsers}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.newSignups}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 