"use client";

import { motion } from "framer-motion";
import type { CrikEvent } from "@/lib/crikEvents";
import { CRIK_EVENTS } from "@/lib/crikEvents";

interface PhoneFeedTabProps {
  onSelectEvent: (event: CrikEvent) => void;
}

/** Feed tab — clickable activity posts. */
export default function PhoneFeedTab({ onSelectEvent }: PhoneFeedTabProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between px-1">
        <p className="text-[15px] font-semibold text-white">Activity</p>
        <span className="rounded-full bg-green/10 px-2 py-0.5 text-[10px] font-semibold text-green">
          Live
        </span>
      </div>

      <div className="space-y-2.5 overflow-y-auto pr-0.5">
        {CRIK_EVENTS.map((event, index) => (
          <motion.button
            key={event.id}
            type="button"
            onClick={() => onSelectEvent(event)}
            className="interactive-glow phone-card w-full rounded-2xl p-3.5 text-left"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] leading-snug font-medium text-white">
                  {event.feedText ?? event.name}
                </p>
                <p className="mt-1 text-[11px] text-muted">
                  {event.venue} · {event.distance}
                </p>
                <p className="mt-1.5 text-[10px] font-medium text-cyan">
                  {event.playersJoined} players joined →
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
