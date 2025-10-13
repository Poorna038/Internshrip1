import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./CreateUser.css";

const UserUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({
    id: "",
    name: "",
    userType: "",
    email: "",
    mobile: "",
    role: ""
  });

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
    } else {
      alert("No user data provided!");
      navigate("/user");
    }
  }, [location.state, navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/users/${user.id}`, user);
      alert("User updated successfully!");
      navigate("/users");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  };

  return (
    <div className="create-user-container">
      
      <form onSubmit={handleSubmit} className="create-user-form">
        <h2>Update User</h2>
        {[
          ["name", "Name", true],
          ["user_type", "User Type"],
          ["email", "Email"],
          ["mobile", "Mobile"],
          ["role", "Role"]
        ].map(([key, label, isDisabled = false]) => (
          <div className="form-group" key={key}>
            <label>{label}</label>
            <input
              type="text"
              name={key}
              value={user[key] || ""}
              onChange={handleChange}
              placeholder={`Enter ${label}`}
              disabled={isDisabled}
              required={!isDisabled}
            />
          </div>
        ))}

        <div className="button-group">
          <button type="submit">Update User</button>
          <button type="button" onClick={() => navigate("/users")} style={{ marginLeft: "10px" }}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserUpdate;
