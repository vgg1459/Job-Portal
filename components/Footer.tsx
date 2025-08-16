"use client";
import { useState } from "react";

export default function Footer() {
  const [hover, setHover] = useState(false);

  return (
    <footer
      className={`bg-[#799EFF] py-1 text-center font-medium text-sm shadow-[0_-4px_12px_rgba(0,0,0,0.05)] transition-colors duration-300 ${
        hover ? "text-[#799EFF]" : "text-white"
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      © {new Date().getFullYear()} JobSeeker Portal. All rights reserved.
    </footer>
  );
}
