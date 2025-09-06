import React, { useState } from "react";
import { Plus, X, ChevronDown } from "lucide-react";
import { mockTasks } from "../home/sampleMockData";
import type { Task } from "../home/sampleType";

interface TaskDetailsProps {
  selectedTaskId: string | null;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ selectedTaskId }) => {
  const [task, setTask] = useState<Task | null>(
    selectedTaskId
      ? mockTasks.find((t) => t.id === selectedTaskId) || null
      : null
  );

  React.useEffect(() => {
    if (selectedTaskId) {
      const foundTask = mockTasks.find((t) => t.id === selectedTaskId);
      setTask(foundTask || null);
    } else {
      setTask(null);
    }
  }, [selectedTaskId]);

  if (!task) {
    return (
      <div className="w-96 bg-white border-l border-gray-200 p-6 flex items-center justify-center">
        <p className="text-gray-500">Select a task to view details</p>
      </div>
    );
  }

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-800">Task:</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <h3 className="text-xl font-bold text-gray-900">{task.title}</h3>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={task.description}
            placeholder="Add description..."
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        {/* List */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            List
          </label>
          <div className="relative">
            <button className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between bg-white">
              <span className="text-gray-700">{task.list}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Due date
          </label>
          <div className="relative">
            <button className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between bg-white">
              <span className="text-gray-700">
                {formatDate(task.dueDate) || "Select date"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {task.tags.map((tagName, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
              >
                {tagName}
              </span>
            ))}
            <button className="px-3 py-1 border border-dashed border-gray-300 text-gray-500 rounded-full text-xs hover:bg-gray-50">
              + Add Tag
            </button>
          </div>
        </div>

        {/* Subtasks */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Subtasks:
          </h3>

          <button className="flex items-center space-x-2 p-3 rounded-lg border border-dashed border-gray-300 hover:border-gray-400 hover:bg-white transition-colors mb-4 w-full">
            <Plus className="w-4 h-4 text-gray-500" />
            <span className="text-gray-500">Add New Subtask</span>
          </button>

          <div className="space-y-2">
            {task.subtasks.map((subtask) => (
              <div
                key={subtask.id}
                className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200"
              >
                <input
                  type="checkbox"
                  checked={subtask.completed}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span
                  className={`flex-1 ${
                    subtask.completed
                      ? "line-through text-gray-500"
                      : "text-gray-700"
                  }`}
                >
                  {subtask.title}
                </span>
              </div>
            ))}

            <div className="p-3 rounded-lg border border-dashed border-gray-200">
              <input
                type="text"
                placeholder="Subtask"
                className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-gray-100">
        <div className="flex space-x-3">
          <button className="flex-1 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
            Delete Task
          </button>
          <button className="flex-1 px-4 py-2 bg-yellow-400 text-gray-800 rounded-lg hover:bg-yellow-500 transition-colors font-medium">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
