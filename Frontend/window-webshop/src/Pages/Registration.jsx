import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import '../Css/Registration.css'; 

const Registration = () => {
  const { t } = useTranslation();
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
        setError(errorData.error || t('registrationFailed'));
        return;
      }

      const data = await response.json();
      console.log("Registration successful");
      console.log("User Email:", data.email);
      console.log("User Token:", data.token);

      navigate(`/login`);
    } catch (error) {
      console.error("Error during registration:", error);
      setError(t('unexpectedError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <h4 className="registration-heading">{t('Enter your data')}</h4>
      <form className="registration-form" onSubmit={handleRegistration}>
        <label className="registration-label">
          {t('username')}:
          <input
            className="registration-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            aria-label={t('username')}
          />
        </label>
        <label className="registration-label">
          {t('Email address')}:
          <input
            className="registration-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label={t('email')}
          />
        </label>
        <label className="registration-label">
          {t('Password')}:
          <input
            className="registration-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label={t('password')}
          />
        </label>
        <label className="registration-label">
          {t('confirmPassword')}:
          <input
            className="registration-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            aria-label={t('confirmPassword')}
          />
        </label>
        <label className="registration-label">
          {t('dateOfBirth')}:
          <input
            className="registration-input"
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
            aria-label={t('dateOfBirth')}
          />
        </label>
        <label className="registration-label">
          {t('address')}:
          <input
            className="registration-input"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            aria-label={t('address')}
          />
        </label>
        {error && <p className="error-text">{error}</p>}
        <button
          type="submit"
          className="registration-button"
          disabled={loading} // Disable button while loading
        >
          {loading ? t('registering') : t('register')}
        </button>
        {!passwordMatch && <p className="error-text">{t('passwordsDoNotMatch')}</p>}
      </form>
    </div>
  );
};

export default Registration;
