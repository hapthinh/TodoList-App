import { Todo } from "./type";

export interface TodoCardProps {
  todo: Todo;
  idx: number;
  checked: boolean;
  editId: number | null;
  editTodo: string;
  setEditId: (id: number | null) => void;
  setEditTodo: (todo: string) => void;
  onCheck: (idx: number) => void;
  onUpdate: (args: { id: number; todo?: string; completed?: boolean }) => void;
  onDelete: (args: { id: number }) => void;
}

export interface DeleteBtnProps {
    selectedId: number[],
    onCount,
    onDelete: (args : {idArray: number[]}) => void;
}

// type todo response
export interface TodoResponse {
  todos: Todo[];
  total: number;
  page: number;
  limit: number;
  completedCount: number;
  unCompletedCount: number;
}
