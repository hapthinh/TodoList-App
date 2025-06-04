import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

import { Todo, Todos } from "app/data/type";

// Path file json -> app/json/todolist.json
const file = path.join(process.cwd() + "/src/app/json/todolist.json");

// Get all todos or todo by keyword or tody by completed
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Get params
  const keyword = searchParams.get("kw") || "";
  const status = searchParams.get("status") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const order = searchParams.get("order") || "";
  const sortField = searchParams.get("sortField") || "todo";

  // Read file
  const raw = await fs.readFile(file, "utf-8");
  const data = JSON.parse(raw) as Todos;

  let todos = [...data.todos];

  // Filter by keyword
  if (keyword) {
    todos = todos.filter((todo: Todo) =>
      String(todo.todo).toLowerCase().includes(keyword.toLowerCase())
    );
  }

  // Filter by status
  if (status) {
    todos = todos.filter((todo: Todo) => String(todo.status) === status);
  }

  // Sort by field
  if (sortField === "todo") {
    todos.sort((a: Todo, b: Todo) =>
      order === "asc"
        ? a.todo.localeCompare(b.todo) // if asc => a vs b else desc => b vs a
        : b.todo.localeCompare(a.todo)
    );
  } else if (sortField === "createdDate") {
    todos.sort((a: Todo, b: Todo) => {
      const dateA = new Date(a.createdDate).getTime();
      const dateB = new Date(b.createdDate).getTime(); 
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  }

  // Pagination
  const total = todos.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const pageTodos = todos.slice(start, end);

  return NextResponse.json({
    todos: pageTodos,
    total,
    page,
    limit,
  });
}

// Post new Todo
export async function POST(request: Request) {
  const raw = await fs.readFile(file, "utf-8");
  const body = await request.json();
  const data = JSON.parse(raw);
  const newTodo = {
    ...body,
    status: false,
    createdDate: new Date().toISOString(),
  };

  data.todos.push(newTodo);

  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");

  return NextResponse.json(newTodo);
}

// Delete Todo by Id
export async function DELETE(request: Request) {
  const raw = await fs.readFile(file, "utf-8");
  const body = await request.json();
  const data = JSON.parse(raw);
  const id = body.id;

  data.todos = data.todos.filter((todo: Todo) => todo.id !== id);

  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");

  return NextResponse.json({ success: true });
}
