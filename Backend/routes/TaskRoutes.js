import express from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controller/TaskController.js"
import jwt from "jsonwebtoken";
const taskRoute = express.Router();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.userId = decoded.userId;
    next();
  });
};

taskRoute.use(authenticate);

taskRoute.post("/", createTask);
taskRoute.get("/", getTasks);
taskRoute.put("/:id", updateTask);
taskRoute.delete("/:id", deleteTask);

export default taskRoute