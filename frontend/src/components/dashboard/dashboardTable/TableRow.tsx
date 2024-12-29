import React from "react";
import TableColumn from "./TableColumn";
interface rowDataTypes{
    taskPriority:string,
    pendingTask:string,
    timeLapsed:string,
    timeToFinish:string
}
interface TableRowTypesProps{
    rowData:rowDataTypes
}
const TableRow: React.FC<TableRowTypesProps> = ({ rowData }) => {
  return (
    <tr className="hover:bg-gray-50">
      {Object.values(rowData).map((e,i) => (
        <TableColumn key={i} colData={e} />
      ))}
    </tr>
  );
};

export default TableRow;
