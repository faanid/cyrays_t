"use client";
import { TodoFormProps } from "./types";

export default function TodoForm({ newTodo, setNewTodo, addTodo }: TodoFormProps) {
  return (
    <div className="flex gap-2 max-w-xl mx-auto">
      <input
        className="flex-1 p-3 rounded bg-white text-black focus:outline-none"
        type="text"
        value={newTodo}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewTodo(e.target.value)
        }
        placeholder="What's your next task?"
        aria-label="New todo input"
      />
      <button
        type="button"
        onClick={addTodo}
        className="bg-[#F0B100] text-black font-semibold px-5 py-3 rounded hover:opacity-90 transition"
        aria-label="Add todo"
      >
        Add
      </button>
    </div>
  );
}

