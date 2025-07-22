import { useState } from "react";

const API_URL = "https://mision01.onrender.com/api"; // ✅ Backend en Render

function AddTask({ onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      title: title.trim(),
      description: description.trim(),
      userId: 1,        // ⚠️ Asegúrate que existe en tu DB
      categoryId: 1     // ⚠️ Asegúrate que existe también
    };

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("No se pudo crear la tarea.");
      }

      const createdTask = await response.json();

      // Notifica al componente padre
      if (onTaskCreated) {
        onTaskCreated(createdTask);
      }

      // Limpia el formulario
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("❌ Error al agregar tarea:", error.message);
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
