export default function Statistic({ total, completedCount, unCompletedCount }) {
  return (
    <div className="text-black flex justify-center text-3xl font-bold">
      Total: {total} | Done: {completedCount} | Pending: {unCompletedCount}
    </div>
  );
}
