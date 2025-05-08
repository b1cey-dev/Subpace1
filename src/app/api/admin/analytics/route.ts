import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // In a real app, fetch analytics from your database
  const analytics = {
    totalUsers: 150,
    activeUsers: 120,
    newSignups: 25,
    premiumUsers: 45,
    averageSessionTime: "32m",
    topFeatures: [
      { name: "Community Posts", usage: 85 },
      { name: "Discord Integration", usage: 65 },
      { name: "Profile Customization", usage: 45 }
    ],
    userGrowth: [
      { month: "Jan", users: 100 },
      { month: "Feb", users: 120 },
      { month: "Mar", users: 150 }
    ]
  };

  return NextResponse.json({ analytics });
} 