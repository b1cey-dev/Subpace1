import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

// In-memory posts array (replace with DB in production)
let posts: any[] = [];

export async function GET() {
  // Return all posts, newest first
  return NextResponse.json({ posts: posts.slice().reverse() });
}

export async function POST(req: NextRequest) {
  const { userId, sessionClaims } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { content } = await req.json();
  if (!content || typeof content !== 'string' || !content.trim()) {
    return NextResponse.json({ error: 'Content required' }, { status: 400 });
  }
  const authorName = sessionClaims?.name || sessionClaims?.email || 'Anonymous';
  const post = {
    id: Date.now().toString(),
    authorId: userId,
    authorName,
    content: content.trim(),
    createdAt: new Date().toISOString(),
  };
  posts.push(post);
  return NextResponse.json({ post });
} 