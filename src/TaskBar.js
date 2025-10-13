import React from "react";
import { useNavigate } from "react-router-dom";
import "./Taskbar.css";

const TaskBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out!");
    navigate("/login"); // redirect after logout
  };

  return (
    <div className="taskbar">
      <div className="taskbar-title">BizSpark</div>
      <div className="taskbar-actions">
        <div className="dropdown">
          <button className="dropbtn">👨‍💼</button>
          <div className="dropdown-content">
            <a href="/profile">Profile</a>
            <button onClick={handleLogout} className="dropdown-logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskBar;
