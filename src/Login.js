import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./Login.css"; // Import CSS

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Navigation hook

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Login)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/elements-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        navigate("/"); // Redirect to home page on successful login
      } else {
        alert("Incorrect credentials. Please try again.");
      }
    } catch (error) {
      alert("Login failed! Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signin")}>Create Account</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
