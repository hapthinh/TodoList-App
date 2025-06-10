import { db } from "app/db";
import { todos } from "app/db/schema";
import { count, eq } from "drizzle-orm";

export async function deleteTodoById(id: number) {
  return db.delete(todos).where(eq(todos.id, id)).returning();
}

export async function getTodoById(id: number) {
  return db.select().from(todos).where(eq(todos.id, id));
}

export async function statistic(completed: boolean) {
  const result = await db
    .select({ count: count(todos.completed) })
    .from(todos)
    .where(eq(todos.completed, completed));
  return Number(result[0].count ?? 0);
}
