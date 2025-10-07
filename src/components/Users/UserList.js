import React, { useEffect, useState } from "react";
import { api } from "../../api";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Typography,
  Chip,
  Stack,
} from "@mui/material";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    api.get("/users/").then((res) => setUsers(res.data || []));
  };

  const handleAction = (id, action) => {
    let endpoint = "";
    if (action === "activate") endpoint = `/users/${id}/activate`;
    if (action === "block") endpoint = `/users/${id}/block`;
    if (action === "delete") endpoint = `/users/${id}/delete`;

    api.patch(endpoint).then(() => {
      fetchUsers();
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "success";
      case "blocked":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom color="#40189d">
        User Accounts
      </Typography>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell sx={{ fontWeight: "bold", color: "#40189d" }}>
              Username
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#40189d" }}>
              Email
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#40189d" }}>
              Role
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#40189d" }}>
              Status
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#40189d" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user._id}
              sx={{
                "&:hover": { backgroundColor: "#f9f9f9" },
              }}
            >
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell sx={{ textTransform: "capitalize" }}>
                {user.role}
              </TableCell>
              <TableCell>
                <Chip
                  label={user.accountStatus || "unknown"}
                  color={getStatusColor(user.accountStatus || "")}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleAction(user._id, "activate")}
                    sx={{ textTransform: "none" }}
                  >
                    Activate
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleAction(user._id, "block")}
                    sx={{ textTransform: "none" }}
                  >
                    Block
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleAction(user._id, "delete")}
                    sx={{ textTransform: "none" }}
                  >
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
