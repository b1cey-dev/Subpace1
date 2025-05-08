import { NextResponse } from 'next/server';
import { getUserRole } from '@/lib/auth';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(req: Request) {
  const role = await getUserRole(req);
  return NextResponse.json({ isAdmin: role === 'admin' });
} 