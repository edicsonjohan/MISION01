function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content" onClick={() => onToggle(task.id)}>
        <strong className="task-title">{task.title}</strong>

        {task.description && (
          <p className="task-desc">{task.description}</p>
        )}

        {task.dueDate && (
          <small className="task-date">📅 {task.dueDate}</small>
        )}
      </div>

      <button onClick={() => onDelete(task.id)}>🗑</button>
    </li>
  );
}

export default TaskItem;
