import { NextResponse } from "next/server";
import { ilike, eq, and, asc, desc } from "drizzle-orm";

import { todos } from "app/db/schema";
import { db } from "app/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // get params
  const kw = searchParams.get("kw") || "";
  const status = searchParams.get("status") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const order = searchParams.get("order") || "";
  const sortField = searchParams.get("sortField") || "id";
  const whereClaus = [];

  if(kw) whereClaus.push(ilike(todos.todo, `%${kw}%`))
  if(status) whereClaus.push(eq(todos.completed, status === "true"))

  // valid field for sort
  const validSortField =  {
    id: todos.id,
    todo: todos.todo,
    createdDate: todos.createdDate
  }

  const result = await db.select()
                          .from(todos)
                          .where(whereClaus.length ? and(...whereClaus) : undefined)
                          .orderBy(order === "asc" ? asc(validSortField[sortField]) : desc(validSortField[sortField]))
  
  const total = result.length
  const start = (page - 1)*limit;
  const end = start + limit;
  const pageTodos = result.slice(start, end)

  return NextResponse.json({
    todos: pageTodos,
    total, 
    page,
    limit
  })

}

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);

  const result = await db.insert(todos).values({
    userId: body.userId, 
    todo: body.todo,
    completed: false,
    createdDate: new Date().toISOString()
  }).returning()

  return NextResponse.json(result[0])
}
