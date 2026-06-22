"use client";

import { motion } from "framer-motion";
import type { CrikEvent } from "@/lib/crikEvents";
import Modal from "./Modal";

interface EventModalProps {
  event: CrikEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusLabel: Record<CrikEvent["status"], string> = {
  live: "Live now",
  open: "Open",
  filling: "Filling fast",
};

/** Modal shown when a feed post, map dot, or event item is clicked. */
export default function EventModal({ event, isOpen, onClose }: EventModalProps) {
  if (!event) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-sm">
      <div className="relative p-6">
        {/* Soft ambient glow (clipped by the panel's rounded overflow) */}
        <div
          className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-cyan/20 blur-3xl"
          aria-hidden="true"
        />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-muted transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative">
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
              event.status === "live"
                ? "bg-green/15 text-green"
                : event.status === "filling"
                  ? "bg-amber/15 text-amber"
                  : "bg-cyan/15 text-cyan"
            }`}
          >
            {statusLabel[event.status]}
          </span>

          <h3 className="mt-4 text-[22px] font-semibold tracking-[-0.02em] text-white">
            {event.name}
          </h3>
          <p className="mt-1 text-[14px] text-muted">{event.venue}</p>

          <div className="mt-5 space-y-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
            <div className="flex justify-between text-[14px]">
              <span className="text-muted">Players joined</span>
              <span className="font-semibold tabular-nums text-white">
                {event.playersJoined}/{event.maxPlayers}
              </span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-muted">Time</span>
              <span className="text-white">{event.time}</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-muted">Distance</span>
              <span className="text-white">{event.distance}</span>
            </div>
          </div>

          <motion.button
            type="button"
            className="interactive-glow mt-6 w-full rounded-full bg-gradient-to-r from-cyan/90 to-green/90 py-3.5 text-[15px] font-semibold text-black"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
          >
            Join Game
          </motion.button>
          <p className="mt-3 text-center text-[11px] text-subtle">
            Demo action — full matchmaking coming soon
          </p>
        </div>
      </div>
    </Modal>
  );
}
