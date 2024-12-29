import Task from "../models/TaskModal.js";

const createTask = async (req, res) => {
  try {
    const { title, startTime, endTime, priority } = req.body;
    const task = new Task({ user: req.userId, title, startTime, endTime, priority });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const { priority, status, sortField, sortOrder}  = req.query;
    const query = { user: req.userId };
    if (priority) query.priority = priority;
    if (status) query.status = status;

    const tasks = await Task.find(query)
      .sort({ [sortField]: sortOrder === "desc" ? -1 : 1 })
      .limit(Number(limit));

    const count = await Task.countDocuments(query);
    res.json({ tasks, total: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find();
    const totalTasks = await Task.countDocuments(); 
    res.status(200).json({ tasks: allTasks, total: totalTasks }); 
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'An error occurred while fetching tasks.' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.status === "finished") {
      updates.endTime = new Date(); 
    }

    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.userId },
      updates,
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, user: req.userId });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createTask, getAllTasks, getTasks, updateTask, deleteTask };