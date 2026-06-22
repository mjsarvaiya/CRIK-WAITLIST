"use client";

import FadeIn from "./FadeIn";
import WaitlistButton from "./WaitlistButton";

export default function CTA() {
  return (
    <section className="relative px-6 py-28 lg:px-10 lg:py-36">
      <div className="section-divider absolute top-0 right-6 left-6 lg:right-10 lg:left-10" />

      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="glass-card rounded-[32px] px-8 py-16 text-center sm:px-14 sm:py-20">
            <p className="section-label">Early access</p>
            <h2 className="headline-lg mt-4 text-3xl text-white sm:text-4xl">
              Ready to find your next game?
            </h2>
            <p className="body-lg mx-auto mt-5 max-w-md">
              Be first in line when CRIK launches in your city. Early members
              get priority matchmaking and founding player badges.
            </p>
            <div className="mt-9">
              <WaitlistButton />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
