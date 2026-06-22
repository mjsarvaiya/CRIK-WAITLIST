"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useIntro } from "@/context/IntroContext";

/**
 * Opaque black layer that hides the page during the intro and fades away as
 * the logo travels home — the "unlock" reveal. Sits above page content but
 * below the traveling brand logo.
 */
export default function IntroBackdrop() {
  const { decided, playIntro, revealed, done } = useIntro();

  // Show on the very first frame (before we've decided) to avoid a content
  // flash, and throughout the intro until it's done.
  const show = !decided || (playIntro && !done);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[40] bg-black"
          style={{ pointerEvents: revealed ? "none" : "auto" }}
          initial={{ opacity: 1 }}
          animate={{ opacity: revealed ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
}
