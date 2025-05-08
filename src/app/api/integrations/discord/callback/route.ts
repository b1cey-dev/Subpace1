import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  if (!code) return NextResponse.redirect('/dashboard/community?error=discord');

  // Exchange code for access token
  const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID!,
      client_secret: process.env.DISCORD_CLIENT_SECRET!,
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.DISCORD_REDIRECT_URI!,
    }),
  });
  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) {
    console.error('Discord token exchange failed:', tokenData);
    return NextResponse.redirect('/dashboard/community?error=discord');
  }

  // Save Discord token to Clerk metadata
  const { userId } = getAuth(req);
  if (userId) {
    const clerkRes = await fetch(`https://api.clerk.dev/v1/users/${userId}/metadata`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_metadata: {
          discord_access_token: tokenData.access_token,
          discord_refresh_token: tokenData.refresh_token,
        },
      }),
    });
    if (!clerkRes.ok) {
      const error = await clerkRes.text();
      console.error('Clerk metadata update failed:', error);
    }
  }

  return NextResponse.redirect('/dashboard/community?discord=connected');
} 