// Define type for TableData items
export interface TableDataItem {
    taskPriority: string; // Assuming taskPriority is a string
    pendingTask: string; // Assuming pendingTask is a string
    timeLapsed: string; // Assuming timeLapsed is a string
    timeToFinish: string; // Assuming timeToFinish is a string
  }
  
  // Define type for TaskTableData items
  export interface TaskTableDataItem {
    taskId: string; // Assuming taskId is a string
    title: string; // Task title
    priority: string; // Priority level as a string
    status: string; // Task status
    startTime: string; // Start time as a string (formatted date)
    endtime: string; // End time as a string (formatted date)
    totalTimeToFinish: string; // Total time to finish as a string
  }
  
  // Define the data arrays using the types
  export const TableData: TableDataItem[] = [
    {
      taskPriority: "1",
      pendingTask: "3",
      timeLapsed: "12",
      timeToFinish: "12",
    },
    {
      taskPriority: "1",
      pendingTask: "3",
      timeLapsed: "12",
      timeToFinish: "12",
    },
    {
      taskPriority: "1",
      pendingTask: "3",
      timeLapsed: "12",
      timeToFinish: "12",
    },
    {
      taskPriority: "1",
      pendingTask: "3",
      timeLapsed: "12",
      timeToFinish: "12",
    },
  ];
  
  export const tableHeader: string[] = [
    "Task priority",
    "Pending task",
    "Time lapsed (hrs)",
    "Time to finish (hrs)",
  ];
  
  export const TaskTableData: TaskTableDataItem[] = [
    {
      taskId: "1",
      title: "buy Clothes",
      priority: "5",
      status: "pending",
      startTime: "26-Nov-24 11:00 AM",
      endtime: "26-Nov-24 11:00 AM",
      totalTimeToFinish: "49",
    },
  ];
  
  export const taskTableColumn: string[] = [
    "Task ID",
    "Title",
    "Priority",
    "Status",
    "Start Time",
    "End Time",
    "Total Time",
    "Edit",
  ];
  