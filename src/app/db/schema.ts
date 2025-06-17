import { relations } from "drizzle-orm";
import {
  serial,
  text,
  boolean,
  pgTable,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

// Table Todo
export const todos = pgTable("todo", {
  id: serial("id").primaryKey(),
  todo: text("todo"),
  completed: boolean("completed").default(false),
  createdDate: text("createdDate"),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

// Table user
export const users = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password : text('password').notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const blog = pgTable("blog", {
	id: integer().primaryKey().notNull(),
	title: text(),
	content: text(),
});

// todo 1-1 or n-1 user
export const todoRelations = relations(todos, ({ one }) => ({
  users: one(users, { fields: [todos.userId], references: [users.id] }),
}));

// user 1-n todo
export const userRelations = relations(users, ({ many }) => ({
  todos: many(todos),
}));
