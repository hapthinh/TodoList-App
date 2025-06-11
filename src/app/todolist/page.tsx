"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckSquare, X } from "@deemlol/next-icons";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import MuiPagination from "app/components/pagination";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import {
  postTodo,
  deteleTodo,
  updateTodoStatus,
  getTodos,
  deleteMultiTodo,
} from "../services/api";
import { Todo, User } from "app/types/type";
import AddTodo from "app/components/addTodo";
import FilterTodo from "app/components/filterTodo";
import Statistic from "app/components/statisticTodo";
import Checkbox from "@mui/material/Checkbox";
import Badge from "@mui/material/Badge";
import { useSession } from "next-auth/react";

// type todo response
interface TodoResponse {
  todos: Todo[];
  total: number;
  page: number;
  limit: number;
  completedCount: number;
  unCompletedCount: number;
}

export default function TodoPage() {
  const { data: session } = useSession()
  const userId = session?.user.id

  const searchParams = useSearchParams();
  const router = useRouter();

  // get params
  const inputSearch = searchParams.get("kw") || "";
  const selectStatus = searchParams.get("status") || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const sortOrder = (searchParams.get("order") as "asc" | "desc") || "asc";
  const sortField =
    (searchParams.get("sortField") as "todo" | "createdDate" | "status") ||
    "status";

  // set state
  const [searchInput, setSearchInput] = useState(inputSearch);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editTodo, setEditTodo] = useState("");
  const [checked, setChecked] = useState<boolean[]>([]);
  const [selectedId, setSelectedId] = useState<number[]>([]);

  const handleOnChange = (idx) => {
    const updateCheckedState = checked.map((item, index) =>
      index === idx ? !item : item
    );

    setChecked(updateCheckedState);
    const id = todos[idx].id;
    const newSelectedId = [...selectedId];
    if (updateCheckedState[idx]) newSelectedId.push(id);
    setSelectedId(newSelectedId);
  };

  // pageSize
  const pageSize = 10;

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
    },
  });

  // delete multi todo
  const deleteMultiTodoMutation = useMutation({
    mutationFn: deleteMultiTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos",
          inputSearch,
          selectStatus,
          sortOrder,
          sortField,
          currentPage,
          pageSize,],
      });
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

  useEffect(() => {
    setChecked(new Array(todos.length).fill(false));
    setSelectedId([]);
  }, [todos.length]);

  function Count() {
    let count = 0;
    selectedId.forEach(x => count++)
    return count
  }
  // Rendering
  return (
    <div className="text-2x1 text-white bg-[#FFE794] h-full grid-cols-subgrid border-2">
      {/* Header */}
      <div className="basis-128 text-center mb-4 mr-50 ml-50 text-5xl bg-[#FFE794] text-[#050505] font-extrabold">
        <ReceiptLongIcon />
        YourTODO{userId}
      </div>
      {/* Input và filter */}
      <div className="flex justify-center ml-100 gap-4 border bg-[#FEFFDF] mb-6 p-4 rounded-xl shadow w-278 text-black h-25">
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
      <div>
        {data && (
          <Statistic
            total={data.total || 0}
            completedCount={data.completedCount || 0}
            unCompletedCount={data.unCompletedCount || 0}
          />
        )}
        <Badge>
        <Button variant="outlined" startIcon={<Badge badgeContent={Count()} color="error"><DeleteIcon /></Badge>}
          onClick={() => {
            deleteMultiTodoMutation.mutate({
              idArray: selectedId,
            });
            console.log(selectedId);
          }}
        >
          Delete Selected Todo
        </Button>
        </Badge>
      </div>
      {/* Rendering */}
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : todos.length === 0 ? (
        <div className="text-center">No result</div>
      ) : (
        <div className="ml-20 mt-10">
          <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
            {todos.map((todo, idx) => (
              <Grid size={3} key={todo.id} justifyContent={"space-between"}>
                <Card
                  sx={{
                    width: 350,
                    backgroundColor: "#FEFFDF",
                    border: 1,
                    boxShadow: 10,
                  }}
                >
                  <Checkbox
                    size="small"
                    color="success"
                    checked={!!checked[idx]}
                    onChange={() => handleOnChange(idx)}
                  ></Checkbox>
                  <CardContent>
                    <Typography align="center" variant="h5">
                      {editId === todo.id ? (
                        <input
                          value={editTodo}
                          onChange={(e) => setEditTodo(e.target.value)}
                          type="text"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              updateTodoMutation.mutate({
                                id: todo.id,
                                todo: todo.todo,
                              });
                            }
                          }}
                        />
                      ) : (
                        <div>
                          {todo.todo}
                          <button
                            onClick={() => {
                              setEditId(todo.id);
                              setEditTodo(todo.todo);
                            }}
                          >
                            <EditOutlinedIcon />
                          </button>
                        </div>
                      )}
                    </Typography>
                    <Typography variant="h6" align="center">
                      {todo.completed ? (
                        <>
                          <CheckSquare className="text-green-600 inline" /> Done
                        </>
                      ) : (
                        <>
                          <X className="text-red-600 inline" /> Pending
                        </>
                      )}
                    </Typography>
                    <Typography>
                      {todo.createdDate
                        ? new Date(todo.createdDate).toLocaleDateString("vi-VN")
                        : ""}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      backgroundColor: "#fafafa",
                      justifyContent: "space-around",
                    }}
                  >
                    <Button
                      disabled={todo.completed}
                      onClick={() =>
                        updateTodoMutation.mutate({
                          id: todo.id,
                          completed: !todo.completed,
                        })
                      }
                    >
                      <DoneIcon />
                      Mark Done
                    </Button>
                    <Button
                      color="error"
                      onClick={() => deleteTodoMutation.mutate({ id: todo.id })}
                    >
                      <DeleteIcon />
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
      {/* Pagination */}
      {data && (
        <MuiPagination
          currentPage={currentPage}
          total={data.total}
          pageSize={pageSize}
          router={router}
          searchParams={searchParams}
        />
      )}
    </div>
  );
}
