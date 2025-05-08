import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  // Simple authentication: only allow signed-in users
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
  if (!CLERK_SECRET_KEY) {
    return NextResponse.json({ error: 'Clerk secret key not set' }, { status: 500 });
  }

  // Fetch all users from Clerk with pagination
  let users = [];
  let page = 1;
  do {
    const usersRes = await fetch(`https://api.clerk.dev/v1/users?page=${page}&limit=100`, {
      headers: {
        Authorization: `Bearer ${CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    if (!usersRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch users from Clerk' }, { status: 500 });
    }
    const data = await usersRes.json();
    users = users.concat(data);
    if (data.length < 100) break;
    page++;
  } while (page <= 100);

  // Total members
  const totalMembers = users.length;

  // New signups in last 30 days
  const now = new Date();
  const last30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const newSignups = users.filter((u) => new Date(u.created_at) > last30).length;

  // Dummy values for active users and revenue
  const activeUsers = Math.floor(totalMembers * 0.7);
  const revenue = 0;

  // Recent members (latest 5 by created_at desc)
  const recentMembers = users
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5)
    .map((u) => ({
      id: u.id,
      name: u.first_name || u.last_name ? `${u.first_name || ''} ${u.last_name || ''}`.trim() : u.username || u.email_addresses?.[0]?.email_address || 'User',
      email: u.email_addresses?.[0]?.email_address || '',
      created_at: u.created_at,
    }));

  return NextResponse.json({
    totalMembers,
    activeUsers,
    revenue,
    newSignups,
    recentMembers,
  });
} 