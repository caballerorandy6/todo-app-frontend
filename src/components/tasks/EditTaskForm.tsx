"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateTaskSchema, type UpdateTaskInput } from "@/lib/validations";
import { Task } from "@/lib/types";

interface EditTaskFormProps {
  task: Task;
  onSubmit: (data: UpdateTaskInput) => void;
  onCancel: () => void;
  isPending?: boolean;
}

const EditTaskForm = ({
  task,
  onSubmit,
  onCancel,
  isPending = false,
}: EditTaskFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
  } = useForm<UpdateTaskInput>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: task.title,
      color: ["red", "blue", "green", "yellow", "purple", "pink"].includes(
        task.color
      )
        ? (task.color as
            | "red"
            | "blue"
            | "green"
            | "yellow"
            | "purple"
            | "pink")
        : undefined,
      completed: task.completed,
    },
  });

  const selectedColor = watch("color");

  const colorOptions = [
    { value: "red", hex: "#EF4444" },
    { value: "blue", hex: "#3B82F6" },
    { value: "green", hex: "#10B981" },
    { value: "yellow", hex: "#F59E0B" },
    { value: "purple", hex: "#8B5CF6" },
    { value: "pink", hex: "#EC4899" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#808080] mb-2">
          Task Title
        </label>
        <input
          {...register("title")}
          type="text"
          disabled={isPending}
          className={`w-full p-3 bg-[#262626] border rounded-lg text-[#D9D9D9] 
            focus:outline-none focus:ring-2 transition-all
            ${
              errors.title
                ? "border-red-500 focus:ring-red-500"
                : "border-[#333333] focus:ring-[#5E60CE]"
            }
            ${isPending ? "opacity-50 cursor-not-allowed" : ""}
          `}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#808080] mb-2">
          Color
        </label>
        <div className="flex gap-2">
          {colorOptions.map((color) => (
            <label key={color.value} className="cursor-pointer">
              <input
                {...register("color")}
                type="radio"
                value={color.value}
                disabled={isPending}
                className="sr-only"
              />
              <div
                className={`w-8 h-8 rounded-full transition-all ${
                  selectedColor === color.value
                    ? "ring-2 ring-white ring-offset-2 ring-offset-[#262626]"
                    : "hover:scale-110"
                } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                style={{ backgroundColor: color.hex }}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          {...register("completed")}
          type="checkbox"
          id="completed"
          disabled={isPending}
          className="w-5 h-5 bg-[#262626] border-[#333333] rounded text-[#5E60CE] 
            focus:ring-[#5E60CE] focus:ring-2"
        />
        <label htmlFor="completed" className="text-[#D9D9D9] text-sm">
          Mark as completed
        </label>
      </div>

      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          disabled={isPending || !isDirty}
          className="flex-1 px-4 py-2 bg-[#1E6F9F] hover:bg-[#4EA8DE] rounded-lg 
            text-white font-medium transition-colors 
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="px-4 py-2 bg-[#333333] hover:bg-[#404040] rounded-lg 
            text-[#D9D9D9] font-medium transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
