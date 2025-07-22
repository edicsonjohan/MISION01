import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  FaHome,
  FaRegCalendar,
  FaUser,
  FaBars,
  FaClipboardList,
} from "react-icons/fa";

import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import CalendarPage from "./components/CalendarPage";
import ContactPage from "./components/ContactPage";
import Missql from "./components/Missql";
import Tareasdos from "./components/Tareasdos";
import "./styles.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Solo para pruebas locales, puedes eliminar esto si solo trabajas con backend:
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ✅ CORREGIDO: ya no se recrea, se usa lo que llega del backend
  const addTask = (taskFromServer) => {
    setTasks((prev) => [taskFromServer, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

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
            <li>
              <Link to="/Missql" onClick={() => setIsSidebarOpen(false)}>
                <FaClipboardList />
              </Link>
            </li>
            <li>
              <Link to="/Tareasdos" onClick={() => setIsSidebarOpen(false)}>
                <FaClipboardList />
              </Link>
            </li>
          </ul>
        </div>

        {/* Contenido principal */}
        <div className="content">
          <Routes>
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/Missql" element={<Missql />} />
            <Route path="/Tareasdos" element={<Tareasdos />} />
            <Route
              path="/"
              element={
                <div className="card">
                  <h1>Mis Tareas</h1>
                  <AddTask onAdd={addTask} />
                  <p>{tasks.filter((t) => !t.completed).length} tareas pendientes</p>
                  <TaskList
                    tasks={tasks}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onEdit={editTask}
                  />
                </div>
              }
            />
          </Routes>

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

