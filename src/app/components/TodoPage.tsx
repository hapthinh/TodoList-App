"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckSquare, X, PenTool } from "@deemlol/next-icons";

import { postTodo, deteleTodo, updateTodoStatus, getTodos } from "../services/api";
import { Todo } from "app/type/type";
import AddTodo from "./addTodo";
import FilterTodo from "./filterTodo";
import Statistic from "./statisticTodo";
import Pagination from "./pagination";
import { getUser } from "app/actions/userActions";
import { users } from "app/db/schema";

interface TodoResponse {
  todos: Todo[];
  total: number;
  page: number;
  limit: number;
}

export default async function TodoPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // get params
  const inputSearch = searchParams.get("kw") || "";
  const selectStatus = searchParams.get("status") || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const sortOrder = (searchParams.get("order") as "asc" | "desc") || "asc";
  const sortField =
    (searchParams.get("sortField") as "todo" | "createdDate") || "todo";

  // set state
  const [searchInput, setSearchInput] = useState(inputSearch);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editTodo, setEditTodo] = useState("");

  // pageSize
  const pageSize = 10;

  const userId = await getUser(users[0].id)

  const queryClient = useQueryClient();

  // search keyword
  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("kw", value);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  // Get all Todo or get Todo by keyword or get Todo by status
  const { data, isLoading } = useQuery<TodoResponse, Error>({
    queryKey: [
      "todos",
      inputSearch,
      selectStatus,
      sortOrder,
      sortField,
      currentPage,
      pageSize,
    ],
    queryFn: async () => {
      const result = await getTodos({
        kw: inputSearch,
        status: selectStatus,
        order: sortOrder,
        sortField: sortField,
        currentPage: currentPage,
        pageSize: pageSize,
        userId: String(userId[0])
      });
      console.log("QueryFn result:", result);
      return result;
    },
    staleTime: 30 * 1000,
    gcTime: 5 * 1000 * 60,
    placeholderData: keepPreviousData,
  });

  // Add todo
  const postTodoMutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "todos",
          inputSearch,
          selectStatus,
          sortOrder,
          sortField,
          currentPage,
          pageSize,
        ],
      });
    },
  });

  // delete todo
  const deleteTodoMutation = useMutation({
    mutationFn: deteleTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "todos",
          inputSearch,
          selectStatus,
          sortOrder,
          sortField,
          currentPage,
          pageSize,
        ],
      });
      setEditTodo("");
    },
  });

  // update todo
  const updateTodoMutation = useMutation({
    mutationFn: updateTodoStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "todos",
          inputSearch,
          selectStatus,
          sortOrder,
          sortField,
          currentPage,
          pageSize,
        ],
      });
    },
  });

  // Get Data Todo
  let todos: Todo[] = Array.isArray(data?.todos)
    ? data.todos.map((todo: Todo) => ({
        ...todo,
        createdDate: todo.createdDate,
      }))
    : [];

  // Render Action
  const renderActions = (todo: Todo) => {
    return (
      <>
        <div className="mt-1">
          {/* Delete Button */}
          <button
            className="px-2 py-1 rounded bg-red-200 text-red-800 hover:bg-red-500 transition"
            onClick={() => deleteTodoMutation.mutate({ id: todo.id })}
          >
            Xóa
          </button>
          {/* Change status button */}
          <button
            className="px-2 py-1 rounded bg-yellow-200 text-yellow-800 hover:bg-yellow-400 transition ml-1"
            onClick={() =>
              updateTodoMutation.mutate({
                id: todo.id,
                completed: !todo.completed,
              })
            }
          >
            Đổi trạng thái
          </button>
        </div>
      </>
    );
  };

  // Rendering
  return (
    <div className="text-2x1 text-white mr-50 ml-50 mt-10 ">
      {/* Header */}
      <div className="basis-128 text-center font-bold mb-4 mr-50 ml-50 text-2xl bg-[#31a146] text-[#e4f2e6] rounded-2xl">
        <p>TODOLIST</p>
      </div>
      {/* Input và filter */}
      <div className="flex items-center gap-4 border bg-[#c2f1cb] mb-6 p-4 rounded-xl shadow ml-50 w-180 text-black">
        {/* Add todo */}
        <AddTodo
          input={input}
          setInput={setInput}
          onAdd={() => {
            if (input.trim()) {
              postTodoMutation.mutate({
                todo: input,
              });
              setInput("");
            }
          }}
        />
        {/* Search & Filter Status*/}
        <FilterTodo 
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleSearch={handleSearch}
          selectStatus={selectStatus}
          searchParams={searchParams}
          router={router}
        />
      </div>
      {/* Statistic */}
      <Statistic todos={todos} />
      {/* Table */}
      <div className="mr-50 ml-50">
        <table className="table-auto border-1 w-full text-black bg-white rounded-2xl">
          {/* Table Head */}
          <thead className="border-1 bg-[#2f8d40] h-10 text-white">
            <tr>
              <th>
                Todo
                <button
                  className="ml-2 px-2 py-1 rounded bg-[#2f8d40] text-[#c6c2aa] hover:bg-indigo-200 transition"
                  onClick={() => {
                    const newOrder =
                      sortField === "todo"
                        ? sortOrder === "asc"
                          ? "desc"
                          : "asc"
                        : "asc"; // if sortField = todo && sortOrder = asc => desc else asc
                    const params = new URLSearchParams(searchParams.toString());
                    params.set("order", newOrder);
                    params.set("sortField", "todo");
                    router.push(`?${params.toString()}`); // push url
                  }}
                  title="Sắp xếp theo bảng chữ cái"
                >
                  {sortField === "todo"
                    ? sortOrder === "asc"
                      ? "▲"
                      : "▼"
                    : "↕"}{" "}
                </button>
              </th>
              <th>Status</th>
              <th>
                Created Date
                <button
                  className="ml-2 px-2 py-1 rounded bg-[#2f8d40] text-[#c6c2aa] hover:bg-indigo-200 transition"
                  onClick={() => {
                    const newOrder = sortOrder === "asc" ? "desc" : "asc";
                    const params = new URLSearchParams(searchParams.toString());
                    params.set("order", newOrder);
                    params.set("sortField", "createdDate");
                    router.push(`?${params.toString()}`); //push url
                  }}
                  title="Sắp xếp theo bảng chữ cái"
                >
                  {sortField === "createdDate"
                    ? sortOrder === "asc"
                      ? "▲"
                      : "▼"
                    : "↕"}
                </button>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* Table content */}
          <tbody>
            {/* Loading */}
            {isLoading ? (
              <tr>
                <td colSpan={3} className="text-center">
                  Đang tải...
                </td>
              </tr>
            ) : todos.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center">
                  Không có kết quả
                </td>
              </tr>
            ) : (
              todos.map((todo, idx) => (
                <tr
                  key={todo.id}
                  className={`border-1 h-10 ${
                    idx % 2 === 0 ? "bg-[#c2f1cb]" : "bg-[#ebf1ec]"
                  }`}
                >
                  <td className="text-center">
                    {editId === todo.id ? (
                      <input
                        value={editTodo}
                        onChange={(e) => setEditTodo(e.target.value)}
                        className=""
                        onBlur={() => setEditId(null)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            updateTodoMutation.mutate({
                              id: todo.id,
                              todo: editTodo,
                            });
                          }
                        }}
                        autoFocus
                      />
                    ) : (
                      <>
                        <Link href={`/todo/${todo.id}`}>{todo.todo}</Link>
                        <button
                          className="ml-2 h-3"
                          onClick={() => {
                            setEditId(todo.id);
                            setEditTodo(todo.todo);
                          }}
                          title="Sửa todo"
                        >
                          <PenTool size={16} color="#CCC7BA" />
                        </button>
                      </>
                    )}
                  </td>
                  <td className="content-center">
                    {todo.completed ? (
                      <>
                        <CheckSquare className="text-green-600 inline" /> Done
                      </>
                    ) : (
                      <>
                        <X className="text-red-600 inline" /> Pending
                      </>
                    )}
                  </td>
                  <td className="text-center">
                    {todo.createdDate
                      ? new Date(todo.createdDate).toLocaleDateString("vi-VN")
                      : ""}
                  </td>
                  <td className="flex flex-row gap-2 justify-center">
                    {renderActions(todo)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* Pagination */}
        <Pagination 
          currentPage = {currentPage}
          data = {data}
          pageSize = {pageSize}
          router = {router}
          searchParams = {searchParams}
        />
      </div>
    </div>
  );
}
