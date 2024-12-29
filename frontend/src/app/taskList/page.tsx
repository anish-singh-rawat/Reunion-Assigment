import React from "react";
import AddTaskModal from "../../components/taskList/addTaskModal/AddTaskModal";
import TaskTable from "../../components/taskList/taskTable/TaskTable";

const page: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl mb-4 font-bold">Task list</h1>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <AddTaskModal />
          <button
            className={`p-2 border-2 rounded-sm border-red-700 text-red-700 hover:bg-red-200`}>
            Delete selected
          </button>
        </div>
        <TaskTable />
      </div>
    </div>
  );
};

export default page;
