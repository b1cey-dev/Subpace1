'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function DashboardHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/');
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#111113] border-b border-[#232229]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center group">
            <div className="w-[32px] h-[32px] relative flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Subpace Logo"
                width={32}
                height={32}
                className="object-contain brightness-200"
                priority
              />
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/dashboard" 
              className={`text-[15px] font-medium px-3 py-1.5 rounded-md transition-colors ${
                isActive('/dashboard') && !isActive('/dashboard/community') && !isActive('/dashboard/analytics') && !isActive('/dashboard/settings') 
                ? 'text-purple-400 bg-[#1a1a1f]' 
                : 'text-gray-400 hover:text-white'
              }`}
            >
              Overview
            </Link>
            <Link 
              href="/dashboard/community" 
              className={`text-[15px] font-medium px-3 py-1.5 rounded-md transition-colors ${
                isActive('/dashboard/community') 
                ? 'text-purple-400 bg-[#1a1a1f]' 
                : 'text-gray-400 hover:text-white'
              }`}
            >
              Community
            </Link>
            <Link 
              href="/dashboard/analytics" 
              className={`text-[15px] font-medium px-3 py-1.5 rounded-md transition-colors ${
                isActive('/dashboard/analytics') 
                ? 'text-purple-400 bg-[#1a1a1f]' 
                : 'text-gray-400 hover:text-white'
              }`}
            >
              Analytics
            </Link>
            <Link 
              href="/dashboard/settings" 
              className={`text-[15px] font-medium px-3 py-1.5 rounded-md transition-colors ${
                isActive('/dashboard/settings') 
                ? 'text-purple-400 bg-[#1a1a1f]' 
                : 'text-gray-400 hover:text-white'
              }`}
            >
              Settings
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            className="text-gray-400 hover:text-white relative transition-colors"
            aria-label="Notifications"
          >
            <i className="fas fa-bell text-lg"></i>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="relative" ref={menuRef}>
            <button
              className="w-8 h-8 rounded-full bg-[#232229] flex items-center justify-center focus:outline-none hover:bg-[#2a2a31] transition-colors"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Profile menu"
            >
              <i className="fas fa-user text-gray-400"></i>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#111113] border border-[#232229] rounded-xl shadow-lg py-1 z-10">
                <Link href="/dashboard/settings?tab=profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#161618] transition-colors">
                  <i className="fas fa-user-circle mr-2"></i> Profile
                </Link>
                <Link href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#161618] transition-colors">
                  <i className="fas fa-cog mr-2"></i> Settings
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 