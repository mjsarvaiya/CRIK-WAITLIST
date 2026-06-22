"use client";

import { motion, type LegacyAnimationControls, type Variants } from "framer-motion";

interface CrikLogoProps {
  className?: string;
  /** When provided, the stump's motion is driven externally (intro animation). */
  stumpControls?: LegacyAnimationControls;
  /** Static lean for the resting/brand state (no controls). */
  leaned?: boolean;
  /** Render as a decorative spacer (no a11y role, hidden from screen readers). */
  ariaHidden?: boolean;
}

const CYAN = "0, 229, 255";

/** Whole stump pivots at its base — only rotation, never scale. */
const stumpVariants: Variants = {
  upright: { rotate: 0 },
  leaned: {
    rotate: 6,
    // slow-in then accelerate (the "strike")
    transition: { duration: 0.5, ease: [0.6, 0, 0.3, 1] },
  },
};

/** Glow intensity only — width/scale stay constant. */
const postVariants: Variants = {
  upright: {
    boxShadow: `0 0 0.45em rgba(${CYAN}, 0.55), 0 0 0.9em rgba(${CYAN}, 0.25)`,
  },
  leaned: {
    boxShadow: `0 0 0.7em rgba(${CYAN}, 0.85), 0 0 1.4em rgba(${CYAN}, 0.4)`,
    transition: { duration: 0.5, ease: [0.6, 0, 0.3, 1] },
  },
};

/** Bails react to the strike: lift, tilt, drift outward, then settle. */
const bailLeftVariants: Variants = {
  upright: { x: 0, y: 0, rotate: 0 },
  leaned: {
    x: [0, -1.6, -0.9],
    y: [0, -2.2, -1],
    rotate: [0, -16, -7],
    transition: { duration: 0.6, times: [0, 0.45, 1], ease: [0.5, 0, 0.2, 1] },
  },
};

const bailRightVariants: Variants = {
  upright: { x: 0, y: 0, rotate: 0 },
  leaned: {
    x: [0, 1.6, 0.9],
    y: [0, -1.9, -0.8],
    rotate: [0, 16, 7],
    transition: { duration: 0.6, times: [0, 0.45, 1], ease: [0.5, 0, 0.2, 1] },
  },
};

/**
 * The CRIK wordmark. The letter "I" is replaced by a cricket stump
 * (an accent-colored post with two bails that can be "struck").
 */
export default function CrikLogo({
  className = "",
  stumpControls,
  leaned = false,
  ariaHidden = false,
}: CrikLogoProps) {
  return (
    <span
      className={`crik-logo inline-flex select-none items-end font-semibold leading-none tracking-[-0.02em] text-white ${className}`}
      role={ariaHidden ? undefined : "img"}
      aria-label={ariaHidden ? undefined : "CRIK"}
      aria-hidden={ariaHidden || undefined}
    >
      <span aria-hidden="true">CR</span>

      {/* Cricket stump (replaces the "I") */}
      <motion.span
        className="crik-stump"
        aria-hidden="true"
        variants={stumpVariants}
        initial="upright"
        animate={stumpControls ?? (leaned ? "leaned" : "upright")}
      >
        <span className="crik-stump-bails">
          <motion.span className="crik-bail" variants={bailLeftVariants} />
          <motion.span className="crik-bail" variants={bailRightVariants} />
        </span>
        <motion.span className="crik-stump-post" variants={postVariants} />
      </motion.span>

      <span aria-hidden="true">K</span>
    </span>
  );
}
