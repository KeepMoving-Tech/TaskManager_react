import "../css/Menu.css";

interface MenuProps {
  setView?: (view: "all" | "progress") => void;
  currentView?: string;
}

function Menu({ setView, currentView }: MenuProps) {
  return (
    <>
      <div className="sidebar">
        <div className="logo">Task Manager</div>
        <ul className="menu-list">
          <li
            className={currentView === "all" ? "active" : ""}
            onClick={() => setView?.("all")}
          >
            <a>Dashboard</a>
          </li>
          <li
            className={currentView === "progress" ? "active" : ""}
            onClick={() => setView?.("progress")}
          >
            <a>Progress Tasks</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Menu;
