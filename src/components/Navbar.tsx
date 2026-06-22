"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useIntro } from "@/context/IntroContext";
import { useWaitlist } from "@/context/WaitlistContext";
import CrikLogo from "./CrikLogo";

/** Section anchors — clicking still smooth-scrolls to the matching section. */
const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { openWaitlist } = useWaitlist();
  const { revealed } = useIntro();

  // Lock body scroll + close on Escape while the menu is open
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  // Open the waitlist modal from inside the menu
  const handleWaitlist = () => {
    close();
    openWaitlist();
  };

  return (
    <>
      <motion.header
        className="fixed top-0 right-0 left-0 z-50 bg-black/60 backdrop-blur-2xl backdrop-saturate-150"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="section-divider absolute bottom-0 right-0 left-0" />
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-4 lg:px-10">
          {/* Invisible spacer matching the brand logo — the visible logo is the
              traveling <BrandLogo /> overlay rendered on top of this slot. */}
          <span className="pointer-events-none opacity-0" aria-hidden="true">
            <CrikLogo className="text-[17px]" ariaHidden />
          </span>

          {/* 3-line menu button (top-right) */}
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={isOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-white ring-1 ring-white/10 transition-colors hover:bg-white/10"
          >
            <span className="relative flex h-4 w-4 items-center justify-center">
              <span className="absolute h-[1.5px] w-4 -translate-y-[5px] rounded-full bg-current" />
              <span className="absolute h-[1.5px] w-4 rounded-full bg-current" />
              <span className="absolute h-[1.5px] w-4 translate-y-[5px] rounded-full bg-current" />
            </span>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dim backdrop — click to close */}
            <motion.div
              className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              aria-hidden="true"
            />

            {/* Mobile: top drawer — same design as the sidebar, slides down from the top */}
            <motion.div
              className="fixed top-0 right-0 left-0 z-[60] flex flex-col border-b border-white/10 bg-[#0a0b10]/95 px-6 py-6 backdrop-blur-2xl lg:hidden"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              role="dialog"
              aria-label="Menu"
            >
              <div className="flex items-center justify-between">
                <span className="text-[17px] font-semibold tracking-[-0.02em] text-white">
                  CRIK
                </span>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-muted transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className="rounded-xl px-4 py-3 text-[15px] font-medium text-muted transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleWaitlist}
                  className="btn-primary w-full rounded-full py-3 text-[15px]"
                >
                  Join the Waitlist
                </button>
              </div>
            </motion.div>

            {/* Desktop: left sidebar drawer */}
            <motion.aside
              className="fixed top-0 left-0 z-[60] hidden h-full w-[300px] flex-col border-r border-white/10 bg-[#0a0b10]/95 px-6 py-6 backdrop-blur-2xl lg:flex"
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              role="dialog"
              aria-label="Menu"
            >
              <div className="flex items-center justify-between">
                <span className="text-[17px] font-semibold tracking-[-0.02em] text-white">
                  CRIK
                </span>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-muted transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className="rounded-xl px-4 py-3 text-[15px] font-medium text-muted transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="mt-auto pt-6">
                <button
                  type="button"
                  onClick={handleWaitlist}
                  className="btn-primary w-full rounded-full py-3 text-[15px]"
                >
                  Join the Waitlist
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
