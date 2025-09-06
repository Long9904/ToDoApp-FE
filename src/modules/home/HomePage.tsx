import { useState } from "react";
import Sidebar from "./HomeSideBar";
import MainContent from "./HomeMainContent";
import TaskDetails from "./HomeTaskDetails";

const HomePage = () => {
  const [selectedTask, setSelectedTask] = useState<string | null>("3");

  const handleTaskSelect = (taskId: string) => {
    setSelectedTask(selectedTask === taskId ? null : taskId);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="flex h-screen">
        <Sidebar selectedTask={selectedTask} />
        <MainContent
          selectedTask={selectedTask}
          onTaskSelect={handleTaskSelect}
        />
        <TaskDetails selectedTaskId={selectedTask} />
      </div>
    </div>
  );
};

export default HomePage;
