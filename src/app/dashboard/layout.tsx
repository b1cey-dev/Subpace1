'use client';

import DashboardHeader from '@/components/DashboardHeader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white">
      <DashboardHeader />
      {children}
    </div>
  );
} 