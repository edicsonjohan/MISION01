import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  return (
    <>
      {tasks.length === 0 ? (
        <p className="no-tasks">No hay tareas pendientes.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={() => onToggle(task.id)}
              onDelete={() => onDelete(task.id)}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TaskList;
