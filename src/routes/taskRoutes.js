import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

// Ruta para crear una tarea
router.post("/tasks", createTask);

// Ruta para obtener todas las tareas
router.get("/tasks", getTasks);

// Ruta para actualizar una tarea
router.put("/tasks/:id", updateTask);

// Ruta para eliminar una tarea
router.delete("/tasks/:id", deleteTask);

export default router;
