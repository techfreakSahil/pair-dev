import { Button } from "@/components/ui/button";
import { db } from "@/db";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room, room } from "@/db/schema";

function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {room.githubRepo && <Link href={room.githubRepo}>Github Project</Link>}
      </CardContent>
      <CardContent>{room.language}</CardContent>
    </Card>
  );
}

export default async function Home() {
  const rooms = await db.query.room.findMany();
  return (
    <main className="min-h-screen p-12">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl">Find Developer Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      {rooms.map((room) => {
        return <RoomCard key={room.id} room={room} />;
      })}
    </main>
  );
}
