import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

import { Todo } from "app/data/type";

// path file json -> app/json/todolist.json
const file = path.join(process.cwd() + "/src/app/json/todolist.json");

// delete todo by id
export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  const raw = await fs.readFile(file, "utf-8");
  const data = JSON.parse(raw);

  // check id
  if (!id) return NextResponse.json({ success: false, error: "Missing id" });

  // find all todo have id # request.id
  data.todos = data.todos.filter((todo: any) => Number(todo.id) !== Number(id));
  try {
    await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Lỗi ghi file:", err);
    return NextResponse.json({ success: false, error: "Lỗi ghi file" });
  }
  return NextResponse.json({ success: true });
}

// Update Todo status or content by id
export async function PATCH(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  const body = await request.json();
  const { todo, status } = body;

  const raw = await fs.readFile(file, "utf-8");
  const data = JSON.parse(raw);

  // find todo have id === request.id => update status this todo
  const idx = data.todos.findIndex((t: Todo) => String(t.id) === String(id));

  // check id
  if (idx === -1) {
    return NextResponse.json({ success: false });
  }
  if (typeof todo !== "undefined") data.todos[idx].todo = todo;
  if (typeof status !== "undefined") data.todos[idx].status = status;

  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");

  return NextResponse.json({ data: data.todos[idx], success: true });
}

// GET todo by id
export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  const raw = await fs.readFile(file, "utf-8");
  const data = JSON.parse(raw);

  if (!id) return NextResponse.json({ success: false, error: "Missing id" });

  const todo = data.todos.find((todo: any) => String(todo.id) === String(id));
  if (!todo) return NextResponse.json({ success: false, error: "Not found" });

  return NextResponse.json(todo);
}
