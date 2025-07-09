import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Cambié Switch por Routes
import { FaHome, FaTasks, FaCog, FaBars } from 'react-icons/fa'; // Iconos importados
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import CalendarPage from './components/CalendarPage'; // Calendario de tareas
import ContactPage from './components/ContactPage'; // Página de contacto
import './styles.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Cargar tareas desde localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Guardar tareas en localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Función para agregar una tarea completa
  const addTask = (data) => {
    const newTask = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      dueDate: dueDate,
      completed: false
    };
    setTasks([newTask, ...tasks]);
  };

  // Alternar estado de completado de una tarea
  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Eliminar una tarea
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Router>
      <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        {/* Sidebar */}
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>
            <FaBars />
          </button>
          <ul>
            {/* Usar Link para la navegación */}
            <li><Link to="/"><FaHome /></Link></li> {/* Enlace a la página de inicio */}
            <li><Link to="/calendar"><FaTasks /></Link></li> {/* Enlace a CalendarPage */}
            <li><Link to="/contact"><FaCog /></Link></li> {/* Enlace a ContactPage */}
          </ul>
        </div>

        {/* Contenido principal */}
        <div className="content">
          <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FaBars />
          </button>

          {/* Definir las rutas con Routes */}
          <Routes>
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/" element={
              <div className="card">
                <h1>Mis Tareas</h1>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
                <AddTask onAdd={addTask} />
                <p>{tasks.filter(t => !t.completed).length} tareas pendientes</p>
                <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
