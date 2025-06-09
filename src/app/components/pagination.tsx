export default function Pagination({
  currentPage,
  data,
  pageSize,
  router,
  searchParams,
}) {
  return (
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
        Trang {currentPage}/{data ? Math.ceil(data.total / pageSize) : 1}
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
  );
}
