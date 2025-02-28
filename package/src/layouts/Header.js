import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Navbar, Collapse, Nav, NavItem, Button } from "reactstrap";
import { auth } from "../firebase"; // Import Firebase auth
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Firebase authentication state listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!", { autoClose: 2000, position: "top-center" });
      navigate("/signin"); // Redirect to sign-in page
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <Navbar color="primary" dark expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <div className="text-white fw-bold fs-2">LiveWell</div>
      </div>

      {/* Hamburger menu button for small screens */}
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
        <Nav className="ms-auto d-md-none" navbar> {/* Show menu only on small screens */}
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
            <Link to="/symptom" className="nav-link">Symptom Checker</Link>
          </NavItem>
          <NavItem>
            <Link to="/alerts" className="nav-link">Alerts</Link>
          </NavItem>
          <NavItem>
            <Link to="/profile" className="nav-link">Profile</Link>
          </NavItem>

          {/* Logout Button for Mobile View */}
          {user && (
            <NavItem>
              <Button color="none" className="w-100 mt-2 text-white" onClick={handleLogout}>
                <FaSignOutAlt className="me-2" /> Logout
              </Button>
            </NavItem>
          )}
        </Nav>
      </Collapse>

      <div className="d-none d-md-block">
        {user ? (
          <Button  color="none" className="text-white"  onClick={handleLogout}>
            <FaSignOutAlt className="me-2" /> Logout
          </Button>
        ) : (
          <Link to="/signin" className="nav-link text-white">
            <FaSignInAlt className="me-2" /> Log In
          </Link>
        )}
      </div>
    </Navbar>
  );
};

export default Header;
