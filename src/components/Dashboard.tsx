import React, { useState, useEffect } from "react";
import "../css/Dashboard.css";
import Menu from "./Menu";
import TaskForm from "./Taskform";
import "../css/TaskCard.css";

interface Task {
  id: number;
  title: string;
  desc: string;
  date: string;
  completed: boolean;
}

const Dashboard: React.FC = () => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [view, setView] = useState<"all" | "progress">("all");

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addNewTask = (title: string, desc: string, date: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      desc,
      date,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setIsAdding(false);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleStatus = (id: number) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const filteredTasks =
    view === "progress" ? tasks.filter((t) => !t.completed) : tasks;

  return (
    <div className="dashboard-container">
      <div className="dashboardbox">
        <Menu setView={setView} currentView={view} />

        <div className="content">
          <div className="content-header">
            <h2>{view === "all" ? "Task Dashboard" : "Progress Tasks"}</h2>
            <button
              className="add-task-btn"
              onClick={() => setIsAdding(!isAdding)}
            >
              {isAdding ? "×" : "+"}
            </button>
          </div>

          <div className="main-content">
            {isAdding ? (
              <TaskForm
                onCancel={() => setIsAdding(false)}
                onAddTask={addNewTask}
              />
            ) : filteredTasks.length > 0 ? (
              <div className="task-list">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`task-item-card ${task.completed ? "completed" : ""}`}
                  >
                    <div className="task-info">
                      <h4
                        style={{
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {task.title}
                      </h4>
                      <p>{task.desc}</p>
                      <small>Határidő: {task.date}</small>
                    </div>

                    <div className="task-actions">
                      <button
                        className={`status-check-btn ${task.completed ? "completed" : ""}`}
                        onClick={() => toggleStatus(task.id)}
                        title={task.completed ? "uncompleted" : "completed"}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={task.completed ? "#4caf50" : "#ccc"}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteTask(task.id)}
                        title="Törlés"
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
              <p>
                {view === "progress"
                  ? "No tasks in progress."
                  : "There are no tasks."}{" "}
                <a href="#" onClick={() => setIsAdding(true)}>
                  Add a new task
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
