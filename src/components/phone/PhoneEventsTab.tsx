"use client";

import { motion } from "framer-motion";
import type { CrikEvent } from "@/lib/crikEvents";
import { CRIK_EVENTS } from "@/lib/crikEvents";

interface PhoneEventsTabProps {
  onSelectEvent: (event: CrikEvent) => void;
}

const statusStyles: Record<
  CrikEvent["status"],
  { label: string; className: string }
> = {
  live: { label: "LIVE", className: "bg-green/15 text-green" },
  open: { label: "OPEN", className: "bg-cyan/15 text-cyan" },
  filling: { label: "FILLING", className: "bg-amber/15 text-amber" },
};

/** Events tab — list of ongoing live hostings. */
export default function PhoneEventsTab({ onSelectEvent }: PhoneEventsTabProps) {
  const liveEvents = CRIK_EVENTS.filter(
    (e) => e.status === "live" || e.status === "filling"
  );
  const upcomingEvents = CRIK_EVENTS.filter((e) => e.status === "open");

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <p className="mb-3 px-1 text-[15px] font-semibold text-white">
        Live hostings
      </p>

      <div className="space-y-2">
        {liveEvents.map((event, index) => {
          const style = statusStyles[event.status];
          return (
            <motion.button
              key={event.id}
              type="button"
              onClick={() => onSelectEvent(event)}
              className="interactive-glow phone-card flex w-full items-center gap-3 rounded-2xl p-3 text-left"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05]">
                <span className="relative flex h-2 w-2">
                  {event.status === "live" && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-60" />
                  )}
                  <span
                    className={`relative inline-flex h-2 w-2 rounded-full ${
                      event.status === "live" ? "bg-green" : "bg-amber"
                    }`}
                  />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-[13px] font-semibold text-white">
                    {event.name}
                  </p>
                  <span
                    className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold ${style.className}`}
                  >
                    {style.label}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] text-muted">
                  {event.time} · {event.playersJoined}/{event.maxPlayers} players
                </p>
              </div>
              <svg className="h-4 w-4 shrink-0 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          );
        })}
      </div>

      {upcomingEvents.length > 0 && (
        <>
          <p className="mt-5 mb-3 px-1 text-[13px] font-medium text-muted">
            Upcoming
          </p>
          <div className="space-y-2">
            {upcomingEvents.map((event) => (
              <motion.button
                key={event.id}
                type="button"
                onClick={() => onSelectEvent(event)}
                className="interactive-glow phone-card flex w-full items-center gap-3 rounded-2xl p-3 text-left"
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-white">
                    {event.name}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted">
                    {event.time} · {event.distance}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
