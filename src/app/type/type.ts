//Type of Todo
export type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  createdDate: Date;
};

// Type of Todos
export type Todos = {
  todos: Todo[];
};
