import React from "react";

interface Task {
  id: number;
  title: string;
  desc: string;
  date: string;
  completed: boolean;
}

interface ProgressTasksProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const ProgressTasks: React.FC<ProgressTasksProps> = ({
  tasks,
  onDelete,
  onToggle,
}) => {
  const activeTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="content">
      <div className="content-header">
        <h2>Folyamatban lévő feladatok</h2>
      </div>

      <div className="main-content">
        {activeTasks.length > 0 ? (
          <div className="task-list">
            {activeTasks.map((task) => (
              <div key={task.id} className="task-item-card">
                <div className="task-info">
                  <h4>{task.title}</h4>
                  <p>{task.desc}</p>
                  <small>Határidő: {task.date}</small>
                </div>

                <div className="task-actions">
                  <button
                    className="status-check-btn"
                    onClick={() => onToggle(task.id)}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ccc"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(task.id)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Nincs folyamatban lévő feladatod.</p>
        )}
      </div>
    </div>
  );
};

export default ProgressTasks;
