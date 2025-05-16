import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(req: Request) {
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
  if (!CLERK_SECRET_KEY) {
    return NextResponse.json({ error: 'Clerk secret key not set' }, { status: 500 });
  }
  let users: any[] = [];
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
  const members = users.map((u) => ({
    id: u.id,
    name: u.first_name || u.last_name ? `${u.first_name || ''} ${u.last_name || ''}`.trim() : u.username || u.email_addresses?.[0]?.email_address || 'User',
    email: u.email_addresses?.[0]?.email_address || '',
    created_at: u.created_at,
    role: 'member', // Placeholder, you can enhance this
  }));
  return NextResponse.json({ members });
} 