"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { useWaitlist } from "@/context/WaitlistContext";
import { saveWaitlistEntry } from "@/lib/waitlistStorage";
import Modal from "./Modal";

/** Waitlist signup modal — validates, stores to localStorage, shows success. */
export default function WaitlistModal() {
  const { isOpen, closeWaitlist } = useWaitlist();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function resetForm() {
    setName("");
    setEmail("");
    setZipCode("");
    setError("");
    setSuccess(false);
    setIsSubmitting(false);
  }

  function handleClose() {
    closeWaitlist();
    setTimeout(resetForm, 300);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedZip = zipCode.trim();

    if (!trimmedName || !trimmedEmail || !trimmedZip) {
      setError("Please fill in your name, email, and zip code.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      setError("Submissions aren't configured yet. Please try again later.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Google Apps Script Web Apps don't return CORS headers, so we send a
      // "simple" request (text/plain) in no-cors mode to avoid a blocked
      // preflight. The script reads the raw JSON body via e.postData.contents.
      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          zipCode: trimmedZip,
        }),
      });

      saveWaitlistEntry({
        name: trimmedName,
        email: trimmedEmail,
        zipCode: trimmedZip,
      });

      setName("");
      setEmail("");
      setZipCode("");
      setSuccess(true);

      setTimeout(() => {
        handleClose();
      }, 1800);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} maxWidth="max-w-md">
      <div className="relative p-7 sm:p-8">
        {/* Soft ambient glow (clipped by the panel's rounded overflow) */}
        <div
          className="pointer-events-none absolute -top-16 right-0 h-32 w-32 rounded-full bg-green/15 blur-3xl"
          aria-hidden="true"
        />

        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-muted transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              className="py-8 text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green/15">
                <svg className="h-7 w-7 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="mt-5 text-xl font-semibold text-white">
                ✅ You&apos;re on the CRIK waitlist!
              </p>
              <p className="mt-2 text-[14px] text-muted">
                We&apos;ll notify you when CRIK launches in your area.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-white">
                Join CRIK Waitlist
              </h2>
              <p className="mt-2 text-[14px] text-muted">
                Be first to find pickup cricket games near you.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                <div>
                  <label htmlFor="waitlist-name" className="mb-1.5 block text-[13px] font-medium text-muted">
                    Name
                  </label>
                  <input
                    id="waitlist-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="modal-input w-full rounded-xl px-4 py-3 text-[15px] text-white placeholder:text-subtle"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label htmlFor="waitlist-email" className="mb-1.5 block text-[13px] font-medium text-muted">
                    Email
                  </label>
                  <input
                    id="waitlist-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="modal-input w-full rounded-xl px-4 py-3 text-[15px] text-white placeholder:text-subtle"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label htmlFor="waitlist-zip" className="mb-1.5 block text-[13px] font-medium text-muted">
                    Zip code
                  </label>
                  <input
                    id="waitlist-zip"
                    type="text"
                    inputMode="numeric"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="e.g. 10001"
                    className="modal-input w-full rounded-xl px-4 py-3 text-[15px] text-white placeholder:text-subtle"
                    autoComplete="postal-code"
                  />
                </div>

                {error && (
                  <p className="text-[13px] text-amber" role="alert">
                    {error}
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary interactive-glow w-full rounded-full py-3.5 text-[15px] disabled:cursor-not-allowed disabled:opacity-60"
                  whileHover={isSubmitting ? undefined : { scale: 1.01 }}
                  whileTap={isSubmitting ? undefined : { scale: 0.98 }}
                >
                  {isSubmitting ? "Submitting…" : "Submit"}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
}
