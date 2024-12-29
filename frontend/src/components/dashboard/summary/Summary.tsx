import React from "react";
import SummaryChild from "./SummaryChild";
interface summaryPropsTypes {
  title: string;
}
const SummaryContent = [
  { title: "Total task", content: "25" },
  { title: "Task completed", content: "40%" },

  { title: "Task pending", content: "60%" },

  { title: "Average time per completed task", content: "3.5hrs" },
];
const pendingTask = [
    { title: "Pending task", content: "15" },
    { title: "Total time lapsed", content: "56hrs" },
  

  
    { title: "Total time to finish estimated based on endtime", content: "24hrs" },
  ];
const Summary: React.FC<summaryPropsTypes> = ({ title }) => {
  return (
    <div className="flex flex-col gap-3">
      <h2>{title}</h2>
      <div className="flex gap-10">
        {title==="Summary" && SummaryContent.map((e,i)=>(
            <SummaryChild title={e.title} content={e.content} key={i} />
        ))}
        {title==="Pending task summaray" && pendingTask.map((e,i)=>(
            <SummaryChild title={e.title} content={e.content} key={i} />
        ))}

      </div>
    </div>
  );
};

export default Summary;
