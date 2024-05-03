import { Button, IconButton, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            <Button variant="contained">Home</Button>
          </Nav.Link>
          <Nav.Link>
            <Button
              variant="contained"
              onClick={() => navigate("/searchbymaindish")}
            >
              Search by Main Dish
            </Button>
          </Nav.Link>
          <Nav.Link>
            <Button
              variant="contained"
              onClick={() => navigate("/searchbyingredients")}
            >
              Search by Ingredients
            </Button>
          </Nav.Link>
          {token ? (
            <>
              <Nav.Link as={Link} to="/myrecipes">
                <Button variant="contained">My Recipes</Button>
              </Nav.Link>
              <Nav.Link as={Link} to="/mywishlist">
                <Button variant="contained">My Wishlist</Button>
              </Nav.Link>
              <Nav.Link onClick={logout}>
                <Button variant="contained">Logout</Button>
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">
                <Button variant="contained">Login</Button>
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                <Button variant="contained">Register</Button>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
