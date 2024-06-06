import React, { useState } from "react";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [birthDate, setBirthDate] = useState(""); // Initialize with empty string
  const [address, setAddress] = useState(""); // Initialize with empty string
  const [balance, setBalance] = useState(0); // Initialize with zero

  const handleRegistration = async (e) => {
    e.preventDefault();

    const registrationData = {
      UserName: username,
      Email: email,
      Password: password,
      BirthDate: birthDate,
      Address: address,
    };

    try {
      const response = await fetch('/api/Auth/Register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.title); // Assuming the error title is meaningful
        setSuccessMessage(""); // Clear success message on error
        return;
      }

      const data = await response.json();
      setSuccessMessage(`Successful registration: ${data.userName}`);
      setErrorMessage(""); // Clear error message on success
      setBirthDate(data.birthDate || ""); // Ensure birthDate is defined or set to empty string
      setAddress(data.address || ""); // Ensure address is defined or set to empty string
      setBalance(data.balance || 0); // Ensure balance is defined or set to 0

    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("An error occurred during registration. Please try again later.");
      setSuccessMessage(""); // Clear success message on error
    }
  };

  return (
    <div className="registration-container">
      <h4>Please enter your details to register</h4>
      <form onSubmit={handleRegistration}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
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
        <div>
          <label>
            Birth Date:
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
      {balance !== 0 && (
        <div className="registration-details">
          <h4>Registration Details:</h4>
          <p><strong>Birth Date:</strong> {birthDate}</p>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Balance:</strong> ${balance.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default Registration;
