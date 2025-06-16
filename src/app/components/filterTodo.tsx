export default function FilterTodo({
  searchInput,
  setSearchInput,
  handleSearch,
}) {
  return (
    <>
      <div className="flex items-center gap-2 h-18">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSearch(e,searchInput)
          }}
        >
          <label className="ml-3 font-sans">Search</label>
            <input
              className="text-black rounded-lg border border-gray-500 focus:ring-2 focus:ring-indigo-400 px-4 py-2 w-76 outline-none transition ml-3 mb-6.5 h-12"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter Keyword"
            />
        </form>
      </div>
    </>
  );
}
