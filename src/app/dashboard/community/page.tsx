'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function CommunityPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('members');
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();
  const [newPost, setNewPost] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  
  const discordConnected = searchParams.get('discord') === 'connected';

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['members', 'posts', 'integrations'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    if (activeTab === 'members') {
      setLoading(true);
      fetch('/api/community/members')
        .then(res => res.json())
        .then(data => {
          setMembers(Array.isArray(data.members) ? data.members : []);
          setLoading(false);
        })
        .catch(() => {
          setMembers([]);
          setLoading(false);
        });
    }
  }, [activeTab]);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    setSubmitting(true);
    const token = await getToken();
    const res = await fetch('/api/community/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ content: newPost }),
    });
    if (res.ok) {
      setNewPost('');
      const data = await res.json();
      setPosts([data.post, ...posts]);
    }
    setSubmitting(false);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Community Management</h1>
        <p className="text-gray-400 text-sm">Manage your members, posts, and community integrations</p>
      </div>

      {/* Community Tabs */}
      <div className="flex border-b border-[#232229] mb-6">
        <Link 
          href="/dashboard/community?tab=members"
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'members'
              ? 'border-purple-500 text-purple-400'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('members')}
        >
          Members
        </Link>
        <Link 
          href="/dashboard/community?tab=posts"
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'posts'
              ? 'border-purple-500 text-purple-400'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('posts')}
        >
          Posts & Content
        </Link>
        <Link 
          href="/dashboard/community?tab=integrations"
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'integrations'
              ? 'border-purple-500 text-purple-400'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('integrations')}
        >
          Integrations
        </Link>
      </div>

      {/* Members Tab Content */}
      {activeTab === 'members' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search members..."
                  className="bg-[#161618] border border-[#232229] rounded-md py-2 pl-10 pr-4 text-sm w-64 focus:outline-none focus:border-purple-500"
                />
                <i className="fas fa-search text-gray-400 absolute left-3 top-2.5 text-sm"></i>
              </div>
              <select className="bg-[#161618] border border-[#232229] rounded-md py-2 px-3 text-sm text-gray-300">
                <option>All members</option>
                <option>Admins</option>
                <option>Moderators</option>
                <option>New members</option>
              </select>
            </div>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition flex items-center">
              <i className="fas fa-user-plus mr-2"></i>
              Add Member
            </button>
          </div>

          {/* Members Table */}
          <div className="bg-[#111113] border border-[#232229] rounded-xl overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-400">Loading members...</div>
            ) : members.length === 0 ? (
              <div className="p-8 text-center text-gray-400">No members found.</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#232229] bg-[#0d0d0f]">
                    <th className="text-left p-4 text-xs font-medium text-gray-400">NAME</th>
                    <th className="text-left p-4 text-xs font-medium text-gray-400">ROLE</th>
                    <th className="text-left p-4 text-xs font-medium text-gray-400">JOINED</th>
                    <th className="text-left p-4 text-xs font-medium text-gray-400">STATUS</th>
                    <th className="text-right p-4 text-xs font-medium text-gray-400">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member, index) => (
                    <tr key={member.id} className="border-b border-[#232229] last:border-0 hover:bg-[#161618]">
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#232229] mr-3 flex items-center justify-center">
                            <i className="fas fa-user text-gray-500 text-xs"></i>
                          </div>
                          <div>
                            <div className="text-sm font-medium">{member.name}</div>
                            <div className="text-xs text-gray-400">{member.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400`}>
                          {member.role}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-300">{member.created_at ? new Date(member.created_at).toLocaleDateString() : ''}</td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded-full bg-green-900/20 text-green-400`}>
                          Active
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-gray-400 hover:text-white px-2">
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button className="text-gray-400 hover:text-white px-2">
                          <i className="fas fa-ellipsis-v"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="p-4 flex items-center justify-between text-sm">
              <div className="text-gray-400">Showing 7 of 245 members</div>
              <div className="flex items-center space-x-2">
                <button className="w-8 h-8 flex items-center justify-center rounded bg-[#161618] border border-[#232229] text-gray-400 hover:text-white">
                  <i className="fas fa-chevron-left text-xs"></i>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-purple-600 text-white">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-[#161618] border border-[#232229] text-gray-400 hover:text-white">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-[#161618] border border-[#232229] text-gray-400 hover:text-white">3</button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-[#161618] border border-[#232229] text-gray-400 hover:text-white">
                  <i className="fas fa-chevron-right text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Posts & Content Tab */}
      {activeTab === 'posts' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search content..."
                  className="bg-[#161618] border border-[#232229] rounded-md py-2 pl-10 pr-4 text-sm w-64 focus:outline-none focus:border-purple-500"
                />
                <i className="fas fa-search text-gray-400 absolute left-3 top-2.5 text-sm"></i>
              </div>
              <select className="bg-[#161618] border border-[#232229] rounded-md py-2 px-3 text-sm text-gray-300">
                <option>All content</option>
                <option>Posts</option>
                <option>Announcements</option>
                <option>Resources</option>
              </select>
            </div>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition flex items-center">
              <i className="fas fa-plus mr-2"></i>
              Create Post
            </button>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Render posts here from real data source */}
          </div>

          {/* Recent Comments */}
          <div className="bg-[#111113] border border-[#232229] rounded-xl p-5">
            <h3 className="font-medium mb-4">Recent Comments</h3>
            <div className="space-y-4">
              {/* Render recent comments here from real data source */}
            </div>
          </div>
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div>
          {discordConnected && (
            <div className="mb-4 p-4 bg-green-900/20 text-green-400 rounded-lg">
              Discord connected successfully!
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#111113] border border-[#232229] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-[#5865F2]/10 flex items-center justify-center mr-3">
                    <i className="fab fa-discord text-[#5865F2] text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-medium">Discord</h3>
                    <p className="text-xs text-gray-400">{discordConnected ? 'Connected' : 'Not connected'}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full ${discordConnected ? 'bg-green-900/20 text-green-400' : 'bg-gray-800 text-gray-400'} text-xs`}>
                  {discordConnected ? 'Active' : 'Inactive'}
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-4">Import members, sync roles, and share content between Subpace and Discord.</p>
              <div className="flex justify-between items-center">
                <button
                  className="text-sm text-purple-400 hover:text-purple-300 flex items-center"
                  onClick={() => window.location.href = '/api/integrations/discord/authorize'}
                  disabled={discordConnected}
                >
                  <span>{discordConnected ? 'Connected' : 'Connect Discord'}</span>
                  <i className="fab fa-discord ml-1.5 text-xl"></i>
                </button>
                {discordConnected && (
                  <button className="text-sm text-gray-400 hover:text-gray-300">Disconnect</button>
                )}
              </div>
            </div>

            <div className="bg-[#111113] border border-[#232229] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center mr-3">
                    <i className="fab fa-whatsapp text-[#25D366] text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-medium">WhatsApp</h3>
                    <p className="text-xs text-gray-400">Not connected</p>
                  </div>
                </div>
                <div className="px-2 py-1 rounded-full bg-gray-800 text-gray-400 text-xs">Inactive</div>
              </div>
              <p className="text-sm text-gray-300 mb-4">Connect your WhatsApp groups to Subpace for seamless community management.</p>
              <button className="w-full py-2 text-sm bg-[#161618] border border-[#232229] rounded-md hover:bg-[#1a1a1c] transition">
                Connect WhatsApp
              </button>
            </div>

            <div className="bg-[#111113] border border-[#232229] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-[#4A154B]/10 flex items-center justify-center mr-3">
                    <i className="fab fa-slack text-[#4A154B] text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-medium">Slack</h3>
                    <p className="text-xs text-gray-400">Connected</p>
                  </div>
                </div>
                <div className="px-2 py-1 rounded-full bg-green-900/20 text-green-400 text-xs">Active</div>
              </div>
              <p className="text-sm text-gray-300 mb-4">Sync channels, automate notifications, and manage community from Slack.</p>
              <div className="flex justify-between items-center">
                <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center">
                  <span>Configure</span>
                  <i className="fas fa-cog ml-1.5 text-xs"></i>
                </button>
                <button className="text-sm text-gray-400 hover:text-gray-300">Disconnect</button>
              </div>
            </div>
          </div>

          {/* Other Integration Options */}
          <h3 className="font-medium mb-4">More Integration Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Notion', icon: 'fab fa-neos', color: 'text-gray-200', bgColor: 'bg-gray-700/10' },
              { name: 'GitHub', icon: 'fab fa-github', color: 'text-gray-200', bgColor: 'bg-gray-700/10' },
              { name: 'Zapier', icon: 'fas fa-bolt', color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
              { name: 'Twitter', icon: 'fab fa-twitter', color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
              { name: 'Stripe', icon: 'fab fa-stripe-s', color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
              { name: 'Google', icon: 'fab fa-google', color: 'text-red-400', bgColor: 'bg-red-500/10' },
              { name: 'Mailchimp', icon: 'fas fa-envelope', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10' },
              { name: 'Trello', icon: 'fab fa-trello', color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
            ].map((integration, index) => (
              <div key={index} className="bg-[#111113] border border-[#232229] rounded-xl p-4 hover:border-[#36343e] transition cursor-pointer">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-lg ${integration.bgColor} flex items-center justify-center mr-3`}>
                    <i className={`${integration.icon} ${integration.color} text-sm`}></i>
                  </div>
                  <span className="text-sm font-medium">{integration.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
} 