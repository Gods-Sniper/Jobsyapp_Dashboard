import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar position="fixed" sx={{ zIndex: 1201, background: "#ffffffff" }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }} color="#000">
          Jobsy Dashboard
        </Typography>
        <Box
          component="img"
          src={require("../../assets/images/logo 2.png")}
          alt="Jobsy Logo"
          sx={{ height: 40 }}
        />
      </Toolbar>
    </AppBar>
  );
}
