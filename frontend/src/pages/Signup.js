import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { setToken } from "../store/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import CONSTANTS from "../constants";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const history = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { token } = (
        await axios.post(`${CONSTANTS.BACKEND_URL}/${CONSTANTS.SINGUP_API}`, {
          username,
          password,
          email,
        })
      ).data;
      localStorage.setItem("jwt_token", token);
      dispatch(setToken(token));
      history("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };

  return (
    <Container style={{ textAlign: "center", padding: "20px" }}>
      <Typography variant="h5">Sign Up</Typography>
      <form onSubmit={handleSubmit} style={{ display: "inline-block" }}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Button type="submit" variant="contained" color="primary">
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default Signup;
