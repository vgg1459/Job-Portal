"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <nav className="bg-[#799EFF] px-8 py-1.5 flex justify-between items-center shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-bold text-white no-underline"
        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.15)" }}
      >
        JobSeeker
      </Link>

      {/* Menu Links */}
      <div className="flex">
        {["Jobs", "Profile", "Dashboard"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase()}`}
            className={`ml-5 font-medium no-underline cursor-pointer transition-colors duration-300 ${
              hovered === item ? "text-[#FFBC4C]" : "text-white"
            }`}
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
