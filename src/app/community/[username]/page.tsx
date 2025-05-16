'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function CommunityProfilePage() {
  const params = useParams();
  const username = Array.isArray(params.username) ? params.username[0] : params.username;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      if (typeof username === 'string') {
        const res = await fetch(`/api/community-profile?username=${encodeURIComponent(username)}`);
        const data = await res.json();
        setUser(data.user || null);
      } else {
        setUser(null);
      }
      setLoading(false);
    }
    if (username) fetchUser();
  }, [username]);

  if (loading) return <div className="p-8 text-center text-gray-400">Loading community...</div>;
  if (!user) return <div className="p-8 text-center text-gray-400">Community not found.</div>;

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-[#18181b] border border-[#232229] rounded-xl p-8 flex flex-col items-center">
        <div className="w-24 h-24 rounded-lg bg-[#232229] flex items-center justify-center mb-4">
          <i className="fas fa-users text-gray-500 text-4xl"></i>
        </div>
        <div className="text-2xl font-bold text-white mb-1">{String(user.unsafe_metadata?.communityName || user.unsafe_metadata?.username || 'Community Name')}</div>
        <div className="text-gray-400 mb-4 text-center">{String(user.unsafe_metadata?.bio || 'A short description about this community.')}</div>
        <div className="flex space-x-6 mb-4">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-purple-400">245</span>
            <span className="text-xs text-gray-400">Members</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-purple-400">128</span>
            <span className="text-xs text-gray-400">Posts</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-purple-400">Apr 2024</span>
            <span className="text-xs text-gray-400">Created</span>
          </div>
        </div>
        <div className="mb-4">
          <span className="inline-block bg-green-900/20 text-green-400 text-xs px-3 py-1 rounded-full mr-2 mb-2">Active Discussions</span>
          <span className="inline-block bg-blue-900/20 text-blue-400 text-xs px-3 py-1 rounded-full mr-2 mb-2">Expert Moderators</span>
          <span className="inline-block bg-yellow-900/20 text-yellow-400 text-xs px-3 py-1 rounded-full mr-2 mb-2">Exclusive Resources</span>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium mt-2">Join Community</button>
      </div>
    </main>
  );
} 