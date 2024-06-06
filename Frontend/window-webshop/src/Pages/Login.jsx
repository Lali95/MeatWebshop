import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for tracking login status

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      Email: email,
      Password: password,
    };

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        return;
      }

      // Login successful
      setIsLoggedIn(true);

    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      {isLoggedIn ? ( // If logged in, display welcome message
        <div>
          <h4>Welcome, {email}!</h4>
          {/* You can customize the welcome message as needed */}
        </div>
      ) : ( // If not logged in, display login form
        <div>
          <h4>Please log in</h4>
          <form onSubmit={handleLogin}>
            <div>
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
