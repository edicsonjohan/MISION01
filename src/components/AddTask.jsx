import { useState } from "react";

const API_URL = "http://localhost:3001/api";

function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      title: title.trim(),
      description: description.trim(),
      userId: 1,        // Asegúrate que este usuario exista en tu base de datos
      categoryId: 1     // Asegúrate que esta categoría también exista
    };

    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      const created = await res.json();

      // Notificar al componente padre (App.jsx)
      if (onAdd) {
        onAdd(created);
      }

      // Limpiar el formulario
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
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
