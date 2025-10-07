import React, { useEffect, useState } from "react";
import { api } from "../../api";
import { Card, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";

// Helper function for counting animation
const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = value / (duration / 20);
    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(counter);
      }
      setDisplayValue(Math.floor(start));
    }, 20);
    return () => clearInterval(counter);
  }, [value]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        color: "#1E88E5",
        fontWeight: 700,
        fontSize: "2rem",
      }}
    >
      {displayValue}
    </motion.span>
  );
};

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState({ users: 0, jobs: 0, feedbacks: 0 });

  useEffect(() => {
    api.get("/analytics/summary").then((res) => setStats(res.data));
  }, []);

  const cards = [
    { title: "Total Users", value: stats.users, color: "#1E88E5" },
    { title: "Total Jobs", value: stats.jobs, color: "#43A047" },
    { title: "Feedbacks", value: stats.feedbacks, color: "#FB8C00" },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index} >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <Card
              elevation={4}
              style={{
                padding: 24,
                borderRadius: 20,
                textAlign: "center",
                background: "#fff",
                boxShadow:
                  "0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <Typography
                variant="h6"
                style={{
                  color: "#555",
                  marginBottom: 8,
                  fontWeight: 500,
                }}
              >
                {item.title}
              </Typography>

              <AnimatedNumber value={item.value} />
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
}
