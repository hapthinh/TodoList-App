export default function Pagination({
  currentPage,
  data,
  pageSize,
  router,
  searchParams,
}) {
  return (
    <div className="text-black mt-2 w-275 flex mb-4">
      <button
        className="px-3 py-1 rounded bg-[#c6c2aa] hover:bg-gray-300 w-1/5"
        disabled={currentPage <= 1}
        onClick={() => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("page", String(currentPage - 1));
          router.push(`?${params.toString()}`);
        }}
      >
        Trang trước
      </button>
      <span className="ml-60 mr-60 w-1/5">
        Trang {currentPage}/{data ? Math.ceil(data.total / pageSize) : 1}
      </span>
      <button
        className="px-3 py-1 rounded bg-[#c6c2aa] hover:bg-gray-300 w-1/5"
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
