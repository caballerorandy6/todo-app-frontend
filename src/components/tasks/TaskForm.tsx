"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema, type CreateTaskInput } from "@/lib/validations";
import PlusIcon from "@/components/ui/PlusIcon";

interface TaskFormProps {
  onSubmit: (data: CreateTaskInput) => void;
  isPending?: boolean;
}

const TaskForm = ({ onSubmit, isPending = false }: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    watch,
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      color: "blue",
    },
  });

  const selectedColor = watch("color");

  const handleFormSubmit: (data: CreateTaskInput) => void = (data) => {
    onSubmit(data);
    reset();
  };

  const colorOptions = [
    { value: "red", label: "Red", hex: "#EF4444" },
    { value: "blue", label: "Blue", hex: "#3B82F6" },
    { value: "green", label: "Green", hex: "#10B981" },
    { value: "yellow", label: "Yellow", hex: "#F59E0B" },
    { value: "purple", label: "Purple", hex: "#8B5CF6" },
    { value: "pink", label: "Pink", hex: "#EC4899" },
  ];

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-4 -mt-7 mb-16"
    >
      <div className="flex items-center gap-2">
        <div className="flex-grow">
          <input
            {...register("title")}
            type="text"
            placeholder="Add a new task"
            disabled={isPending}
            className={`w-full h-[52px] p-4 bg-[#262626] border rounded-lg text-[#D9D9D9] 
              placeholder:text-[#808080] focus:outline-none focus:ring-2 transition-all
              ${
                errors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[#0D0D0D] focus:ring-[#5E60CE]"
              }
              ${isPending ? "opacity-50 cursor-not-allowed" : ""}
            `}
          />
        </div>

        <button
          type="submit"
          disabled={isPending || !isValid}
          className="w-[90px] h-[52px] bg-[#1E6F9F] hover:bg-[#4EA8DE] rounded-lg 
            flex items-center justify-center gap-2 text-sm font-bold text-[#F2F2F2] 
            transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <>
              Create
              <PlusIcon />
            </>
          )}
        </button>
      </div>

      {errors.title && (
        <p className="text-red-500 text-sm -mt-2 px-4">
          {errors.title.message}
        </p>
      )}

      <div className="flex items-center gap-2 px-4">
        <span className="text-[#808080] text-sm">Color:</span>
        <div className="flex gap-2">
          {colorOptions.map((color) => (
            <label key={color.value} className="cursor-pointer">
              <input
                {...register("color")}
                type="radio"
                value={color.value}
                className="sr-only"
              />
              <div
                className={`w-6 h-6 rounded-full transition-all ${
                  selectedColor === color.value
                    ? "ring-2 ring-white ring-offset-2 ring-offset-[#262626]"
                    : "hover:scale-110"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.label}
              />
            </label>
          ))}
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
