"use client";
import { useEffect, useState } from "react";
import { Todo, FilterStatus } from "./types";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
      const data: Todo[] = await res.json();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos([
      ...todos,
      {
        id: Date.now(),
        title: newTodo.trim(),
        completed: false,
      },
    ]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
    if (editingId === id) setEditingId(null);
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const saveEdit = (id: number) => {
    if (!editingText.trim()) return;
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, title: editingText } : t
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterStatus === "completed") return todo.completed;
    if (filterStatus === "incomplete") return !todo.completed;
    return true;
  });

  return (
    <div className="space-y-6 bg-black min-h-screen text-white py-20 px-4">
      <h1 className="text-4xl font-light text-primary text-center mb-6 tracking-wider">
        CYRAYS Todo
      </h1>

      {/* Add Section */}
      <div className="flex gap-2 max-w-xl mx-auto">
        <input
          className="flex-1 p-3 rounded bg-white text-black focus:outline-none"
          type="text"
          value={newTodo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewTodo(e.target.value)
          }
          placeholder="What's your next task?"
        />
        <button
          onClick={addTodo}
          className="bg-[#F0B100] text-black font-semibold px-5 py-3 rounded hover:opacity-90 transition"
        >
          Add
        </button>
      </div>

   <div className="max-w-xl mx-auto flex justify-end items-center gap-2">
  <label htmlFor="filter" className="sr-only">
    Filter todos
  </label>
  <select
    id="filter"
    value={filterStatus}
    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
      setFilterStatus(e.target.value as FilterStatus)
    }
    className="p-2 rounded bg-white text-black"
  >
    <option value="all">All</option>
    <option value="completed">Completed</option>
    <option value="incomplete">Incomplete</option>
  </select>
</div>


      {/* Todo List */}
      <ul className="space-y-4 max-w-xl mx-auto">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-white text-black p-4 border border-white rounded shadow-md"
          >
            <div className="flex items-center gap-3 w-full">
              <button
               type="button"
                aria-label={todo.completed ? "Mark as incomplete" : "Mark as completed"}
                onClick={() => toggleTodo(todo.id)}
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
                  onClick={() => saveEdit(todo.id)}
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
                onClick={() => deleteTodo(todo.id)}
                className="text-[#F0B100] font-bold text-lg hover:opacity-80"
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
