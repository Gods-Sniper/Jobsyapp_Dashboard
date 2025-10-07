import React, { useState } from "react";
import { api } from "../../api";
import { Button, TextField, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/signin", { email, password });
      if (res.data.user.role !== "admin") {
        setError("Access denied. Admins only.");
        return;
      }
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(email, password);

      setError("Invalid credentials");
    }
  };

  return (
    <Paper style={{ padding: 32, maxWidth: 400, margin: "80px auto" }}>
      <Typography variant="h5" gutterBottom>
        Admin Login
      </Typography>
      <form onSubmit={handleLogin}>
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
          Login
        </Button>
      </form>

      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          onClick={() => navigate("/register")}
          variant="contained"
          color="primary"
        >
          Signup
        </Button>
      </Box>
    </Paper>
  );
}
