import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (!tasks.length) {
    return <p className="no-tasks">No hay tareas pendientes.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TaskList;
