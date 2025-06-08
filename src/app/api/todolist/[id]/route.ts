import mysql from "mysql2/promise";

import { NextResponse } from "next/server";

import { GetDBSettings } from "shareCode/common";

// Delete todo by id
export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  console.log(id);

  try {
    const connectionsParams = GetDBSettings();
    const connection = await mysql.createConnection(connectionsParams);

    const query = `DELETE FROM todolist.todo WHERE id=?`;
    const values = [id];

    const result = await connection.execute(query, values);

    await connection.end();

    return NextResponse.json(result);
  } catch (err) {
    console.log("ERROR: ", (err as Error).message);
    const response = {
      error: (err as Error).message,
      returnStatus: 500,
    };
    return NextResponse.json({ response });
  }
}

// Update Todo status or content by id
export async function PATCH(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  const body = await request.json();
  const { todo, status } = body;
  console.log(todo, status);

  try {
    const connectionsParams = GetDBSettings();
    const connection = await mysql.createConnection(connectionsParams);

    const update: string[] = [];

    let query = `UPDATE todolist.todo `;
    const values: any[] = [];

    if (typeof status !== "undefined") {
      update.push("status = ?"), values.push(status ? 1 : 0);
    }
    if (typeof todo !== "undefined") {
      update.push("todo = ?");
      values.push(todo);
    }

    query += `SET ${update.join(", ")} WHERE id=?`;
    values.push(id);
    const [result] = await connection.execute(query, values);
    console.log(result);
    await connection.end();
    return NextResponse.json(result);
  } catch (err) {
    console.log("ERROR: ", (err as Error).message);
    const response = {
      error: (err as Error).message,
      returnStatus: 500,
    };
    return NextResponse.json({ response });
  }
}
