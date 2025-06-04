import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Todo = {
  id: number;
  todo: string;
  completed: boolean;
};

export type Todos = {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
};

export interface TodoState {
  items: Todo[];
}

const initState: TodoState = {
  items: [],
};

var idTodo = 0;
const TodoSlice = createSlice({
  name: "todoSlice",
  initialState: initState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.items.push({
        id: ++idTodo,
        todo: action.payload,
        completed: false,
      });
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, removeTodo } = TodoSlice.actions;
export const todoReducer = TodoSlice.reducer;
