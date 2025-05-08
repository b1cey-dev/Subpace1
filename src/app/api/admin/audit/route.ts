import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // In a real app, fetch audit logs from your database
  const logs = [
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
  ];

  return NextResponse.json({ logs });
} 