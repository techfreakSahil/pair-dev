"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { LogOut, LogIn, DeleteIcon, Trash2Icon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { deleteAccountAction } from "./action";

function AccountInfo() {
  const session = useSession();
  const [open, setOpen] = useState(false);
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteAccountAction();
                signOut({
                  callbackUrl: "/",
                });
                setOpen(false);
              }}
              color="red"
            >
              Yes, Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            <DeleteIcon className="mr-2" /> Delete Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function Header() {
  const session = useSession();

  return (
    <header className="py-3 bg-gray-200 container mx-auto dark:bg-gray-900 z-[9999]">
      <div className="flex justify-between items-center">
        <Link href="/">LOGO</Link>
        <nav className="flex gap-3">
          {session.data && (
            <>
              <Button asChild>
                <Link href="/browse">Browse</Link>
              </Button>

              <Button asChild>
                <Link href="/your-rooms">Your Rooms</Link>
              </Button>
            </>
          )}
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
