"use client";
import { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
} from "material-react-table";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  state: string;
}

const Example = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/task-route/getAllTasks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("dishant======", response.data);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    })();
  }, []);

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "_id", // The unique task ID
        header: "Task ID",
        enableEditing: false,
        size: 150,
      },
      {
        accessorKey: "title", // Task title
        header: "Title",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.title,
          helperText: validationErrors?.title,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, title: undefined }),
        },
      },
      {
        accessorKey: "startTime", // Task start time
        header: "Start Time",
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString(), // Format the date
      },
      {
        accessorKey: "endTime", // Task end time
        header: "End Time",
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString(), // Format the date
      },
      {
        accessorKey: "priority", // Task priority
        header: "Priority",
        muiEditTextFieldProps: {
          type: "number",
          required: true,
          error: !!validationErrors?.priority,
          helperText: validationErrors?.priority,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, priority: undefined }),
        },
      },
      {
        accessorKey: "status", // Task status
        header: "Status",
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.status,
          helperText: validationErrors?.status,
        },
      },
    ],
    [validationErrors]
  );

  // CREATE action (Add Task)
  const handleCreateTask: MRT_TableOptions<User>["onCreatingRowSave"] = async ({
    values,
    table,
  }) => {
    console.log("values=====", values);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/task-route",
        { ...values },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newTask = response.data.task; // Assume the API returns the created task
      setTasks((prevTasks) => [...prevTasks, newTask]);
      table.setCreatingRow(null); // Exit creating mode
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  // UPDATE action
  const handleSaveUser: MRT_TableOptions<User>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    console.log("values=====", values);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/task-route/677137f7aee11bc38cc650eb",
        { ...values },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newTask = response.data.task; // Assume the API returns the created task
      setTasks((prevTasks) => [...prevTasks, newTask]);
      table.setCreatingRow(null); // Exit creating mode
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  // DELETE action
  const openDeleteConfirmModal = async (row: MRT_Row<User>) => {
    console.log("ROW===========", row);
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `http://localhost:5000/task-route/${row.original._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.id !== row.original._id)
        );
      } catch (error) {
        console.error("Error deleting task: ", error);
      }
    }
  };

  const [taskData, setTaskData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    priority: "",
    status: "pending",
  });

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? (checked ? "finished" : "pending") : value,
    }));
  };

  const table = useMaterialReactTable({
    columns,
    data: tasks,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => row.id,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateTask,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    renderCreateRowDialogContent: ({ table, row }) => (
      <>
        <DialogTitle variant="h3">Create New Task</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <TextField
            id="title"
            label="Task Title"
            variant="outlined"
            value={taskData.title}
            onChange={handleInputChange}
          />
          <TextField
            id="startTime"
            label="Start Date"
            variant="outlined"
            type="date"
            value={taskData.startTime}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true, // Ensures label is placed correctly for date input
            }}
          />
          <TextField
            id="endTime"
            label="End Date"
            variant="outlined"
            type="date"
            value={taskData.endTime}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="priority"
            label="Priority"
            variant="outlined"
            type="number"
            value={taskData.priority}
            onChange={handleInputChange}
          />
          <Box display="flex" alignItems="center" gap="1rem">
            <Typography>
              {taskData.status === "pending" ? "pending" : "finished"}
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  id="status"
                  checked={taskData.status === "finished"}
                  onChange={handleInputChange}
                />
              }
              label="Status"
              labelPlacement="end"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => table.setCreatingRow(null)}>
            Cancel
          </Button>
          <Button
            variant="text"
            onClick={() => handleCreateTask({ values: taskData, table })}
          >
            Save
          </Button>
        </DialogActions>
      </>
    ),

    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit Task</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <TextField
            id="title"
            label="Task Title"
            variant="outlined"
            value={taskData.title}
            onChange={handleInputChange}
          />
          <TextField
            id="startTime"
            label="Start Date"
            variant="outlined"
            type="date"
            value={taskData.startTime}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true, // Ensures label is placed correctly for date input
            }}
          />
          <TextField
            id="endTime"
            label="End Date"
            variant="outlined"
            type="date"
            value={taskData.endTime}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="priority"
            label="Priority"
            variant="outlined"
            type="number"
            value={taskData.priority}
            onChange={handleInputChange}
          />
          <Box display="flex" alignItems="center" gap="1rem">
            <Typography>
              {taskData.status === "pending" ? "pending" : "finished"}
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  id="status"
                  checked={taskData.status === "finished"}
                  onChange={handleInputChange}
                />
              }
              label="Status"
              labelPlacement="end"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => table.setCreatingRow(null)}>
            Cancel
          </Button>
          <Button
            variant="text"
            onClick={() => handleCreateTask({ values: taskData, table })}
          >
            Save
          </Button>
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button variant="contained" onClick={() => table.setCreatingRow(true)}>
        Add Task
      </Button>
    ),
  });

  return <MaterialReactTable table={table} />;
};

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

function validateUser(user: User) {
  return {
    firstName: !validateRequired(user.firstName)
      ? "First Name is Required"
      : "",
    lastName: !validateRequired(user.lastName) ? "Last Name is Required" : "",
    email: !validateEmail(user.email) ? "Incorrect Email Format" : "",
  };
}

export default function Table() {
  return <Example />;
}
