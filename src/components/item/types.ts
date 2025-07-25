export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoItemProps {
  todo: Todo;
  editingId: number | null;
  editingText: string;
  setEditingId: (id: number | null) => void;
  setEditingText: (text: string) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onSave: (id: number) => void;
}
