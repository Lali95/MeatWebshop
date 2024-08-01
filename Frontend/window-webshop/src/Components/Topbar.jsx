import React, { useContext, useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Form, FormControl, Button, ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import '../Css/Topbar.css';
import logo from '../assets/logo.png';
import { AuthContext } from '../Contexts/AuthContext.jsx';  // Ensure correct path and extension

const Topbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchFormRef = useRef(null);
  const suggestionsDropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.length >= 3) { // Adjusted to start fetching from 3 characters
      async function fetchSuggestions() {
        try {
          const response = await fetch(`/api/OrderItem?type=${searchTerm}`);
          if (response.ok) {
            const data = await response.json();
            // Handle cases where data might be wrapped in an object
            const suggestionsArray = Array.isArray(data) ? data : data.$values || [];
            setSuggestions(suggestionsArray);
            setShowSuggestions(true);
          } else {
            console.error('Failed to fetch suggestions');
          }
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

  const handleSuggestionClick = (id) => {
    navigate(`/item/${id}`); // Navigate to the item's detail page
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
      <Navbar.Brand className="company-name" onClick={() => navigate('/')}>
        <img src={logo} alt="Company Logo" className="logo" />
        Sülysápi Húsmester
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/about" className="btn btn-primary m-2">
          About
        </Nav.Link>
        <Nav.Link as={Link} to="/browse" className="btn btn-primary m-2">
          Browse
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
            {Array.isArray(suggestions) && suggestions.map((suggestion) => (
              <ListGroup.Item
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion.id)} // Pass item ID to navigate
              >
                {suggestion.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Form>
      {isAuthenticated ? (
        <>
          <Nav.Link as={Link} to="/profile" className="btn btn-primary m-2">
            Profile
          </Nav.Link>
          <Nav.Link as={Link} to="/cart" className="btn btn-primary m-2">
            Cart
          </Nav.Link>
          <Button onClick={logout} className="btn btn-danger m-2">
            Logout
          </Button>
        </>
      ) : (
        <>
          <Nav.Link as={Link} to="/register" className="btn btn-primary m-2">
            Register
          </Nav.Link>
          <Nav.Link as={Link} to="/login" className="btn btn-primary m-2">
            Login
          </Nav.Link>
        </>
      )}
    </Navbar>
  );
};

export default Topbar;
