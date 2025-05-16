import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const ADMIN_EMAIL = 'josephrobinsonsimon@gmail.com';

export async function GET() {
  const session = await auth();

  if (!session?.userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Fetch user from Clerk API to check email
  const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
  if (!CLERK_SECRET_KEY) {
    return NextResponse.json({ isAdmin: false });
  }

  const userRes = await fetch(`https://api.clerk.dev/v1/users/${session.userId}`, {
    headers: {
      Authorization: `Bearer ${CLERK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!userRes.ok) {
    return NextResponse.json({ isAdmin: false });
  }

  const user = await userRes.json();
  const email = user.email_addresses?.[0]?.email_address || '';
  const isAdmin = email === ADMIN_EMAIL;

  return NextResponse.json({ isAdmin });
} 