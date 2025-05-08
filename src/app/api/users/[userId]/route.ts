import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// This is a mock database. In a real application, you would use a proper database
const userRoles: Record<string, string> = {
  // Add some mock users with roles
  "user_123": "admin",
  "user_456": "premium",
};

export async function GET(
  request: NextRequest,
  context: any
) {
  const session = await auth();

  if (!session?.userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // In a real application, you would fetch this from your database
  const role = userRoles[context.params.userId] || "member";

  return NextResponse.json({ role });
}

export async function PATCH(
  request: NextRequest,
  context: any
) {
  const session = await auth();

  if (!session?.userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Check if the user is an admin
  const isAdmin = userRoles[session.userId] === "admin";
  if (!isAdmin) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const body = await request.json();
  const { role } = body;

  if (!role || !["admin", "premium", "member"].includes(role)) {
    return new NextResponse("Invalid role", { status: 400 });
  }

  // In a real application, you would update this in your database
  userRoles[context.params.userId] = role;

  return NextResponse.json({ role });
} 