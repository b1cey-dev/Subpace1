import { UserButton } from "@clerk/nextjs";

export default function UserProfileButton() {
  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: "w-10 h-10",
          userButtonPopoverCard: "shadow-xl",
          userButtonPopoverActionButton: "hover:bg-gray-100",
          userButtonPopoverActionButtonText: "text-sm",
        },
      }}
    />
  );
} 