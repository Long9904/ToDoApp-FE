import React from "react";
import { Plus, ChevronRight, Calendar, List } from "lucide-react";
import { mockTasks } from "../home/sampleMockData";

interface MainContentProps {
  selectedTask: string | null;
  onTaskSelect: (taskId: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  selectedTask,
  onTaskSelect,
}) => {
  const todayTasks = mockTasks;

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  const getListColor = (listName: string) => {
    const colors: { [key: string]: string } = {
      Personal: "bg-red-500",
      Work: "bg-teal-500",
      "List 1": "bg-yellow-500",
    };
    return colors[listName] || "bg-gray-500";
  };

  return (
    <div className="flex-1 bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-gray-800">Today</h1>
          <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
            5
          </span>
        </div>
      </div>

      {/* Add New Task Button */}
      <button className="flex items-center space-x-2 p-3 rounded-lg border border-dashed border-gray-300 hover:border-gray-400 hover:bg-white transition-colors mb-6 w-full">
        <Plus className="w-4 h-4 text-gray-500" />
        <span className="text-gray-500">Add New Task</span>
      </button>

      {/* Task List */}
      <div className="space-y-3">
        {todayTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => onTaskSelect(task.id)}
            className={`bg-white rounded-lg p-4 border hover:shadow-md transition-all cursor-pointer ${
              selectedTask === task.id
                ? "ring-2 ring-blue-500 border-blue-200"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-gray-800 font-medium mb-2">{task.title}</h3>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  {task.dueDate && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(task.dueDate)}</span>
                    </div>
                  )}

                  {task.subtasks.length > 0 && (
                    <div className="flex items-center space-x-1">
                      <List className="w-3 h-3" />
                      <span>{task.subtasks.length} Subtasks</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-1">
                    <div
                      className={`w-3 h-3 rounded-full ${getListColor(
                        task.list
                      )}`}
                    ></div>
                    <span>{task.list}</span>
                  </div>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
