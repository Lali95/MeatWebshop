import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Form, FormControl, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import '../Css/Topbar.css';
import logo from '../assets/logo.png';

const Topbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchFormRef = useRef(null);
  const suggestionsDropdownRef = useRef(null);

  useEffect(() => {
    if (searchTerm.length > 2) {
      async function fetchSuggestions() {
        try {
          const response = await fetch(`/api/search?query=${searchTerm}`);
          const data = await response.json();
          setSuggestions(data);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      }

      fetchSuggestions();
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = () => {
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleClickOutside = (event) => {
    if (
      searchFormRef.current &&
      !searchFormRef.current.contains(event.target) &&
      suggestionsDropdownRef.current &&
      !suggestionsDropdownRef.current.contains(event.target)
    ) {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand className="company-name">
        <img src={logo} alt="Company Logo" className="logo" />
        Sülysápi Húsmester
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/" className="btn btn-primary m-2">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/about" className="btn btn-primary m-2">
          About Us
        </Nav.Link>
        <Nav.Link as={Link} to="/browse" className="btn btn-primary m-2">
          Browse Products
        </Nav.Link>
      </Nav>
      <Form ref={searchFormRef} className="d-flex search-form">
        <FormControl
          type="search"
          placeholder="Search"
          className="mr-2 search-input"
          aria-label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button variant="outline-success" className="search-button">
          <BsSearch />
        </Button>
        {showSuggestions && (
          <ListGroup ref={suggestionsDropdownRef} className="suggestions-dropdown">
            {suggestions.map((suggestion) => (
              <ListGroup.Item
                key={suggestion.id}
                as={Link}
                to={`/${suggestion.type}/${suggestion.id}`}
                onClick={handleSuggestionClick} // Close suggestions on click
              >
                {suggestion.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
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

export default Topbar;
