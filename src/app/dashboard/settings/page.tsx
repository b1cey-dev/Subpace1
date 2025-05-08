'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useUser, useAuth } from "@clerk/nextjs";

export default function SettingsPage() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('profile');
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress || "");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [timeZone, setTimeZone] = useState("Pacific Time (PT)");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImageUrl, setProfileImageUrl] = useState(user?.imageUrl || "");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [username, setUsername] = useState(user?.unsafeMetadata?.username || '');
  const [usernameAvailable, setUsernameAvailable] = useState<null | boolean>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState('');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['profile', 'community', 'integrations', 'billing', 'notifications', 'security'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.primaryEmailAddress?.emailAddress || "");
      setBio(typeof user.unsafeMetadata?.bio === 'string' ? user.unsafeMetadata.bio : "");
      setLocation(typeof user.unsafeMetadata?.location === 'string' ? user.unsafeMetadata.location : "");
      setTimeZone(typeof user.unsafeMetadata?.timeZone === 'string' ? user.unsafeMetadata.timeZone : "Pacific Time (PT)");
      setTwitter(typeof user.unsafeMetadata?.twitter === 'string' ? user.unsafeMetadata.twitter : "");
      setLinkedin(typeof user.unsafeMetadata?.linkedin === 'string' ? user.unsafeMetadata.linkedin : "");
      setWebsite(typeof user.unsafeMetadata?.website === 'string' ? user.unsafeMetadata.website : "");
      setProfileImageUrl(user.imageUrl || "");
    }
  }, [user]);

  useEffect(() => {
    if (user?.unsafeMetadata?.username) {
      setUsername(user.unsafeMetadata.username);
    }
  }, [user?.unsafeMetadata?.username]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setIsSaving(true);
    try {
      await user.setProfileImage({ file });
      await user.reload();
      setProfileImageUrl(user.imageUrl || "");
      alert("Profile image updated!");
    } catch (error) {
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      await user.update({
        unsafeMetadata: {
          bio,
          location,
          timeZone,
          twitter,
          linkedin,
          website,
        },
      });
      await user.reload();
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Username availability check
  const checkUsername = async (value: string) => {
    setUsername(value);
    setUsernameAvailable(null);
    setUsernameMessage('');
    if (!value) return;
    setCheckingUsername(true);
    const res = await fetch(`/api/check-username?username=${encodeURIComponent(value)}`);
    const data = await res.json();
    setUsernameAvailable(data.available);
    setUsernameMessage(data.available ? 'Username is available!' : 'Username is taken.');
    setCheckingUsername(false);
  };

  // Save username to Clerk
  const handleSaveUsername = async () => {
    if (!user || !usernameAvailable || !username) return;
    setIsSaving(true);
    try {
      await user.update({ unsafeMetadata: { ...user.unsafeMetadata, username } });
      await user.reload();
      setUsernameMessage('Username saved!');
    } catch (error) {
      setUsernameMessage('Failed to save username.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Success Modal (no backdrop) */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-[#18181b] border border-[#232229] rounded-xl p-8 shadow-xl flex flex-col items-center pointer-events-auto">
            <div className="text-green-400 text-4xl mb-2">
              <i className="fas fa-check-circle"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Profile Updated!</h3>
            <p className="text-gray-400 mb-4">Your profile changes have been saved successfully.</p>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition"
              onClick={() => setShowSuccessModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <p className="text-gray-400 text-sm">Manage your profile, community settings, and subscription</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 bg-[#111113] border border-[#232229] rounded-xl h-fit">
          <div className="p-4 border-b border-[#232229]">
            <h2 className="text-sm font-medium">Settings</h2>
          </div>
          <div className="p-2">
            <Link
              href="/dashboard/settings?tab=profile"
              className={`flex items-center w-full px-3 py-2 text-sm rounded-lg ${
                activeTab === 'profile' 
                  ? 'bg-[#161618] text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-[#161618]'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              <i className="fas fa-user-circle mr-3 text-lg"></i>
              Profile
            </Link>
            
            <Link
              href="/dashboard/settings?tab=community"
              className={`flex items-center w-full px-3 py-2 text-sm rounded-lg ${
                activeTab === 'community' 
                  ? 'bg-[#161618] text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-[#161618]'
              }`}
              onClick={() => setActiveTab('community')}
            >
              <i className="fas fa-users mr-3 text-lg"></i>
              Community
            </Link>
            
            <Link
              href="/dashboard/settings?tab=integrations"
              className={`flex items-center w-full px-3 py-2 text-sm rounded-lg ${
                activeTab === 'integrations' 
                  ? 'bg-[#161618] text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-[#161618]'
              }`}
              onClick={() => setActiveTab('integrations')}
            >
              <i className="fas fa-plug mr-3 text-lg"></i>
              Integrations
            </Link>
            
            <Link
              href="/dashboard/settings?tab=billing"
              className={`flex items-center w-full px-3 py-2 text-sm rounded-lg ${
                activeTab === 'billing' 
                  ? 'bg-[#161618] text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-[#161618]'
              }`}
              onClick={() => setActiveTab('billing')}
            >
              <i className="fas fa-credit-card mr-3 text-lg"></i>
              Billing
            </Link>
            
            <Link
              href="/dashboard/settings?tab=notifications"
              className={`flex items-center w-full px-3 py-2 text-sm rounded-lg ${
                activeTab === 'notifications' 
                  ? 'bg-[#161618] text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-[#161618]'
              }`}
              onClick={() => setActiveTab('notifications')}
            >
              <i className="fas fa-bell mr-3 text-lg"></i>
              Notifications
            </Link>
            
            <Link
              href="/dashboard/settings?tab=security"
              className={`flex items-center w-full px-3 py-2 text-sm rounded-lg ${
                activeTab === 'security' 
                  ? 'bg-[#161618] text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-[#161618]'
              }`}
              onClick={() => setActiveTab('security')}
            >
              <i className="fas fa-shield-alt mr-3 text-lg"></i>
              Security
            </Link>
          </div>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-[#111113] border border-[#232229] rounded-xl p-6">
              <h2 className="text-lg font-medium mb-6">Profile Settings</h2>
              
              <div className="flex flex-col md:flex-row items-start mb-8">
                <div className="w-full md:w-auto mr-8 mb-6 md:mb-0">
                  <div className="w-24 h-24 bg-[#232229] rounded-full mb-4 flex items-center justify-center overflow-hidden">
                    {profileImageUrl ? (
                      <img src={profileImageUrl} alt="Profile" className="w-24 h-24 object-cover rounded-full" />
                    ) : (
                      <i className="fas fa-user text-gray-500 text-3xl"></i>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                  />
                  <button
                    className="w-full bg-[#161618] text-sm border border-[#232229] rounded py-2 px-3 hover:bg-[#1a1a1c]"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Uploading...' : 'Upload Image'}
                  </button>
                </div>
                
                <div className="flex-1 w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">First Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-[#161618] border border-[#232229] rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500"
                        value={String(firstName)}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-[#161618] border border-[#232229] rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500"
                        value={String(lastName)}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full bg-[#161618] border border-[#232229] rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500"
                      value={String(email)}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                    <textarea 
                      className="w-full bg-[#161618] border border-[#232229] rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500 h-24"
                      value={String(bio)}
                      onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                      <input 
                        type="text" 
                        className="w-full bg-[#161618] border border-[#232229] rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500"
                        value={String(location)}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Time Zone</label>
                      <select 
                        className="w-full bg-[#161618] border border-[#232229] rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500"
                        value={String(timeZone)}
                        onChange={(e) => setTimeZone(e.target.value)}
                      >
                        <option>Pacific Time (PT)</option>
                        <option>Mountain Time (MT)</option>
                        <option>Central Time (CT)</option>
                        <option>Eastern Time (ET)</option>
                      </select>
                    </div>
                  </div>
                  
                  <button 
                    className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition"
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
              
              <div className="border-t border-[#232229] pt-6 mt-6">
                <h3 className="text-base font-medium mb-4">Social Profiles</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-[#3b5998]/10 flex items-center justify-center mr-3">
                      <i className="fab fa-twitter text-[#1DA1F2]"></i>
                    </div>
                    <input 
                      type="text" 
                      className="flex-1 bg-[#161618] border border-[#232229] rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500"
                      placeholder="Twitter profile URL"
                      value={String(twitter)}
                      onChange={(e) => setTwitter(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-[#3b5998]/10 flex items-center justify-center mr-3">
                      <i className="fab fa-linkedin-in text-[#0077B5]"></i>
                    </div>
                    <input 
                      type="text" 
                      className="flex-1 bg-[#161618] border border-[#232229] rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500"
                      placeholder="LinkedIn profile URL"
                      value={String(linkedin)}
                      onChange={(e) => setLinkedin(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-[#3b5998]/10 flex items-center justify-center mr-3">
                      <i className="fas fa-globe text-[#6c757d]"></i>
                    </div>
                    <input 
                      type="text" 
                      className="flex-1 bg-[#161618] border border-[#232229] rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500"
                      placeholder="Website URL"
                      value={String(website)}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Community Tab */}
          {activeTab === 'community' && (
            <div className="bg-[#111113] border border-[#232229] rounded-xl p-6">
              <h2 className="text-lg font-medium mb-6">Community Settings</h2>
              
              <div className="mb-6">
                <h3 className="text-base font-medium mb-4">Community Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Community Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-[#161618] border border-[#232229] rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500"
                      value={String(firstName || username || '')}
                      onChange={e => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    {/* Username & Community Link */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-400 mb-1">Your Community Link</label>
                      <div className="flex items-center">
                        <span className="bg-[#0d0d0f] border border-[#232229] rounded-l-md py-2 px-3 text-sm text-gray-400">subpace.com/c/</span>
                        <input
                          type="text"
                          className="flex-1 bg-[#161618] border border-[#232229] border-l-0 rounded-r-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500"
                          placeholder="Choose a username"
                          value={String(username || '')}
                          onChange={e => checkUsername(e.target.value)}
                          disabled={isSaving}
                        />
                        <button
                          className="bg-purple-600 text-white px-3 py-2 rounded-md text-sm hover:bg-purple-700 ml-2"
                          onClick={handleSaveUsername}
                          disabled={!usernameAvailable || isSaving || !username}
                        >
                          {isSaving ? 'Saving...' : 'Save'}
                        </button>
                      </div>
                      {checkingUsername && <div className="text-xs text-gray-400 mt-1">Checking...</div>}
                      {usernameMessage && (
                        <div className={`text-xs mt-1 ${usernameAvailable ? 'text-green-400' : 'text-red-400'}`}>{usernameMessage}</div>
                      )}
                      {username && usernameAvailable && (
                        <div className="flex items-center space-x-2 mt-2">
                          <input
                            className="w-full bg-[#161618] border border-[#232229] rounded-md py-2 px-3 text-sm text-gray-400"
                            value={`subpace.com/c/${String(username)}`}
                            readOnly
                          />
                          <button
                            className="bg-purple-600 text-white px-3 py-2 rounded-md text-sm hover:bg-purple-700"
                            onClick={() => navigator.clipboard.writeText(`subpace.com/c/${String(username)}`)}
                          >
                            Copy
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Community Profile Preview */}
                <div className="mt-8">
                  <h4 className="text-base font-medium mb-2 text-gray-300">Preview Public Community Profile</h4>
                  <div className="bg-[#18181b] border border-[#232229] rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="w-24 h-24 rounded-lg bg-[#232229] flex items-center justify-center mb-4 md:mb-0">
                      {/* Community logo preview (placeholder) */}
                      <i className="fas fa-users text-gray-500 text-4xl"></i>
                    </div>
                    <div className="flex-1 w-full">
                      <div className="text-2xl font-bold text-white mb-1">{String(firstName || username || 'Community Name')}</div>
                      <div className="text-gray-400 mb-2">{String(bio || 'A short description about your community will appear here.')}</div>
                      {/* Overview Stats */}
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
                      {/* Features/Highlights */}
                      <div className="mb-4">
                        <span className="inline-block bg-green-900/20 text-green-400 text-xs px-3 py-1 rounded-full mr-2 mb-2">Active Discussions</span>
                        <span className="inline-block bg-blue-900/20 text-blue-400 text-xs px-3 py-1 rounded-full mr-2 mb-2">Expert Moderators</span>
                        <span className="inline-block bg-yellow-900/20 text-yellow-400 text-xs px-3 py-1 rounded-full mr-2 mb-2">Exclusive Resources</span>
                      </div>
                      {/* Public Link and CTA */}
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-xs bg-[#232229] text-gray-400 rounded px-2 py-1">{`subpace.com/c/${String(username || 'username')}`}</span>
                        <button
                          className="text-xs text-purple-400 hover:text-purple-300"
                          onClick={() => navigator.clipboard.writeText(`subpace.com/c/${String(username)}`)}
                          disabled={!username}
                        >
                          Copy Link
                        </button>
                      </div>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium opacity-60 cursor-not-allowed" disabled>
                        Join Community
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Community Profile Preview */}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">Community Description</label>
                <textarea 
                  className="w-full bg-[#161618] border border-[#232229] rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500 h-24"
                  defaultValue="A community for digital marketers to share strategies, tools, and resources to grow their online presence and improve campaign performance."
                ></textarea>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-1">Community Logo</label>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-[#232229] rounded-lg mr-4 flex items-center justify-center">
                    <i className="fas fa-image text-gray-500 text-xl"></i>
                  </div>
                  <button className="bg-[#161618] text-sm border border-[#232229] rounded py-2 px-3 hover:bg-[#1a1a1c]">
                    Upload Logo
                  </button>
                </div>
              </div>
              
              <div className="border-t border-[#232229] pt-6 mb-6">
                <h3 className="text-base font-medium mb-4">Privacy & Access</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Community Visibility</h4>
                      <p className="text-xs text-gray-400 mt-1">Control who can discover and join your community</p>
                    </div>
                    <select className="bg-[#161618] border border-[#232229] rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500 w-32">
                      <option>Public</option>
                      <option>Private</option>
                      <option>Invite Only</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Member Approval</h4>
                      <p className="text-xs text-gray-400 mt-1">Approve members before they can join</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-[#232229]">
                      <input type="checkbox" id="toggle-approval" className="sr-only" />
                      <span className="block absolute left-1 top-1 bg-purple-600 w-4 h-4 rounded-full transition-transform"></span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Guest Viewing</h4>
                      <p className="text-xs text-gray-400 mt-1">Allow non-members to view content</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-[#232229]">
                      <input type="checkbox" id="toggle-guest" className="sr-only" />
                      <span className="block absolute left-1 top-1 bg-gray-400 w-4 h-4 rounded-full transition-transform"></span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition">
                Save Community Settings
              </button>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="bg-[#111113] border border-[#232229] rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium">Billing & Subscription</h2>
                <span className="px-3 py-1 bg-purple-600 text-white text-xs rounded-full">Pro Plan</span>
              </div>
              
              <div className="bg-[#161618] border border-[#232229] rounded-xl p-5 mb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-medium mb-1">Pro Plan</h3>
                    <p className="text-sm text-gray-400">Billed monthly</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">$29/month</div>
                    <p className="text-xs text-gray-400">Next billing on June 15, 2023</p>
                  </div>
                </div>
                
                <div className="border-t border-[#232229] mt-4 pt-4">
                  <h4 className="text-sm font-medium mb-2">Includes:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <i className="fas fa-check text-green-400 mr-2"></i>
                      Unlimited members
                    </li>
                    <li className="flex items-center text-sm">
                      <i className="fas fa-check text-green-400 mr-2"></i>
                      Advanced analytics
                    </li>
                    <li className="flex items-center text-sm">
                      <i className="fas fa-check text-green-400 mr-2"></i>
                      Custom branding
                    </li>
                    <li className="flex items-center text-sm">
                      <i className="fas fa-check text-green-400 mr-2"></i>
                      API access
                    </li>
                  </ul>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#232229]">
                  <button className="text-sm text-gray-400 hover:text-white">
                    Cancel Subscription
                  </button>
                  <button className="bg-[#232229] text-sm py-2 px-4 rounded-md hover:bg-[#2a2a2c]">
                    Change Plan
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-base font-medium mb-4">Payment Method</h3>
                
                <div className="flex items-center p-4 border border-[#232229] rounded-lg mb-4">
                  <div className="w-10 h-6 bg-[#232229] rounded mr-3 flex items-center justify-center">
                    <i className="fab fa-cc-visa text-blue-400"></i>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm">Visa ending in 4242</span>
                    <div className="text-xs text-gray-400">Expires 08/2025</div>
                  </div>
                  <button className="text-xs text-gray-400 hover:text-white">
                    Edit
                  </button>
                </div>
                
                <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center">
                  <i className="fas fa-plus-circle mr-2"></i>
                  Add Payment Method
                </button>
              </div>
              
              <div>
                <h3 className="text-base font-medium mb-4">Billing History</h3>
                <div className="overflow-hidden rounded-lg border border-[#232229]">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#0d0d0f]">
                        <th className="text-left p-3 text-xs font-medium text-gray-400">DATE</th>
                        <th className="text-left p-3 text-xs font-medium text-gray-400">DESCRIPTION</th>
                        <th className="text-right p-3 text-xs font-medium text-gray-400">AMOUNT</th>
                        <th className="text-right p-3 text-xs font-medium text-gray-400">INVOICE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { date: 'May 15, 2023', description: 'Pro Plan (Monthly)', amount: '$29.00', status: 'Paid' },
                        { date: 'Apr 15, 2023', description: 'Pro Plan (Monthly)', amount: '$29.00', status: 'Paid' },
                        { date: 'Mar 15, 2023', description: 'Pro Plan (Monthly)', amount: '$29.00', status: 'Paid' },
                      ].map((invoice, index) => (
                        <tr key={index} className="border-t border-[#232229]">
                          <td className="p-3 text-sm">{invoice.date}</td>
                          <td className="p-3 text-sm">{invoice.description}</td>
                          <td className="p-3 text-sm text-right">{invoice.amount}</td>
                          <td className="p-3 text-sm text-right">
                            <button className="text-purple-400 hover:text-purple-300">
                              <i className="fas fa-download"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {(activeTab === 'integrations' || activeTab === 'notifications' || activeTab === 'security') && (
            <div className="bg-[#111113] border border-[#232229] rounded-xl p-6 flex items-center justify-center h-64">
              <div className="text-center">
                <div className="text-4xl text-gray-700 mb-2">
                  <i className={`fas fa-${
                    activeTab === 'integrations' ? 'plug' : 
                    activeTab === 'notifications' ? 'bell' : 'shield-alt'
                  }`}></i>
                </div>
                <h3 className="text-lg font-medium mb-2">{
                  activeTab === 'integrations' ? 'Integrations' : 
                  activeTab === 'notifications' ? 'Notifications' : 'Security'
                } Settings</h3>
                <p className="text-sm text-gray-400">This section is under development</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 