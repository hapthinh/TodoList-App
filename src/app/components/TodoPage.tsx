"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useEffect, useState, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckSquare, X, PenTool } from "@deemlol/next-icons";

import { postTodo, deteleTodo, updateTodoStatus, getTodos } from "../lib/api";
import { Todo } from "app/data/type";

interface TodoResponse {
  todos: Todo[];
  total: number;
  page: number;
  limit: number;
}

export default function TodoPage() {
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

  const queryClient = useQueryClient();

  // search keyword
  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("kw", value);
    router.push(`?${params.toString()}`);
  };

  // Get all Todo or get Todo by keyword or get Todo by status
  const { data, isLoading, isFetching } = useQuery<TodoResponse, Error>({
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
      console.log("🔄 QueryFn called with:", {
        kw: inputSearch,
        status: selectStatus,
        order: sortOrder,
        sortField: sortField,
        currentPage: currentPage,
        pageSize: pageSize,
      });
      const result = await getTodos({
        kw: inputSearch,
        status: selectStatus,
        order: sortOrder,
        sortField: sortField,
        currentPage: currentPage,
        pageSize: pageSize,
      });
      console.log("✅ QueryFn result:", result);
      return result;
    },
    staleTime: 30 * 1000,
    gcTime: 5 * 1000 * 60,
    placeholderData: keepPreviousData,
    enabled: true,
  });

  console.log("🔑 QueryKey:", [
    "todos",
    inputSearch,
    selectStatus,
    sortOrder,
    sortField,
    currentPage,
    pageSize,
  ]);

  useEffect(() => {
    if (data) {
      console.log("➡️ Current page:", currentPage, "Data:", data);
      // kiểm tra data.page === currentPage trước khi render chẳng hạn
    }
  }, [data]);

  /*
  useEffect(() => {
    if (data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["todos", currentPage + 1],
        queryFn: () => getTodos(Number(currentPage) + 1),
      });
    }
  });
  */

  // Add todo
  const postTodoMutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Delete Todo
  const deleteTodoMutation = useMutation({
    mutationFn: deteleTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setEditTodo("");
    },
  });

  // Update Todo status or Todo Content
  const updateTodoMutation = useMutation({
    mutationFn: updateTodoStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
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
                status: !todo.status,
              })
            }
          >
            Đổi trạng thái
          </button>
        </div>
      </>
    );
  };

  console.log("🔔 Render state:", { data, isLoading, isFetching });
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
        <div className="flex items-center gap-2">
          <input
            className="text-black rounded-lg border border-indigo-400 focus:ring-2 focus:ring-indigo-500 px-4 py-2 w-56 outline-none transition"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Viết todo mới"
          />
          <button
            className="text-gray-100 px-4 py-2 rounded-lg font-semibold shadow hover:bg-lime-800 transition bg-[#c6c2aa]"
            onClick={() => {
              if (input.trim()) {
                postTodoMutation.mutate({
                  id: Date.now(),
                  todo: input,
                });
                setInput("");
              }
            }}
          >
            Thêm Todo
          </button>
        </div>
        {/* Search */}
        <div className="flex items-center gap-2">
          <input
            className="text-black rounded-lg border border-gray-500 focus:ring-2 focus:ring-indigo-400 px-4 py-2 w-44 outline-none transition"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch(searchInput);
            }}
            onBlur={() => handleSearch(searchInput)}
            placeholder="Tìm theo từ khóa"
          />
        </div>
        {/* Filter status */}
        <div className="flex items-center gap-2">
          {/* Combobox */}
          <Combobox
            value={selectStatus}
            onChange={(value) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("status", value ?? "");
              params.set("page", "1");
              router.push(`?${params.toString()}`);
            }}
          >
            <ComboboxInput
              className="text-black rounded-lg border border-gray-500 px-4 py-2 w-32 outline-none"
              displayValue={() =>
                selectStatus === "true"
                  ? "Done"
                  : selectStatus === "false"
                  ? "Pending"
                  : "Tất cả"
              }
              placeholder="Trạng thái"
            />
            <ComboboxOptions className="border-indigo-400 text-black font-semibold bg-stone-200 rounded-2xl border-2 shadow-lg mt-2 divide-y divide-indigo-200">
              <ComboboxOption
                value=""
                className="px-4 py-2 hover:bg-indigo-100 cursor-pointer rounded-t-2xl"
              >
                Tất cả
              </ComboboxOption>
              <ComboboxOption
                value="true"
                className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
              >
                Done
              </ComboboxOption>
              <ComboboxOption
                value="false"
                className="px-4 py-2 hover:bg-indigo-100 cursor-pointer rounded-b-2xl"
              >
                Pending
              </ComboboxOption>
            </ComboboxOptions>
          </Combobox>
        </div>
      </div>
      {/* Statistic */}
      <div className="text-black ml-50 text-2xl ">
        Tổng số: {todos.length} | Đã hoàn thành:{" "}
        {todos.filter((t) => t.status).length} | Đang thực hiện:{" "}
        {todos.filter((t) => !t.status).length}
      </div>
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
                        : "asc"; // set sortField = todo and sortOrder asc || desc
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
            {isLoading || isFetching ? (
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
                    {todo.status ? (
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
        <div className="text-black mt-2">
          <button
            className="px-3 py-1 rounded bg-[#c6c2aa] hover:bg-gray-300"
            disabled={currentPage <= 1}
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", String(currentPage - 1));
              router.push(`?${params.toString()}`);
            }}
          >
            Trang trước
          </button>
          <span className="ml-55 mr-55">
            Trang {currentPage} / {data ? Math.ceil(data.total / pageSize) : 1}
          </span>
          <button
            className="px-3 py-1 rounded bg-[#c6c2aa] hover:bg-gray-300"
            disabled={data && currentPage >= Math.ceil(data.total / pageSize)}
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", String(currentPage + 1));
              router.push(`?${params.toString()}`);
            }}
          >
            Trang sau
          </button>
        </div>
      </div>
    </div>
  );
}
