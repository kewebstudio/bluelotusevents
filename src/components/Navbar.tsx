"use client";

import Image from "next/image";
import Link from "next/link";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  ArrowRight,
  CalendarDays,
  Check,
  Menu,
  MessageCircle,
  Phone,
  Sparkles,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

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

export default function Navbar() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [bookingOpen, setBookingOpen] =
    useState(false);

  const [eventDropdownOpen, setEventDropdownOpen] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const [sending, setSending] =
    useState(false);

  const [submitError, setSubmitError] =
    useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    eventDate: "",
    message: "",
  });

  const [pageVisible, setPageVisible] =
    useState(true);

  const navItems = [
    ["Home", "/"],
    ["About", "/about"],
    ["Services", "/services"],
    ["Gallery", "/gallery"],
    ["Contact", "/contact"],
  ];

  /* =========================================================
     TAB VISIBILITY
  ========================================================== */

  useEffect(() => {
    const handleVisibility = () => {
      setPageVisible(
        document.visibilityState === "visible"
      );
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, []);

  /* =========================================================
     BODY SCROLL LOCK
  ========================================================== */

  useEffect(() => {
    const shouldLock =
      menuOpen || bookingOpen;

    document.body.style.overflow =
      shouldLock ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, bookingOpen]);

  /* =========================================================
     ESCAPE KEY
  ========================================================== */

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key !== "Escape") return;

      if (bookingOpen && !sending) {
        closeBooking();
        return;
      }

      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [
    bookingOpen,
    menuOpen,
    sending,
  ]);

  /* =========================================================
     BOOKING
  ========================================================== */

  const openBooking = () => {
    setMenuOpen(false);
    setBookingOpen(true);
    setSubmitted(false);
    setSubmitError("");
    setEventDropdownOpen(false);
  };

  const closeBooking = () => {
    if (sending) return;

    setBookingOpen(false);
    setSubmitted(false);
    setSubmitError("");
    setEventDropdownOpen(false);
  };

  /* =========================================================
     FORM UPDATE
  ========================================================== */

  const updateForm = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (submitError) {
      setSubmitError("");
    }
  };

  /* =========================================================
     REAL FORM SUBMISSION
  ========================================================== */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (sending) return;

    setSubmitError("");

    /*
     * EVENT TYPE VALIDATION
     */

    if (!form.eventType) {
      setSubmitError(
        "Please select your event type."
      );

      return;
    }

    /*
     * WEB3FORMS ACCESS KEY
     */

    const accessKey =
      process.env
        .NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setSubmitError(
        "Form configuration is missing. Please add your Web3Forms access key."
      );

      return;
    }

    setSending(true);

    try {
      const formData = new FormData();

      /*
       * WEB3FORMS
       */

      formData.append(
        "access_key",
        accessKey
      );

      /*
       * EMAIL SUBJECT
       */

      formData.append(
        "subject",
        "New Event Enquiry — Blue Lotus Events & Decors"
      );

      /*
       * SENDER NAME
       */

      formData.append(
        "from_name",
        "Blue Lotus Events & Decors Website"
      );

      /*
       * CUSTOMER DETAILS
       */

      formData.append(
        "name",
        form.name
      );

      formData.append(
        "phone",
        form.phone
      );

      formData.append(
        "email",
        form.email
      );

      formData.append(
        "eventType",
        form.eventType
      );

      formData.append(
        "eventDate",
        form.eventDate
      );

      formData.append(
        "message",
        form.message
      );

      /*
       * SPAM HONEYPOT
       */

      formData.append(
        "botcheck",
        ""
      );

      /*
       * SEND
       */

      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData,
        }
      );

      const result =
        await response.json();

      /*
       * CHECK RESPONSE
       */

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Unable to send your enquiry."
        );
      }

      /*
       * SUCCESS
       */

      setEventDropdownOpen(false);
      setSubmitted(true);

      /*
       * RESET FORM
       */

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
        "We couldn't send your enquiry right now. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* =====================================================
          NAVBAR STYLES
      ====================================================== */}

      <style jsx global>{`
        @keyframes navGlowLeft {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.15;
          }

          50% {
            transform: translate3d(30px, 0, 0);
            opacity: 0.28;
          }
        }

        @keyframes navGlowRight {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.1;
          }

          50% {
            transform: translate3d(-25px, 0, 0);
            opacity: 0.23;
          }
        }

          50% {
            opacity: 0.35;
            transform: scale(1.12);
          }
        }

        @keyframes navShimmer {
          0% {
            transform: translate3d(-140%, 0, 0)
              skewX(-18deg);
          }

          35%,
          100% {
            transform: translate3d(160%, 0, 0)
              skewX(-18deg);
          }
        }

        @keyframes navSparkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0.7);
          }

          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes contactFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(20px, -15px, 0);
          }
        }

        .nav-glow-left {
          animation: navGlowLeft 8s
            ease-in-out infinite;
          animation-play-state: ${pageVisible
            ? "running"
            : "paused"};
        }

        .nav-glow-right {
          animation: navGlowRight 10s
            ease-in-out infinite;
          animation-play-state: ${pageVisible
            ? "running"
            : "paused"};
        }

        .nav-shimmer {
          animation: navShimmer 4s
            ease-in-out infinite;
          animation-play-state: ${pageVisible
            ? "running"
            : "paused"};
        }

        .nav-sparkle {
          animation: navSparkle 2.8s
            ease-in-out infinite;
          animation-play-state: ${pageVisible
            ? "running"
            : "paused"};
        }

        .contact-float {
          animation: contactFloat 8s
            ease-in-out infinite;
        }

        .contact-float-reverse {
          animation: contactFloat 10s
            ease-in-out infinite reverse;
        }

        .nav-icon-button {
          transition:
            transform 300ms
              cubic-bezier(0.22, 1, 0.36, 1),
            color 250ms ease,
            background-color 250ms ease,
            border-color 250ms ease,
            box-shadow 300ms ease;
        }

        .nav-icon-button:hover {
          transform: translate3d(0, -2px, 0)
            scale(1.04);
        }

        .nav-book-button {
          transition:
            transform 300ms
              cubic-bezier(0.22, 1, 0.36, 1),
            background-color 250ms ease,
            box-shadow 300ms ease;
        }

        .nav-book-button:hover {
          transform: translate3d(0, -2px, 0);
          box-shadow:
            0 8px 25px
              rgba(49, 89, 181, 0.25);
        }

        .nav-book-button:active {
          transform: translate3d(0, 0, 0)
            scale(0.97);
        }

        .nav-mobile-button:active {
          transform: scale(0.9);
        }

        @media (prefers-reduced-motion: reduce) {
          .nav-glow-left,
          .nav-glow-right,
          .nav-shimmer,
          .nav-sparkle,
          .contact-float,
          .contact-float-reverse {
            animation: none !important;
          }

          .nav-icon-button,
          .nav-book-button {
            transition: none !important;
          }
        }
      `}</style>

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <header className="sticky top-0 z-50 w-full border-b border-[#2457A6]/10 bg-[#FAF7F0]/95 backdrop-blur-xl">

        {/* BACKGROUND */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="nav-glow-left absolute -left-20 top-0 h-24 w-56 rounded-full bg-[#2457A6]/10 blur-3xl" />

          <div className="nav-glow-right absolute -right-20 top-0 h-24 w-56 rounded-full bg-[#D6B773]/10 blur-3xl" />

        </div>

        {/* MAIN BAR */}

        <div className="relative mx-auto flex h-[64px] max-w-[1400px] items-center justify-between px-4 sm:px-7 lg:px-10">

          {/* LOGO */}

          <Link
            href="/"
            className="group relative flex shrink-0 items-center"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            <div className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-[1.04]">

              <Image
                src="/blue-lotus-lockup-primary.svg"
                alt="Blue Lotus Events & Decors"
                width={225}
                height={70}
                priority
                className="relative z-10 h-auto w-[175px] sm:w-[195px] lg:w-[215px] xl:w-[225px]"
              />



            </div>
          </Link>

          {/* DESKTOP NAV */}

          <nav className="hidden items-center gap-7 lg:flex">

            {navItems.map(
              ([name, link]) => (
                <Link
                  key={name}
                  href={link}
                  className="group relative block py-2 text-[14px] font-medium text-[#4b5563] transition-colors duration-300 hover:text-[#2457A6]"
                >
                  {name}

                  <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-[#2457A6] transition-all duration-500 group-hover:w-full" />

                  <span className="absolute -right-3 -top-1 scale-0 text-[8px] text-[#D6B773] opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                    ✦
                  </span>
                </Link>
              )
            )}

          </nav>

          {/* RIGHT */}

          <div className="flex items-center gap-2.5">

            {/* PHONE */}

            <a
              href="tel:+917416242200"
              aria-label="Call Blue Lotus Events"
              className="nav-icon-button group relative hidden h-9 w-9 items-center justify-center rounded-full border border-[#2457A6]/20 text-[#2457A6] sm:flex hover:border-[#2457A6] hover:bg-[#2457A6] hover:text-white"
            >
              <span className="pointer-events-none absolute inset-0 rounded-full bg-[#2457A6]/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />

              <Phone
                size={17}
                strokeWidth={1.8}
                className="relative z-10 transition-transform duration-300 group-hover:rotate-12"
              />

              <span className="nav-sparkle absolute -right-1 -top-1 text-[8px] text-[#D6B773]">
                ✦
              </span>
            </a>

            {/* DESKTOP BOOK */}

            <button
              type="button"
              onClick={openBooking}
              className="nav-book-button group relative hidden overflow-hidden bg-[#2457A6] px-5 py-2.5 text-[13px] font-semibold text-white sm:block"
            >
              <span className="nav-shimmer absolute inset-y-0 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/25 to-transparent" />

              <span className="relative z-10 flex items-center gap-2">
                Check Date Availability

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <Sparkles size={13} />
                </span>
              </span>
            </button>

            {/* MOBILE CONTACT ACTIONS */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="tel:+917416242200"
                aria-label="Call Blue Lotus Events"
                className="flex h-9 w-9 items-center justify-center border border-[#2457A6]/20 text-[#2457A6] transition-colors duration-300 hover:border-[#2457A6] hover:bg-[#2457A6] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B773]"
              >
                <Phone size={17} strokeWidth={1.7} aria-hidden="true" />
              </a>

              <a
                href="https://wa.me/917416242200"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Blue Lotus Events on WhatsApp"
                className="flex h-9 w-9 items-center justify-center border border-[#2457A6]/20 text-[#2457A6] transition-colors duration-300 hover:border-[#2457A6] hover:bg-[#2457A6] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B773]"
              >
                <MessageCircle
                  size={17}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </a>
            </div>

            {/* MOBILE BUTTON */}

            <button
              type="button"
              onClick={() =>
                setMenuOpen(
                  (previous) =>
                    !previous
                )
              }
              className="nav-mobile-button flex h-9 w-9 items-center justify-center rounded-full text-[#2457A6] transition-all duration-300 hover:bg-[#2457A6]/10 lg:hidden"
              aria-label={
                menuOpen
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={menuOpen}
            >
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{
                      opacity: 0,
                      rotate: -90,
                      scale: 0.7,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.7,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <X
                      size={22}
                      strokeWidth={1.8}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.7,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: -90,
                      scale: 0.7,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <Menu
                      size={22}
                      strokeWidth={1.8}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

          </div>
        </div>

        {/* =====================================================
            MOBILE MENU
        ====================================================== */}

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="overflow-hidden border-t border-[#0B1F3A]/10 bg-[#FAF7F0] lg:hidden"
            >
              <nav className="px-5 py-3">

                {navItems.map(
                  ([name, link], index) => (
                    <motion.div
                      key={name}
                      initial={{
                        opacity: 0,
                        x: -15,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.25,
                        delay:
                          index * 0.045,
                      }}
                    >
                      <Link
                        href={link}
                        onClick={() =>
                          setMenuOpen(false)
                        }
                        className="group flex items-center justify-between border-b border-gray-100 py-3.5 text-[15px] font-medium text-gray-700 transition-colors duration-300 hover:text-[#2457A6]"
                      >
                        <span className="flex items-center gap-3">
                          <span className="h-1 w-1 rounded-full bg-[#D6B773] opacity-0 transition-all duration-300 group-hover:scale-150 group-hover:opacity-100" />

                          {name}
                        </span>

                        <span className="text-[#2457A6] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                          →
                        </span>
                      </Link>
                    </motion.div>
                  )
                )}

                {/* MOBILE BOOK */}

                <motion.button
                  type="button"
                  onClick={openBooking}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.22,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="group relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden bg-[#2457A6] px-5 py-3.5 text-sm font-semibold text-white shadow-md"
                >
                  <span className="nav-shimmer absolute inset-y-0 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                  <span className="relative z-10">
                    Check Date Availability
                  </span>

                  <span className="relative z-10 text-[#D6B773]">
                    ✦
                  </span>
                </motion.button>

              </nav>
            </motion.div>
          )}
        </AnimatePresence>

      </header>

      {/* =====================================================
          BOOKING POPUP
      ====================================================== */}

      <AnimatePresence>
        {bookingOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto bg-[#0B1F3A]/75 px-4 py-6 backdrop-blur-md sm:px-6"
            onMouseDown={(event) => {
              if (
                event.target ===
                  event.currentTarget &&
                !sending
              ) {
                closeBooking();
              }
            }}
          >

            {/* BACKGROUND GLOW */}

            <div className="pointer-events-none fixed -left-32 -top-32 h-80 w-80 rounded-full bg-[#2457A6]/20 blur-3xl contact-float" />

            <div className="pointer-events-none fixed -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#D6B773]/15 blur-3xl contact-float-reverse" />

            {/* POPUP */}

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
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="relative my-auto w-full max-w-2xl overflow-visible bg-white shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
            >

              {/* TOP ACCENT */}

              <div className="absolute left-0 right-0 top-0 h-1 overflow-hidden bg-gradient-to-r from-[#2457A6] via-[#D6B773] to-[#2457A6]">
                <span className="nav-shimmer absolute inset-y-0 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </div>

              {/* HEADER */}

              <div className="flex items-start justify-between border-b border-gray-100 px-5 py-5 sm:px-7 sm:py-6">

                <div>

                  <div className="mb-2 flex items-center gap-2">

                    <span className="h-px w-7 bg-[#D6B773]" />

                    <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#2457A6]">
                      Let&apos;s create something beautiful
                    </span>

                    <Sparkles
                      size={13}
                      className="text-[#D6B773]"
                    />

                  </div>

                  <h2 className="font-serif text-2xl text-[#0B1F3A] sm:text-3xl">
                    Check Date Availability
                  </h2>

                  <p className="mt-1.5 text-xs text-gray-500 sm:text-sm">
                    Tell us a little about your
                    celebration.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={closeBooking}
                  disabled={sending}
                  aria-label="Close booking form"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all duration-300 hover:rotate-90 hover:border-[#2457A6] hover:bg-[#2457A6] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <X size={18} />
                </button>

              </div>

              {/* =================================================
                  SUCCESS
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
                  transition={{
                    duration: 0.35,
                  }}
                  className="px-6 py-12 text-center sm:px-10"
                >

                  <motion.div
                    initial={{
                      scale: 0.7,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#2457A6]/10 text-[#D6B773]"
                  >
                    <Check size={29} />
                  </motion.div>

                  <h3 className="mt-5 font-serif text-2xl text-[#0B1F3A]">
                    Thank You!
                  </h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                    Your enquiry has been received.
                    We&apos;ll be in touch with you
                    soon.
                  </p>

                  <button
                    type="button"
                    onClick={closeBooking}
                    className="mt-6 bg-[#2457A6] px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#274b9d]"
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

                    <div>

                      <label
                        htmlFor="navbar-name"
                        className="mb-1.5 block text-xs font-semibold text-[#0B1F3A]"
                      >
                        Your Name
                      </label>

                      <input
                        id="navbar-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={(event) =>
                          updateForm(
                            "name",
                            event.target.value
                          )
                        }
                        placeholder="Enter your name"
                        className="h-11 w-full border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#2457A6] focus:bg-white focus:ring-2 focus:ring-[#2457A6]/10"
                      />

                    </div>

                    <div>

                      <label
                        htmlFor="navbar-phone"
                        className="mb-1.5 block text-xs font-semibold text-[#0B1F3A]"
                      >
                        Phone Number
                      </label>

                      <input
                        id="navbar-phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(event) =>
                          updateForm(
                            "phone",
                            event.target.value
                          )
                        }
                        placeholder="Enter phone number"
                        className="h-11 w-full border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#2457A6] focus:bg-white focus:ring-2 focus:ring-[#2457A6]/10"
                      />

                    </div>

                  </div>

                  {/* EMAIL + EVENT */}

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">

                    <div>

                      <label
                        htmlFor="navbar-email"
                        className="mb-1.5 block text-xs font-semibold text-[#0B1F3A]"
                      >
                        Email Address
                      </label>

                      <input
                        id="navbar-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={(event) =>
                          updateForm(
                            "email",
                            event.target.value
                          )
                        }
                        placeholder="Enter email address"
                        className="h-11 w-full border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#2457A6] focus:bg-white focus:ring-2 focus:ring-[#2457A6]/10"
                      />

                    </div>

                    {/* EVENT DROPDOWN */}

                    <div className="relative">

                      <label
                        htmlFor="navbar-event"
                        className="mb-1.5 block text-xs font-semibold text-[#0B1F3A]"
                      >
                        Event Type
                      </label>

                      <button
                        id="navbar-event"
                        type="button"
                        onClick={() =>
                          setEventDropdownOpen(
                            (previous) =>
                              !previous
                          )
                        }
                        aria-haspopup="listbox"
                        aria-expanded={
                          eventDropdownOpen
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

                        <span
                          className={`transition-transform duration-300 ${
                            eventDropdownOpen
                              ? "rotate-180"
                              : ""
                          }`}
                        >
                          <ArrowRight
                            size={15}
                            className="rotate-90 text-[#2457A6]"
                          />
                        </span>

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
                            transition={{
                              duration: 0.18,
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

                  {/* DATE */}

                  <div className="mt-4">

                    <label
                      htmlFor="navbar-date"
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
                        id="navbar-date"
                        name="eventDate"
                        type="date"
                        value={form.eventDate}
                        onChange={(event) =>
                          updateForm(
                            "eventDate",
                            event.target.value
                          )
                        }
                        className="h-11 w-full border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-700 outline-none transition-all duration-300 focus:border-[#2457A6] focus:bg-white focus:ring-2 focus:ring-[#2457A6]/10"
                      />

                    </div>

                  </div>

                  {/* MESSAGE */}

                  <div className="mt-4">

                    <label
                      htmlFor="navbar-message"
                      className="mb-1.5 block text-xs font-semibold text-[#0B1F3A]"
                    >
                      Tell Us About Your Event
                    </label>

                    <textarea
                      id="navbar-message"
                      name="message"
                      rows={3}
                      required
                      value={form.message}
                      onChange={(event) =>
                        updateForm(
                          "message",
                          event.target.value
                        )
                      }
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
                      className="mt-4 border border-red-200 bg-red-50 px-4 py-3 text-xs leading-5 text-red-600"
                    >
                      {submitError}
                    </motion.div>

                  )}

                  {/* HONEYPOT */}

                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    disabled={sending}
                    className="nav-book-button group relative mt-5 flex h-12 w-full items-center justify-center gap-3 overflow-hidden bg-[#2457A6] text-sm font-semibold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                  >

                    {!sending && (
                      <span className="nav-shimmer absolute inset-y-0 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    )}

                    <span className="relative z-10">
                      {sending
                        ? "Sending..."
                        : "Send Enquiry"}
                    </span>

                    {sending ? (

                      <span className="relative z-10 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    ) : (

                      <ArrowRight
                        size={16}
                        className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                      />

                    )}

                  </button>

                  <p className="mt-3 text-center text-[10px] text-gray-400">
                    We&apos;ll get back to you regarding
                    your event.
                  </p>

                </form>
              )}

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}