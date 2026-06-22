"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * Minimal cyan/white energy particles that emit outward from the logo center.
 * Rendered only during the fast "strike" phase, then fades out quickly.
 */
export default function IntroBurst() {
  const particles = useMemo(() => {
    const count = 14;
    return Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const distance = 55 + Math.random() * 70;
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: 2 + Math.random() * 2.5,
        white: Math.random() > 0.6,
        delay: Math.random() * 0.04,
        duration: 0.55 + Math.random() * 0.25,
      };
    });
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-1/2 left-1/2 z-[51] -translate-x-1/2 -translate-y-1/2"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: p.white
              ? "rgba(255, 255, 255, 0.9)"
              : "rgba(0, 229, 255, 0.9)",
            boxShadow: p.white
              ? "0 0 6px rgba(255, 255, 255, 0.55)"
              : "0 0 6px rgba(0, 229, 255, 0.7)",
          }}
          initial={{ x: 0, y: 0, opacity: 0.95, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.3 }}
          transition={{ duration: p.duration, delay: p.delay, ease: [0.2, 0.6, 0.2, 1] }}
        />
      ))}
    </div>
  );
}
