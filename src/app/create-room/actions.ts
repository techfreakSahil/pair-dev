"use server";
import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { createRoom } from "@/services/room";
import { revalidatePath } from "next/cache";

export async function createRoomAction(roomData: Omit<Room, "userId" | "id">) {
  const session = await getSession();
  console.log(session);
  if (!session) {
    throw new Error("Unauthorized to create room, login first");
  }

  await createRoom(roomData, session.user.id);

  revalidatePath("/");
}
