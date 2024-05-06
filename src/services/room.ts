import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq, like } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

export async function getRooms(search: string | undefined) {
  unstable_noStore();
  const where = search ? like(room.tags, `%${search}%`) : undefined;
  const rooms = await db.query.room.findMany({
    where,
  });
  return rooms;
}

export async function getRoom(roomId: string) {
  unstable_noStore();
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}

export async function getUserRooms() {
  unstable_noStore();
  const session = await getSession();
  if (!session) {
    throw new Error("User is not authorized");
  }

  const rooms = await db.query.room.findMany({
    where: eq(room.id, session.user.id),
  });
  return rooms;
}

export async function deleteRoom(roomId: string) {
  unstable_noStore();
  await db.delete(room).where(eq(room.id, roomId));
}

export async function createRoom(
  roomData: Omit<Room, "userId" | "id">,
  userId: string
) {
  unstable_noStore();
  await db.insert(room).values({ ...roomData, userId });
}

export async function editRoom(roomData: Room) {
  await db.update(room).set(roomData).where(eq(room.id, roomData.id));
}
