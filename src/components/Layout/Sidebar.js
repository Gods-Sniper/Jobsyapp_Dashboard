import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";

const drawerWidth = 220;

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "#1e293b",
          color: "#fff",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItemButton
            component={Link}
            to="/dashboard"
            sx={{
              transition: "all 0.2s",
              "&:hover": {
                background: "#334155",
                color: "#38bdf8",
                transform: "scale(1.05)",
                "& .MuiListItemIcon-root": { color: "#38bdf8" },
              },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/users"
            sx={{
              transition: "all 0.2s",
              "&:hover": {
                background: "#334155",
                color: "#38bdf8",
                transform: "scale(1.05)",
                "& .MuiListItemIcon-root": { color: "#38bdf8" },
              },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/analytics"
            sx={{
              transition: "all 0.2s",
              "&:hover": {
                background: "#334155",
                color: "#38bdf8",
                transform: "scale(1.05)",
                "& .MuiListItemIcon-root": { color: "#38bdf8" },
              },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/logs"
            sx={{
              transition: "all 0.2s",
              "&:hover": {
                background: "#334155",
                color: "#38bdf8",
                transform: "scale(1.05)",
                "& .MuiListItemIcon-root": { color: "#38bdf8" },
              },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="Logs" />
          </ListItemButton>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              transition: "all 0.2s",
              "&:hover": {
                background: "#334155",
                color: "#f87171",
                transform: "scale(1.05)",
                "& .MuiListItemIcon-root": { color: "#f87171" },
              },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}
