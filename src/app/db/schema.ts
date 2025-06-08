import { PgTable, serial, text, boolean, pgTable } from "drizzle-orm/pg-core";

export const todos = pgTable("todo", {
  id: serial("id").primaryKey(),
  todo: text("content"),
  completed: boolean("completed").default(false),
  createdDate: text("createdDate"),
});
