"use server";

import { getSession } from "@/lib/auth";
import { deleteAccount } from "@/services/user";

export async function deleteAccountAction() {
  const session = await getSession();
  if (!session) {
    throw new Error("You must be logged in to delete your account");
  }
  await deleteAccount(session.user.id);
}
