"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

type Props = {};

const LogoutButton = (props: Props) => {
  return (
    <DropdownMenuItem
      onClick={() => {
        toast.promise(signOut, {
          loading: "Logging out...",
          success: "Logged out successfully.",
          error: "Failed to log out.",
          finally: () => {
            console.log("logged out!");
          },
        });
      }}
    >
      Logout
    </DropdownMenuItem>
  );
};

export default LogoutButton;
