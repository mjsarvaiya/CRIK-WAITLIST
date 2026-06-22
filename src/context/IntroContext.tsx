"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/** Session flag — intro plays once per browser session, then is skipped. */
const KEY = "crik_intro_played_v2";

/**
 * TEMP DEBUG: when true, the intro is forced to PLAY on every load and ALL
 * localStorage/sessionStorage/reduced-motion checks are ignored. Set back to
 * false to restore once-per-session behavior.
 */
const FORCE_INTRO = true;

interface IntroValue {
  /** True once we've checked storage and decided whether to play. */
  decided: boolean;
  /** Whether the intro animation should run on this visit. */
  playIntro: boolean;
  /** Page content should be visible (backdrop fading / faded). */
  revealed: boolean;
  /** Intro fully finished (logo has landed in the navbar). */
  done: boolean;
  revealPage: () => void;
  finishIntro: () => void;
}

const IntroContext = createContext<IntroValue | null>(null);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [decided, setDecided] = useState(false);
  const [playIntro, setPlayIntro] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);

  // Guard so the decision is computed exactly once — React StrictMode runs
  // mount effects twice in dev, and re-reading the flag we just wrote would
  // otherwise flip the decision to "skip" on the second pass.
  const didDecide = useRef(false);

  // Decide on mount (client-only) to keep SSR markup stable.
  useEffect(() => {
    if (didDecide.current) return;
    didDecide.current = true;

    // TEMP DEBUG: force the intro regardless of any flag.
    if (FORCE_INTRO) {
      console.log("[CRIK intro] FORCED — ignoring all flags, playing intro");
      setPlayIntro(true);
      setDecided(true);
      return;
    }

    let played = false;
    let reduceMotion = false;
    try {
      played = sessionStorage.getItem(KEY) === "1";
      reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    } catch {
      /* storage/matchMedia unavailable — fall through to playing */
    }

    if (played || reduceMotion) {
      console.log("[CRIK intro] decision: SKIP", { played, reduceMotion });
      setPlayIntro(false);
      setRevealed(true);
      setDone(true);
    } else {
      console.log("[CRIK intro] decision: PLAY");
      setPlayIntro(true);
    }

    // Mark as played only after deciding (the guard prevents a re-read flip).
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }

    setDecided(true);
  }, []);

  // Lock scrolling while the intro is on screen.
  useEffect(() => {
    if (decided && playIntro && !done) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [decided, playIntro, done]);

  const revealPage = useCallback(() => setRevealed(true), []);
  const finishIntro = useCallback(() => setDone(true), []);

  return (
    <IntroContext.Provider
      value={{ decided, playIntro, revealed, done, revealPage, finishIntro }}
    >
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const ctx = useContext(IntroContext);
  if (!ctx) throw new Error("useIntro must be used within IntroProvider");
  return ctx;
}
