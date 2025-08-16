"use client";
import { useState } from "react";

export default function Footer() {
  const [hover, setHover] = useState(false);

  return (
    <footer
      style={{
        background: "#799EFF",
        padding: "20px 0",
        textAlign: "center",
        color: hover ? "#799EFF" : "white",
        fontSize: "0.9rem",
        fontWeight: "500",
        transition: "color 0.3s ease",
        boxShadow: "0 -4px 12px rgba(0,0,0,0.05)",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      © {new Date().getFullYear()} JobSeeker Portal. All rights reserved.
    </footer>
  );
}
