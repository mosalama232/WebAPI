import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    const data = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:4000/api/users/login", data)
      .then((res) => {
        if (res.data.message === "User not found") {
          alert("User not found");
          return;
        }
        localStorage.setItem("token", res.data.token);
        navigate("/myrecipes");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Form onSubmit={handleSubmit} style={{ width: "60%" }}>
          <Form.Group
            controlId="formBasicEmail"
            className="d-flex flex-column mb-4 mt-4"
          >
            <TextField
              fullWidth
              type="email"
              label="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            controlId="formBasicPassword"
            className="d-flex flex-column mb-4 "
          >
            <TextField
              type="password"
              fullWidth
              required
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="contained" type="submit" fullWidth>
            Submit
          </Button>
        </Form>
      </Box>
    </Container>
  );
};

export default Login;
