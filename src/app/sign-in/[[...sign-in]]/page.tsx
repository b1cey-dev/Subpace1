import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn 
        redirectUrl="/dashboard"
        appearance={{
          elements: {
            formButtonPrimary: 
              "bg-black hover:bg-gray-800 text-sm normal-case",
            card: "bg-white shadow-xl",
          },
        }}
      />
    </div>
  );
} 