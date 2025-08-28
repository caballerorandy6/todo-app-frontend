"use client";

import { Suspense } from "react";
import TaskList from "@/components/tasks/TaskList";

const NewTaskPage = () => {
  return (
    <div className="min-h-screen bg-[#1A1A1A] p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#262626] border border-gray-700 rounded-lg p-8">
          <h1 className="text-2xl font-bold text-white mb-6">Task List App</h1>
          <Suspense fallback={<div>Loading App...</div>}>
            <TaskList />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default NewTaskPage;
