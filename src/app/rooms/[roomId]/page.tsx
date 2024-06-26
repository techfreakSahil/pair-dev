import { getRoom } from "@/services/room";
import { GithubIcon } from "lucide-react";

import Link from "next/link";
import { TagList } from "@/components/tags-list";
import { PairDev } from "./video-player";
import { splitTags } from "@/lib/utils";
import { unstable_noStore } from "next/cache";

export default async function RoomPage(props: { params: { roomId: string } }) {
  unstable_noStore();
  const roomId = props.params.roomId;
  const room = await getRoom(roomId);
  console.log("room aya");

  if (!room) {
    return <div>No rooom found for {roomId}</div>;
  }
  const tags = splitTags(room.tags);

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3 p-4 pr-2">
        <div className="rounded-xl border bg-card text-card-foreground shadow p-5">
          <PairDev room={room} />
        </div>
      </div>
      <div className="col-span-1 p-4 pl-2">
        <div className="rounded-xl border bg-card flex flex-col gap-3 text-card-foreground shadow p-5">
          <h1 className="text-base leading-none tracking-tight">
            {room?.name}
          </h1>
          {room?.githubRepo && (
            <Link
              className="flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
              href={room.githubRepo}
            >
              <GithubIcon /> Github Project
            </Link>
          )}
          <p className="text-base text-gray-600">{room?.description}</p>

          <TagList tags={tags} />
        </div>
      </div>
    </div>
  );
}
