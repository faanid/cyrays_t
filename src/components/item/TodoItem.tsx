"use client";
import { TodoItemProps } from "./types";

export default function TodoItem({
  todo,
  editingId,
  editingText,
  setEditingId,
  setEditingText,
  onToggle,
  onDelete,
  onSave,
}: TodoItemProps) {
  return (
    <li className="flex items-center justify-between bg-white text-black p-4 border border-white rounded shadow-md">
      <div className="flex items-center gap-3 w-full">
        <button
        type="button"
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as completed"}
          onClick={() => onToggle(todo.id)}
          className={`w-5 h-5 border-2 border-[#F0B100] rounded-full flex-shrink-0 ${
            todo.completed ? "bg-[#F0B100]" : "bg-white"
          } transition`}
        />

        {editingId === todo.id ? (
          <input
            className="bg-white text-black w-full p-1 rounded focus:outline-none"
            value={editingText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditingText(e.target.value)
            }
            placeholder="Edit todo title"
           aria-label="Edit todo title"
          />
        ) : (
          <span
            className={`text-lg w-full ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex gap-3 ml-3">
        {editingId === todo.id ? (
          <button
            onClick={() => onSave(todo.id)}
            className="text-[#F0B100] font-semibold hover:opacity-80"
          >
            Save
          </button>
        ) : (
          !todo.completed && (
            <button
              onClick={() => {
                setEditingId(todo.id);
                setEditingText(todo.title);
              }}
              className="text-blue-400 font-semibold hover:opacity-80"
            >
              Edit
            </button>
          )
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="text-[#F0B100] font-bold text-lg hover:opacity-80"
        >
          ✕
        </button>
      </div>
    </li>
  );
}
