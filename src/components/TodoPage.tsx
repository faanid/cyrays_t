"use client";
import { FC } from "react";
import { useEffect, useState } from "react";
import TodoItem from "./item/TodoItem"
import TodoForm from "./form/TodoForm";
import TodoFilter from "./filter/TodoFilter";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

const TodoPage: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "incomplete">("all");
  const [userFilter, setUserFilter] = useState<number | "all">("all");


  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=50");
      const data: Todo[] = await res.json();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const addTodo = () => {
  if (!newTodo.trim()) return;

  const userId = userFilter === "all" ? 1 : userFilter;

  setTodos([
    ...todos,
    {
      id: Date.now(),
      title: newTodo.trim(),
      completed: false,
      userId,
    },
  ]);
  setNewTodo("");
};
  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    if (editingId === id) setEditingId(null);
  };
  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };
  const saveEdit = (id: number) => {
    if (!editingText.trim()) return;
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, title: editingText } : t))
    );
    setEditingId(null);
    setEditingText("");
  };

  const filteredTodos = todos.filter(todo => {
  const statusMatch =
    filterStatus === "completed"
      ? todo.completed
      : filterStatus === "incomplete"
      ? !todo.completed
      : true;

  const userMatch =
    userFilter === "all" ? true : todo.userId === userFilter;

  return statusMatch && userMatch;
});

  return (
    <div className="min-h-screen space-y-6 px-4 py-20 bg-black text-white">
      <h1 className="text-center text-4xl mb-6 text-primary font-light tracking-wider">
        CYRAYS Todo
      </h1>

      <TodoForm newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />
     <TodoFilter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        userFilter={userFilter}
        setUserFilter={setUserFilter}
      />
      <ul className=" max-w-xl mx-auto space-y-4">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            editingId={editingId}
            editingText={editingText}
            setEditingId={setEditingId}
            setEditingText={setEditingText}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onSave={saveEdit}
          />
        ))}
      </ul>
    </div>
  );
}
export default TodoPage;
