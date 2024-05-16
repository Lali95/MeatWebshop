import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import '../Css/LandingPage.css';

const LandingPage = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="nav-container">
      <Navbar bg="light" expand="lg">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" className="btn btn-primary m-2">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/about" className="btn btn-primary m-2">
            About Us
          </Nav.Link>
          <Nav.Link as={Link} to="/browse" className="btn btn-primary m-2">
            Browse Windows
          </Nav.Link>
        </Nav>
      </Navbar>
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
