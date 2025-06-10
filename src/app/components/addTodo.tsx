import React from "react";

export default function AddTodo({ input, setInput, onAdd }) {
  return (
    <div className="flex items-center gap-2">
      <input
        className="text-black rounded-lg border border-indigo-400 focus:ring-2 focus:ring-indigo-500 px-4 py-2 w-105 outline-none transition"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter New Todo"
      />
      <button
        className="text-black px-4 py-2 rounded-lg font-semibold shadow hover:bg-lime-800 transition bg-[#c6c2aa] w-20"
        onClick={onAdd}
      >
        Add
      </button>
    </div>
  );
}
