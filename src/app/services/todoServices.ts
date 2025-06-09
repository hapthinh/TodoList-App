import { db } from "app/db";
import { todos } from "app/db/schema";
import { eq } from "drizzle-orm";

export async function deleteTodoById(id: number) {
  return db.delete(todos).where(eq(todos.id, id)).returning();
}

export async function getTodoById(id: number) {
  return db.select().from(todos).where(eq(todos.id, id));
}
