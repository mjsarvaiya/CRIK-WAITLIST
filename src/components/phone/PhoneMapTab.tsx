"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { CrikEvent } from "@/lib/crikEvents";
import { CRIK_EVENTS } from "@/lib/crikEvents";

interface PhoneMapTabProps {
  mapPopupEvent: CrikEvent | null;
  onDotClick: (event: CrikEvent) => void;
  onPopupOpenModal: (event: CrikEvent) => void;
  onDismissPopup: () => void;
}

/** Map tab — fake map with glowing live-game dots and inline popup. */
export default function PhoneMapTab({
  mapPopupEvent,
  onDotClick,
  onPopupOpenModal,
  onDismissPopup,
}: PhoneMapTabProps) {
  return (
    <div className="relative h-full min-h-[280px]">
      {/* Fake map surface */}
      <div className="phone-map relative h-full overflow-hidden rounded-2xl">
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-40">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute right-0 left-0 h-px bg-white/[0.06]"
              style={{ top: `${(i + 1) * 16}%` }}
            />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-px bg-white/[0.06]"
              style={{ left: `${(i + 1) * 16}%` }}
            />
          ))}
        </div>

        {/* Roads */}
        <div className="absolute top-[30%] right-0 left-0 h-[2px] bg-white/[0.08]" />
        <div className="absolute top-[60%] right-0 left-0 h-[1px] bg-white/[0.05]" />
        <div className="absolute top-0 bottom-0 left-[45%] w-[2px] bg-white/[0.08]" />

        {/* User location */}
        <div
          className="absolute z-10 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cyan/30 ring-2 ring-cyan"
          style={{ left: "50%", top: "50%" }}
        >
          <div className="h-1.5 w-1.5 rounded-full bg-cyan" />
        </div>

        {/* Live game dots */}
        {CRIK_EVENTS.map((event) => (
          <motion.button
            key={event.id}
            type="button"
            className="map-dot absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${event.mapPosition.x}%`,
              top: `${event.mapPosition.y}%`,
            }}
            onClick={() => onDotClick(event)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`${event.name} — ${event.playersJoined} players`}
          >
            <span className="map-dot-ping absolute inset-0 rounded-full" />
            <span
              className={`relative block h-3 w-3 rounded-full ${
                event.status === "live" ? "bg-green" : "bg-cyan"
              }`}
            />
          </motion.button>
        ))}

        {/* Inline event card popup on map */}
        <AnimatePresence>
          {mapPopupEvent && (
            <motion.div
              className="absolute z-30 max-w-[85%]"
              style={{
                left: `${Math.min(mapPopupEvent.mapPosition.x, 70)}%`,
                top: `${Math.max(mapPopupEvent.mapPosition.y - 18, 8)}%`,
              }}
              initial={{ opacity: 0, scale: 0.9, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 6 }}
              transition={{ duration: 0.2 }}
            >
              <div className="phone-card relative rounded-xl p-3 shadow-xl ring-1 ring-cyan/20">
                <button
                  type="button"
                  onClick={onDismissPopup}
                  className="absolute -top-1.5 -right-1.5 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[11px] text-white transition-colors hover:bg-white/30"
                  aria-label="Dismiss"
                >
                  ×
                </button>
                <p className="text-[12px] font-semibold text-white">
                  {mapPopupEvent.name}
                </p>
                <p className="mt-0.5 text-[10px] text-muted">
                  {mapPopupEvent.playersJoined}/{mapPopupEvent.maxPlayers} players
                </p>
                <button
                  type="button"
                  onClick={() => onPopupOpenModal(mapPopupEvent)}
                  className="interactive-glow mt-2 w-full rounded-lg bg-cyan/20 py-1.5 text-[11px] font-semibold text-cyan transition-colors hover:bg-cyan/30"
                >
                  View & Join
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-2 text-center text-[10px] text-subtle">
        Tap a glow to see live games
      </p>
    </div>
  );
}
