"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { LogOut, LogIn } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signIn, signOut, useSession } from "next-auth/react";

function AccountInfo() {
  const session = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{session?.data?.user?.name}</DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {session?.data ? (
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut /> Sign out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => signIn("google")}>
            <LogIn />
            Sign in
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const session = useSession();

  return (
    <header className="py-4 bg-gray-200 container mx-auto dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <div>LOGO</div>
        <div>
          <AccountInfo />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
