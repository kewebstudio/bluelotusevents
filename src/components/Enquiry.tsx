"use client";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Sparkles,
} from "lucide-react";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";

const eventTypes = [
  "Wedding",
  "Engagement & Reception",
  "Birthday Celebration",
  "Baby Shower",
  "Corporate Event",
  "Theme Event",
  "Custom",
];

type EnquiryProps = {
  popup?: boolean;
  open?: boolean;
  onClose?: () => void;
};

export default function Enquiry({
  popup = false,
  open = true,
  onClose,
}: EnquiryProps) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const [eventOpen, setEventOpen] = useState(false);
  const [eventType, setEventType] = useState("");

  const shouldReduceMotion = useReducedMotion();

  /*
   * =========================================================
   * SUBMIT ENQUIRY
   * =========================================================
   *
   * This sends the form to Web3Forms.
   *
   * Add this to .env.local:
   *
   * NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=YOUR_ACCESS_KEY
   *
   * Then restart:
   *
   * npm run dev
   */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (sending) return;

    setSending(true);
    setError("");

    const form = event.currentTarget;

    const formData = new FormData(form);

    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setError(
        "Form configuration is missing. Please add the Web3Forms access key."
      );

      setSending(false);
      return;
    }

    /*
     * Web3Forms configuration
     */

    formData.append("access_key", accessKey);

    formData.append(
      "subject",
      "New Event Enquiry — Blue Lotus Events & Decors"
    );

    formData.append(
      "from_name",
      "Blue Lotus Events & Decors Website"
    );

    /*
     * Prevent spam / redirect behavior
     */

    formData.append("botcheck", "");

    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (result.success) {
        /*
         * Close dropdown
         */

        setEventOpen(false);

        /*
         * Show success state
         */

        setSubmitted(true);

        /*
         * Reset form fields
         */

        form.reset();

        setEventType("");

        /*
         * Return to form after 5 seconds
         */

        window.setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        setError(
          result.message ||
            "Something went wrong while sending your enquiry."
        );
      }
    } catch {
      setError(
        "Unable to send your enquiry. Please check your internet connection and try again."
      );
    } finally {
      setSending(false);
    }
  };

  /*
   * =========================================================
   * CLOSE DROPDOWN WHEN CLICKING OUTSIDE
   * =========================================================
   */

  useEffect(() => {
    const closeDropdown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest("[data-event-dropdown]")) {
        setEventOpen(false);
      }
    };

    document.addEventListener(
      "click",
      closeDropdown
    );

    return () => {
      document.removeEventListener(
        "click",
        closeDropdown
      );
    };
  }, []);

  useEffect(() => {
    if (!popup || !open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [popup, open, onClose]);

  if (popup && !open) return null;

  return (
    <section
      id="enquiry"
      className={
        popup
          ? "fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-[#0B1F3A]/90 p-3 backdrop-blur-md sm:p-6"
          : "relative overflow-hidden bg-[#0B1F3A] section-large"
      }
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="lotus-petal absolute left-[7%] top-24 opacity-40" />
        <span className="lotus-petal absolute right-[8%] bottom-20 opacity-30" />
        <span className="lotus-ripple -right-24 top-20 h-72 w-72 border-white/10" />
        <span className="lotus-ripple -left-24 bottom-10 h-64 w-64 border-[#D6B773]/15" />
      </div>

      {/* =====================================================
          MAIN CARD
      ====================================================== */}

      <div
        className={
          popup
            ? "relative my-4 w-full max-w-[1180px]"
            : "relative site-container"
        }
      >
        {popup && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close enquiry"
            className="absolute right-3 top-3 z-[220] flex h-10 w-10 items-center justify-center rounded-full border border-[#0B1F3A]/10 bg-white text-[#0B1F3A] shadow-lg transition-all duration-300 hover:bg-[#2457A6] hover:text-white sm:right-4 sm:top-4"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        )}

        <div className="grid max-h-[calc(100vh-2rem)] overflow-y-auto overflow-x-hidden border border-white/10 bg-white/[0.045] shadow-[0_30px_100px_rgba(0,0,0,0.25)] lg:grid-cols-[0.9fr_1.1fr] sm:max-h-[calc(100vh-3rem)]">

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="relative overflow-hidden p-7 sm:p-10 lg:p-12">

            {/* DECORATIVE RINGS */}

            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 border border-white/10" />

            <div className="pointer-events-none absolute -bottom-28 -left-24 h-60 w-60 border border-[#D6B773]/15" />

            <div className="relative">

              {/* EYEBROW */}

              <div className="mb-5 flex items-center gap-3">

                <span className="h-px w-[40px] bg-[#D6B773]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D6B773]">
                  Let&apos;s Create
                </span>

                <Sparkles
                  size={13}
                  className="text-[#D6B773]"
                />

              </div>

              {/* HEADING */}

              <h2 className="max-w-lg font-display text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                Your moment.
                <span className="block text-[#D6B773]">
                  Our magic.
                </span>
              </h2>

              {/* DESCRIPTION */}

              <p className="mt-5 max-w-lg text-sm leading-7 text-white/65 sm:text-base">
                Tell us about your celebration and let us create
                something beautiful, personal and unforgettable.
              </p>

              {/* VISUAL CARD */}

              <div className="mt-10">

                <div className="relative overflow-hidden border border-white/10 bg-white/[0.035] p-5 sm:p-6">

                  <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-white/[0.02]" />

                  <div className="relative flex items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#D6B773]/30 bg-[#D6B773]/10">

                      <Sparkles
                        size={20}
                        className="text-[#D6B773]"
                      />

                    </div>

                    <div>

                      <p className="text-sm font-semibold text-white">
                        Let&apos;s make it memorable.
                      </p>

                      <p className="mt-1.5 text-xs leading-5 text-white/45">
                        Share your vision and we&apos;ll help turn it
                        into a celebration worth remembering.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

              {/* TRUST LINE */}

              <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">

                <div className="flex -space-x-1">

                  <span className="h-7 w-7 rounded-full border-2 border-[#0B1F3A] bg-[#D6B773]" />

                  <span className="h-7 w-7 rounded-full border-2 border-[#0B1F3A] bg-[#2457A6]" />

                  <span className="h-7 w-7 rounded-full border-2 border-[#0B1F3A] bg-[#E8EFF6]" />

                </div>

                <p className="text-[10px] uppercase tracking-[0.12em] text-white/45">
                  Beautiful moments, thoughtfully created
                </p>

              </div>

            </div>

          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <div className="relative bg-white p-6 sm:p-9 lg:p-11">

            {/* TOP ACCENT */}

            <div className="absolute left-0 right-0 top-0 h-1 bg-[#D6B773]" />

            {/* HEADER */}

            <div className="mb-6">

              <div className="flex items-center gap-2">

                <CalendarDays
                  size={17}
                  className="text-[#2457A6]"
                />

                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b7a43]">
                  Event Enquiry
                </span>

              </div>

              <h3 className="mt-2 font-display text-3xl text-[#0B1F3A] sm:text-4xl">
                Let&apos;s plan something beautiful.
              </h3>

            </div>

            {/* =================================================
                SUCCESS
            ================================================= */}

            {submitted ? (

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="flex min-h-[380px] flex-col items-center justify-center text-center"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2457A6] text-white shadow-lg shadow-[#2457A6]/25">

                  <Check size={28} />

                </div>

                <h3 className="mt-5 font-display text-3xl text-[#0B1F3A]">
                  Enquiry received!
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-[rgba(11, 31, 58, 0.60)]">
                  Thank you for reaching out. Our team will get
                  in touch with you shortly.
                </p>

              </motion.div>

            ) : (

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                {/* =================================================
                    NAME + PHONE
                ================================================= */}

                <div className="grid gap-4 sm:grid-cols-2">

                  {/* NAME */}

                  <div>

                    <label
                      htmlFor="enquiry-name"
                      className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-[rgba(11, 31, 58, 0.60)]"
                    >
                      Your Name
                    </label>

                    <input
                      id="enquiry-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Enter your name"
                      className="h-12 w-full border border-[rgba(11, 31, 58, 0.16)] bg-[#FAF7F0] px-4 text-sm text-[#0B1F3A] outline-none transition-all duration-300 placeholder:text-[rgba(11, 31, 58, 0.38)] focus:border-[#2457A6] focus:bg-white focus:ring-4 focus:ring-[#2457A6]/5"
                    />

                  </div>

                  {/* PHONE */}

                  <div>

                    <label
                      htmlFor="enquiry-phone"
                      className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-[rgba(11, 31, 58, 0.60)]"
                    >
                      Phone
                    </label>

                    <input
                      id="enquiry-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="+91"
                      className="h-12 w-full border border-[rgba(11, 31, 58, 0.16)] bg-[#FAF7F0] px-4 text-sm text-[#0B1F3A] outline-none transition-all duration-300 placeholder:text-[rgba(11, 31, 58, 0.38)] focus:border-[#2457A6] focus:bg-white focus:ring-4 focus:ring-[#2457A6]/5"
                    />

                  </div>

                </div>

                {/* =================================================
                    EMAIL + EVENT
                ================================================= */}

                <div className="grid gap-4 sm:grid-cols-2">

                  {/* EMAIL */}

                  <div>

                    <label
                      htmlFor="enquiry-email"
                      className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-[rgba(11, 31, 58, 0.60)]"
                    >
                      Email Address
                    </label>

                    <input
                      id="enquiry-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="Enter your email address"
                      className="h-12 w-full border border-[rgba(11, 31, 58, 0.16)] bg-[#FAF7F0] px-4 text-sm text-[#0B1F3A] outline-none transition-all duration-300 placeholder:text-[rgba(11, 31, 58, 0.38)] focus:border-[#2457A6] focus:bg-white focus:ring-4 focus:ring-[#2457A6]/5"
                    />

                  </div>

                  {/* EVENT TYPE */}

                  <div
                    data-event-dropdown
                    className="relative"
                  >

                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-[rgba(11, 31, 58, 0.60)]">
                      Event Type
                    </label>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setEventOpen((prev) => !prev);
                      }}
                      className={`flex h-12 w-full items-center justify-between border bg-[#FAF7F0] px-4 text-left text-sm outline-none transition-all duration-300 ${
                        eventOpen
                          ? "border-[#2457A6] bg-white ring-4 ring-[#2457A6]/5"
                          : "border-[rgba(11, 31, 58, 0.16)] hover:border-[#2457A6]/50"
                      }`}
                    >

                      <span
                        className={
                          eventType
                            ? "text-[#0B1F3A]"
                            : "text-[rgba(11, 31, 58, 0.38)]"
                        }
                      >
                        {eventType || "Select your event"}
                      </span>

                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 ${
                          eventOpen
                            ? "bg-[#2457A6] text-white"
                            : "bg-[#2457A6]/10 text-[#2457A6]"
                        }`}
                      >

                        <ChevronDown
                          size={15}
                          className={`transition-transform duration-200 ${
                            eventOpen
                              ? "rotate-180"
                              : ""
                          }`}
                        />

                      </span>

                    </button>

                    {/* OPTIONS */}

                    <AnimatePresence>

                      {eventOpen && (

                        <motion.div
                          initial={{
                            opacity: 0,
                            y: -6,
                          }}
                          animate={{
                            opacity: 1,
                            y: 5,
                          }}
                          exit={{
                            opacity: 0,
                            y: -6,
                          }}
                          transition={{
                            duration: 0.18,
                          }}
                          className="absolute left-0 right-0 top-full z-50 overflow-hidden border border-[#2457A6]/15 bg-white shadow-[0_20px_50px_rgba(23,35,79,0.18)]"
                        >

                          <div className="h-[3px] bg-[#D6B773]" />

                          <div className="p-1.5">

                            {eventTypes.map((type) => {

                              const selected =
                                eventType === type;

                              return (

                                <button
                                  key={type}
                                  type="button"
                                  onClick={(event) => {
                                    event.stopPropagation();

                                    setEventType(type);
                                    setEventOpen(false);
                                  }}
                                  className={`group flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors duration-200 ${
                                    selected
                                      ? "bg-[#2457A6] text-white"
                                      : "text-[#0B1F3A] hover:bg-[#E8EFF6]"
                                  }`}
                                >

                                  <span className="flex items-center gap-3">

                                    <span
                                      className={`h-1.5 w-1.5 rounded-full ${
                                        selected
                                          ? "bg-[#D6B773]"
                                          : "bg-[#D6B773]/60"
                                      }`}
                                    />

                                    {type}

                                  </span>

                                  {selected && (
                                    <Check
                                      size={15}
                                      className="text-[#D6B773]"
                                    />
                                  )}

                                </button>

                              );
                            })}

                          </div>

                        </motion.div>

                      )}

                    </AnimatePresence>

                    {/* Hidden field */}

                    <input
                      type="hidden"
                      name="event"
                      value={eventType}
                      required
                    />

                  </div>

                </div>

                {/* =================================================
                    EVENT DATE
                ================================================= */}

                <div>

                  <label
                    htmlFor="enquiry-date"
                    className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-[rgba(11, 31, 58, 0.60)]"
                  >
                    Event Date
                  </label>

                  <input
                    id="enquiry-date"
                    name="date"
                    type="date"
                    className="h-12 w-full border border-[rgba(11, 31, 58, 0.16)] bg-[#FAF7F0] px-4 text-sm text-[#0B1F3A] outline-none transition-all duration-300 focus:border-[#2457A6] focus:bg-white focus:ring-4 focus:ring-[#2457A6]/5"
                  />

                </div>

                {/* =================================================
                    MESSAGE
                ================================================= */}

                <div>

                  <label
                    htmlFor="enquiry-message"
                    className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-[rgba(11, 31, 58, 0.60)]"
                  >
                    Tell us about your event
                  </label>

                  <textarea
                    id="enquiry-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us what you are planning..."
                    className="w-full resize-none border border-[rgba(11, 31, 58, 0.16)] bg-[#FAF7F0] px-4 py-3 text-sm leading-6 text-[#0B1F3A] outline-none transition-all duration-300 placeholder:text-[rgba(11, 31, 58, 0.38)] focus:border-[#2457A6] focus:bg-white focus:ring-4 focus:ring-[#2457A6]/5"
                  />

                </div>

                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="border border-red-200 bg-red-50 px-4 py-3 text-xs leading-5 text-red-600"
                  >
                    {error}
                  </motion.div>

                )}

                {/* =================================================
                    HONEYPOT
                    Hidden spam protection
                ================================================= */}

                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* =================================================
                    SUBMIT
                ================================================= */}

                <motion.button
                  whileHover={
                    shouldReduceMotion || sending
                      ? undefined
                      : {
                          y: -2,
                        }
                  }
                  whileTap={
                    shouldReduceMotion || sending
                      ? undefined
                      : {
                          scale: 0.98,
                        }
                  }
                  type="submit"
                  disabled={sending}
                  className="group relative flex h-12 w-full items-center justify-center gap-3 overflow-hidden bg-[#2457A6] px-6 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-[#2457A6]/20 transition-all duration-300 hover:bg-[#0B1F3A] hover:shadow-xl hover:shadow-[#2457A6]/25 disabled:cursor-not-allowed disabled:opacity-70"
                >

                  {/* HOVER SHINE */}

                  {!sending && (
                    <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-15deg] bg-white/10 opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />
                  )}

                  <span className="relative">
                    {sending
                      ? "Sending..."
                      : "Send Enquiry"}
                  </span>

                  {!sending && (

                    <ArrowRight
                      size={16}
                      className="relative transition-transform duration-300 group-hover:translate-x-1"
                    />

                  )}

                </motion.button>

                {/* PRIVACY */}

                <p className="text-center text-[10px] text-[rgba(11, 31, 58, 0.45)]">
                  We respect your privacy and will only use your
                  details to contact you regarding your enquiry.
                </p>

              </form>

            )}

          </div>

        </div>

      </div>

    </section>
  );
}