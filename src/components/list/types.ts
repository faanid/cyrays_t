export type FilterStatus = "all" | "completed" | "incomplete";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
