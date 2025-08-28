"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import EditTaskForm from "@/components/tasks/EditTaskForm";
import { Task } from "@/lib/types";
import { UpdateTaskInput } from "@/lib/validations";
import { getTask, updateTask } from "@/lib/api";
import { toast } from "sonner";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const EditTaskPage = () => {
  const router = useRouter();
  const params = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const taskId = Number(params.id);

  const fetchTask = useCallback(async () => {
    if (isNaN(taskId) || taskId <= 0) return;
    try {
      const data = await getTask(taskId);
      setTask(data);
    } catch (error) {
      console.error("Error fetching task:", error);
      toast.error("Failed to load task");
      router.push("/");
    } finally {
      setLoading(false);
    }
  }, [taskId, router]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const handleUpdateTask = async (data: UpdateTaskInput) => {
    try {
      await updateTask(taskId, data as Task);
      toast.success("Task updated successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Task not found
      </div>
    );
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#1A1A1A] p-4">
      <div className="w-full max-w-lg rounded-xl bg-white dark:bg-gray-800 shadow-lg p-6 md:p-8">
        <div className="flex flex-col gap-4 mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors self-start"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back
          </button>

          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white md:text-3xl">
            Editar Tarea
          </h1>
        </div>

        <EditTaskForm
          task={task}
          onSubmit={handleUpdateTask}
          onCancel={() => router.push("/")}
        />
      </div>
    </main>
  );
};

export default EditTaskPage;
