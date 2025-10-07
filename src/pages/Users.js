import React from "react";
import UserList from "../components/Users/UserList";

export default function Users() {
  return (
    <div style={{ padding: 24 }}>
      <h1
        style={{
          color: "#40189d",
          fontWeight: "700",
          marginBottom: 16,
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        User Management
      </h1>
      <UserList />
    </div>
  );
}
