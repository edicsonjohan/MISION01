import { useState } from "react";

const API_URL = "https://mision01.onrender.com/api";

function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fecha, setFecha] = useState(""); // ✅ nuevo campo opcional

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      title: title.trim(),
      description: description.trim(),
      userId: 1,
      categoryId: 1,
      fecha: fecha || new Date().toISOString().split("T")[0], // YYYY-MM-DD
    };

    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (!res.ok) {
        throw new Error("Error al crear tarea");
      }

      const created = await res.json();
      onAdd && onAdd(created);

      // Limpia el formulario
      setTitle("");
      setDescription("");
      setFecha("");
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
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        required
      />
      <button type="submit">Agregar Tarea</button>
    </form>
  );
}

export default AddTask;
