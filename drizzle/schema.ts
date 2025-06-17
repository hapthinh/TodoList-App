import { pgTable, foreignKey, serial, text, boolean, integer, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const todo = pgTable("todo", {
	id: serial().primaryKey().notNull(),
	todo: text(),
	completed: boolean().default(false),
	createdDate: text(),
	userId: integer("user_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "todo_user_id_user_id_fk"
		}),
]);

export const blog = pgTable("blog", {
	id: integer().primaryKey().notNull(),
	title: text(),
	content: text(),
});

export const user = pgTable("user", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	password: text().notNull(),
});
