import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./Signin.css"; // Import CSS

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Sign In)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/elements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Account created successfully! You can now log in.");
        navigate("/login"); // Redirect to login page on successful sign up
      } else {
        alert("Sign Up failed! Please try again.");
      }
    } catch (error) {
      alert("SignIn failed! Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="signin-box">
        <h2>Sign In</h2>
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
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
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
          <button type="submit">Sign In</button>
        </form>

        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
