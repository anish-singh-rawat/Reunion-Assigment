import React from "react";

const TableColumn: React.FC<{ colData: string }> = ({ colData }) => {
  return <td className="px-4 py-2 border-b border-gray-200">{colData}</td>;
};

export default TableColumn;
