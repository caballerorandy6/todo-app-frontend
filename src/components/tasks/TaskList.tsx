"use client";

import { useEffect, useTransition } from "react";
import { getTasks, toggleTask, deleteTask, createTask } from "@/app/api/route";
import TaskItem from "@/components/tasks/TaskItem";
import TaskForm from "@/components/tasks/TaskForm";
import ClipboardIcon from "@/components/ui/ClipboardIcon";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { useTaskStore } from "@/store/task-store";
import { CreateTaskInput } from "@/lib/validations";
import { toast } from "sonner";

const TaskList = () => {
  const { tasks: storedTasks, setTasks } = useTaskStore();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks();
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to load tasks");
      }
    };
    fetchTasks();
  }, [setTasks]);

  
  const handleCreateTask = (data: CreateTaskInput) => {
    startTransition(async () => {
      try {
        await createTask(data.title, data.color);
        const tasks = await getTasks();
        setTasks(tasks);
        toast.success("Task created successfully!");
      } catch (error) {
        console.error("Error creating task:", error);
        toast.error("Failed to create task");
      }
    });
  };

  const handleToggle = (id: number) => {
    startTransition(async () => {
      try {
        await toggleTask(id);
        const tasks = await getTasks();
        setTasks(tasks);
      } catch (error) {
        console.error("Error toggling task:", error);
        toast.error("Failed to update task");
      }
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this task?")) {
      return;
    }

    startTransition(async () => {
      try {
        await deleteTask(id);
        const tasks = await getTasks();
        setTasks(tasks);
        toast.success("Task deleted");
      } catch (error) {
        console.error("Error deleting task:", error);
        toast.error("Failed to delete task");
      }
    });
  };

  const totalTasks = storedTasks.length;
  const completedTasks = storedTasks.filter((task) => task.completed).length;

  return (
    <div className="relative w-full min-h-screen bg-[#1A1A1A] font-inter flex justify-center items-start p-4">
      <div className="absolute top-0 left-0 right-0 h-[200px] bg-[#0D0D0D]"></div>
      <div className="relative w-full max-w-[736px] mt-[72px]">
        <header className="flex items-center justify-center gap-3 mb-[53px]">
          <RocketLaunchIcon className="w-8 h-8 text-[#4EA8DE]" />
          <h1 className="text-4xl font-black">
            <span className="text-[#4EA8DE]">Todo</span>{" "}
            <span className="text-[#5E60CE]">App</span>
          </h1>
        </header>

        <TaskForm onSubmit={handleCreateTask} isPending={isPending} />

        <div className="flex flex-col gap-6">
          <header className="flex justify-between items-end">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-[#4EA8DE]">Created tasks</p>
              <span className="px-2 py-[2px] bg-[#333333] rounded-full text-xs font-bold text-[#D9D9D9]">
                {totalTasks}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-[#8284FA]">Completed</p>
              <span className="px-2 py-[2px] bg-[#333333] rounded-full text-xs font-bold text-[#D9D9D9]">
                {completedTasks} of {totalTasks}
              </span>
            </div>
          </header>

          {storedTasks.length === 0 ? (
            <div className="py-16 px-6 border-t border-[#333333] rounded-lg">
              <div className="flex flex-col items-center gap-4">
                <ClipboardIcon />
                <div className="text-center">
                  <p className="text-base font-bold text-[#808080]">
                    You don&#39;t have tasks registered yet
                  </p>
                  <p className="text-base text-[#808080]">
                    Create tasks and organize your to-do items
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <ul>
              {storedTasks.map((item) => (
                <TaskItem
                  key={item.id}
                  task={item}
                  onToggle={() => handleToggle(item.id)}
                  onDelete={() => handleDelete(item.id)}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
