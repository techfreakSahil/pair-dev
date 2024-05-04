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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function AccountInfo() {
  const session = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>
          <Avatar className="mr-2">
            <AvatarImage src={session.data?.user?.image ?? ""} />
            <AvatarFallback>SK</AvatarFallback>
          </Avatar>
          {session?.data?.user?.name}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          <LogOut className="mr-2" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const session = useSession();

  return (
    <header className="py-3 bg-gray-200 container mx-auto dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <Link href="/">LOGO</Link>
        <nav>
          <Button asChild>
            <Link href="/your-room">Your Rooms</Link>
          </Button>
        </nav>
        <div className="flex items-center gap-4">
          {session.data && <AccountInfo />}
          {!session.data && (
            <Button onClick={() => signIn("google")}>
              <LogIn className="mr-2" />
              Sign in
            </Button>
          )}
          <AccountInfo />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
