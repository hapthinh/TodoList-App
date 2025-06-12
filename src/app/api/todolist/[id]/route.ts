import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "app/db";
import { todos } from "app/db/schema";
import { deleteTodoById } from "app/services/todoServices";

// Delete todo by id
export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = Number(url.pathname.split("/").pop());
  const result = await deleteTodoById(id);

  return NextResponse.json(result[0]);
}

// Update Todo status or content by id
export async function PATCH(request: Request) {
  const url = new URL(request.url);
  const id = Number(url.pathname.split("/").pop());
  const body = await request.json();
  const updateData: any = {};

  // if have todo or completed
  if (typeof body.todo !== "undefined") updateData.todo = body.todo;
  if (typeof body.completed !== "undefined")
    updateData.completed = body.completed;

  // Update todo set ... where todo.id = id
  const result = await db
    .update(todos)
    .set(updateData)
    .where(eq(todos.id, id))
    .returning();

  return NextResponse.json(result[0]);
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const id = Number(url.pathname.split("/").pop())
  const result = await db.select().from(todos).where(eq(todos.id,id));
  console.log(result)
  return NextResponse.json(result)
}
