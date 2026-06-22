"use client";

import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";

const features = [
  {
    title: "Fast matchmaking",
    description:
      "Discovery surfaces the best games for your location, schedule, and skill level — instantly.",
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
    title: "Local cricket communities",
    description:
      "Connect with players in your neighborhood. Build squads, follow regulars, and grow the scene.",
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
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />
      </svg>
    ),
  },
  {
    title: "No teams needed",
    description:
      "Solo player? Just moved to a new city? Jump into any open match — no roster required.",
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
          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
        />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section id="features" className="relative px-6 py-28 lg:px-10 lg:py-36">
      <div className="section-divider absolute top-0 right-6 left-6 lg:right-10 lg:left-10" />

      <div className="mx-auto max-w-6xl">
        <FadeIn className="flex flex-col items-center">
          <SectionHeader
            label="Features"
            title="Built for players who just want to play"
            description="Everything you need to find your next game — nothing you don't."
          />
        </FadeIn>

        <div className="mt-20 grid gap-4 md:grid-cols-3 md:gap-5">
          {features.map((feature, index) => (
            <FadeIn key={feature.title} delay={index * 0.1}>
              <div className="glass-card group h-full rounded-[24px] p-7 transition-all duration-500">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-cyan">
                  {feature.icon}
                </div>

                <h3 className="mt-6 text-[19px] font-semibold tracking-[-0.02em] text-white">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
