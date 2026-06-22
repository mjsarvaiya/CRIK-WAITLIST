"use client";

import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";

const steps = [
  {
    number: "1",
    title: "Find games nearby",
    description:
      "See live pickup matches on a map around you — parks, grounds, and street pitches.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Join instantly",
    description:
      "Tap to join in seconds. See who's playing, skill level, and what gear to bring.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Play cricket",
    description:
      "Show up, meet your squad, and play. Build your rep and get invited to more games.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-5.657 1.172 2.828 2.828 0 010 5.656 3 3 0 005.657-1.172 2.828 2.828 0 010-5.656z"
        />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative px-6 py-28 lg:px-10 lg:py-36">
      <div className="section-divider absolute top-0 right-6 left-6 lg:right-10 lg:left-10" />

      <div className="mx-auto max-w-6xl">
        <FadeIn className="flex flex-col items-center">
          <SectionHeader
            label="How it works"
            title="Three steps to the pitch"
            description="From couch to crease in minutes. No group chats, no scheduling headaches."
          />
        </FadeIn>

        <div className="mt-20 grid gap-4 md:grid-cols-3 md:gap-5">
          {steps.map((step, index) => (
            <FadeIn key={step.number} delay={index * 0.1}>
              <div className="glass-card group h-full rounded-[24px] p-7 transition-all duration-500">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.08] text-[13px] font-semibold text-white">
                    {step.number}
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                    {step.icon}
                  </div>
                </div>

                <h3 className="mt-6 text-[19px] font-semibold tracking-[-0.02em] text-white">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
