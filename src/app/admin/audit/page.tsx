'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  userId: string;
  userEmail: string;
  details: string;
  ipAddress: string;
}

export default function AuditLogPage() {
  const { user, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const res = await fetch('/api/admin/check');
        const data = await res.json();
        setIsAdmin(data.isAdmin);
        if (data.isAdmin) {
          // In a real app, fetch audit logs from your API
          setLogs([
            {
              id: '1',
              timestamp: '2024-03-03T10:00:00Z',
              action: 'USER_ROLE_CHANGED',
              userId: 'user_123',
              userEmail: 'admin@example.com',
              details: 'Changed role from member to premium',
              ipAddress: '192.168.1.1'
            },
            {
              id: '2',
              timestamp: '2024-03-03T09:30:00Z',
              action: 'USER_DELETED',
              userId: 'user_456',
              userEmail: 'user@example.com',
              details: 'Account deleted',
              ipAddress: '192.168.1.2'
            },
            {
              id: '3',
              timestamp: '2024-03-03T09:00:00Z',
              action: 'SETTINGS_UPDATED',
              userId: 'user_789',
              userEmail: 'premium@example.com',
              details: 'Updated notification preferences',
              ipAddress: '192.168.1.3'
            }
          ]);
        }
      }
      setLoading(false);
    };

    checkAdmin();
  }, [user]);

  const filteredLogs = logs.filter(log => {
    if (filter === 'all') return true;
    return log.action === filter;
  });

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
        <h1 className="text-2xl font-bold mb-2">Audit Logs</h1>
        <p className="text-gray-600">Track system activities and user actions</p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Action
        </label>
        <select
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Actions</option>
          <option value="USER_ROLE_CHANGED">Role Changes</option>
          <option value="USER_DELETED">User Deletions</option>
          <option value="SETTINGS_UPDATED">Settings Updates</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP Address
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLogs.map((log) => (
              <tr key={log.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    log.action === 'USER_ROLE_CHANGED' ? 'bg-purple-100 text-purple-800' :
                    log.action === 'USER_DELETED' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {log.userEmail}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {log.details}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {log.ipAddress}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 