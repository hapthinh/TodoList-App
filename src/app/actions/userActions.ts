"use server";

import { db } from "app/db";
import { users } from "app/db/schema";
import { eq } from "drizzle-orm";

export const getAlluser = async () => {
  const data = await db.select().from(users);
  return data;
};

export const getUser = async (id: number) => {
  const data = await db.select().from(users).where(eq(users.id, id));
  return data;
};
