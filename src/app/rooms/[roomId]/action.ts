"use server";

import { getSession } from "next-auth/react";
import { StreamChat } from "stream-chat";

export async function generateTokenAction() {
  const session = await getSession();
  if (!session) {
    throw new Error("No session found");
  }
  const api_key = process.env.NEXT_STREAM_API_KEY!;
  const api_secret = process.env.NEXT_STREAM_SECRET_KEY!;

  const serverClient = StreamChat.getInstance(api_key, api_secret);
  const token = serverClient.createToken(session.user.id);

  return token;
}
