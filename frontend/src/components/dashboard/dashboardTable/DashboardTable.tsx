import React from "react";
import TableRow from "./TableRow";
const DashboardTable: React.FC<{ tableData: any; tableHeader: any }> = ({
  tableData,
  tableHeader,
}) => {
  return (
    <table className="w-[100%] border border-gray-200 bg-white shadow-md text-sm text-center">
      <thead className="bg-gray-100 border-b-2 border-gray-200 text-gray-700 uppercase">
        <tr>
          {tableHeader?.map((e: any, i: number) => (
            <th key={i} className="px-4 py-2">
              {e}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData?.map((e: any, i: number) => (
          <TableRow key={i} rowData={e} />
        ))}
      </tbody>
    </table>
  );
};

export default DashboardTable;
