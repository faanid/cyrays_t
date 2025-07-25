"use client";

import { TodoFilterProps, FilterStatus } from "./types";

export default function TodoFilter({
  filterStatus,
  setFilterStatus,
  userFilter,
  setUserFilter,
}: TodoFilterProps) {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value as FilterStatus);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setUserFilter(val === "all" ? "all" : Number(val));
  };

  return (
    <div className="max-w-xl mx-auto flex justify-between items-center gap-4">
      <div>
        <label htmlFor="status-filter" className="sr-only">
          status filter
        </label>
        <select
          id="status-filter"
          value={filterStatus}
          onChange={handleStatusChange}
          className="p-2 rounded bg-white text-black"
        >
          <option value="all">all</option>
          <option value="completed">completed</option>
          <option value="incomplete">incomplete</option>
        </select>
      </div>

      <div>
        <label htmlFor="user-filter" className="sr-only">
          filter userid
        </label>
        <select
          id="user-filter"
          value={userFilter}
          onChange={handleUserChange}
          className="p-2 bg-white text-black rounded"
        >
          <option value="all">all</option>
          <option value="1">user1</option>
          <option value="2">user2</option>
          <option value="3">user3</option>
          <option value="4">user4</option>
          <option value="5">user5</option>
        </select>
      </div>
    </div>
  );
}
