import React from "react";
import Summary from "../../components/dashboard/summary/Summary";
import DashboardTable from "../../components/dashboard/dashboardTable/DashboardTable";
import { TableData, tableHeader } from "../../staticData/staticData";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6" >
      <h1 className="text-4xl font-bold  ">Dashboard</h1>
      <Summary title={'Summary'} />
      <Summary title={'Pending task summaray'} />
      <div className="w-[650px] overflow-x-auto" >

      <DashboardTable tableData={TableData} tableHeader={tableHeader} />
      </div>
    </div>
  );
};

export default Dashboard;
