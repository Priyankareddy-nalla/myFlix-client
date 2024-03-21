import React from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <Navbar bg="primary" variant="dark" sticky="top" expand="lg">
      <Container>
        <Navbar.Brand  style={{ fontSize: "30px",color: "rgb(223, 27, 187)"}} as={Link} to="/">
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user ? (
              <>
                <Nav.Link  style={{color: "white"}} as={Link}  to="/login">
                  Login
                </Nav.Link>
                <Nav.Link style={{color: "white"}}  as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link  style={{color: "white"}} as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link style={{color: "white"}}  as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link  style={{color: "white"}} onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
