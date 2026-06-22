"use client";

import { motion } from "framer-motion";
import { useIntro } from "@/context/IntroContext";

export default function AnimatedBackground() {
  const { revealed } = useIntro();

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
      initial={{ opacity: 0, scale: 1.06 }}
      animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 1.06 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,212,238,0.07) 0%, transparent 55%)",
        }}
      />

      <motion.div
        className="absolute top-0 left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.12] blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,238,0.5) 0%, transparent 65%)",
        }}
        animate={{ scale: [1, 1.04, 1], opacity: [0.1, 0.14, 0.1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -right-1/4 bottom-0 h-[500px] w-[500px] rounded-full opacity-[0.06] blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(48,209,88,0.6) 0%, transparent 70%)",
        }}
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 100%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      <div className="noise-overlay absolute inset-0" />
    </motion.div>
  );
}
