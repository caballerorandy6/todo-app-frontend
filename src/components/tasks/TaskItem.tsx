import { Task } from "@/lib/types";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export interface TaskProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const getColorHex = (color: string): string => {
  const colors: Record<string, string> = {
    red: "#EF4444",
    blue: "#3B82F6",
    green: "#10B981",
    yellow: "#F59E0B",
    purple: "#8B5CF6",
    pink: "#EC4899",
  };
  return colors[color] || "#3B82F6";
};

const TaskItem = ({ task, onToggle, onDelete }: TaskProps) => {
  return (
    <div className="box-border flex flex-row items-start p-4 gap-3 w-full h-auto bg-[#262626] border border-[#333333] rounded-lg shadow-sm mb-3">
      <button
        onClick={() => onToggle(task.id)}
        className={`w-6 h-6 mt-1 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
          task.completed
            ? "bg-[#5E60CE] hover:bg-[#8284FA] border-[#5E60CE]"
            : "border-2 border-[#4EA8DE] hover:bg-[#1E6F9F]/20"
        }`}
      >
        {task.completed && (
          <svg
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.4375 4.125L3.8125 6.5L8.5625 1.75"
              stroke="#F2F2F2"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <div
        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
        style={{ backgroundColor: getColorHex(task.color) }}
      />

      <p
        className={`flex-grow text-sm leading-snug transition-all duration-300 ${
          task.completed ? "text-[#808080] line-through" : "text-[#F2F2F2]" // ✅ Cambiado
        }`}
      >
        {task.title}
      </p>

      <div className="flex items-center gap-2">
        <Link
          href={`/tasks/${task.id}/edit`}
          className="p-1 rounded hover:bg-[#333333]"
        >
          <PencilSquareIcon className="text-stone-500 w-6 cursor-pointer" />
        </Link>

        <button
          className="p-1 rounded hover:bg-[#333333]"
          onClick={() => onDelete(task.id)}
        >
          <TrashIcon className="text-stone-500 w-6 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
