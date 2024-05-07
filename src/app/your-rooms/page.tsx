import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRooms, getUserRooms } from "@/services/room";
import Image from "next/image";
import { RoomCard } from "@/app/browse/room-card";

export default async function YourRoomPage() {
  const rooms = await getUserRooms();
  return (
    <main className="min-h-screen p-12">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl">Your Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </div>
      {rooms.length === 0 && (
        <div className="flex flex-col mt-14 gap-6">
          <Image
            src="/no-room-data.svg"
            alt="no personal room data"
            width="150"
            height="150"
          />
          <Button>
            <Link href="/create-room">Create Room</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
