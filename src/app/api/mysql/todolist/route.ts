import { error } from "console";
import mysql from "mysql2/promise";

import { NextResponse } from "next/server";

import { GetDBSettings } from "shareCode/common";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const kw = searchParams.get("kw") || "";
  const status = searchParams.get("status") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const order = searchParams.get("order") || "";
  const sortField = searchParams.get("sortField") || "";

  try {
    const connectionsParams = GetDBSettings();
    const connection = await mysql.createConnection(connectionsParams);

    let query = "SELECT * FROM todolist.todo WHERE todo ";
    const values: any[] = [];

    if (kw) {
      query += "LIKE ?";
      values.push(`%${kw}%`);
    }
    if (status) {
      query += "WHERE status=?";
      values.push(status);
    }

    query += ` ORDER BY ${sortField} ${order}`;

    const [result] = await connection.execute(query, values);

    await connection.end();

    const total = [result];
    const len = total.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const pageTodos = total.slice(start, end);

    return NextResponse.json({
      todos: pageTodos,
      len,
      page,
      limit,
    });
  } catch (error) {
    console.log("ERROR: ", (error as Error).message);
    const response = {
      error: (error as Error).message,

      returnedStatus: 200,
    };

    return NextResponse.json(response, { status: 200 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  const id = Date.now();
  const todoContent = body.todo;

  try {
    const connectionsParams = GetDBSettings();
    const connection = await mysql.createConnection(connectionsParams);

    const query = `
      INSERT INTO todolist.todo (id, todo, status, createdDate)
      VALUES (?, ?, ?, ?)
    `;
    const createdDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    const values = [id, todoContent, 1, createdDate];

    const [result] = await connection.execute(query, values);

    await connection.end();
    console.log("Query:", query);
    console.log("Values:", values);

    return NextResponse.json({ result });
  } catch (err) {
    console.log("ERROR: ", (err as Error).message);
    const response = {
      error: (err as Error).message,
      returnStatus: 200,
    };
    return response;
  }
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const id = body.id;

  try {
    const connectionsParams = GetDBSettings();
    const connection = await mysql.createConnection(connectionsParams);

    let query = "DELETE FROM todolist.todo";
    const values: any[] = [];

    query += ` WHERE id=${id}`;

    const [result] = await connection.execute(query, values);

    await connection.end();

    return NextResponse.json(result);
  } catch (err) {
    console.log("ERROR: ", (err as Error).message);
    const response = {
      error: (err as Error).message,
      returnSatus: 200,
    };
  }
}
