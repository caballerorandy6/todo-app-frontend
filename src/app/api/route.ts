import { UpdateTaskInput } from "@/lib/types";

// Get tasks
export const getTasks = async () => {
  const response = await fetch("http://localhost:3001/tasks", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
};

// Create task
export const createTask = async (title: string, color: string = "blue") => {
  const response = await fetch("http://localhost:3001/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, color }),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json();
};

// Get single task
export const getTask = async (id: number) => {
  const response = await fetch(`http://localhost:3001/tasks/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch task");
  }

  return response.json();
};

// Update task
export const updateTask = async (id: number, data: UpdateTaskInput) => {
  const response = await fetch(`http://localhost:3001/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json();
};

// Toggle task
export const toggleTask = async (id: number) => {
  const response = await fetch(`http://localhost:3001/tasks/${id}/toggle`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Failed to toggle task");
  }

  return response.json();
};

// Delete task
export const deleteTask = async (id: number) => {
  const response = await fetch(`http://localhost:3001/tasks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
};
