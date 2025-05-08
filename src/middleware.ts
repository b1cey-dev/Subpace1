import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Rate limiting configuration
const RATE_LIMIT = 100; // requests per window
const WINDOW_SIZE = 60 * 1000; // 1 minute in milliseconds
const ipRequests = new Map<string, { count: number; resetTime: number }>();

// IP whitelist configuration
const WHITELISTED_IPS = [
  '127.0.0.1', // localhost
  '192.168.1.1', // example IP
];

// Session timeout configuration (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000;

// This is a mock database. In a real application, you would use a proper database
const userRoles: Record<string, string> = {
  "user_123": "admin",
  "user_456": "premium",
};

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.css|.*\\.js).*)"
  ]
}; 