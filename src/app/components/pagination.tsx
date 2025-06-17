import Pagination from "@mui/material/Pagination";

export default function MuiPagination({
  currentPage,
  total,
  pageSize,
  router,
  searchParams,
}) {
  const totalPage = Math.ceil(total / pageSize);
  const handleChange = (event, value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(value));
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="flex justify-center my-6 mt-10">
      <Pagination
        count={totalPage}
        page={currentPage}
        onChange={handleChange}
      />
    </div>
  );
}
