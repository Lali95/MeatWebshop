import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Css/Registration.css';

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(""); // For displaying errors
  const [loading, setLoading] = useState(false); // For handling loading state
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    setPasswordMatch(true);
    setLoading(true);

    const registrationData = {
      UserName: username,
      Email: email,
      Password: password,
      BirthDate: birthdate,
      Address: address,
    };

    try {
      const response = await fetch("/api/Auth/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Registration failed");
        return;
      }

      const data = await response.json();
      console.log("Registration successful");
      console.log("User Email:", data.email);
      console.log("User Token:", data.token);

      navigate(`/login`);
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <h4 className="registration-heading">Enter your data</h4>
      <form className="registration-form" onSubmit={handleRegistration}>
        <label className="registration-label">
          Username:
          <input
            className="registration-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            aria-label="Username"
          />
        </label>
        <label className="registration-label">
          Your email address:
          <input
            className="registration-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
          />
        </label>
        <label className="registration-label">
          Your password:
          <input
            className="registration-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
          />
        </label>
        <label className="registration-label">
          Confirm password:
          <input
            className="registration-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            aria-label="Confirm Password"
          />
        </label>
        <label className="registration-label">
          Date of birth:
          <input
            className="registration-input"
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
            aria-label="Date of Birth"
          />
        </label>
        <label className="registration-label">
          Address:
          <input
            className="registration-input"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            aria-label="Address"
          />
        </label>
        {error && <p className="error-text">{error}</p>}
        <button
          type="submit"
          className="registration-button"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Registering..." : "Register"}
        </button>
        {!passwordMatch && <p className="error-text">Passwords do not match.</p>}
      </form>
    </div>
  );
};

export default Registration;
