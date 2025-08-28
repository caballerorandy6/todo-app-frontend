import { create } from "zustand";
import { Task } from "@/lib/types";
import { persist, createJSONStorage } from "zustand/middleware";

interface TaskState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      setTasks: (tasks) => set({ tasks }),
    }),
    {
      name: "task-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
