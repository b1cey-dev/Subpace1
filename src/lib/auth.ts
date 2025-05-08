import { getAuth } from '@clerk/nextjs/server';

export type UserRole = 'admin' | 'premium' | 'member';

const ADMIN_EMAIL = 'josephrobinsonsimon@gmail.com';

export const getUserRole = async (req: any): Promise<UserRole> => {
  const { userId } = getAuth(req);
  if (!userId) {
    return 'member';
  }
  // Fetch user from Clerk API to check email
  const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
  if (!CLERK_SECRET_KEY) return 'member';
  const userRes = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${CLERK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
  });
  if (!userRes.ok) return 'member';
  const user = await userRes.json();
  const email = user.email_addresses?.[0]?.email_address || '';
  if (email === ADMIN_EMAIL) return 'admin';
  // Add more logic for premium, etc. if needed
  return 'member';
};

export const isAdmin = async (req: any): Promise<boolean> => {
  const role = await getUserRole(req);
  return role === 'admin';
};

export const isPremium = async (req: any): Promise<boolean> => {
  const role = await getUserRole(req);
  return role === 'premium' || role === 'admin';
};

export const requireRole = async (req: any, requiredRole: UserRole) => {
  const role = await getUserRole(req);
  if (role === 'admin') return true;
  if (requiredRole === 'premium' && role === 'premium') return true;
  if (requiredRole === 'member') return true;
  return false;
};

// Example: get the userId in a server-side function
// export function getUserId(req: NextRequest) {
//   const { userId } = getAuth(req);
//   return userId;
// } 