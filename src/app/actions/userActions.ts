"use server";

import { db } from "app/db";
import { users } from "app/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const getAlluser = async () => {
  const data = await db.select().from(users);
  return data;
};

export const getUser = async (id: number) => {
  const data = await db.select().from(users).where(eq(users.id, id));
  return data;
};

export const addUser = async (name: string, email: string) => {
  await db.insert(users).values({
    name: name,
    email: email,
  });
  revalidatePath("/");
};
