import React from "react";
import { Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, email, password);
    const data = {
      username,
      email,
      password,
    };

    axios
      .post("http://localhost:4000/api/users/register", data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        navigate("/myrecipes");

        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
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
          Register
        </Typography>
        <Form onSubmit={handleSubmit} style={{ width: "60%" }}>
          <Form.Group
            controlId="formBasicUsername"
            className="d-flex flex-column mb-4 mt-4"
          >
            <TextField
              fullWidth
              required
              type="text"
              label="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            controlId="formBasicEmail"
            className="d-flex flex-column mb-4 mt-4"
          >
            <TextField
              fullWidth
              required
              type="email"
              label="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            controlId="formBasicPassword"
            className="d-flex flex-column mb-4 mt-4"
          >
            <TextField
              fullWidth
              required
              type="password"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="contained" type="submit" fullWidth>
            Submit
          </Button>
        </Form>
      </Box>
    </div>
  );
};

export default Register;
