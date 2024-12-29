import React from "react";
import AddTaskModal from "../../components/taskList/addTaskModal/AddTaskModal";
import TaskListbtn from "../../components/taskList/TaskListBtn/TaskListbtn";
import TaskTable from "../../components/taskList/taskTable/TaskTable";

const page: React.FC = () => {

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl mb-4 font-bold  ">Task list</h1>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <AddTaskModal/>
          <TaskListbtn color="red" title="Delete selected" onClick={function (): void {
            throw new Error("Function not implemented.");
          } } />
        </div>
        <TaskTable/>
      </div>
    </div>
  );
};

export default page;
