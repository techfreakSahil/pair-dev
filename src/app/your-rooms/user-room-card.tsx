"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

import Link from "next/link";
import { Room } from "@/db/schema";
import { GithubIcon, PenBoxIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TagList } from "@/components/tags-list";
import { splitTags } from "@/lib/utils";
import { deleteRoomAction } from "./action";
export function UserRoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader className="relative">
        <Button size="icon" className="absolute top-1 right-1">
          <Link href={`/edit-room/${room.id}`}>
            <PenBoxIcon />
          </Link>
        </Button>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <TagList tags={splitTags(room.tags)} />
        {room.githubRepo && (
          <Link
            className="flex items-center gap-2 mt-2"
            target="_blank"
            rel="noopener noreferrer"
            href={room.githubRepo}
          >
            <GithubIcon /> Github Project
          </Link>
        )}
      </CardContent>
      <CardFooter className="flex gap-3">
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant={"destructive"} onClick={() => {}}>
              <Trash2Icon className="w-4 h-4 mr-2" />
              Delete Room
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                room and remove the data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteRoomAction(room.id);
                }}
                color="red"
              >
                Yes, Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
