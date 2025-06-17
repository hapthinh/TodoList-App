//file API TODOLIST {GET, POST, DELETE, PATCH} CRUD

// Domain API
const API = "http://localhost:3000/api/todolist";

// API GET TODO
export async function getTodos({
  kw = "",
  status = "",
  order = "asc",
  sortField = "status",
  currentPage = 1,
  pageSize = 10,
} = {}) {
  const params = new URLSearchParams();

  if (kw) {
    params.append("kw", kw);
  }
  if (status) {
    params.append("status", status);
  }
  if (order) params.append("order", order);
  if (sortField) params.append("sortField", sortField);

  params.append("page", String(currentPage));
  params.append("limit", String(pageSize));

  const res = await fetch(`${API}/?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
}

// API POST TODO
export async function postTodo({ todo }: { todo: string }) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      todo: todo,
    }),
  });

  return res.json();
}

// API DELETE TODO
export async function deteleTodo({ id }: { id: number }) {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  return res.json();
}

// API UPDATE TODO
export async function updateTodoStatus({
  id,
  completed,
  todo,
}: {
  id: number;
  completed?: boolean;
  todo?: string;
}) {
  const body: { completed?: boolean; todo?: string } = {};
  if (typeof completed !== "undefined") body.completed = completed;
  if (typeof todo !== "undefined") body.todo = todo;
  const res = fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res).json();
  return data;
}

export async function deleteMultiTodo({ idArray }: { idArray: number[] }) {
  const res = await fetch(`${API}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(idArray),
  });

  return res.json();
}

export async function getTodobyId(id: number) {
  const res = await fetch(`${API}/${id}`, {
    method: "GET",
  });
  console.log(res.json());
  return res.json();
}

const API1 = "http://localhost:3000"

export async function getAllBlog(){
  const res = await fetch(`${API1}/blog/`,{
    method: "GET"
  })
  return res.json()
}

export async function getBlogById(id : number) {
  const res = await fetch(`${API1}/blog/${id}`,{
    method:"GET"
  })
  return res.json()
}
