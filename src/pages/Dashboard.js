import React, { useEffect, useState } from "react";
import { api } from "../api";
import { Typography, Paper, Box, Grid, CircularProgress } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import CountUp from "react-countup";

const COLORS = ["#0077B6", "#00B4D8", "#FFD166"];

export default function Dashboard() {
  const [stats, setStats] = useState({ users: 0, jobs: 0, feedbacks: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/analytics/summary").then((res) => {
      setStats(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  const data = [
    { name: "Total Users", value: stats.users },
    { name: "Total Jobs", value: stats.jobs },
    { name: "Feedbacks", value: stats.feedbacks },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#40189d", fontWeight: 600, mb: 4 }}
      >
       Jobsy Admin Dashboard
      </Typography>

      {/* Summary Numbers */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {data.map((item, i) => (
          <Grid item xs={12} md={4} key={item.name}>
            <Paper
              sx={{
                py: 5,
                px: 13,
                borderRadius: "16px",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transform: "scale(1.0)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": { transform: "scale(1.05)", boxShadow: "0 6px 20px rgba(0,0,0,0.15)" },
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: COLORS[i], fontWeight: 600 }}
              >
                {item.name}
              </Typography>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "#023E8A", mt: 1 }}
              >
                <CountUp end={item.value} duration={2} />
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={4} py={2} px={8}>
        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              py: 5,
              px: 12,
              borderRadius: "16px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
              backgroundColor: "#ffffff",
            }}
          >
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ color: "#023E8A", fontWeight: 600 }}
            >
              Jobsy System Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data} barSize={50}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#0077B6"
                  radius={[12, 12, 0, 0]}
                  animationDuration={1200}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              py: 3,
              px: 13,
              borderRadius: "16px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
              backgroundColor: "#ffffff",
            }}
          >
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ color: "#023E8A", fontWeight: 600 }}
            >
              Distribution Summary
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  animationDuration={1000}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
