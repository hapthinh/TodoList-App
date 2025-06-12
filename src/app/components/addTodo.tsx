import React from "react";

export default function AddTodo({ input, setInput, onAdd }) {
  return (
    <div className="flex items-center gap-1 ml-2 h-18">
      <input
        className="text-black rounded-lg border border-gray-500 focus:ring-2 focus:ring-indigo-500 px-4 py-2 w-80 outline-none transition"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter New Todo"
      />
      <button
        className="text-black px-4 py-2 rounded-lg font-semibold shadow-black hover:bg-amber-600 transition bg-amber-200 w-20 ml-3 mr-3"
        onClick={onAdd}
      >
        Add
      </button>
    </div>
  );
}
