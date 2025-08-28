import { Task } from "./types";

// Get all tasks
export const getTasks = async () => {
  const res = await fetch("/api/tasks", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};

// Get single task
export const getTask = async (id: number) => {
  const res = await fetch(`/api/tasks/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch task");
  return res.json();
};

// Create task
export const createTask = async (title: string, color: string = "blue") => {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, color }),
  });

  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
};

// Update task
export const updateTask = async (id: number, data: Task) => {
  const res = await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
};

// Toggle task
export const toggleTask = async (id: number) => {
  const res = await fetch(`/api/tasks/${id}/toggle`, {
    method: "PATCH",
  });

  if (!res.ok) throw new Error("Failed to toggle task");
  return res.json();
};

// Delete task
export const deleteTask = async (id: number) => {
  const res = await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete task");
  return res.json();
};
