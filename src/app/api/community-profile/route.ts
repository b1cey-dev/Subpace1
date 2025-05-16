import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');
  if (!username) return NextResponse.json({ user: null });

  // Fetch all users (may need pagination for large userbases)
  const res = await fetch(`https://api.clerk.dev/v1/users?limit=100`, {
    headers: { Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` }
  });
  const users = await res.json();
  const user = users.find(
    (u: any) => u.unsafe_metadata?.username?.toLowerCase() === username.toLowerCase()
  );
  return NextResponse.json({ user: user || null });
} 