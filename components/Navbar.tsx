"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [hovered, setHovered] = useState<string | null>(null);

  const linkStyle = (name: string) => ({
    marginLeft: "20px",
    textDecoration: "none",
    fontWeight: "500",
    color: hovered === name ? "#FFBC4C" : "white",
    transition: "color 0.3s ease",
    cursor: "pointer",
  });

  return (
    <nav
      style={{
        background: "#799EFF", // Solid blue
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Link
        href="/"
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "white",
          textDecoration: "none",
          textShadow: "1px 1px 2px rgba(0,0,0,0.15)",
        }}
      >
        JobSeeker
      </Link>

      <div>
        {["Jobs", "Profile", "Dashboard"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase()}`}
            style={linkStyle(item)}
            onMouseEnter={() => setHovered(item)}
            onMouseLeave={() => setHovered(null)}
          >
            {item}
          </Link>
        ))}
      </div>
    </nav>
  );
}
