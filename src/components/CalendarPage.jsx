import React, { useState } from 'react';
import Calendar from 'react-calendar'; // Asegúrate de importar el componente Calendar
import 'react-calendar/dist/Calendar.css';  // Importar estilos del calendario

function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState({}); // Aquí almacenaremos las tareas por fecha

  // Cambiar la fecha seleccionada
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // Agregar tarea a una fecha específica
  const handleAddTask = (taskDate) => {
    const taskTitle = prompt('Ingrese el título de la tarea:');
    if (taskTitle) {
      setTasks({
        ...tasks,
        [taskDate]: [...(tasks[taskDate] || []), taskTitle],
      });
    }
  };

  // Renderizar tareas para una fecha específica
  const renderTasks = (date) => {
    const dateKey = date.toLocaleDateString(); // Usar la fecha como clave
    return (
      <div>
        {tasks[dateKey] ? (
          <ul>
            {tasks[dateKey].map((task, idx) => (
              <li key={idx}>{task}</li> // Renderizamos las tareas de la fecha seleccionada
            ))}
          </ul>
        ) : (
          <p>No hay tareas para esta fecha</p>
        )}
        <button onClick={() => handleAddTask(dateKey)}>Agregar tarea</button>
      </div>
    );
  };

  return (
    <div className="calendar-page">
      <h2>Calendario de Tareas</h2>
      <Calendar
        onChange={handleDateChange} // Cambiar la fecha al seleccionar una nueva
        value={date} // Fecha seleccionada
        tileContent={({ date, view }) => view === 'month' && renderTasks(date)} // Mostrar tareas solo en vista mensual
      />
      <div>
        <h3>Detalles de la Tarea</h3>
        <p>Fecha seleccionada: {date.toLocaleDateString()}</p>
        {renderTasks(date)} {/* Renderizar tareas de la fecha seleccionada */}
      </div>
    </div>
  );
}

export default CalendarPage;
