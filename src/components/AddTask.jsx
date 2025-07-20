import { useState } from "react";

const API_URL = "http://localhost:3001/api";

function AddTask({ onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Datos obligatorios para tu backend (ajusta los IDs según lo que tengas)
    const newTask = {
      title: title.trim(),
      description: description.trim(),
      userId: 1,        // ← Asegúrate de que este user exista
      categoryId: 1     // ← Asegúrate de que esta categoría exista
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

      // Notificar al componente padre que se creó una tarea
      if (onTaskCreated) {
        onTaskCreated(created);
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
