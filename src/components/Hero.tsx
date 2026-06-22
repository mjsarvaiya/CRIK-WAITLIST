"use client";

import { motion } from "framer-motion";
import PhoneMock from "./PhoneMock";
import WaitlistButton from "./WaitlistButton";

const trustItems = ["Free to join", "No team needed", "Play in minutes"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-24 lg:px-10 lg:pt-40 lg:pb-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3.5 py-1.5 text-[12px] font-medium text-muted ring-1 ring-white/[0.08]">
              Coming soon
            </span>
          </motion.div>

          <motion.p
            className="mt-8 text-[13px] font-semibold tracking-[0.12em] text-cyan uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
          >
            CRIK
          </motion.p>

          <motion.h1
            className="headline-xl mt-3 text-[2.75rem] text-white sm:text-5xl md:text-[3.5rem] lg:text-[3.75rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Find a cricket game near you{" "}
            <span className="text-accent">in minutes.</span>
          </motion.h1>

          <motion.p
            className="body-lg mx-auto mt-6 max-w-lg lg:mx-0"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Join pickup matches, meet players, and play anytime — no teams
            required.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <WaitlistButton />
            <motion.a
              href="#how-it-works"
              className="btn-secondary rounded-full px-7 py-3 text-[15px]"
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
            >
              See how it works
            </motion.a>
          </motion.div>

          <motion.ul
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            {trustItems.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[13px] text-subtle"
              >
                <svg
                  className="h-3.5 w-3.5 text-green"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="relative lg:pl-4">
          <PhoneMock />
        </div>
      </div>
    </section>
  );
}
