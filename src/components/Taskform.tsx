import React, { useState } from "react";
import "../css/Taskform.css";

interface Taskform {
  onCancel: () => void;
  onAddTask: (title: string, date: string, desc: string) => void;
}

const Taskform: React.FC<Taskform> = ({ onCancel, onAddTask }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = () => {
    if (title.trim() === "") return alert("Missing Title!");
    onAddTask(title, desc, date);
  };

  return (
    <div className="task-form-box">
      <h3>New Task</h3>

      <div className="input-group">
        <label>Task Title:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="task-input"
        />
      </div>

      <div className="input-group">
        <label>Deadline:</label>
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          className="task-date-input"
        />
      </div>

      <div className="input-group">
        <label>Description:</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="task-textarea"
        ></textarea>
      </div>

      <div className="task-form-buttons">
        <button className="submit-task-btn" onClick={handleSubmit}>
          Add to List
        </button>
        <button className="cancel-task-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Taskform;
