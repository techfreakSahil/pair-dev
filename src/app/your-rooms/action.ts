"use server";

import { deleteRoom, getRoom } from "@/services/room";
import { getSession } from "next-auth/react";
import { revalidatePath } from "next/cache";

export async function deleteRoomAction(roomId: string) {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized to delete room, login first");
  }
  const room = await getRoom(roomId);
  if (room?.userId !== session.user.id) {
    throw new Error("User not authorized");
  }
  await deleteRoom(roomId);

  revalidatePath("/your-rooms");
}
