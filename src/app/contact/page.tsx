"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const eventTypes = [
  "Wedding",
  "Engagement",
  "Birthday",
  "Baby Shower",
  "Corporate Event",
  "Reception",
  "Stage Decoration",
  "Other",
];

export default function ContactPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [eventDropdownOpen, setEventDropdownOpen] =
    useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    eventDate: "",
    message: "",
  });

  /*
   * =========================================================
   * LIGHTWEIGHT SCROLL REVEAL
   * =========================================================
   */

  const observerRef =
    useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements =
      document.querySelectorAll<HTMLElement>(
        "[data-scroll-reveal]"
      );

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element =
            entry.target as HTMLElement;

          element.dataset.revealed = "true";

          observer.unobserve(element);
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.08,
      }
    );

    observerRef.current = observer;

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, []);

  /*
   * =========================================================
   * BOOKING
   * =========================================================
   */

  const openBooking = () => {
    setBookingOpen(true);
    setEventDropdownOpen(false);
    setSubmitted(false);
    setSubmitError("");
    setSending(false);

    document.body.style.overflow = "hidden";
  };

  const closeBooking = () => {
    setBookingOpen(false);
    setEventDropdownOpen(false);
    setSubmitted(false);
    setSubmitError("");
    setSending(false);

    document.body.style.overflow = "";
  };

  /*
   * =========================================================
   * ESCAPE KEY
   * =========================================================
   */

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && bookingOpen) {
        closeBooking();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow = "";
    };
  }, [bookingOpen]);

  /*
   * =========================================================
   * FORM STATE
   * =========================================================
   */

  const updateForm = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setSubmitError("");
  };

  /*
   * =========================================================
   * REAL WEB3FORMS SUBMISSION
   * =========================================================
   */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (sending) return;

    setSubmitError("");

    if (!form.eventType) {
      setSubmitError("Please select your event type.");
      return;
    }

    setSending(true);

    try {
      const accessKey =
        process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

      if (!accessKey) {
        throw new Error(
          "Web3Forms access key is missing. Please add NEXT_PUBLIC_WEB3FORMS_KEY to .env.local and restart the server."
        );
      }

      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,

            subject:
              "New Event Enquiry — Blue Lotus Events",

            from_name:
              "Blue Lotus Events Website",

            name: form.name,
            phone: form.phone,
            email: form.email,
            event_type: form.eventType,
            event_date:
              form.eventDate || "Not specified",
            message:
              form.message || "No additional message",

            botcheck: "",
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Your enquiry could not be sent. Please try again."
        );
      }

      setSubmitted(true);
      setEventDropdownOpen(false);

      setForm({
        name: "",
        phone: "",
        email: "",
        eventType: "",
        eventDate: "",
        message: "",
      });
    } catch (error) {
      console.error(
        "Blue Lotus enquiry submission error:",
        error
      );

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        /* =====================================================
           CONTACT PAGE SCROLL REVEALS
        ====================================================== */

        [data-scroll-reveal] {
          opacity: 0;
          transform: translate3d(0, 38px, 0);
          transition:
            opacity 700ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--reveal-delay, 0ms);
          will-change: opacity, transform;
        }

        [data-scroll-reveal="left"] {
          transform: translate3d(-35px, 0, 0);
        }

        [data-scroll-reveal="right"] {
          transform: translate3d(35px, 0, 0);
        }

        [data-scroll-reveal="scale"] {
          transform: translate3d(0, 20px, 0) scale(0.96);
        }

        [data-scroll-reveal][data-revealed="true"] {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
          will-change: auto;
        }

        /* =====================================================
           PREMIUM FLOATING MOTION
        ====================================================== */

        @keyframes contactFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, -8px, 0);
          }
        }

        @keyframes contactFloatReverse {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(5px, 6px, 0);
          }
        }

        @keyframes contactSpin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes contactShimmer {
          0% {
            transform: translate3d(-130%, 0, 0)
              skewX(-18deg);
          }

          55%,
          100% {
            transform: translate3d(130%, 0, 0)
              skewX(-18deg);
          }
        }

        .contact-float {
          animation: contactFloat 5s ease-in-out infinite;
          will-change: transform;
        }

        .contact-float-reverse {
          animation: contactFloatReverse 6s ease-in-out
            infinite;
          will-change: transform;
        }

        .contact-spin {
          animation: contactSpin 38s linear infinite;
          will-change: transform;
        }

        .contact-shimmer {
          animation: contactShimmer 4s ease-in-out infinite;
        }

        /* =====================================================
           CONTACT BUTTON
        ====================================================== */

        .contact-primary-button {
          transition:
            transform 350ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 350ms ease,
            background-color 300ms ease;
        }

        .contact-primary-button:hover {
          transform: translate3d(0, -4px, 0);
          box-shadow:
            0 20px 45px rgba(36, 87, 166, 0.28);
        }

        .contact-primary-button:active {
          transform: translate3d(0, 0, 0) scale(0.98);
        }

        .contact-primary-button:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }

        /* =====================================================
           CONTACT INFO CARDS
        ====================================================== */

        .contact-info-card {
          transition:
            transform 400ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 400ms ease,
            border-color 300ms ease,
            background-color 300ms ease;
        }

        .contact-info-card:hover {
          transform: translate3d(0, -5px, 0);
        }

        /* =====================================================
           REDUCED MOTION
        ====================================================== */

        @media (prefers-reduced-motion: reduce) {
          [data-scroll-reveal] {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .contact-float,
          .contact-float-reverse,
          .contact-spin,
          .contact-shimmer {
            animation: none !important;
          }

          .contact-primary-button,
          .contact-info-card {
            transition: none !important;
          }
        }
      `}</style>

      <main className="min-h-screen overflow-hidden bg-[#FAF7F0]">

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative flex min-h-[72vh] items-center overflow-hidden bg-[#0B1F3A] pt-20 sm:min-h-[78vh]">

          {/* GLOW 1 */}

          <div
            className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-[#2457A6]/30 blur-[110px] contact-float"
          />

          {/* GLOW 2 */}

          <div
            className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#D6B773]/20 blur-[110px] contact-float-reverse"
          />

          {/* RINGS */}

          <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full border border-white/10 contact-spin" />

          <div className="pointer-events-none absolute -right-8 top-32 h-56 w-56 rounded-full border border-dashed border-[#D6B773]/20 contact-spin" />

          {/* SPARKLES */}

          <div className="absolute left-[12%] top-[25%] text-[#D6B773] contact-float">
            <Sparkles size={20} />
          </div>

          <div className="absolute right-[15%] top-[28%] text-white/60 contact-float-reverse">
            <Sparkles size={16} />
          </div>

          <div className="absolute bottom-[20%] left-[35%] text-[#D6B773] contact-float">
            <Sparkles size={13} />
          </div>

          {/* HERO CONTENT */}

          <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">

            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">

              {/* LEFT */}

              <div data-scroll-reveal="left">

                <div className="mb-6 flex items-center gap-3">

                  <span className="h-px w-12 bg-[#D6B773]" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D6B773]">
                    Contact Blue Lotus
                  </span>

                </div>

                <h1 className="max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">

                  Let&apos;s create

                  <span className="block text-[#D6B773]">
                    something beautiful.
                  </span>

                </h1>

                <p className="mt-7 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
                  Have a celebration in mind? Tell us what
                  you&apos;re dreaming of and let Blue Lotus
                  Events & Decors transform your vision into
                  an unforgettable experience.
                </p>

                <button
                  type="button"
                  onClick={openBooking}
                  className="contact-primary-button group mt-9 inline-flex items-center gap-4 text-sm font-semibold text-white"
                >
                  Start your enquiry

                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2457A6] transition-transform duration-300 group-hover:rotate-45">
                    <ArrowDown size={17} />
                  </span>
                </button>

              </div>

              {/* RIGHT DECORATIVE CARD */}

              <div
                data-scroll-reveal="right"
                style={
                  {
                    "--reveal-delay": "140ms",
                  } as React.CSSProperties
                }
                className="relative mx-auto hidden w-full max-w-[390px] lg:block"
              >

                <div className="absolute inset-8 rounded-full bg-[#2457A6]/30 blur-3xl contact-float" />

                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-md">

                  <div className="flex items-center justify-between">

                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/40">
                      Your Celebration
                    </span>

                    <Sparkles
                      size={18}
                      className="text-[#D6B773]"
                    />

                  </div>

                  <div className="py-16 text-center">

                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-[#D6B773]/30 bg-[#D6B773]/5 contact-float">

                      <CalendarDays
                        size={34}
                        strokeWidth={1.2}
                        className="text-[#D6B773]"
                      />

                    </div>

                    <h3 className="mt-7 font-serif text-3xl text-white">
                      Your vision.
                    </h3>

                    <p className="mt-2 text-sm text-white/40">
                      Our creativity.
                    </p>

                  </div>

                  <div className="border-t border-white/10 pt-5">

                    <div className="flex items-center justify-between">

                      <span className="text-xs text-white/40">
                        Hyderabad · Telangana
                      </span>

                      <ArrowUpRight
                        size={17}
                        className="text-[#D6B773]"
                      />

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* BOTTOM FADE */}

          <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-[#FAF7F0] to-transparent" />

        </section>
                {/* =====================================================
            CONTACT + SOCIAL
        ====================================================== */}

        <section className="relative z-20 -mt-1 bg-[#FAF7F0]">

          <div className="mx-auto max-w-[1000px] px-5 sm:px-8">

            <div
              data-scroll-reveal="scale"
              className="border border-[#0B1F3A]/8 bg-white px-5 py-8 shadow-[0_20px_60px_rgba(23,41,75,0.07)] sm:px-8 sm:py-10"
            >

              {/* CONTACT */}

              <div className="text-center">

                <div className="flex items-center justify-center gap-3">

                  <span className="h-px w-8 bg-[#D6B773]" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8A6F32] sm:text-[11px]">
                    Contact Us
                  </span>

                  <span className="h-px w-8 bg-[#D6B773]" />

                </div>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-4">

                  {/* PHONE */}

                  <a
                    href="tel:+917416242200"
                    aria-label="Call Blue Lotus Events"
                    className="contact-info-card group flex items-center gap-3 rounded-full border border-[#8FA695]/20 bg-[#8FA695]/5 px-5 py-3 hover:border-[#8FA695]/60 hover:bg-[#8FA695]/10 hover:shadow-[0_10px_25px_rgba(36,87,166,0.12)]"
                  >

                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8FA695]/10 text-[#8FA695]">

                      <Phone
                        size={18}
                        strokeWidth={1.8}
                      />

                    </span>

                    <span className="text-left">

                      <span className="block text-[9px] uppercase tracking-[0.15em] text-[#9aa1ad]">
                        Call Us
                      </span>

                      <span className="text-sm font-semibold text-[#0B1F3A]">
                        +91 74162 42200
                      </span>

                    </span>

                  </a>

                  {/* EMAIL */}

                  <a
                    href="mailto:bluelotusevents1@gmail.com"
                    aria-label="Email Blue Lotus Events"
                    className="contact-info-card group flex items-center gap-3 rounded-full border border-[#5B4B8A]/20 bg-[#5B4B8A]/5 px-5 py-3 hover:border-[#5B4B8A]/60 hover:bg-[#5B4B8A]/10 hover:shadow-[0_10px_25px_rgba(91,75,138,0.12)]"
                  >

                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5B4B8A]/10 text-[#5B4B8A]">

                      <Mail
                        size={18}
                        strokeWidth={1.8}
                      />

                    </span>

                    <span className="text-left">

                      <span className="block text-[9px] uppercase tracking-[0.15em] text-[#9aa1ad]">
                        Email
                      </span>

                      <span className="text-sm font-semibold text-[#0B1F3A]">
                        bluelotusevents1@gmail.com
                      </span>

                    </span>

                  </a>

                  {/* LOCATION */}

                  <a
                    href="https://maps.app.goo.gl/UwjUEz13VjQhYuGk9"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open Blue Lotus Events location in Google Maps"
                    className="contact-info-card group flex items-center gap-3 rounded-full border border-[#2457A6]/15 bg-[#2457A6]/5 px-5 py-3 hover:border-[#2457A6]/50 hover:bg-[#2457A6]/10 hover:shadow-[0_10px_25px_rgba(49,89,181,0.12)]"
                  >

                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2457A6]/10 text-[#2457A6] transition-transform duration-300 group-hover:scale-110">

                      <MapPin
                        size={18}
                        strokeWidth={1.8}
                      />

                    </span>

                    <span className="text-left">

                      <span className="block text-[9px] uppercase tracking-[0.15em] text-[#9aa1ad]">
                        Visit Us
                      </span>

                      <span className="text-sm font-semibold leading-5 text-[#0B1F3A]">
                        Madhapur, Hyderabad,
                        <br />
                        Telangana, India
                      </span>

                    </span>

                    <ArrowUpRight
                      size={15}
                      className="ml-auto shrink-0 text-[#2457A6] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />

                  </a>

                </div>

              </div>

              {/* FOLLOW US */}

              <div className="mt-8 border-t border-[#0B1F3A]/8 pt-7 text-center">

                <div className="flex items-center justify-center gap-3">

                  <span className="h-px w-8 bg-[#D6B773]" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8A6F32] sm:text-[11px]">
                    Follow Us
                  </span>

                  <span className="h-px w-8 bg-[#D6B773]" />

                </div>

                <div className="mt-5 flex items-center justify-center gap-3">

                  {/* INSTAGRAM */}

                  <a
                    href="https://www.instagram.com/bluelotusby_sandhyareddy?igsh=c3U4OTZjdHY4N3Fy"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="contact-info-card flex h-12 w-12 items-center justify-center rounded-full border border-[#D9A6AE]/25 bg-[#D9A6AE]/8 text-[#D9A6AE] hover:border-[#D9A6AE] hover:bg-[#D9A6AE]/12 hover:shadow-[0_10px_25px_rgba(217,166,174,0.18)]"
                  >

                    <svg
                      viewBox="0 0 24 24"
                      className="h-[20px] w-[20px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >

                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="5"
                      />

                      <circle
                        cx="12"
                        cy="12"
                        r="4"
                      />

                      <circle
                        cx="17.5"
                        cy="6.5"
                        r="1.1"
                        fill="currentColor"
                        stroke="none"
                      />

                    </svg>

                  </a>

                  {/* FACEBOOK */}

                  <a
                    href="https://www.facebook.com/61585468478207/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="contact-info-card flex h-12 w-12 items-center justify-center rounded-full border border-[#2457A6]/25 bg-[#2457A6]/8 text-[#2457A6] hover:border-[#2457A6] hover:bg-[#2457A6]/12 hover:shadow-[0_10px_25px_rgba(36,87,166,0.18)]"
                  >

                    <svg
                      viewBox="0 0 24 24"
                      className="h-[20px] w-[20px]"
                      fill="currentColor"
                    >

                      <path d="M14 8h3V4.5c-.5-.1-1.7-.2-3.2-.2-3.2 0-5.4 2-5.4 5.6V13H5.8v3.9h2.6V24h4.1v-7.1h3.3l.5-3.9h-3.8V10c0-1.1.3-2 1.5-2Z" />

                    </svg>

                  </a>

                  {/* GOOGLE */}

                  <a
                    href="https://www.google.com/search?q=Blue+Lotus+Events+%26+Decors+Hyderabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Google"
                    className="contact-info-card flex h-12 w-12 items-center justify-center rounded-full border border-[#2457A6]/20 bg-white hover:shadow-[0_10px_25px_rgba(36,87,166,0.16)]"
                  >

                    <svg
                      viewBox="0 0 24 24"
                      className="h-[21px] w-[21px]"
                    >

                      <path
                        fill="#2457A6"
                        d="M21.35 12.27c0-.71-.06-1.24-.2-1.79H12v3.39h5.35c-.11.84-.7 2.11-2.01 2.96l-.02.11 2.92 2.26.2.02c1.88-1.74 2.91-4.3 2.91-6.95Z"
                      />

                      <path
                        fill="#8FA695"
                        d="M12 21.8c2.7 0 4.96-.89 6.62-2.43l-3.15-2.44c-.84.58-1.97.98-3.47.98-2.65 0-4.9-1.74-5.7-4.15l-.1.01-3.03 2.35-.04.1C4.77 19.42 8.05 21.8 12 21.8Z"
                      />

                      <path
                        fill="#D6B773"
                        d="M6.3 13.76A5.91 5.91 0 0 1 6 12c0-.61.11-1.2.29-1.76l-.01-.12L3.21 7.73l-.1.05A9.96 9.96 0 0 0 2.2 12c0 1.52.37 2.96 1.02 4.22l3.08-2.46Z"
                      />

                      <path
                        fill="#5B4B8A"
                        d="M12 6.09c1.88 0 3.16.81 3.88 1.49l2.83-2.75C16.95 3.21 14.7 2.2 12 2.2c-3.95 0-7.23 2.38-8.78 5.64l3.08 2.4C7.1 7.83 9.35 6.09 12 6.09Z"
                      />

                    </svg>

                  </a>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            EMPTY ANCHOR
        ====================================================== */}

        <div
          id="contact-form"
          className="scroll-mt-20"
        />

        {/* =====================================================
            FINAL CTA
        ====================================================== */}

        <section className="relative overflow-hidden bg-[#FAF7F0] pb-20 pt-16 sm:pb-28 sm:pt-20">

          <div className="pointer-events-none absolute left-1/2 top-20 h-64 w-64 -translate-x-1/2 rounded-full border border-dashed border-[#D6B773]/20 contact-spin" />

          <div
            data-scroll-reveal
            className="relative mx-auto max-w-[900px] px-5 text-center sm:px-8"
          >

            <div className="mb-5 flex items-center justify-center gap-3">

              <span className="h-px w-8 bg-[#D6B773]" />

              <Sparkles
                size={14}
                className="text-[#D6B773]"
              />

              <span className="h-px w-8 bg-[#D6B773]" />

            </div>

            <h2 className="font-serif text-4xl leading-tight text-[#0B1F3A] sm:text-5xl lg:text-6xl">

              Your next celebration

              <span className="block text-[#2457A6]">
                deserves something special.
              </span>

            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#667384]">
              Let&apos;s turn your ideas into an experience
              your guests will remember long after the
              celebration ends.
            </p>

            <button
              type="button"
              onClick={openBooking}
              className="contact-primary-button group relative mt-8 inline-flex items-center gap-3 bg-[#2457A6] px-6 py-4 text-sm font-semibold text-white shadow-[0_15px_35px_rgba(49,89,181,0.2)] hover:bg-[#1D478B]"
            >

              Plan My Event

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-45">

                <ArrowUpRight size={15} />

              </span>

            </button>

          </div>

        </section>
                {/* =====================================================
            ENQUIRY POPUP
        ====================================================== */}

        <AnimatePresence>

          {bookingOpen && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto bg-[#0B1F3A]/75 px-4 py-6 backdrop-blur-md sm:px-6"
              onMouseDown={(event) => {
                if (
                  event.target === event.currentTarget
                ) {
                  closeBooking();
                }
              }}
            >

              {/* POPUP GLOW */}

              <div className="pointer-events-none fixed -left-32 -top-32 h-80 w-80 rounded-full bg-[#2457A6]/20 blur-3xl contact-float" />

              <div className="pointer-events-none fixed -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#D6B773]/15 blur-3xl contact-float-reverse" />

              {/* MODAL */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 35,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 25,
                  scale: 0.96,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative my-auto w-full max-w-2xl overflow-hidden bg-white shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
              >

                {/* TOP ACCENT */}

                <div className="absolute left-0 right-0 top-0 h-1 overflow-hidden bg-gradient-to-r from-[#2457A6] via-[#D6B773] to-[#2457A6]">

                  <div className="contact-shimmer absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                </div>

                {/* HEADER */}

                <div className="flex items-start justify-between border-b border-gray-100 px-5 py-5 sm:px-7 sm:py-6">

                  <div>

                    <div className="mb-2 flex items-center gap-2">

                      <span className="h-px w-7 bg-[#D6B773]" />

                      <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#2457A6]">
                        Let&apos;s celebrate
                      </span>

                      <Sparkles
                        size={13}
                        className="text-[#D6B773]"
                      />

                    </div>

                    <h2 className="font-serif text-2xl text-[#0B1F3A] sm:text-3xl">
                      Book Your Event
                    </h2>

                    <p className="mt-1.5 text-xs text-gray-500 sm:text-sm">
                      Tell us a little about your
                      celebration.
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={closeBooking}
                    aria-label="Close enquiry form"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all duration-300 hover:rotate-90 hover:border-[#2457A6] hover:bg-[#2457A6] hover:text-white"
                  >
                    <X size={18} />
                  </button>

                </div>

                {/* =================================================
                    SUCCESS MESSAGE
                ================================================== */}

                {submitted ? (

                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.95,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    className="px-6 py-12 text-center sm:px-10"
                  >

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#2457A6]/10 text-[#D6B773]">
                      <Check size={28} />
                    </div>

                    <h3 className="mt-5 font-serif text-2xl text-[#0B1F3A]">
                      Enquiry Received!
                    </h3>

                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                      Thank you for reaching out.
                      We&apos;ll be in touch with you
                      soon.
                    </p>

                    <button
                      type="button"
                      onClick={closeBooking}
                      className="mt-6 bg-[#2457A6] px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1D478B]"
                    >
                      Close
                    </button>

                  </motion.div>

                ) : (

                  /* =================================================
                     FORM
                  ================================================== */

                  <form
                    onSubmit={handleSubmit}
                    className="px-5 py-5 sm:px-7 sm:py-6"
                  >

                    {/* NAME + PHONE */}

                    <div className="grid gap-4 sm:grid-cols-2">

                      {/* NAME */}

                      <div>

                        <label
                          htmlFor="contact-popup-name"
                          className="mb-1.5 block text-xs font-semibold text-[#0B1F3A]"
                        >
                          Your Name
                        </label>

                        <div className="relative">

                          <User
                            size={15}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          />

                          <input
                            id="contact-popup-name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={(event) =>
                              updateForm(
                                "name",
                                event.target.value
                              )
                            }
                            required
                            placeholder="Enter your name"
                            autoComplete="name"
                            className="h-11 w-full border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#2457A6] focus:bg-white focus:ring-2 focus:ring-[#2457A6]/10"
                          />

                        </div>

                      </div>

                      {/* PHONE */}

                      <div>

                        <label
                          htmlFor="contact-popup-phone"
                          className="mb-1.5 block text-xs font-semibold text-[#0B1F3A]"
                        >
                          Phone Number
                        </label>

                        <div className="relative">

                          <Phone
                            size={15}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          />

                          <input
                            id="contact-popup-phone"
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={(event) =>
                              updateForm(
                                "phone",
                                event.target.value
                              )
                            }
                            required
                            placeholder="Enter phone number"
                            autoComplete="tel"
                            className="h-11 w-full border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#2457A6] focus:bg-white focus:ring-2 focus:ring-[#2457A6]/10"
                          />

                        </div>

                      </div>

                    </div>

                    {/* EMAIL + EVENT */}

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">

                      {/* EMAIL */}

                      <div>

                        <label
                          htmlFor="contact-popup-email"
                          className="mb-1.5 block text-xs font-semibold text-[#0B1F3A]"
                        >
                          Email Address
                        </label>

                        <div className="relative">

                          <Mail
                            size={15}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          />

                          <input
                            id="contact-popup-email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={(event) =>
                              updateForm(
                                "email",
                                event.target.value
                              )
                            }
                            required
                            placeholder="Enter email address"
                            autoComplete="email"
                            className="h-11 w-full border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#2457A6] focus:bg-white focus:ring-2 focus:ring-[#2457A6]/10"
                          />

                        </div>

                      </div>

                      {/* EVENT DROPDOWN */}

                      <div className="relative">

                        <label className="mb-1.5 block text-xs font-semibold text-[#0B1F3A]">
                          Event Type
                        </label>

                        <button
                          type="button"
                          aria-haspopup="listbox"
                          aria-expanded={
                            eventDropdownOpen
                          }
                          onClick={() =>
                            setEventDropdownOpen(
                              (previous) =>
                                !previous
                            )
                          }
                          className={`flex h-11 w-full items-center justify-between border bg-gray-50 px-3 text-left text-sm transition-all duration-300 ${
                            eventDropdownOpen
                              ? "border-[#2457A6] bg-white ring-2 ring-[#2457A6]/10"
                              : "border-gray-200 hover:border-[#2457A6]/50"
                          }`}
                        >

                          <span
                            className={
                              form.eventType
                                ? "text-gray-700"
                                : "text-gray-400"
                            }
                          >
                            {form.eventType ||
                              "Select event type"}
                          </span>

                          <ChevronDown
                            size={16}
                            className={`text-[#2457A6] transition-transform duration-300 ${
                              eventDropdownOpen
                                ? "rotate-180"
                                : ""
                            }`}
                          />

                        </button>

                        <AnimatePresence>

                          {eventDropdownOpen && (

                            <motion.div
                              initial={{
                                opacity: 0,
                                y: -6,
                                scale: 0.98,
                              }}
                              animate={{
                                opacity: 1,
                                y: 4,
                                scale: 1,
                              }}
                              exit={{
                                opacity: 0,
                                y: -6,
                                scale: 0.98,
                              }}
                              className="absolute left-0 right-0 top-full z-[100] overflow-hidden border border-[#2457A6]/15 bg-white shadow-[0_20px_45px_rgba(23,35,79,0.18)]"
                            >

                              <div className="h-[3px] bg-gradient-to-r from-[#2457A6] via-[#D6B773] to-[#2457A6]" />

                              <div className="p-1.5">

                                {eventTypes.map(
                                  (type) => {

                                    const selected =
                                      form.eventType ===
                                      type;

                                    return (

                                      <button
                                        key={type}
                                        type="button"
                                        role="option"
                                        aria-selected={
                                          selected
                                        }
                                        onClick={() => {

                                          updateForm(
                                            "eventType",
                                            type
                                          );

                                          setEventDropdownOpen(
                                            false
                                          );
                                        }}
                                        className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition-all duration-200 ${
                                          selected
                                            ? "bg-[#2457A6] text-white"
                                            : "text-[#0B1F3A] hover:bg-[#E8EFF6] hover:pl-4"
                                        }`}
                                      >

                                        <span className="flex items-center gap-2.5">

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
                                  }
                                )}

                              </div>

                            </motion.div>

                          )}

                        </AnimatePresence>

                      </div>

                    </div>

                    {/* EVENT DATE */}

                    <div className="mt-4">

                      <label
                        htmlFor="contact-popup-date"
                        className="mb-1.5 block text-xs font-semibold text-[#0B1F3A]"
                      >
                        Event Date
                      </label>

                      <div className="relative">

                        <CalendarDays
                          size={15}
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                          id="contact-popup-date"
                          name="event_date"
                          type="date"
                          value={form.eventDate}
                          onChange={(event) =>
                            updateForm(
                              "eventDate",
                              event.target.value
                            )
                          }
                          min={
                            new Date()
                              .toISOString()
                              .split("T")[0]
                          }
                          className="h-11 w-full border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-700 outline-none transition-all duration-300 focus:border-[#2457A6] focus:bg-white focus:ring-2 focus:ring-[#2457A6]/10"
                        />

                      </div>

                    </div>

                    {/* MESSAGE */}

                    <div className="mt-4">

                      <label
                        htmlFor="contact-popup-message"
                        className="mb-1.5 block text-xs font-semibold text-[#0B1F3A]"
                      >
                        Tell Us About Your Event
                      </label>

                      <textarea
                        id="contact-popup-message"
                        name="message"
                        value={form.message}
                        onChange={(event) =>
                          updateForm(
                            "message",
                            event.target.value
                          )
                        }
                        rows={3}
                        placeholder="Tell us about your venue, guest count, theme or anything else..."
                        className="w-full resize-none border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#2457A6] focus:bg-white focus:ring-2 focus:ring-[#2457A6]/10"
                      />

                    </div>

                    {/* ERROR */}

                    {submitError && (

                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -5,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        className="mt-4 border border-red-200 bg-red-50 px-4 py-3 text-center text-xs font-medium leading-5 text-red-600"
                      >
                        {submitError}
                      </motion.div>

                    )}

                    {/* SUBMIT */}

                    <button
                      type="submit"
                      disabled={sending}
                      className="contact-primary-button group relative mt-5 flex h-12 w-full items-center justify-center gap-3 overflow-hidden bg-[#2457A6] text-sm font-semibold text-white shadow-lg hover:bg-[#1D478B] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-[#2457A6]"
                    >

                      {!sending && (
                        <span className="contact-shimmer absolute inset-y-0 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      )}

                      {sending ? (
                        <>
                          <span className="relative z-10">
                            Sending...
                          </span>

                          <span className="relative z-10 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        </>
                      ) : (
                        <>
                          <span className="relative z-10">
                            Send Enquiry
                          </span>

                          <ArrowRight
                            size={16}
                            className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </>
                      )}

                    </button>

                    <p className="mt-3 text-center text-[10px] text-gray-400">
                      We&apos;ll get back to you regarding your
                      event.
                    </p>

                  </form>

                )}

              </motion.div>

            </motion.div>

          )}

        </AnimatePresence>

      </main>
    </>
  );
}