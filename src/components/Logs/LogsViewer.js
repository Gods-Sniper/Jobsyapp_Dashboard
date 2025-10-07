import React, { useEffect, useState } from "react";
import { api } from "../../api";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Avatar,
  Divider,
} from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";


export default function LogsViewer() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get("/logs/").then((res) => setLogs(res.data.logs || []));
  }, []);

  return (
    <Stack spacing={2} padding={2}>
      {logs.map((log) => (
        <Card
          key={log._id}
          elevation={3}
          sx={{
            borderRadius: 2,
            transition: "0.3s",
            "&:hover": { boxShadow: 6 },
          }}
        >
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: "#40189D" }}>
                <EventNoteIcon />
              </Avatar>
              <Stack spacing={0.5}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {log.action.replace("_", " ").toUpperCase()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {log.description}
                </Typography>
                <Divider sx={{ mt: 1, mb: 0.5 }} />
                <Typography variant="caption" color="text.secondary">
                  {new Date(log.timestamp).toLocaleString()} | By ID:{" "}
                  {log.performedBy}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
