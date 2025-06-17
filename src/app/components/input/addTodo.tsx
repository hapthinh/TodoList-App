import React from "react";
import AddIcon from '@mui/icons-material/Add';

export default function AddTodo({ input, setInput, onAdd }) {
  return (
    <div className="flex items-center gap-1 ml-3 h-20">
      <form action="">
        <label className="font-sans mb-3">Add todo</label>
          <input
            className="text-black rounded-lg border border-gray-500 focus:ring-2 focus:ring-indigo-500 px-4 py-2 w-75 outline-none transition mb-8 h-12"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter New Todo"
          />
      </form>
      <button
        className="text-black px-4 py-2 rounded-lg font-semibold shadow-black hover:bg-amber-600 transition bg-amber-200 w-20 ml-3 mr-3 h-12 mb-2.5"
        onClick={onAdd}
      >
        <AddIcon fontSize="medium"/>
      </button>
    </div>
  );
}
