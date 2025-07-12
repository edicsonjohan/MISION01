import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FaHome, FaRegCalendar, FaUser, FaBars } from "react-icons/fa";

import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import CalendarPage from "./components/CalendarPage";
import ContactPage from "./components/ContactPage";
import "./styles.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Cargar tareas desde localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Guardar tareas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Agregar tarea
  const addTask = (data) => {
    const newTask = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      dueDate,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

  // Alternar estado completado
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Eliminar tarea
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Editar tarea
  const editTask = (id, updatedTitle, updatedDescription) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, title: updatedTitle, description: updatedDescription }
          : task
      )
    );
  };

  return (
    <Router>
      <div className={`app-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
        {/* Sidebar */}
        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <button
            className="sidebar-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars />
          </button>

          <ul>
            <li>
              <Link to="/" onClick={() => setIsSidebarOpen(false)}>
                <FaHome />
              </Link>
            </li>
            <li>
              <Link to="/calendar" onClick={() => setIsSidebarOpen(false)}>
                <FaRegCalendar />
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setIsSidebarOpen(false)}>
                <FaUser />
              </Link>
            </li>
          </ul>
        </div>

        {/* Contenido principal */}
        <div className="content">
          <Routes>
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/"
              element={
                <div className="card">
                  <h1>Mis Tareas</h1>
                  <AddTask onAdd={addTask} />
                  <p>
                    {tasks.filter((t) => !t.completed).length} tareas pendientes
                  </p>
                  <TaskList
                    tasks={tasks}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onEdit={editTask} // ✅ Lo agregamos correctamente aquí
                  />
                </div>
              }
            />
          </Routes>

          {/* Footer */}
          <footer className="main-footer">
            <p>&copy; 2025 Mi Empresa. Todos los derechos reservados.</p>
            <div className="footer-links">
              <a href="/privacy-policy">Política de Privacidad</a>
              <a href="/terms-of-service">Términos de Servicio</a>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
