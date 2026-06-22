"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useIntro } from "@/context/IntroContext";
import CrikLogo from "./CrikLogo";
import IntroBurst from "./IntroBurst";

/**
 * The single CRIK brand logo. It lives in a fixed overlay aligned with the
 * navbar's logo slot. On first session visit it starts centered + enlarged,
 * then the SAME element travels into the navbar position — no swap, no second
 * logo, no teleport.
 */

// Scale of the centered intro logo relative to its resting (navbar) size.
const BIG = 4.6;
// Slightly smaller start so it grows ~13% during the gentle swell.
const BIG_START = 4.05;

export default function BrandLogo() {
  const { decided, playIntro, revealPage, finishIntro } = useIntro();
  const ref = useRef<HTMLAnchorElement>(null);
  const controls = useAnimationControls();
  const stumpControls = useAnimationControls();
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    if (!decided) return;

    // Repeat visit / reduced motion: show the finished logo immediately.
    if (!playIntro) {
      controls.set({ opacity: 1, x: 0, y: 0, scale: 1 });
      stumpControls.set("leaned");
      return;
    }

    const el = ref.current;
    if (!el) return;

    // Measure the resting (home) position so we can offset to screen center.
    const rect = el.getBoundingClientRect();
    const cx = window.innerWidth / 2 - (rect.left + rect.width / 2);
    const cy = window.innerHeight / 2 - (rect.top + rect.height / 2);

    let cancelled = false;
    let burstTimer: ReturnType<typeof setTimeout>;

    // Start: centered, enlarged, upright, hidden. No filter halo — glow lives
    // on the stump only, so the wordmark never gets a white circular artifact.
    stumpControls.set("upright");
    controls.set({ opacity: 0, x: cx, y: cy, scale: BIG_START });

    (async () => {
      // 1 — fade in (slow, gentle ease-out)
      await controls.start({
        opacity: 1,
        transition: { duration: 0.5, ease: [0, 0, 0.2, 1] },
      });
      if (cancelled) return;

      // 2 — gentle swell (scale stays uniform; no morphing)
      await controls.start({
        scale: BIG,
        transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
      });
      if (cancelled) return;

      // 3 — THE STRIKE (fast phase): stump tilts, bails separate, glow peaks,
      // particles burst outward — all synchronized.
      setBurst(true);
      burstTimer = setTimeout(() => setBurst(false), 750);
      stumpControls.start("leaned");

      await new Promise((r) => setTimeout(r, 360));
      if (cancelled) return;

      // 4 — unlock the page as the logo accelerates home
      revealPage();
      await controls.start({
        x: 0,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 140, damping: 20 },
      });
      if (cancelled) return;

      finishIntro();
    })();

    return () => {
      cancelled = true;
      clearTimeout(burstTimer);
    };
    // controls are stable refs; re-run only when the decision changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decided, playIntro]);

  return (
    <>
      {burst && <IntroBurst />}
      <div className="pointer-events-none fixed top-0 right-0 left-0 z-[52]">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-4 lg:px-10">
          <motion.a
            ref={ref}
            href="#"
            aria-label="CRIK — home"
            className="crik-brand pointer-events-auto flex h-9 items-center will-change-transform"
            style={{ transformOrigin: "center" }}
            initial={{ opacity: 0 }}
            animate={controls}
          >
            <CrikLogo className="text-[17px]" stumpControls={stumpControls} />
          </motion.a>
        </div>
      </div>
    </>
  );
}
