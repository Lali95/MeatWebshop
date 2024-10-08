import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../Css/LandingPage.css'; // Ensure this path is correct
import Topbar from '../Components/Topbar';

const LandingPage = () => {
  const { t } = useTranslation();

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
        {t('back')}
      </button>
    </div>
  );
};

export default LandingPage;
