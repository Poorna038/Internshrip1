import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateUser.css"; 

const CreateUser = () => { 
  const navigate = useNavigate(); 

  const [user, setUser] = useState({
    name: "", user_type: "", email: "", mobile: "", role: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create user.");
      }

      alert("User created successfully!");
      navigate("/users");
    } catch (error) {
      console.error("Error creating user:", error.message);
      alert(`Failed to create user: ${error.message}`);
    }
  };

  return (
    <div className="create-user-container">
      <form className="create-user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <h2>Create User</h2>
          <div className="input-label">
            <label>User Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="User Name"
              required
            />
          </div>
          <div className="input-label">
            <label>User Type</label>
            <input
              type="text"
              name="user_type"
              value={user.user_type}
              onChange={handleChange}
              placeholder="User Type"
              required
            />
          </div>
          <div className="input-label">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="input-label">
            <label>Mobile</label>
            <input
              type="tel"
              name="mobile"
              value={user.mobile}
              onChange={handleChange}
              placeholder="Mobile"
              required
            />
          </div>
          <div className="input-label">
            <label>Role</label>
            <input
              type="text"
              name="role"
              value={user.role}
              onChange={handleChange}
              placeholder="Role"
              required
            />
          </div>
        </div>

        <div className="button-group">
          <button type="submit">Create User</button>
          <button type="button" onClick={() => navigate("/users")} style={{ marginLeft: "10px" }}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
