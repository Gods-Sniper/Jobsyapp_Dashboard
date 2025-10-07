import React from "react";
import LogsViewer from "../components/Logs/LogsViewer";

export default function Logs() {
  return (
    <div style={{ padding: 24 }}>
      <h2>System Logs</h2>
      <LogsViewer />
    </div>
  );
}
