import { Key } from "react";

//Type of Todo
export type Todo = {
  id: number;
  todo: string;
  status: boolean;
  createdDate: Date;
};

// Type of Todos
export type Todos = {
  todos: Todo[];
};

