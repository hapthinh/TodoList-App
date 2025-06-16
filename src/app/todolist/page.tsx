"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

// icons & layout
import { CheckSquare, X } from "@deemlol/next-icons";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import EditOutlinedTwoToneIcon from "@mui/icons-material/EditOutlined";
import Checkbox from "@mui/material/Checkbox";
import Badge from "@mui/material/Badge";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  postTodo,
  deteleTodo,
  updateTodoStatus,
  getTodos,
  deleteMultiTodo,
} from "../services/api";
import { Todo } from "app/types/type";
import AddTodo from "app/components/addTodo";
import FilterTodo from "app/components/filterTodo";
import Statistic from "app/components/statisticTodo";
import SortOrder from "app/components/sortOrder";
import SelectedPageSize from "app/components/selectedPageSize";
import SelectStatus from "app/components/selectBox";
import MuiPagination from "app/components/pagination";
import { usepostTodoMutation, useDeleteSelectedTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } from "app/lib/queries/mutations";

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
  const { data : session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  console.log(session)
  // check status session
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // page size
  const [pageSize, setPageSize] = useState(8);

  // get params from url
  const inputSearch = searchParams.get("kw") || "";
  const selectStatus = searchParams.get("status") || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const sortOrder = (searchParams.get("order") as "asc" | "desc") || "asc";
  const sortField =
    (searchParams.get("sortField") as "todo" | "createdDate" | "status") ||
    "status";
  const limit = Number(searchParams.get("limit")) || pageSize;

  // set state
  const [searchInput, setSearchInput] = useState(inputSearch);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editTodo, setEditTodo] = useState("");
  const [checked, setChecked] = useState<boolean[]>([]);
  const [selectedId, setSelectedId] = useState<number[]>([]);

  // handle selected Todo
  const handleOnChange = (idx) => {
    // if index = idx => item !
    const updateCheckedState = checked.map((item, index) =>
      index === idx ? !item : item
    );

    // setchecked = arr update..
    setChecked(updateCheckedState);
    // get id
    const id = todos[idx].id;
    // get ... arr num
    let newSelectedId = [...selectedId];
    if (updateCheckedState[idx]) newSelectedId.push(id);
    else newSelectedId = newSelectedId.filter((item) => item !== id);
    setSelectedId(newSelectedId);
  };

  // search keyword
  const handleSearch = (event, value: string) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set("kw", value);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
    setSearchInput("");
  };

  // handle change pagesize => set page = 1
  const handleChangePageSize = (newPageSize: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", String(newPageSize));
    params.set("page", "1");
    router.push(`?${params.toString()}`);
    setPageSize(newPageSize);
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
      limit,
    ],
    queryFn: async () => {
      const result = await getTodos({
        kw: inputSearch,
        status: selectStatus,
        order: sortOrder,
        sortField: sortField,
        currentPage: currentPage,
        pageSize: limit,
      });
      return result;
    },
    staleTime: 30 * 1000,
    gcTime: 5 * 1000 * 60,
    placeholderData: keepPreviousData,
  });

  const queryKey = [
      "todos",
      inputSearch,
      selectStatus,
      sortOrder,
      sortField,
      currentPage,
      limit,
    ]

  // Get Data Todo
  const todos: Todo[] = Array.isArray(data?.todos)
    ? data.todos.map((todo: Todo) => ({
        ...todo,
        createdDate: todo.createdDate,
      }))
    : [];

  // Mutations
  const postTodoMutation = usepostTodoMutation(queryKey)
  const deleteTodoMutation = useDeleteTodoMutation(queryKey)
  const updateTodoMutation = useUpdateTodoMutation(queryKey, setEditId, setEditTodo)
  const deleteMultiTodoMutation = useDeleteSelectedTodoMutation(queryKey, setChecked, setSelectedId,todos.length)

  // if todos.length change =>
  useEffect(() => {
    setChecked(new Array(todos.length).fill(false));
    setSelectedId([]);
  }, [todos.length]);

  // count selected id
  function Count() {
    return checked.filter(Boolean).length;
  }

  // Rendering
  return (
    <div className="text-2x1 text-white bg-gradient-to-r from-amber-100 to-amber-300 h-full grid-cols-subgrid border-2 min-h-screen">
      <div className="flex justify-end">
        <button
          className="text-black hover:scale-150 text-3xl"
          onClick={() => signOut({ redirect: false, callbackUrl: "/" })}
        >
          <LogoutIcon fontSize="large" />
        </button>
      </div>
      {/* Header */}
      <div className="basis-128 text-center mb-4 text-5xl bg-gradient-to-r from-amber-100 to-amber-300 text-[#050505] font-extrabold flex justify-center mt-5">
        <Image src="/todo.svg" alt="todo" width={40} height={40} />
        <p className="ml-2">YourTODO</p>
      </div>

      {/* Input và filter */}
      <div className="flex justify-items-center-safe ml-100 gap-4 mb-6 p-4 shadow w-280 text-black h-25 rounded-xl bg-[#eff1a0]">
        <div className="w-100 bg-[#FEFFDF] flex-1/3 rounded-xl">
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
        </div>
        <div className="flex-1/3 bg-[#FEFFDF] rounded-xl flex justify-center">
          {/* Search keyword */}
          <FilterTodo
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            handleSearch={handleSearch}
          />
        </div>
        <div className="flex flex-1/3 justify-center bg-[#FEFFDF] rounded-xl">
          <div className="flex flex-row mt-0.5">
          {/* Filter */}
          <SelectStatus
            selectStatus={selectStatus}
            searchParams={searchParams}
            router={router}
          />
          <SortOrder
            selectedOrder={sortOrder}
            searchParams={searchParams}
            router={router}
          />
          <SelectedPageSize
            SelectedPageSize={pageSize}
            onChangePageSize={handleChangePageSize}
          />
          </div>
        </div>
      </div>
      {/* Statistic */}
      <div>
        {data && (
          <Statistic
            completedCount={data.completedCount || 0}
            unCompletedCount={data.unCompletedCount || 0}
          />
        )}
      </div>
      <div className="flex justify-end">
        {/* Delete Selected Todo Btn */}
        <div>
          <Badge>
            <Button
              variant="outlined"
              color="primary"
              startIcon={
                <Badge badgeContent={Count()} color="error">
                  <DeleteIcon />
                </Badge>
              }
              onClick={() => {
                deleteMultiTodoMutation.mutate({
                  idArray: selectedId,
                });
              }}
              className="flex justify-items-end"
              disabled={selectedId.length === 0}
            >
              Delete Selected Todo
            </Button>
          </Badge>
        </div>
      </div>
      {/* Rendering */}
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : todos.length === 0 ? (
        <div className="text-center">No result</div>
      ) : (
        <div className="ml-20 mt-10">
          {/* Render grid card */}
          <Grid container spacing={4} sx={{ 
            justifyContent: 'space-between',
          }} columns={{ xs: 4, sm: 8, md: 12 }}>
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
                  <div className="flex justify-between">
                    <div>
                      <Checkbox
                        size="small"
                        color="success"
                        checked={!!checked[idx]}
                        onChange={() => handleOnChange(idx)}
                      ></Checkbox>
                    </div>
                    <div></div>
                    <div className="text-2xl mr-2">
                      {todo.createdDate
                        ? new Date(todo.createdDate).toLocaleDateString("vi-VN")
                        : ""}
                    </div>
                  </div>
                  {/* Todo Content */}
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
                                todo: editTodo,
                              });
                            }
                          }}
                        />
                      ) : (
                        <div>
                          {todo.todo}
                          <button
                            className="ml-1"
                            onClick={() => {
                              setEditId(todo.id);
                              setEditTodo(todo.todo);
                            }}
                          >
                            <EditOutlinedTwoToneIcon color="action" />
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
                    <Typography></Typography>
                  </CardContent>
                  {/* Todo Actions (Mark Done & Delete) */}
                  <CardActions
                    sx={{
                      backgroundColor: "#fafafa",
                      justifyContent: "space-around",
                    }}
                  >
                    <Button
                      disabled={todo.completed}
                      onClick={() =>
                        {
                          updateTodoMutation.mutate({
                            id: todo.id,
                            completed: !todo.completed,
                          });
                        }
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
          pageSize={limit}
          router={router}
          searchParams={searchParams}
        />
      )}
    </div>
  );
}
