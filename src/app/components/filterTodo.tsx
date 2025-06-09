import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";

export default function FilterTodo({
  searchInput,
  setSearchInput,
  handleSearch,
  selectStatus,
  searchParams,
  router,
}) {
  return (
    <>
      <div className="flex items-center gap-2">
        <input
          className="text-black rounded-lg border border-gray-500 focus:ring-2 focus:ring-indigo-400 px-4 py-2 w-44 outline-none transition"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch(searchInput);
          }}
          placeholder="Tìm theo từ khóa"
        />
      </div>
      <div className="flex items-center gap-2">
        <Combobox
          value={selectStatus}
          onChange={(value) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("status", value ?? "");
            params.set("page", "1");
            router.push(`?${params.toString()}`);
          }}
        >
          <ComboboxInput
            className="text-black rounded-lg border border-gray-500 px-4 py-2 w-32 outline-none"
            displayValue={() =>
              selectStatus === "true"
                ? "Done"
                : selectStatus === "false"
                  ? "Pending"
                  : "Tat ca"
            }
            placeholder=""
          ></ComboboxInput>
          <ComboboxOptions className="border-indigo-400 text-black font-semibold bg-stone-200 rounded-2xl border-2 shadow-lg mt-2 divide-y divide-indigo-200">
            <ComboboxOption
              value=""
              className="px-4 py-2 hover:bg-indigo-100 cursor-pointer rounded-t-2xl"
            >
              Tất Cả
            </ComboboxOption>
            <ComboboxOption
              value="true"
              className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
            >
              Done
            </ComboboxOption>
            <ComboboxOption
              value="false"
              className="px-4 py-2 hover:bg-indigo-100 cursor-pointer rounded-b-2xl"
            >
              Pending
            </ComboboxOption>
          </ComboboxOptions>
        </Combobox>
      </div>
    </>
  );
}
