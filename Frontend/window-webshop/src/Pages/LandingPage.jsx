import React from 'react';
import { Outlet } from 'react-router-dom';
import '../Css/LandingPage.css';
import Topbar from '../Components/Topbar';

const LandingPage = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="nav-container">
      <Topbar />
      <div className="content-container">
        <Outlet />
      </div>
      <button className="back-button btn btn-secondary m-2" onClick={handleGoBack}>
        Back
      </button>
    </div>
  );
};

export default LandingPage;
