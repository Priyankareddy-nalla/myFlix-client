import React from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

export const NavigationBar = ({ user, onLoggedOut, setSearch, setSelectedGenre }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <Navbar bg="primary" variant="dark" sticky="top" expand="lg">
            <Container>
                <Navbar.Brand style={{ fontSize: "30px", color: "rgb(223, 27, 187)" }} as={Link} to="/">
                    MyFlix
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user ? (
                            <>
                                <Nav.Link style={{ color: "white" }} as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link style={{ color: "white" }} as={Link} to="/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link style={{ color: "white" }} as={Link} to="/">
                                    Home
                                </Nav.Link>
                                <Nav.Link style={{ color: "white" }} as={Link} to="/profile">
                                    Profile
                                </Nav.Link>
                                <Nav.Link style={{ color: "white" }} onClick={onLoggedOut}>Logout</Nav.Link>
                            </>
                        )}
                    </Nav>
                    {/* showing search bar and genre dropdown only on the home page and for logged in users */}
                    {isHomePage && user && (
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="mr-2"
                                aria-label="Search"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button variant="outline-light" onClick={() => setSelectedGenre('')}>
                                Clear
                            </Button>
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                                    Genre
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setSelectedGenre('Comedy')}>Comedy</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSelectedGenre('Animated')}>Animated</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSelectedGenre('Action')}>Action</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSelectedGenre('Drama')}>Drama</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSelectedGenre('Chidrens film')}>Chidrens film</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSelectedGenre('Sports')}>Sports</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
