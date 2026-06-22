"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import type { CrikEvent } from "@/lib/crikEvents";
import EventModal from "./EventModal";
import PhoneEventsTab from "./phone/PhoneEventsTab";
import PhoneFeedTab from "./phone/PhoneFeedTab";
import PhoneMapTab from "./phone/PhoneMapTab";

type TabId = "feed" | "map" | "events";

const TABS: { id: TabId; label: string; icon: ReactNode }[] = [
  {
    id: "feed",
    label: "Feed",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
  {
    id: "map",
    label: "Map",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    id: "events",
    label: "Events",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

interface PhoneMockProps {
  /** Called when user selects an event inside the phone (opens site-wide modal). */
  onEventSelect?: (event: CrikEvent) => void;
}

/**
 * Interactive phone frame with CRIK app prototype (Feed / Map / Events).
 * Embedded in the hero section — replaces the static preview card.
 */
export default function PhoneMock({ onEventSelect }: PhoneMockProps) {
  const [activeTab, setActiveTab] = useState<TabId>("feed");
  const [modalEvent, setModalEvent] = useState<CrikEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapPopupEvent, setMapPopupEvent] = useState<CrikEvent | null>(null);

  function openEventModal(event: CrikEvent) {
    setModalEvent(event);
    setIsModalOpen(true);
    onEventSelect?.(event);
  }

  function closeEventModal() {
    setIsModalOpen(false);
    setTimeout(() => setModalEvent(null), 300);
  }

  return (
    <>
      <motion.div
        className="animate-float-subtle relative mx-auto w-full max-w-[330px] sm:max-w-[372px] lg:max-w-[400px]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Phone frame */}
        <div className="phone-frame relative rounded-[52px] p-3.5 shadow-2xl">
          {/* Side buttons (decorative) */}
          <div className="absolute top-28 -left-[2px] h-9 w-[3px] rounded-l bg-white/10" aria-hidden="true" />
          <div className="absolute top-44 -left-[2px] h-14 w-[3px] rounded-l bg-white/10" aria-hidden="true" />

          {/* Screen bezel */}
          <div className="relative overflow-hidden rounded-[42px] bg-[#0a0a0e] ring-1 ring-white/[0.12]">
            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 z-20 h-[26px] w-[100px] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />

            {/* Status bar */}
            <div className="relative z-10 flex items-center justify-between px-6 pt-3 pb-1 text-[10px] font-medium text-white/60">
              <span>9:41</span>
              <span className="flex items-center gap-1">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3C7.03 3 3 7.03 3 12h2a7 7 0 0114 0h2c0-4.97-4.03-9-9-9z" /></svg>
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" /></svg>
                <svg className="h-3.5 w-5" fill="currentColor" viewBox="0 0 24 12"><rect x="0" y="1" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1" fill="none" /><rect x="19" y="4" width="2" height="4" rx="0.5" /><rect x="1.5" y="2.5" width="13" height="7" rx="1" fill="currentColor" /></svg>
              </span>
            </div>

            {/* App header */}
            <div className="border-b border-white/[0.06] px-5 py-3">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-cyan uppercase">
                CRIK
              </p>
            </div>

            {/* Tab content area */}
            <div className="h-[400px] overflow-hidden px-4 py-4 sm:h-[448px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: activeTab === "feed" ? -12 : activeTab === "events" ? 12 : 0, y: activeTab === "map" ? 8 : 0 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: activeTab === "feed" ? 12 : -12 }}
                  transition={{ duration: 0.25 }}
                  className="h-full"
                >
                  {activeTab === "feed" && (
                    <PhoneFeedTab onSelectEvent={openEventModal} />
                  )}
                  {activeTab === "map" && (
                    <PhoneMapTab
                      mapPopupEvent={mapPopupEvent}
                      onDotClick={(e) => setMapPopupEvent(e)}
                      onPopupOpenModal={(e) => {
                        setMapPopupEvent(null);
                        openEventModal(e);
                      }}
                      onDismissPopup={() => setMapPopupEvent(null)}
                    />
                  )}
                  {activeTab === "events" && (
                    <PhoneEventsTab onSelectEvent={openEventModal} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom tab bar */}
            <div className="border-t border-white/[0.06] bg-black/40 px-2 py-2 backdrop-blur-xl">
              <div className="flex justify-around">
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMapPopupEvent(null);
                      }}
                      className={`flex flex-col items-center gap-0.5 rounded-xl px-4 py-1.5 transition-colors ${
                        isActive ? "text-cyan" : "text-muted hover:text-white"
                      }`}
                    >
                      {tab.icon}
                      <span className="text-[10px] font-medium">{tab.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="phone-tab-indicator"
                          className="h-0.5 w-4 rounded-full bg-cyan"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Home indicator */}
            <div className="flex justify-center py-2">
              <div className="h-1 w-28 rounded-full bg-white/20" />
            </div>
          </div>
        </div>

        {/* Ambient glow behind phone */}
        <div
          className="pointer-events-none absolute -inset-10 -z-10 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(0,212,238,0.15) 0%, rgba(48,209,88,0.08) 40%, transparent 70%)",
          }}
          aria-hidden="true"
        />
      </motion.div>

      <EventModal
        event={modalEvent}
        isOpen={isModalOpen}
        onClose={closeEventModal}
      />
    </>
  );
}
