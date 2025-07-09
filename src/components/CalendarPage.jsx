import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState({});

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleAddTask = (taskDate) => {
    const taskTitle = prompt('Ingrese el título de la tarea:');
    if (taskTitle) {
      setTasks({
        ...tasks,
        [taskDate]: [...(tasks[taskDate] || []), taskTitle],
      });
    }
  };

  const renderTasks = (date) => {
    const dateKey = date.toLocaleDateString();
    return (
      <div>
        {tasks[dateKey] ? (
          <ul>
            {tasks[dateKey].map((task, idx) => (
              <li key={idx}>{task}</li>
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
      <div className="calendar-card">
        <h2>Calendario de Tareas</h2>
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileContent={({ date, view }) => view === 'month' && renderTasks(date)}
        />
        <div>
          <h3>Detalles de la Tarea</h3>
          <p>Fecha seleccionada: {date.toLocaleDateString()}</p>
          {renderTasks(date)}
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
