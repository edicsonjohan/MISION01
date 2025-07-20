import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import AddTask from "./AddTask";

const API_URL = "http://localhost:3001/api";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  const handleToggle = async (task) => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      const res = await fetch(`${API_URL}/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      const data = await res.json();
      setTasks(tasks.map((t) => (t.id === data.id ? data : t)));
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  const handleEdit = async (updatedTask) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${updatedTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      const data = await res.json();
      setTasks(tasks.map((t) => (t.id === data.id ? data : t)));
    } catch (error) {
      console.error("Error al editar tarea:", error);
    }
  };

  const handleNewTask = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  return (
    <>
      <AddTask onTaskCreated={handleNewTask} />
      {tasks.length === 0 ? (
        <p className="no-tasks">No hay tareas pendientes.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={() => handleToggle(task)}
              onDelete={() => handleDelete(task.id)}
              onEdit={handleEdit}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TaskList;
