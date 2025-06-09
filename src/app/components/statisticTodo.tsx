export default function Statistic({ todos }: { todos: any[] }) {
  return (
    <div className="text-black ml-50 text-2xl ">
      Tổng số: {todos.length} | Đã hoàn thành:{" "}
      {todos.filter((t) => t.completed).length} | Đang thực hiện:{" "}
      {todos.filter((t) => !t.completed).length}
    </div>
  );
}
