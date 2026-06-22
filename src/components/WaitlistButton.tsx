"use client";

import { motion } from "framer-motion";
import { useWaitlist } from "@/context/WaitlistContext";

interface WaitlistButtonProps {
  size?: "sm" | "lg";
  className?: string;
  variant?: "primary" | "secondary";
}

export default function WaitlistButton({
  size = "lg",
  className = "",
  variant = "primary",
}: WaitlistButtonProps) {
  const { openWaitlist } = useWaitlist();

  const sizeClasses =
    size === "sm" ? "px-4 py-2 text-[13px]" : "px-7 py-3 text-[15px]";

  const variantClasses =
    variant === "primary"
      ? "btn-primary rounded-full"
      : "btn-secondary rounded-full";

  return (
    <motion.button
      type="button"
      className={`${variantClasses} ${sizeClasses} ${className}`}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={openWaitlist}
    >
      Join the Waitlist
    </motion.button>
  );
}
