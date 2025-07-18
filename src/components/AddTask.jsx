import { useState } from 'react';

function AddTask({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');


  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && dueDate) {
  onAdd({ title, description, dueDate });
  setTitle('');
  setDescription('');
  setDueDate('');
}

  };

  return (
    <form onSubmit={handleSubmit}> 
    <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      
      <input
        type="text"
        placeholder="Título de la tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Agregar Tarea</button>
    </form>
  );
}

export default AddTask;
