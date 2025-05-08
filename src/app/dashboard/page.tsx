'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser, useClerk } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface FeatureAnalytics {
  users: number;
  engagement: number;
  growth: number;
  views: number;
}

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  status: "Live" | "Scheduled" | "In Development";
  statusBg: string;
  statusColor: string;
  progress: number;
  analytics?: FeatureAnalytics;
  launchDate?: string;
  details?: string;
  enabled?: boolean;
  visibilityLevel?: "All Members" | "Premium Only" | "Admins Only";
  settings?: {
    notifications: boolean;
    autoPublish: boolean;
    requireApproval: boolean;
    maxUsagePerDay?: number;
  };
}

interface Event {
  id: number;
  title: string;
  type: string;
  typeColor: string;
  date: string;
  formattedDate: string;
  time: string;
  description: string;
  attendees: number;
  host?: string;
  location?: string;
  isRegistered?: boolean;
  isPremium?: boolean;
}

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [activeTab, setActiveTab] = useState('overview');
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showConfigureModal, setShowConfigureModal] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showDisableConfirmModal, setShowDisableConfirmModal] = useState(false);
  const [currentFeature, setCurrentFeature] = useState<Feature | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: 1,
      title: "Bonus Content",
      description: "Weekly exclusive content for community members",
      icon: "bolt",
      iconBg: "bg-yellow-500/10",
      iconColor: "text-yellow-400",
      status: "Live",
      statusBg: "bg-green-900/20",
      statusColor: "text-green-400",
      progress: 100,
      enabled: true,
      visibilityLevel: "All Members",
      settings: {
        notifications: true,
        autoPublish: true,
        requireApproval: false,
        maxUsagePerDay: 0
      },
      analytics: {
        users: 328,
        engagement: 76,
        growth: 12,
        views: 1456
      }
    },
    {
      id: 2,
      title: "1-on-1 Access",
      description: "Personal coaching sessions with community leaders",
      icon: "user-friends",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      status: "Live",
      statusBg: "bg-green-900/20",
      statusColor: "text-green-400",
      progress: 100,
      enabled: true,
      visibilityLevel: "Premium Only",
      settings: {
        notifications: true,
        autoPublish: false,
        requireApproval: true,
        maxUsagePerDay: 3
      },
      analytics: {
        users: 124,
        engagement: 92,
        growth: 18,
        views: 845
      }
    },
    {
      id: 3,
      title: "Weekly Livestreams",
      description: "Interactive sessions every Wednesday at 3PM",
      icon: "video",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400",
      status: "Scheduled",
      statusBg: "bg-yellow-900/20", 
      statusColor: "text-yellow-400",
      progress: 70,
      launchDate: "May 28, 2023",
      details: "Our weekly livestreams will feature community experts discussing trending topics."
    },
    {
      id: 4,
      title: "Community Challenges",
      description: "Monthly themed activities with awards and recognition",
      icon: "trophy",
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-400",
      status: "In Development",
      statusBg: "bg-blue-900/20",
      statusColor: "text-blue-400",
      progress: 35,
      details: "Friendly competitions that encourage engagement and creativity within the community."
    }
  ]);

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Community Building Masterclass",
      type: "WORKSHOP",
      typeColor: "text-purple-400",
      date: "2023-05-15",
      formattedDate: "May 15",
      time: "3:00 PM EST",
      description: "Learn strategies to engage your audience effectively",
      attendees: 12,
      host: "Sarah Johnson",
      location: "Zoom",
      isRegistered: false
    },
    {
      id: 2,
      title: "Monetization Strategies",
      type: "WEBINAR",
      typeColor: "text-blue-400",
      date: "2023-05-22",
      formattedDate: "May 22",
      time: "1:00 PM EST",
      description: "Discover new ways to monetize your community",
      attendees: 8,
      host: "Michael Chen",
      location: "Google Meet",
      isRegistered: true
    },
    {
      id: 3,
      title: "Content Creation Workshop",
      type: "WORKSHOP",
      typeColor: "text-purple-400",
      date: "2023-05-28",
      formattedDate: "May 28",
      time: "4:00 PM EST",
      description: "Learn how to create engaging content for your audience",
      attendees: 15,
      host: "Alex Rivera",
      location: "Zoom",
      isRegistered: false,
      isPremium: true
    },
    {
      id: 4,
      title: "Community Q&A Session",
      type: "LIVE",
      typeColor: "text-green-400",
      date: "2023-06-03",
      formattedDate: "Jun 3",
      time: "5:30 PM EST",
      description: "Open discussion about community management",
      attendees: 6,
      host: "Team Subpace",
      location: "Discord",
      isRegistered: false
    },
    {
      id: 5,
      title: "Analytics Deep Dive",
      type: "WEBINAR",
      typeColor: "text-blue-400",
      date: "2023-06-10",
      formattedDate: "Jun 10",
      time: "2:00 PM EST",
      description: "Understanding your community metrics and growth patterns",
      attendees: 9,
      host: "Emma Wilson",
      location: "Zoom",
      isRegistered: false,
      isPremium: true
    }
  ]);

  const [stats, setStats] = useState<{
    totalMembers: number;
    activeUsers: number;
    revenue: number;
    newSignups: number;
  } | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [recentMembers, setRecentMembers] = useState<any[]>([]);

  useEffect(() => {
    // Clear any onboarding/demo data for a fresh start
    localStorage.removeItem("subpace_user");
    // Fetch real stats from API
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

  const handleEditClick = (feature: Feature) => {
    setCurrentFeature(feature);
    setShowEditModal(true);
  };

  const handleManageClick = (feature: Feature) => {
    setCurrentFeature(feature);
    setShowManageModal(true);
  };
  
  const handleAnalyticsClick = (feature: Feature) => {
    setCurrentFeature(feature);
    setShowAnalyticsModal(true);
  };

  const handleConfigureClick = () => {
    setShowManageModal(false);
    setShowConfigureModal(true);
  };

  const handleAccessClick = () => {
    setShowManageModal(false);
    setShowAccessModal(true);
  };

  const handleDisableClick = () => {
    setShowManageModal(false);
    setShowDisableConfirmModal(true);
  };

  const handleSaveSettings = () => {
    if (!currentFeature) return;
    
    // Create a deep copy of the features array
    const updatedFeatures = features.map(f => {
      if (f.id === currentFeature.id) {
        return { ...currentFeature };
      }
      return f;
    });
    
    setFeatures(updatedFeatures);
    setShowConfigureModal(false);
    setShowAccessModal(false);
    setShowDisableConfirmModal(false);
  };
  
  const handleDisableFeature = () => {
    if (!currentFeature) return;
    
    const updatedFeatures = features.map(f => {
      if (f.id === currentFeature.id) {
        return { 
          ...currentFeature, 
          enabled: false,
          status: "In Development" as const,
          statusBg: "bg-blue-900/20",
          statusColor: "text-blue-400",
          progress: 0
        };
      }
      return f;
    });
    
    setFeatures(updatedFeatures);
    setShowDisableConfirmModal(false);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowManageModal(false);
    setShowAnalyticsModal(false);
    setShowConfigureModal(false);
    setShowAccessModal(false);
    setShowDisableConfirmModal(false);
    setCurrentFeature(null);
  };

  const handleSettingChange = (settingName: string, value: any) => {
    if (!currentFeature || !currentFeature.settings) return;
    
    setCurrentFeature({
      ...currentFeature,
      settings: {
        ...currentFeature.settings,
        [settingName]: value
      }
    });
  };

  const handleVisibilityChange = (visibility: Feature['visibilityLevel']) => {
    if (!currentFeature) return;
    
    setCurrentFeature({
      ...currentFeature,
      visibilityLevel: visibility
    });
  };

  const handleEventClick = (event: Event) => {
    setCurrentEvent(event);
    setShowEventModal(true);
  };

  const handleEventRegister = (eventId: number) => {
    const updatedEvents = events.map(event => {
      if (event.id === eventId) {
        return { ...event, isRegistered: !event.isRegistered, attendees: event.isRegistered ? event.attendees - 1 : event.attendees + 1 };
      }
      return event;
    });
    setEvents(updatedEvents);
    
    // If we're in the modal, update the current event too
    if (currentEvent && currentEvent.id === eventId) {
      setCurrentEvent({
        ...currentEvent,
        isRegistered: !currentEvent.isRegistered,
        attendees: currentEvent.isRegistered ? currentEvent.attendees - 1 : currentEvent.attendees + 1
      });
    }
  };

  const toggleShowAllEvents = () => {
    setShowAllEvents(!showAllEvents);
  };

  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const displayedEvents = showAllEvents ? sortedEvents : sortedEvents.slice(0, 2);

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
          <div className="h-64">
            {/* Enhanced chart visualization */}
            {stats && stats.totalMembers <= 1 ? (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-lg">No community activity yet. Start inviting members!</div>
            ) : (
              <div className="w-full h-full bg-[#0d0d0f] rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-600 rounded-full mr-2"></div>
                      <span className="text-xs text-gray-400">Posts</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-xs text-gray-400">Comments</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">Total: 1,248 interactions</div>
                </div>

                <div className="relative h-48 mt-4">
                  {/* Grid lines */}
                  <div className="absolute left-0 right-0 top-0 border-t border-dashed border-gray-800 h-px"></div>
                  <div className="absolute left-0 right-0 top-1/4 border-t border-dashed border-gray-800 h-px"></div>
                  <div className="absolute left-0 right-0 top-2/4 border-t border-dashed border-gray-800 h-px"></div>
                  <div className="absolute left-0 right-0 top-3/4 border-t border-dashed border-gray-800 h-px"></div>
                  <div className="absolute left-0 right-0 bottom-0 border-t border-gray-800 h-px"></div>
                  
                  {/* Data labels on y-axis */}
                  <div className="absolute -left-2 top-0 text-[10px] text-gray-500 transform -translate-y-1/2">200</div>
                  <div className="absolute -left-2 top-1/4 text-[10px] text-gray-500 transform -translate-y-1/2">150</div>
                  <div className="absolute -left-2 top-2/4 text-[10px] text-gray-500 transform -translate-y-1/2">100</div>
                  <div className="absolute -left-2 top-3/4 text-[10px] text-gray-500 transform -translate-y-1/2">50</div>
                  <div className="absolute -left-2 bottom-0 text-[10px] text-gray-500 transform -translate-y-1/2">0</div>

                  {/* Chart bars - Posts */}
                  <div className="absolute bottom-0 left-[5%] w-3 h-[30%] bg-purple-600 rounded-t-sm"></div>
                  <div className="absolute bottom-0 left-[15%] w-3 h-[45%] bg-purple-600 rounded-t-sm"></div>
                  <div className="absolute bottom-0 left-[25%] w-3 h-[65%] bg-purple-600 rounded-t-sm"></div>
                  <div className="absolute bottom-0 left-[35%] w-3 h-[55%] bg-purple-600 rounded-t-sm"></div>
                  <div className="absolute bottom-0 left-[45%] w-3 h-[75%] bg-purple-600 rounded-t-sm"></div>
                  <div className="absolute bottom-0 left-[55%] w-3 h-[50%] bg-purple-600 rounded-t-sm"></div>
                  <div className="absolute bottom-0 left-[65%] w-3 h-[85%] bg-purple-600 rounded-t-sm"></div>
                  
                  {/* Chart bars - Comments */}
                  <div className="absolute bottom-0 left-[9%] w-3 h-[15%] bg-blue-500 rounded-t-sm"></div>
                  <div className="absolute bottom-0 left-[19%] w-3 h-[35%] bg-blue-500 rounded-t-sm"></div>
                  <div className="absolute bottom-0 left-[29%] w-3 h-[25%] bg-blue-500 rounded-t-sm"></div>
                  <div className="absolute bottom-0 left-[39%] w-3 h-[45%] bg-blue-500 rounded-t-sm"></div>
                  <div className="absolute bottom-0 left-[49%] w-3 h-[35%] bg-blue-500 rounded-t-sm"></div>
                  <div className="absolute bottom-0 left-[59%] w-3 h-[30%] bg-blue-500 rounded-t-sm"></div>
                  <div className="absolute bottom-0 left-[69%] w-3 h-[55%] bg-blue-500 rounded-t-sm"></div>

                  {/* X-axis labels (days) */}
                  <div className="absolute left-[7%] bottom-[-20px] text-[10px] text-gray-500">Mon</div>
                  <div className="absolute left-[17%] bottom-[-20px] text-[10px] text-gray-500">Tue</div>
                  <div className="absolute left-[27%] bottom-[-20px] text-[10px] text-gray-500">Wed</div>
                  <div className="absolute left-[37%] bottom-[-20px] text-[10px] text-gray-500">Thu</div>
                  <div className="absolute left-[47%] bottom-[-20px] text-[10px] text-gray-500">Fri</div>
                  <div className="absolute left-[57%] bottom-[-20px] text-[10px] text-gray-500">Sat</div>
                  <div className="absolute left-[67%] bottom-[-20px] text-[10px] text-gray-500">Sun</div>
                </div>

                {/* Metrics below chart */}
                <div className="flex justify-between mt-6 text-xs">
                  <div className="flex space-x-4">
                    <div>
                      <div className="text-gray-400">Peak Activity</div>
                      <div className="font-medium">Sunday (186 interactions)</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Avg. Daily</div>
                      <div className="font-medium">178 interactions</div>
                    </div>
                  </div>
                  <div className="flex items-center text-purple-400">
                    <span className="text-xs mr-1">View detailed analytics</span>
                    <i className="fas fa-arrow-right text-[10px]"></i>
                  </div>
                </div>
              </div>
            )}
          </div>
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
      
      {/* Features & Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#111113] border border-[#232229] rounded-xl p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
              <h2 className="font-semibold text-lg">Community Features</h2>
            </div>
            <Link 
              href="/dashboard/community?tab=integrations" 
              className="bg-purple-600/10 text-purple-400 text-xs px-3 py-1.5 rounded-full border border-purple-600/20 hover:bg-purple-600/20 transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 flex items-center"
            >
              <i className="fas fa-plus mr-1.5"></i> Add Feature
            </Link>
          </div>
          
          <div className="space-y-5">
            {features.map((feature) => (
              <div 
                key={feature.id} 
                className={`relative p-5 ${hoveredFeature === feature.id ? 'bg-[#18181c]' : 'bg-[#161618]'} rounded-lg border border-[#232229] transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5 group overflow-hidden`}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                {/* Status indicator dot - pulsing for scheduled/in development */}
                <div className="absolute top-4 right-4 flex items-center space-x-1.5">
                  <div className={`h-1.5 w-1.5 rounded-full ${feature.status === "Live" ? "bg-green-500" : feature.status === "Scheduled" ? "bg-yellow-500" : "bg-blue-500"} ${feature.status !== "Live" && "animate-pulse"}`}></div>
                </div>

                {/* Progress bar for non-live features */}
                {feature.status !== "Live" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#232229]">
                    <div 
                      className={`h-full ${feature.status === "Scheduled" ? "bg-yellow-500" : "bg-blue-500"}`} 
                      style={{ width: `${feature.progress}%` }}
                    ></div>
                  </div>
                )}

                <div className="flex items-start">
                  <div className={`w-10 h-10 ${feature.iconBg} rounded-lg flex items-center justify-center mr-4 transition-transform duration-300 group-hover:scale-110`}>
                    <i className={`fas fa-${feature.icon} ${feature.iconColor} text-sm`}></i>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm group-hover:text-white transition-colors duration-200">{feature.title}</h3>
                      <div className="flex items-center space-x-3">
                        <button 
                          className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          onClick={() => handleEditClick(feature)}
                          aria-label="Edit feature"
                        >
                          <i className="fas fa-pencil-alt text-xs"></i>
                        </button>
                        <div className={`px-2 py-0.5 text-xs ${feature.statusBg} ${feature.statusColor} rounded-full text-center`}>
                          {feature.status}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-xs mt-1">{feature.description}</p>
                    
                    {/* Feature action buttons that appear on hover */}
                    <div className="mt-3 pt-2 border-t border-[#232229] flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-300 -mb-2 translate-y-2 group-hover:translate-y-0">
                      <div className="text-xs text-gray-400">
                        {feature.status === "Live" ? (
                          <span className="flex items-center">
                            <i className="fas fa-chart-line mr-1.5"></i>
                            Active users: <span className="text-white ml-1">{feature.analytics?.users || 0}</span>
                          </span>
                        ) : feature.status === "Scheduled" ? (
                          <span className="flex items-center">
                            <i className="far fa-calendar-alt mr-1.5"></i>
                            Launch: <span className="text-white ml-1">{feature.launchDate}</span>
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <i className="fas fa-code-branch mr-1.5"></i>
                            Progress: <span className="text-white ml-1">{feature.progress}%</span>
                          </span>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-[#232229] transition-colors"
                          onClick={() => handleManageClick(feature)}
                        >
                          {feature.status === "Live" ? "Manage" : "Details"}
                        </button>
                        {feature.status === "Live" && (
                          <button 
                            className="text-xs text-purple-400 hover:text-purple-300 px-2 py-1 rounded hover:bg-[#232229] transition-colors"
                            onClick={() => handleAnalyticsClick(feature)}
                          >
                            Analytics
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Add New Feature Button */}
            <div className="p-5 bg-[#161618]/50 rounded-lg border border-dashed border-[#232229] hover:border-purple-500/20 transition-all duration-300 flex items-center justify-center cursor-pointer group">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#232229] rounded-full mx-auto mb-3 flex items-center justify-center group-hover:bg-purple-500/10 transition-colors duration-300">
                  <i className="fas fa-plus text-gray-400 group-hover:text-purple-400 transition-colors duration-300"></i>
                </div>
                <h3 className="text-sm font-medium text-gray-400 group-hover:text-purple-400 transition-colors duration-300">Add New Feature</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-[200px] mx-auto">Enhance your community with additional features</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[#111113] border border-[#232229] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Upcoming Events</h2>
            <Link href="/dashboard/events" className="text-xs text-purple-400 hover:text-purple-300 flex items-center">
              <i className="fas fa-calendar-alt mr-1.5"></i> Calendar
            </Link>
          </div>
          <div className="space-y-4">
            {displayedEvents.map((event) => (
              <div 
                key={event.id} 
                className="p-3 bg-[#161618] rounded-lg border border-[#232229] hover:border-purple-500/30 hover:bg-[#18181c] transition-all duration-200 cursor-pointer"
                onClick={() => handleEventClick(event)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`text-xs ${event.typeColor} font-medium flex items-center`}>
                    {event.isPremium && (
                      <span className="bg-yellow-500/20 text-yellow-400 text-[10px] px-1.5 py-0.5 rounded-sm mr-2">
                        PREMIUM
                      </span>
                    )}
                    {event.type}
                  </div>
                  <div className="text-xs text-gray-400 flex items-center">
                    <i className="far fa-calendar-alt mr-1.5 text-[10px]"></i>
                    {event.formattedDate}
                  </div>
                </div>
                <h3 className="text-sm font-medium mb-1 line-clamp-1">{event.title}</h3>
                <p className="text-xs text-gray-400 mb-3 line-clamp-1">{event.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[...Array(Math.min(3, event.attendees))].map((_, i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-gray-600 border border-[#111113]"></div>
                    ))}
                    {event.attendees > 3 && (
                      <div className="w-6 h-6 rounded-full bg-[#232229] border border-[#111113] flex items-center justify-center text-xs">
                        +{event.attendees - 3}
                      </div>
                    )}
                  </div>
                  <button 
                    className={`text-xs px-2 py-1 rounded transition-colors ${
                      event.isRegistered 
                        ? 'bg-purple-600/20 text-purple-400 hover:bg-purple-600/30' 
                        : 'text-gray-400 hover:text-white hover:bg-[#232229]'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEventRegister(event.id);
                    }}
                  >
                    {event.isRegistered ? 'Registered' : 'Register'}
                  </button>
                </div>
              </div>
            ))}
            
            <button 
              className="w-full text-purple-400 text-xs font-medium hover:text-purple-300 flex items-center justify-center"
              onClick={toggleShowAllEvents}
            >
              {showAllEvents ? 'Show fewer events' : `View all events (${events.length})`}
              <i className={`fas fa-chevron-${showAllEvents ? 'up' : 'down'} ml-1.5 text-[10px]`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Feature Modal */}
      {showEditModal && currentFeature && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-[#111113] border border-[#232229] rounded-xl p-6 max-w-md w-full animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Feature</h3>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={handleCloseModal}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                <input 
                  type="text" 
                  className="w-full bg-[#161618] border border-[#232229] rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500"
                  defaultValue={currentFeature.title}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <textarea 
                  className="w-full bg-[#161618] border border-[#232229] rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500 h-20"
                  defaultValue={currentFeature.description}
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                <select className="w-full bg-[#161618] border border-[#232229] rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500">
                  <option value="Live" selected={currentFeature.status === "Live"}>Live</option>
                  <option value="Scheduled" selected={currentFeature.status === "Scheduled"}>Scheduled</option>
                  <option value="In Development" selected={currentFeature.status === "In Development"}>In Development</option>
                </select>
              </div>
              
              {currentFeature.status === "Scheduled" && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Launch Date</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#161618] border border-[#232229] rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500"
                    defaultValue={currentFeature.launchDate}
                  />
                </div>
              )}
              
              <div className="pt-4 border-t border-[#232229] flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 text-sm rounded-md bg-[#232229] text-gray-300 hover:bg-[#2a2a2c]"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 text-sm rounded-md bg-purple-600 text-white hover:bg-purple-700"
                  onClick={handleCloseModal}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Feature Modal */}
      {showManageModal && currentFeature && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-[#111113] border border-[#232229] rounded-xl p-6 max-w-md w-full animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{currentFeature.status === "Live" ? "Manage Feature" : "Feature Details"}</h3>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={handleCloseModal}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="flex items-center mb-4 pb-4 border-b border-[#232229]">
              <div className={`w-10 h-10 ${currentFeature.iconBg} rounded-lg flex items-center justify-center mr-3`}>
                <i className={`fas fa-${currentFeature.icon} ${currentFeature.iconColor} text-sm`}></i>
              </div>
              <div>
                <h4 className="font-medium">{currentFeature.title}</h4>
                <p className="text-sm text-gray-400">{currentFeature.description}</p>
              </div>
            </div>
            
            {currentFeature.status === "Live" ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Status:</span>
                  <span className={`px-2 py-0.5 text-xs ${currentFeature.statusBg} ${currentFeature.statusColor} rounded-full`}>
                    {currentFeature.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Active Users:</span>
                  <span>{currentFeature.analytics?.users || 0}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Visibility:</span>
                  <span>{currentFeature.visibilityLevel || "All Members"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Created On:</span>
                  <span>April 10, 2023</span>
                </div>
                
                <div className="pt-4 border-t border-[#232229] space-y-3">
                  <button 
                    className="w-full px-4 py-2 text-sm rounded-md bg-[#161618] border border-[#232229] hover:bg-[#1a1a1c] flex items-center justify-center"
                    onClick={handleConfigureClick}
                  >
                    <i className="fas fa-cog mr-2"></i> Configure Settings
                  </button>
                  <button 
                    className="w-full px-4 py-2 text-sm rounded-md bg-[#161618] border border-[#232229] hover:bg-[#1a1a1c] flex items-center justify-center"
                    onClick={handleAccessClick}
                  >
                    <i className="fas fa-user-lock mr-2"></i> Manage Access
                  </button>
                  <button 
                    className="w-full px-4 py-2 text-sm rounded-md bg-red-900/20 text-red-400 border border-red-900/30 hover:bg-red-900/30 flex items-center justify-center"
                    onClick={handleDisableClick}
                  >
                    <i className="fas fa-trash-alt mr-2"></i> Disable Feature
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Status:</span>
                  <span className={`px-2 py-0.5 text-xs ${currentFeature.statusBg} ${currentFeature.statusColor} rounded-full`}>
                    {currentFeature.status}
                  </span>
                </div>
                {currentFeature.status === "Scheduled" && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Launch Date:</span>
                    <span>{currentFeature.launchDate}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Progress:</span>
                  <div className="w-32 h-2 bg-[#232229] rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${currentFeature.status === "Scheduled" ? "bg-yellow-500" : "bg-blue-500"}`} 
                      style={{ width: `${currentFeature.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-[#161618] rounded-lg p-3 text-sm">
                  <h5 className="text-xs font-medium text-gray-400 mb-2">Details</h5>
                  <p>{currentFeature.details}</p>
                </div>
                
                <div className="pt-4 border-t border-[#232229] space-y-3">
                  <button className="w-full px-4 py-2 text-sm rounded-md bg-[#161618] border border-[#232229] hover:bg-[#1a1a1c] flex items-center justify-center">
                    <i className="fas fa-tasks mr-2"></i> View Development Tasks
                  </button>
                  <button className="w-full px-4 py-2 text-sm rounded-md bg-[#161618] border border-[#232229] hover:bg-[#1a1a1c] flex items-center justify-center">
                    <i className="fas fa-clock mr-2"></i> {currentFeature.status === "Scheduled" ? "Reschedule Launch" : "Set Launch Date"}
                  </button>
                </div>
              </div>
            )}
            
            <div className="pt-4 mt-4 border-t border-[#232229] flex justify-end">
              <button 
                className="px-4 py-2 text-sm rounded-md bg-[#232229] text-gray-300 hover:bg-[#2a2a2c]"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {showAnalyticsModal && currentFeature && currentFeature.analytics && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-[#111113] border border-[#232229] rounded-xl p-6 max-w-2xl w-full animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${currentFeature.iconBg} rounded-lg flex items-center justify-center`}>
                  <i className={`fas fa-${currentFeature.icon} ${currentFeature.iconColor} text-xs`}></i>
                </div>
                <h3 className="text-lg font-semibold">{currentFeature.title} Analytics</h3>
              </div>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={handleCloseModal}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#161618] rounded-lg p-4">
                <div className="text-xs text-gray-400 mb-1">ACTIVE USERS</div>
                <div className="text-xl font-bold">{currentFeature.analytics.users}</div>
                <div className="text-xs text-green-400 mt-1 flex items-center">
                  <i className="fas fa-arrow-up mr-1"></i>
                  <span>+{currentFeature.analytics.growth}%</span>
                </div>
              </div>
              
              <div className="bg-[#161618] rounded-lg p-4">
                <div className="text-xs text-gray-400 mb-1">ENGAGEMENT</div>
                <div className="text-xl font-bold">{currentFeature.analytics.engagement}%</div>
                <div className="flex mt-2 h-1.5">
                  <div className="bg-purple-500 rounded-l-full" style={{width: `${currentFeature.analytics.engagement}%`}}></div>
                  <div className="bg-[#232229] rounded-r-full" style={{width: `${100 - currentFeature.analytics.engagement}%`}}></div>
                </div>
              </div>
              
              <div className="bg-[#161618] rounded-lg p-4">
                <div className="text-xs text-gray-400 mb-1">TOTAL VIEWS</div>
                <div className="text-xl font-bold">{currentFeature.analytics.views}</div>
                <div className="text-xs text-gray-400 mt-1">Past 30 days</div>
              </div>
              
              <div className="bg-[#161618] rounded-lg p-4">
                <div className="text-xs text-gray-400 mb-1">USAGE RATE</div>
                <div className="text-xl font-bold">68%</div>
                <div className="text-xs text-yellow-400 mt-1 flex items-center">
                  <i className="fas fa-arrow-down mr-1"></i>
                  <span>-3%</span>
                </div>
              </div>
            </div>
            
            {/* Chart Placeholder */}
            <div className="bg-[#161618] rounded-lg p-4 mb-6 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#232229] mx-auto mb-3 flex items-center justify-center">
                  <i className="fas fa-chart-line text-xl text-purple-400"></i>
                </div>
                <h4 className="text-sm font-medium mb-1">Feature Usage Over Time</h4>
                <p className="text-xs text-gray-400">Detailed analytics data for {currentFeature.title}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Top Users</h4>
                <div className="space-y-3">
                  {[
                    { name: "Alex Johnson", usage: 87 },
                    { name: "Maria Garcia", usage: 65 },
                    { name: "David Kim", usage: 52 }
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[#232229] mr-2 flex items-center justify-center">
                          <i className="fas fa-user text-gray-400 text-xs"></i>
                        </div>
                        <span className="text-sm">{user.name}</span>
                      </div>
                      <div className="text-sm">{user.usage}%</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3">Insights</h4>
                <div className="space-y-3">
                  <div className="bg-[#181820] rounded-lg p-3 border-l-2 border-green-500">
                    <h5 className="text-xs font-medium flex items-center">
                      <i className="fas fa-arrow-trend-up text-green-400 mr-1.5"></i>
                      Engagement Growing
                    </h5>
                    <p className="text-xs text-gray-400 mt-1">User engagement increased by 12% this month</p>
                  </div>
                  
                  <div className="bg-[#181820] rounded-lg p-3 border-l-2 border-yellow-500">
                    <h5 className="text-xs font-medium flex items-center">
                      <i className="fas fa-lightbulb text-yellow-400 mr-1.5"></i>
                      Recommendation
                    </h5>
                    <p className="text-xs text-gray-400 mt-1">Consider adding more video content to increase retention</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 mt-4 border-t border-[#232229] flex justify-between">
              <button className="px-4 py-2 text-sm rounded-md bg-[#161618] border border-[#232229] hover:bg-[#1a1a1c] flex items-center">
                <i className="fas fa-download mr-2"></i> Export Report
              </button>
              
              <button 
                className="px-4 py-2 text-sm rounded-md bg-[#232229] text-gray-300 hover:bg-[#2a2a2c]"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Configure Settings Modal */}
      {showConfigureModal && currentFeature && currentFeature.settings && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-[#111113] border border-[#232229] rounded-xl p-6 max-w-md w-full animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Configure Settings</h3>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={handleCloseModal}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <p className="text-sm text-gray-400 mb-6">Customize how {currentFeature.title} works for your community</p>
            
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Notifications</h4>
                  <p className="text-xs text-gray-400 mt-1">Send notifications when new content is available</p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input 
                    type="checkbox" 
                    className="opacity-0 w-0 h-0"
                    id="notif-toggle"
                    checked={currentFeature.settings.notifications}
                    onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                  />
                  <label 
                    htmlFor="notif-toggle"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${currentFeature.settings.notifications ? 'bg-purple-600' : 'bg-[#232229]'}`}
                  >
                    <span 
                      className={`absolute bg-white w-4 h-4 rounded-full top-1 transition-all duration-300 ${currentFeature.settings.notifications ? 'left-7' : 'left-1'}`}
                    ></span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Auto-Publish</h4>
                  <p className="text-xs text-gray-400 mt-1">Automatically publish new content without review</p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input 
                    type="checkbox" 
                    className="opacity-0 w-0 h-0"
                    id="autopub-toggle"
                    checked={currentFeature.settings.autoPublish}
                    onChange={(e) => handleSettingChange('autoPublish', e.target.checked)}
                  />
                  <label 
                    htmlFor="autopub-toggle"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${currentFeature.settings.autoPublish ? 'bg-purple-600' : 'bg-[#232229]'}`}
                  >
                    <span 
                      className={`absolute bg-white w-4 h-4 rounded-full top-1 transition-all duration-300 ${currentFeature.settings.autoPublish ? 'left-7' : 'left-1'}`}
                    ></span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Require Approval</h4>
                  <p className="text-xs text-gray-400 mt-1">Require admin approval for user submissions</p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input 
                    type="checkbox" 
                    className="opacity-0 w-0 h-0"
                    id="approval-toggle"
                    checked={currentFeature.settings.requireApproval}
                    onChange={(e) => handleSettingChange('requireApproval', e.target.checked)}
                  />
                  <label 
                    htmlFor="approval-toggle"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${currentFeature.settings.requireApproval ? 'bg-purple-600' : 'bg-[#232229]'}`}
                  >
                    <span 
                      className={`absolute bg-white w-4 h-4 rounded-full top-1 transition-all duration-300 ${currentFeature.settings.requireApproval ? 'left-7' : 'left-1'}`}
                    ></span>
                  </label>
                </div>
              </div>
              
              {currentFeature.title === "1-on-1 Access" && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Usage Limit</h4>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-400 mr-3">Max sessions per day:</span>
                    <select 
                      className="bg-[#161618] border border-[#232229] rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-purple-500"
                      value={currentFeature.settings.maxUsagePerDay || 0}
                      onChange={(e) => handleSettingChange('maxUsagePerDay', parseInt(e.target.value))}
                    >
                      <option value="0">Unlimited</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            
            <div className="pt-4 mt-6 border-t border-[#232229] flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-sm rounded-md bg-[#232229] text-gray-300 hover:bg-[#2a2a2c]"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 text-sm rounded-md bg-purple-600 text-white hover:bg-purple-700"
                onClick={handleSaveSettings}
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Access Modal */}
      {showAccessModal && currentFeature && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-[#111113] border border-[#232229] rounded-xl p-6 max-w-md w-full animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Manage Access</h3>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={handleCloseModal}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <p className="text-sm text-gray-400 mb-6">Control who can access {currentFeature.title}</p>
            
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Visibility Level</h4>
                <div className="space-y-3">
                  <div 
                    className={`p-3 ${currentFeature.visibilityLevel === "All Members" ? 'bg-purple-600/10 border-purple-600/30' : 'bg-[#161618] border-[#232229]'} border rounded-lg cursor-pointer hover:bg-[#1a1a1c] transition-colors`}
                    onClick={() => handleVisibilityChange("All Members")}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full ${currentFeature.visibilityLevel === "All Members" ? 'bg-purple-500' : 'bg-[#232229]'} flex items-center justify-center mr-3`}>
                        {currentFeature.visibilityLevel === "All Members" && <i className="fas fa-check text-[10px] text-white"></i>}
                      </div>
                      <div>
                        <h5 className="text-sm font-medium">All Members</h5>
                        <p className="text-xs text-gray-400 mt-0.5">Everyone in your community can access this feature</p>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-3 ${currentFeature.visibilityLevel === "Premium Only" ? 'bg-purple-600/10 border-purple-600/30' : 'bg-[#161618] border-[#232229]'} border rounded-lg cursor-pointer hover:bg-[#1a1a1c] transition-colors`}
                    onClick={() => handleVisibilityChange("Premium Only")}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full ${currentFeature.visibilityLevel === "Premium Only" ? 'bg-purple-500' : 'bg-[#232229]'} flex items-center justify-center mr-3`}>
                        {currentFeature.visibilityLevel === "Premium Only" && <i className="fas fa-check text-[10px] text-white"></i>}
                      </div>
                      <div>
                        <h5 className="text-sm font-medium">Premium Only</h5>
                        <p className="text-xs text-gray-400 mt-0.5">Only paid members can access this feature</p>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-3 ${currentFeature.visibilityLevel === "Admins Only" ? 'bg-purple-600/10 border-purple-600/30' : 'bg-[#161618] border-[#232229]'} border rounded-lg cursor-pointer hover:bg-[#1a1a1c] transition-colors`}
                    onClick={() => handleVisibilityChange("Admins Only")}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full ${currentFeature.visibilityLevel === "Admins Only" ? 'bg-purple-500' : 'bg-[#232229]'} flex items-center justify-center mr-3`}>
                        {currentFeature.visibilityLevel === "Admins Only" && <i className="fas fa-check text-[10px] text-white"></i>}
                      </div>
                      <div>
                        <h5 className="text-sm font-medium">Admins Only</h5>
                        <p className="text-xs text-gray-400 mt-0.5">Only community administrators can access this feature</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-[#161618] rounded-lg mt-4">
                <div className="flex items-center mb-3">
                  <i className="fas fa-user-shield text-purple-400 mr-2"></i>
                  <h5 className="text-sm font-medium">Individual Access Control</h5>
                </div>
                <p className="text-xs text-gray-400 mb-3">Grant access to specific users regardless of visibility level</p>
                <button className="w-full px-3 py-2 text-xs bg-[#232229] hover:bg-[#2d2d35] rounded-md flex items-center justify-center">
                  <i className="fas fa-user-plus mr-1.5"></i> Add User Access
                </button>
                <div className="text-xs text-center mt-3 text-gray-500">No individual exceptions added</div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-[#232229] flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-sm rounded-md bg-[#232229] text-gray-300 hover:bg-[#2a2a2c]"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 text-sm rounded-md bg-purple-600 text-white hover:bg-purple-700"
                onClick={handleSaveSettings}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Disable Feature Confirmation Modal */}
      {showDisableConfirmModal && currentFeature && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-[#111113] border border-[#232229] rounded-xl p-6 max-w-md w-full animate-fadeIn">
            <div className="text-center p-3">
              <div className="w-16 h-16 bg-red-500/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-exclamation-triangle text-red-400 text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Disable Feature</h3>
              <p className="text-sm text-gray-400 mb-6">
                Are you sure you want to disable <span className="text-white font-medium">{currentFeature.title}</span>? 
                This will remove access for all users and archive all related data.
              </p>
              
              <div className="p-3 bg-red-900/10 border border-red-900/20 rounded-lg text-left mb-6">
                <h4 className="text-sm text-red-400 font-medium flex items-center">
                  <i className="fas fa-info-circle mr-1.5"></i> Important
                </h4>
                <ul className="text-xs text-gray-400 mt-2 space-y-1 list-disc pl-4">
                  <li>Users will no longer be able to access this feature</li>
                  <li>All data will be archived but not deleted</li>
                  <li>You can re-enable this feature later</li>
                </ul>
              </div>
              
              <div className="flex justify-center space-x-3">
                <button 
                  className="px-5 py-2 text-sm rounded-md bg-[#232229] text-gray-300 hover:bg-[#2a2a2c]"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button 
                  className="px-5 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
                  onClick={handleDisableFeature}
                >
                  Disable Feature
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {showEventModal && currentEvent && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-[#111113] border border-[#232229] rounded-xl p-6 max-w-md w-full animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <div className={`px-2 py-0.5 ${currentEvent.typeColor} bg-opacity-10 rounded text-xs font-medium`}>
                {currentEvent.isPremium && (
                  <span className="bg-yellow-500/20 text-yellow-400 text-[10px] px-1.5 py-0.5 rounded-sm mr-1.5">
                    PREMIUM
                  </span>
                )}
                {currentEvent.type}
              </div>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowEventModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <h3 className="text-xl font-semibold mb-2">{currentEvent.title}</h3>
            <p className="text-gray-400 text-sm mb-6">{currentEvent.description}</p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[#232229] flex items-center justify-center mr-3 mt-0.5">
                  <i className="far fa-calendar-alt text-purple-400 text-xs"></i>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Date & Time</h4>
                  <p className="text-xs text-gray-400">{currentEvent.formattedDate} at {currentEvent.time}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[#232229] flex items-center justify-center mr-3 mt-0.5">
                  <i className="fas fa-map-marker-alt text-purple-400 text-xs"></i>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Location</h4>
                  <p className="text-xs text-gray-400">{currentEvent.location}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[#232229] flex items-center justify-center mr-3 mt-0.5">
                  <i className="fas fa-user text-purple-400 text-xs"></i>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Host</h4>
                  <p className="text-xs text-gray-400">{currentEvent.host}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[#232229] flex items-center justify-center mr-3 mt-0.5">
                  <i className="fas fa-users text-purple-400 text-xs"></i>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Attendees</h4>
                  <p className="text-xs text-gray-400">{currentEvent.attendees} people registered</p>
                </div>
              </div>
            </div>
            
            {currentEvent.isPremium && !currentEvent.isRegistered && (
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-6">
                <div className="flex items-center">
                  <i className="fas fa-crown text-yellow-400 mr-2"></i>
                  <h4 className="text-sm font-medium text-yellow-400">Premium Event</h4>
                </div>
                <p className="text-xs text-gray-400 mt-1">This event requires a premium membership to attend.</p>
              </div>
            )}
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-[#232229]">
              <button 
                className="px-4 py-2 text-sm rounded-md bg-[#232229] text-gray-300 hover:bg-[#2a2a2c]"
                onClick={() => setShowEventModal(false)}
              >
                Close
              </button>
              <button 
                className={`px-4 py-2 text-sm rounded-md ${
                  currentEvent.isRegistered 
                    ? 'bg-red-600/20 text-red-400 border border-red-600/30 hover:bg-red-600/30' 
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
                onClick={() => handleEventRegister(currentEvent.id)}
              >
                {currentEvent.isRegistered ? 'Cancel Registration' : 'Register Now'}
              </button>
            </div>
          </div>
        </div>
      )}

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