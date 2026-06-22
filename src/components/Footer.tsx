import WaitlistButton from "./WaitlistButton";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[2] px-6 pt-16 pb-10 lg:px-10">
      <div className="section-divider absolute top-0 right-6 left-6 lg:right-10 lg:left-10" />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-10 md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-[17px] font-semibold tracking-[-0.02em] text-white">
            CRIK
          </p>
          <p className="mt-1.5 text-[13px] text-subtle">
            Find cricket. Play cricket. Anytime.
          </p>
        </div>

        <div className="flex items-center gap-8 text-[13px] text-muted">
          <a href="#how-it-works" className="transition-colors hover:text-white">
            How it works
          </a>
          <a href="#features" className="transition-colors hover:text-white">
            Features
          </a>
        </div>

        <WaitlistButton size="sm" />
      </div>

      <p className="mx-auto mt-14 max-w-6xl text-center text-[11px] text-subtle/80">
        &copy; {year} CRIK. All rights reserved.
      </p>
    </footer>
  );
}
