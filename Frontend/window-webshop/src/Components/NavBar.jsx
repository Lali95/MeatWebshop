// src/components/NavBar.js
import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import '../Css/NavBar.css';
import logo from '../assets/logo.png';

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand className="company-name">
        <img src={logo} alt="Company Logo" className="logo" />
        Sülysáp Húsmester
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/" className="btn btn-primary m-2">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/about" className="btn btn-primary m-2">
          About Us
        </Nav.Link>
        <Nav.Link as={Link} to="/browse" className="btn btn-primary m-2">
          Browse Meat
        </Nav.Link>
      </Nav>
      <Form className="d-flex search-form">
        <FormControl
          type="search"
          placeholder="Search"
          className="mr-2 search-input"
          aria-label="Search"
        />
        <Button variant="outline-success" className="search-button">
          <BsSearch />
        </Button>
      </Form>
      <Nav.Link as={Link} to="/register" className="btn btn-primary m-2">
        Register
      </Nav.Link>
      <Nav.Link as={Link} to="/login" className="btn btn-primary m-2">
        Login
      </Nav.Link>
    </Navbar>
  );
};

export default NavBar;
