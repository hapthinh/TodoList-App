import SelectAutoWidth from "./selectBox";

export default function FilterTodo({
  searchInput,
  setSearchInput,
  handleSearch,
}) {
  return (
    <>
      <div className="flex items-center gap-2 h-18">
        <input
          className="text-black rounded-lg border border-gray-500 focus:ring-2 focus:ring-indigo-400 px-4 py-2 w-73 outline-none transition"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch(searchInput);
          }}
          placeholder="Enter keyword"
        />
      </div>
    </>
  );
}
