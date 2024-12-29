import React from "react";

const TaskListbtn:React.FC<{color:string,icon?:any,title:string,onClick:()=>void}> = ({ color = "blue", icon,title,onClick }) => {
  return (
    <button onClick={onClick} className={`p-2 border-2 rounded-sm border-${color}-700 text-${color}-700 hover:bg-${color}-200`}>
      <span className="w-[10px]">{icon}</span> {title}
    </button>
  );
};

export default TaskListbtn;
