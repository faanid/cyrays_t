export type FilterStatus = "all" | "completed" | "incomplete";

export interface TodoFilterProps {
  filterStatus: FilterStatus;
  setFilterStatus: (val: FilterStatus) => void;
  userFilter: number | "all";
  setUserFilter: (val: number | "all") => void;
}
export interface User {
  id: number;
  name: string;
}
