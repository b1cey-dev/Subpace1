'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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

export default function EventsCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
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
    },
    {
      id: 6,
      title: "Social Media Integration Workshop",
      type: "WORKSHOP",
      typeColor: "text-purple-400",
      date: "2023-06-18",
      formattedDate: "Jun 18",
      time: "1:00 PM EST",
      description: "Connect your community to major social platforms effectively",
      attendees: 11,
      host: "Marcus Lee",
      location: "Google Meet",
      isRegistered: false
    },
    {
      id: 7,
      title: "Monthly Community Recap",
      type: "LIVE",
      typeColor: "text-green-400",
      date: "2023-06-30",
      formattedDate: "Jun 30",
      time: "4:00 PM EST",
      description: "Review of key community achievements and milestones",
      attendees: 24,
      host: "Team Subpace",
      location: "Zoom",
      isRegistered: false
    }
  ]);
  const [activeView, setActiveView] = useState<'month' | 'list'>('month');
  const [filterType, setFilterType] = useState<string | null>(null);

  useEffect(() => {
    // If there's a selected date and no event was chosen
    if (selectedDate && !currentEvent) {
      // Check if there are events for this date
      const dateStr = selectedDate.toISOString().split('T')[0];
      const eventsForDate = events.filter(event => event.date === dateStr);
      
      if (eventsForDate.length === 1) {
        // If there's exactly one event on this date, select it automatically
        setCurrentEvent(eventsForDate[0]);
        setShowEventModal(true);
      } else if (eventsForDate.length > 1) {
        // If there are multiple events, just highlight the date (we're already doing this)
      }
    }
  }, [selectedDate, events, currentEvent]);

  const handleEventClick = (event: Event) => {
    setCurrentEvent(event);
    setSelectedDate(new Date(event.date));
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

  const getMonthData = (month: Date) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 for Sunday
    
    // Create days array with padding for the start of the month
    const days: (Date | null)[] = [];
    
    // Add nulls for days before the 1st of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add actual days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, monthIndex, i));
    }
    
    // Add nulls to complete the last week if necessary (for UI grid)
    const totalCells = Math.ceil(days.length / 7) * 7;
    while (days.length < totalCells) {
      days.push(null);
    }
    
    return days;
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const navigatePreviousMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const navigateNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  const isSelectedDate = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return date.getDate() === selectedDate.getDate() && 
           date.getMonth() === selectedDate.getMonth() && 
           date.getFullYear() === selectedDate.getFullYear();
  };

  const days = getMonthData(currentMonth);
  
  const eventTypes = Array.from(new Set(events.map(event => event.type)));
  const filteredEvents = filterType 
    ? events.filter(event => event.type === filterType)
    : events;
  
  const sortedEvents = [...filteredEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return (
    <div className="py-8 px-4 sm:px-6">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Event Calendar</h1>
            <p className="text-gray-400 text-sm">Manage and join upcoming community events</p>
          </div>
          
          <div className="flex mt-4 md:mt-0 space-x-3">
            <button
              className={`px-3 py-1.5 text-sm rounded-md border ${activeView === 'month' ? 'bg-purple-600/20 border-purple-600/30 text-purple-400' : 'bg-[#161618] border-[#232229] text-gray-400 hover:text-white'}`}
              onClick={() => setActiveView('month')}
            >
              <i className="far fa-calendar mr-1.5"></i> Month View
            </button>
            <button
              className={`px-3 py-1.5 text-sm rounded-md border ${activeView === 'list' ? 'bg-purple-600/20 border-purple-600/30 text-purple-400' : 'bg-[#161618] border-[#232229] text-gray-400 hover:text-white'}`}
              onClick={() => setActiveView('list')}
            >
              <i className="fas fa-list mr-1.5"></i> List View
            </button>
            <Link href="/dashboard"
              className="px-3 py-1.5 text-sm rounded-md bg-[#161618] border border-[#232229] text-gray-400 hover:text-white flex items-center"
            >
              <i className="fas fa-arrow-left mr-1.5"></i> Dashboard
            </Link>
          </div>
        </div>
        
        {/* Filter Types */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            className={`px-3 py-1 text-xs rounded-full border ${!filterType ? 'bg-purple-600/20 border-purple-600/30 text-purple-400' : 'bg-[#161618] border-[#232229] text-gray-400 hover:text-white'}`}
            onClick={() => setFilterType(null)}
          >
            All Events
          </button>
          {eventTypes.map(type => (
            <button
              key={type}
              className={`px-3 py-1 text-xs rounded-full border ${filterType === type ? 'bg-purple-600/20 border-purple-600/30 text-purple-400' : 'bg-[#161618] border-[#232229] text-gray-400 hover:text-white'}`}
              onClick={() => setFilterType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      
      {activeView === 'month' ? (
        <div className="bg-[#111113] border border-[#232229] rounded-xl p-4 md:p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-xl">{formatMonthYear(currentMonth)}</h2>
            <div className="flex space-x-3">
              <button 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#161618] border border-[#232229] hover:bg-[#1a1a1c]"
                onClick={navigatePreviousMonth}
              >
                <i className="fas fa-chevron-left text-xs"></i>
              </button>
              <button 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#161618] border border-[#232229] hover:bg-[#1a1a1c]"
                onClick={navigateNextMonth}
              >
                <i className="fas fa-chevron-right text-xs"></i>
              </button>
            </div>
          </div>
          
          {/* Day Names Header */}
          <div className="grid grid-cols-7 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-gray-400">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              const dateEvents = getEventsForDate(date);
              return (
                <div 
                  key={index} 
                  className={`min-h-[90px] p-1 border rounded ${date ? 'border-[#232229] hover:border-purple-500/30' : 'border-transparent'} ${isSelectedDate(date) ? 'bg-purple-600/10 border-purple-500/40' : 'bg-[#161618]'} ${!date ? 'opacity-30' : ''} transition-colors duration-200`}
                  onClick={() => date && setSelectedDate(date)}
                >
                  {date && (
                    <>
                      <div className="flex justify-between items-center mb-1">
                        <div 
                          className={`w-6 h-6 flex items-center justify-center rounded-full text-xs ${isToday(date) ? 'bg-purple-600 text-white' : 'text-gray-400'}`}
                        >
                          {date.getDate()}
                        </div>
                        {dateEvents.length > 0 && (
                          <span className="text-[10px] bg-[#232229] text-gray-400 rounded px-1">
                            {dateEvents.length}
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        {dateEvents.slice(0, 2).map(event => (
                          <div 
                            key={event.id}
                            className="text-[10px] truncate bg-[#111113] p-1 rounded cursor-pointer hover:bg-[#18181c] flex items-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEventClick(event);
                            }}
                          >
                            <div className={`w-2 h-2 rounded-full ${event.typeColor.replace('text', 'bg')} mr-1.5`}></div>
                            {event.isPremium && <i className="fas fa-crown text-yellow-400 mr-1 text-[8px]"></i>}
                            <span className="truncate">{event.title}</span>
                          </div>
                        ))}
                        {dateEvents.length > 2 && (
                          <div 
                            className="text-[10px] text-center text-gray-500 hover:text-purple-400 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDate(date);
                            }}
                          >
                            +{dateEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-[#111113] border border-[#232229] rounded-xl p-6">
          <h2 className="font-semibold mb-4">All Upcoming Events</h2>
          
          {sortedEvents.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 mx-auto bg-[#161618] rounded-full flex items-center justify-center mb-3">
                <i className="far fa-calendar-alt text-gray-400 text-xl"></i>
              </div>
              <h3 className="text-gray-400 font-medium">No events found</h3>
              <p className="text-gray-500 text-sm mt-1">
                {filterType
                  ? `No ${filterType.toLowerCase()} events are currently scheduled.`
                  : 'No events are currently scheduled.'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedEvents.reduce((acc: React.ReactElement[], event) => {
                const eventDate = new Date(event.date);
                const month = eventDate.toLocaleDateString('en-US', { month: 'long' });
                
                // Check if we need a new month divider
                if (!acc.some(item => item.key === `month-${month}`)) {
                  acc.push(
                    <div key={`month-${month}`} className="border-b border-[#232229] pb-2 mb-4">
                      <h3 className="text-lg font-medium">{month}</h3>
                    </div>
                  );
                }
                
                acc.push(
                  <div 
                    key={event.id}
                    className="p-4 bg-[#161618] rounded-lg border border-[#232229] hover:border-purple-500/30 hover:bg-[#18181c] transition-all duration-200 cursor-pointer"
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div className="flex items-center mb-2 md:mb-0">
                        <div className={`w-10 h-10 ${event.typeColor.replace('text', 'bg')}/10 rounded-lg flex items-center justify-center mr-3`}>
                          <i className={`fas ${
                            event.type === 'WORKSHOP' ? 'fa-chalkboard-teacher' : 
                            event.type === 'WEBINAR' ? 'fa-laptop' : 
                            'fa-broadcast-tower'
                          } ${event.typeColor} text-sm`}></i>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span className={`text-xs ${event.typeColor} font-medium`}>
                              {event.type}
                            </span>
                            {event.isPremium && (
                              <span className="bg-yellow-500/20 text-yellow-400 text-[10px] px-1.5 py-0.5 rounded-sm ml-2">
                                PREMIUM
                              </span>
                            )}
                          </div>
                          <h3 className="text-base font-medium">{event.title}</h3>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="text-xs text-gray-400 text-right">
                          <div className="flex items-center mb-1">
                            <i className="far fa-calendar-alt mr-1.5 text-[10px]"></i>
                            {event.formattedDate}
                          </div>
                          <div className="flex items-center">
                            <i className="far fa-clock mr-1.5 text-[10px]"></i>
                            {event.time}
                          </div>
                        </div>
                        <div className="flex -space-x-2">
                          {[...Array(Math.min(3, event.attendees))].map((_, i) => (
                            <div key={i} className="w-6 h-6 rounded-full bg-gray-600 border border-[#161618]"></div>
                          ))}
                          {event.attendees > 3 && (
                            <div className="w-6 h-6 rounded-full bg-[#232229] border border-[#161618] flex items-center justify-center text-xs">
                              +{event.attendees - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-4">{event.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        <span className="flex items-center">
                          <i className="fas fa-map-marker-alt mr-1.5"></i>
                          {event.location}
                        </span>
                      </div>
                      <button 
                        className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                          event.isRegistered 
                            ? 'bg-purple-600/20 text-purple-400 border-purple-600/30 hover:bg-purple-600/30' 
                            : 'bg-[#161618] border-[#232229] text-gray-400 hover:text-white hover:bg-[#232229]'
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
                );
                
                return acc;
              }, [])}
            </div>
          )}
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
                onClick={() => {
                  setShowEventModal(false);
                  setCurrentEvent(null);
                }}
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
                onClick={() => {
                  setShowEventModal(false);
                  setCurrentEvent(null);
                }}
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
    </div>
  );
} 