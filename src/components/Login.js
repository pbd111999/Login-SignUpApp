import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../components/Form.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
    const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  if (!username || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/auth/login?username=${username}&password=${password}`
    );

    const result = await response.json();

    if (response.ok) {
      alert(result.message); // Login successful
           navigate("/signup");
      console.log("User data:", result.user);
    } else {
      alert(result.message); // Invalid credentials or error
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong. Please try again.");
  }
};



  return (
    <div className="container">
      <div className="box">
        <h2 className="title">Login</h2>
        <p className="subtitle">Sign in to continue</p>

        <form onSubmit={handleLogin} className="form">
          <label>USERNAME</label>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>PASSWORD</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="Button">LOGIN</button>
        </form>

        <p className="linkbutton">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
