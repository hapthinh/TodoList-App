import { serial, text, boolean, pgTable } from "drizzle-orm/pg-core";

// Table Todo
export const todos = pgTable("todo", {
  id: serial("id").primaryKey(),
  todo: text("todo"),
  completed: boolean("completed").default(false),
  createdDate: text("createdDate"),
});
