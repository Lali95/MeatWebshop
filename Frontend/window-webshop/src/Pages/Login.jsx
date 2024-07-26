import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext.jsx';
import '../Css/Login.css'; 

const Login = () => {
  const { login, isAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      Email: email,
      Password: password,
    };

    try {
      const response = await fetch("/api/Auth/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        console.error("Login failed:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log("Login successful");
      console.log("User Email:", data.email);
      console.log("User Token:", data.token);

      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("userEmail", data.email); // Store email in local storage
      login(data.token);
      navigate(`/profile`);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-container">
      {isAuthenticated ? (
        <div>
          <h3 className="login-heading">You are already logged in.</h3>
          <Profile />
        </div>
      ) : (
        <div>
          <h3 className="login-heading">Log in</h3>
          <form onSubmit={handleLogin} className="login-form">
            <label className="login-label">
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login-input"
              />
            </label>
            <label className="login-label">
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-input"
              />
            </label>
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
