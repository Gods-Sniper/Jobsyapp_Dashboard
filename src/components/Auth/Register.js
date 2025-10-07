import React, { useState } from "react";
import { api } from "../../api";
import { Button, TextField, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/signup", { email, password, role: "admin" });
      navigate("/login");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <Paper style={{ padding: 32, maxWidth: 400, margin: "80px auto" }}>
      <Typography variant="h5" gutterBottom>
        Admin Register
      </Typography>
      <form onSubmit={handleRegister}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Paper>
  );
}
