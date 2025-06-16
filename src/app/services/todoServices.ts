// Share services
import { todos, users } from "app/db/schema";
import { eq, sql } from "drizzle-orm";
import { getServerSession } from "next-auth/next";

import { db } from "app/db";
import { authOptions } from "auth";

export async function deleteTodoById(id: number) {
  return db.delete(todos).where(eq(todos.id, id)).returning();
}

export async function statistic(completed: boolean) {
  const authSession = await getServerSession(authOptions);
  const userID = (authSession?.user as { id?: number | string })?.id

  const result = await db.execute(
    sql`select * from ${todos} where ${todos.completed} = ${completed} and ${todos.userId} = ${userID}`
  );
  return Number(result.rowCount ?? 0);
}

export async function getUser(email: string) {
  return db.select().from(users).where(eq(users.email, email));
}
