export default function Statistic({ completedCount, unCompletedCount }) {
  const totalRecord = completedCount + unCompletedCount
  return (
    <div className="text-black flex justify-center text-3xl font-bold gap-3">
      <div>
      Total: {totalRecord}</div> | <div><p className="text-green-500"> Done: {completedCount} </p></div>| <div><p className="text-red-500">Pending: {unCompletedCount}</p></div>
    </div>
  );
}
