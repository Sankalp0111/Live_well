import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  Button,
} from "reactstrap";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication status when component mounts & whenever localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth); // Listen for auth changes

    return () => window.removeEventListener("storage", checkAuth); // Cleanup
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsAuthenticated(false);
    navigate("/signin"); // Redirect to sign-in page
  };

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <Navbar color="primary" dark expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <div className="text-white fw-bold fs-2">LiveWell</div>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={toggleNavbar}
        >
          {isOpen ? <i className="bi bi-x"></i> : <i className="bi bi-three-dots-vertical"></i>}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="ms-auto" navbar>
          <NavItem>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </NavItem>
          <NavItem>
            <Link to="/smartpill" className="nav-link">Pill Reminder</Link>
          </NavItem>
          <NavItem>
            <Link to="/gps-location" className="nav-link">GPS Location</Link>
          </NavItem>
          <NavItem>
            <Link to="/chatbot" className="nav-link">AI Chatbot</Link>
          </NavItem>

          {isAuthenticated ? (
            <NavItem>
              <Button color="danger" onClick={handleLogout}>
                <FaSignOutAlt className="me-2" /> Logout
              </Button>
            </NavItem>
          ) : (
            <NavItem>
              <Link to="/signin" className="nav-link">
                <FaSignInAlt className="me-2" />Log Out
              </Link>
            </NavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
