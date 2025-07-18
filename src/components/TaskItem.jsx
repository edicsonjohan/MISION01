import { useState } from "react";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editedTitle.trim()) {
      onEdit(task.id, editedTitle.trim(), editedDescription.trim());
      setIsEditing(false);
    }
  };

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="edit-form" style={{ flex: 1 }}>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Título"
            className="edit-input"
            required
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Descripción"
            className="edit-textarea"
          />
          <button type="submit" className="save-btn">
            <FaSave /> Guardar
          </button>
        </form>
      ) : (
        <div className="task-content" onClick={() => onToggle(task.id)}>
          <strong>{task.title}</strong>
          <p>{task.description}</p>
        </div>
      )}

      <div className="task-actions">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="edit-btn"
            title="Editar"
          >
            <FaEdit />
          </button>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className="delete-btn"
          title="Eliminar"
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
