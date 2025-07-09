import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaHome, FaTasks, FaCog, FaBars, FaRegCalendar, FaUser } from 'react-icons/fa';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import CalendarPage from './components/CalendarPage';
import ContactPage from './components/ContactPage';
import './styles.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (data) => {
    const newTask = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      dueDate: dueDate,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Router>
      <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        {/* Sidebar */}
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          {/* Botón verde para abrir/cerrar sidebar */}
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
            <li><Link to="/calendar"><FaRegCalendar /></Link></li>
            <li>
              <Link to="/contact" onClick={() => setIsSidebarOpen(false)}>
                <FaUser/>
              </Link>
            </li>
          </ul>
        </div>

        {/* Contenido principal */}
        <div className="content">
          {/* Aquí eliminamos el botón verde original */}

          <Routes>
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/"
              element={
                <div className="card">
                  <h1>Mis Tareas</h1>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                  />
                  <AddTask onAdd={addTask} />
                  <p>{tasks.filter((t) => !t.completed).length} tareas pendientes</p>
                  <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
