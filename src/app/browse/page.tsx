import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRooms } from "@/services/room";
import { Searchbar } from "./search-bar";
import { RoomCard } from "@/app/browse/room-card";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    search: string;
  };
}) {
  const rooms = await getRooms(searchParams.search);
  return (
    <main className="min-h-screen p-12">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl">Find Developer Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <div className="mb-8">
        <Searchbar />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </div>
    </main>
  );
}
