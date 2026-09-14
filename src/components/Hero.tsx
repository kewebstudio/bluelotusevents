"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  User,
  X,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

const slides = [
  {
    image: "/images/hero/hero.jpeg",
    eyebrow: "BLUE LOTUS EVENTS & DECORS",
    title: "Celebrate Every",
    highlight: "Moment",
    ending: "In Style",
    description:
      "From elegant weddings to unforgettable celebrations, we create beautiful décor that makes every moment special.",
  },
  {
    image: "/images/hero/hero-2.jpeg",
    eyebrow: "TRADITIONS MEET ELEGANCE",
    title: "Traditions",
    highlight: "Meet",
    ending: "Elegance",
    description:
      "Beautiful traditional décor crafted with timeless elegance, rich details and a touch of your personal style.",
  },
  {
    image: "/images/hero/hero-3.jpeg",
    eyebrow: "DESIGNED FOR YOUR MOMENT",
    title: "Designed For",
    highlight: "Your",
    ending: "Perfect Moment",
    description:
      "Thoughtfully designed floral décor that transforms your celebration into a beautiful and unforgettable experience.",
  },
  {
    image: "/images/gallery/birthday/1.JPG",
    eyebrow: "MEMORIES THAT LAST",
    title: "Make Every",
    highlight: "Birthday",
    ending: "Magical",
    description:
      "From dreamy themes to playful details, we create joyful birthday celebrations filled with beautiful memories.",
  },
];

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

const SLIDE_DURATION = 3000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [bookingOpen, setBookingOpen] = useState(false);
  const [eventDropdownOpen, setEventDropdownOpen] =
    useState(false);

  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    eventDate: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  const slide = slides[current];

  /* =========================================================
     SLIDER
  ========================================================== */

  const nextSlide = () => {
    setCurrent(
      (previous) => (previous + 1) % slides.length
    );
  };

  const previousSlide = () => {
    setCurrent(
      (previous) =>
        (previous - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    if (isPaused || bookingOpen) return;

    const timer = window.setInterval(() => {
      setCurrent(
        (previous) => (previous + 1) % slides.length
      );
    }, SLIDE_DURATION);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPaused, bookingOpen]);

  /*
   * Preload only the next slide.
   *
   * This keeps the transition smooth without downloading
   * all large hero images immediately.
   */
  useEffect(() => {
    const nextIndex =
      (current + 1) % slides.length;

    const nextImage = new window.Image();

    nextImage.src = slides[nextIndex].image;
  }, [current]);

  /* =========================================================
     BOOKING
  ========================================================== */

  const openBooking = () => {
    setBookingOpen(true);
    setEventDropdownOpen(false);
    setSubmitted(false);
    setError("");

    document.body.style.overflow = "hidden";
  };

  const closeBooking = () => {
    if (sending) return;

    setBookingOpen(false);
    setEventDropdownOpen(false);
    setError("");

    document.body.style.overflow = "";
  };

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === "Escape" &&
        bookingOpen &&
        !sending
      ) {
        closeBooking();
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
  }, [bookingOpen, sending]);

  /* =========================================================
     FORM CHANGE
  ========================================================== */

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
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

    setError("");

    if (!form.eventType) {
      setError(
        "Please select your event type."
      );
      return;
    }

    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setError(
        "Form configuration is missing. Please add your Web3Forms access key."
      );
      return;
    }

    setSending(true);

    try {
      const formData = new FormData();

      formData.append(
        "access_key",
        accessKey
      );

      formData.append(
        "subject",
        "New Event Enquiry — Blue Lotus Events & Decors"
      );

      formData.append(
        "from_name",
        "Blue Lotus Events & Decors Website"
      );

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

      formData.append(
        "botcheck",
        ""
      );

      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Unable to send your enquiry."
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
    } catch (submitError) {
      console.error(
        "Enquiry submission error:",
        submitError
      );

      setError(
        "We couldn't send your enquiry right now. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        id="home"
        className="relative h-[calc(100svh-76px)] min-h-[620px] w-full overflow-hidden bg-lotus-midnight"
        onMouseEnter={() =>
          setIsPaused(true)
        }
        onMouseLeave={() =>
          setIsPaused(false)
        }
      >
        {/* ===================================================
            BACKGROUND SLIDE
        ================================================== */}

        <AnimatePresence
          mode="sync"
          initial={false}
        >
          <motion.div
            key={current}
            className="absolute inset-0 transform-gpu"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scale: 1.025,
                  }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    scale: 1,
                  }
            }
            exit={{
              opacity: 0,
            }}
            transition={{
              opacity: {
                duration: 0.45,
                ease: "easeOut",
              },
              scale: shouldReduceMotion
                ? undefined
                : {
                    duration:
                      SLIDE_DURATION / 1000,
                    ease: "linear",
                  },
            }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={current === 0}
              sizes="100vw"
              quality={85}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* ===================================================
            IMAGE OVERLAYS
        ================================================== */}

        <div className="pointer-events-none absolute inset-0 bg-black/15" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(11,31,58,0.16)_100%)]" />

        {/* Restrained Blue Lotus brand motif */}
        <span
          aria-hidden="true"
          className="lotus-petal pointer-events-none absolute right-[8%] top-[18%] hidden h-24 w-24 border-white/15 lg:block"
        />
        <span
          aria-hidden="true"
          className="lotus-ripple pointer-events-none absolute bottom-[14%] right-[12%] hidden h-28 w-28 border-lotus-champagne/20 lg:block"
        />

        {/* ===================================================
            HERO CONTENT
        ================================================== */}

        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl pt-10 sm:pt-16 lg:pt-20">

              {/* EYEBROW */}

              <AnimatePresence
                mode="wait"
                initial={!shouldReduceMotion}
              >
                <motion.div
                  key={`eyebrow-${current}`}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          y: 15,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          y: -10,
                        }
                  }
                  transition={{
                    duration: 0.4,
                  }}
                  className="mb-4 flex items-center gap-3"
                >
                  <span className="h-px w-9 bg-[#D6B773] sm:w-11" />

                  <span className="text-[9px] font-semibold tracking-[0.3em] text-[#D6B773] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-xs sm:tracking-[0.4em]">
                    {slide.eyebrow}
                  </span>

                  <span className="text-[#D6B773]">
                    ✦
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* HEADING */}

              <AnimatePresence
                mode="wait"
                initial={!shouldReduceMotion}
              >
                <motion.h1
                  key={`title-${current}`}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          y: 25,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          y: -18,
                        }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.03,
                    ease: "easeOut",
                  }}
                  className="font-display text-[42px] font-semibold leading-[0.98] tracking-[-0.02em] text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)] sm:text-6xl md:text-7xl lg:text-[82px]"
                >
                  {slide.title}
                  <br />

                  <span className="relative text-[#D6B773] drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)]">
                    {slide.highlight}

                    {!shouldReduceMotion && (
                      <motion.span
                        animate={{
                          opacity: [
                            0,
                            1,
                            0,
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute -right-5 -top-3 text-sm text-[#D6B773] sm:-right-7 sm:-top-4 sm:text-lg"
                      >
                        ✦
                      </motion.span>
                    )}
                  </span>

                  <br />

                  {slide.ending}
                </motion.h1>
              </AnimatePresence>

              {/* DESCRIPTION */}

              <AnimatePresence
                mode="wait"
                initial={!shouldReduceMotion}
              >
                <motion.p
                  key={`description-${current}`}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          y: 18,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: 0.08,
                  }}
                  className="mt-6 max-w-xl text-sm font-medium leading-6 text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)] sm:text-base sm:leading-7"
                >
                  {slide.description}
                </motion.p>
              </AnimatePresence>

              {/* BUTTONS */}

              <AnimatePresence
                mode="wait"
                initial={!shouldReduceMotion}
              >
                <motion.div
                  key={`buttons-${current}`}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          y: 18,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: 0.12,
                  }}
                  className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
                >
                  {/* BOOK */}

                  <motion.button
                    type="button"
                    onClick={openBooking}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { y: -3 }
                    }
                    whileTap={
                      shouldReduceMotion
                        ? undefined
                        : { scale: 0.98 }
                    }
                    className="group relative inline-flex h-12 items-center justify-center gap-3 bg-lotus-blue px-7 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(11,31,58,0.24)] transition-colors duration-300 hover:bg-[#1D478B] sm:h-14 sm:px-9"
                  >

                    <span className="relative z-10">
                      Check Date Availability
                    </span>

                    <ArrowRight
                      size={17}
                      className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </motion.button>

                  {/* EXPLORE */}

                  <motion.a
                    href="#gallery"
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { y: -3 }
                    }
                    whileTap={
                      shouldReduceMotion
                        ? undefined
                        : { scale: 0.98 }
                    }
                    className="group inline-flex h-12 items-center justify-center gap-3 border border-white/70 bg-black/10 px-7 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#2457A6] sm:h-14 sm:px-9"
                  >
                    Explore Our Work

                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </motion.a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ===================================================
            SLIDER CONTROLS
        ================================================== */}

        <div className="absolute bottom-8 left-6 z-20 flex items-center gap-3 sm:left-8 lg:left-12">

          <motion.button
            type="button"
            onClick={previousSlide}
            whileHover={
              shouldReduceMotion
                ? undefined
                : { scale: 1.05 }
            }
            whileTap={
              shouldReduceMotion
                ? undefined
                : { scale: 0.95 }
            }
            aria-label="Previous slide"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/15 text-white backdrop-blur-sm transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#2457A6] sm:flex"
          >
            <ChevronLeft size={18} />
          </motion.button>

          {/* DOTS / PROGRESS */}

          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() =>
                  setCurrent(index)
                }
                aria-label={`Go to slide ${
                  index + 1
                }`}
                className="group flex h-6 items-center"
              >
                <span
                  className={`block h-[2px] overflow-hidden transition-all duration-300 ${
                    index === current
                      ? "w-12 bg-[#D6B773]"
                      : "w-6 bg-white/50 hover:bg-white"
                  }`}
                >
                  {index === current && (
                    <motion.span
                      key={`progress-${current}`}
                      initial={{
                        width: "0%",
                      }}
                      animate={{
                        width: "100%",
                      }}
                      transition={{
                        duration:
                          SLIDE_DURATION / 1000,
                        ease: "linear",
                      }}
                      className="block h-full bg-white"
                    />
                  )}
                </span>
              </button>
            ))}
          </div>

          <motion.button
            type="button"
            onClick={nextSlide}
            whileHover={
              shouldReduceMotion
                ? undefined
                : { scale: 1.05 }
            }
            whileTap={
              shouldReduceMotion
                ? undefined
                : { scale: 0.95 }
            }
            aria-label="Next slide"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/15 text-white backdrop-blur-sm transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#2457A6] sm:flex"
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>

        {/* ===================================================
            SCROLL INDICATOR
        ================================================== */}

        {!shouldReduceMotion && (
          <motion.div
            animate={{
              y: [0, 6, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-8 right-6 z-20 hidden flex-col items-center gap-2 text-white/70 sm:flex lg:right-12"
          >
            <span className="text-[9px] uppercase tracking-[0.3em]">
              Scroll
            </span>

            <span className="h-10 w-px bg-white/40" />
          </motion.div>
        )}

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent sm:hidden" />
      </section>

      {/* =========================================================
          BOOKING POPUP
      ========================================================== */}

      <AnimatePresence>
        {bookingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto bg-[#0B1F3A]/75 px-4 py-6 backdrop-blur-sm sm:px-6"
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

            {/* MODAL */}

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.98,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative my-auto w-full max-w-2xl overflow-visible border border-lotus-mist bg-lotus-ivory shadow-[0_24px_70px_rgba(11,31,58,0.22)]"
            >
              {/* TOP LINE */}

              <div className="absolute left-0 right-0 top-0 z-20 h-px bg-lotus-champagne" />

              {/* HEADER */}

              <div className="flex items-start justify-between border-b border-gray-100 px-5 py-5 sm:px-7 sm:py-6">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-px w-8 bg-[#D6B773]" />

                    <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#2457A6]">
                      Let&apos;s celebrate
                    </span>
                  </div>

                  <h2 className="font-display text-2xl text-[#0B1F3A] sm:text-3xl">
                    Check Date Availability
                  </h2>

                  <p className="mt-1.5 text-xs text-[#5B6470] sm:text-sm">
                    Tell us a little about your celebration.
                  </p>
                </div>

                <motion.button
                  type="button"
                  onClick={closeBooking}
                  disabled={sending}
                  whileHover={
                    shouldReduceMotion ||
                    sending
                      ? undefined
                      : {
                          rotate: 90,
                          scale: 1.05,
                        }
                  }
                  whileTap={
                    shouldReduceMotion ||
                    sending
                      ? undefined
                      : {
                          scale: 0.9,
                        }
                  }
                  aria-label="Close booking form"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D9E1EA] text-[#5B6470] transition-colors duration-300 hover:border-[#2457A6] hover:bg-[#2457A6] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* =================================================
                  FORM
              ================================================= */}

              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="px-5 py-5 sm:px-7 sm:py-6"
                >
                  <div className="grid gap-4 sm:grid-cols-2">

                    {/* NAME */}

                    <div>
                      <label
                        htmlFor="hero-booking-name"
                        className="mb-1.5 block text-xs font-semibold text-[#0B1F3A]"
                      >
                        Your Name
                      </label>

                      <div className="relative">
                        <User
                          size={15}
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8490]"
                        />

                        <input
                          id="hero-booking-name"
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter your name"
                          className="h-11 w-full border border-[#D9E1EA] bg-white pl-10 pr-3 text-sm text-[#0B1F3A] outline-none transition-all duration-300 placeholder:text-[#7A8490] focus:border-[#2457A6] focus:bg-white focus:ring-2 focus:ring-[#2457A6]/10"
                        />
                      </div>
                    </div>

                    {/* PHONE */}

                    <div>
                      <label
                        htmlFor="hero-booking-phone"
                        className="mb-1.5 block text-xs font-semibold text-[#0B1F3A]"
                      >
                        Phone Number
                      </label>

                      <div className="relative">
                        <Phone
                          size={15}
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8490]"
                        />

                        <input
                          id="hero-booking-phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          placeholder="Enter phone number"
                          className="h-11 w-full border border-[#D9E1EA] bg-white pl-10 pr-3 text-sm text-[#0B1F3A] outline-none transition-all duration-300 placeholder:text-[#7A8490] focus:border-[#2457A6] focus:bg-white focus:ring-2 focus:ring-[#2457A6]/10"
                        />
                      </div>
                    </div>

                    {/* EMAIL */}

                    <div>
                      <label
                        htmlFor="hero-booking-email"
                        className="mb-1.5 block text-xs font-semibold text-[#0B1F3A]"
                      >
                        Email Address
                      </label>

                      <div className="relative">
                        <Mail
                          size={15}
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8490]"
                        />

                        <input
                          id="hero-booking-email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="Enter email address"
                          className="h-11 w-full border border-[#D9E1EA] bg-white pl-10 pr-3 text-sm text-[#0B1F3A] outline-none transition-all duration-300 placeholder:text-[#7A8490] focus:border-[#2457A6] focus:bg-white focus:ring-2 focus:ring-[#2457A6]/10"
                        />
                      </div>
                    </div>

                    {/* EVENT TYPE */}

                    <div className="relative">
                      <label
                        htmlFor="hero-event-button"
                        className="mb-1.5 block text-xs font-semibold text-[#0B1F3A]"
                      >
                        Event Type
                      </label>

                      <button
                        id="hero-event-button"
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
                        className={`flex h-11 w-full items-center justify-between border bg-white px-3 text-left text-sm transition-all duration-300 ${
                          eventDropdownOpen
                            ? "border-[#2457A6] bg-white ring-2 ring-[#2457A6]/10"
                            : "border-[#D9E1EA] hover:border-[#2457A6]/50"
                        }`}
                      >
                        <span
                          className={
                            form.eventType
                              ? "text-[#0B1F3A]"
                              : "text-[#7A8490]"
                          }
                        >
                          {form.eventType ||
                            "Select event type"}
                        </span>

                        <span
                          className={`text-[#2457A6] transition-transform duration-200 ${
                            eventDropdownOpen
                              ? "rotate-180"
                              : ""
                          }`}
                        >
                          <ChevronDown size={16} />
                        </span>
                      </button>

                      <AnimatePresence>
                        {eventDropdownOpen && (
                          <motion.div
                            initial={{
                              opacity: 0,
                              y: -5,
                            }}
                            animate={{
                              opacity: 1,
                              y: 5,
                            }}
                            exit={{
                              opacity: 0,
                              y: -5,
                            }}
                            transition={{
                              duration: 0.15,
                            }}
                            className="absolute left-0 right-0 top-full z-[100] overflow-hidden border border-[#2457A6]/15 bg-white shadow-[0_18px_45px_rgba(11,31,58,0.14)]"
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
                                        setForm(
                                          (previous) => ({
                                            ...previous,
                                            eventType:
                                              type,
                                          })
                                        );

                                        setEventDropdownOpen(
                                          false
                                        );

                                        setError("");
                                      }}
                                      className={`group flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition-colors duration-200 ${
                                        selected
                                          ? "bg-[#2457A6] text-white"
                                          : "text-[#0B1F3A] hover:bg-[#E8EFF6]"
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

                    {/* DATE */}

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="hero-booking-date"
                        className="mb-1.5 block text-xs font-semibold text-[#0B1F3A]"
                      >
                        Event Date
                      </label>

                      <div className="relative">
                        <CalendarDays
                          size={15}
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8490]"
                        />

                        <input
                          id="hero-booking-date"
                          name="eventDate"
                          type="date"
                          value={form.eventDate}
                          onChange={handleChange}
                          className="h-11 w-full border border-[#D9E1EA] bg-white pl-10 pr-3 text-sm text-[#0B1F3A] outline-none transition-all duration-300 focus:border-[#2457A6] focus:bg-white focus:ring-2 focus:ring-[#2457A6]/10"
                        />
                      </div>
                    </div>

                    {/* MESSAGE */}

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="hero-booking-message"
                        className="mb-1.5 block text-xs font-semibold text-[#0B1F3A]"
                      >
                        Tell Us About Your Event
                      </label>

                      <textarea
                        id="hero-booking-message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={3}
                        required
                        placeholder="Tell us about your venue, guest count, theme or anything else..."
                        className="w-full resize-none border border-[#D9E1EA] bg-white px-3 py-3 text-sm text-[#0B1F3A] outline-none transition-all duration-300 placeholder:text-[#7A8490] focus:border-[#2457A6] focus:bg-white focus:ring-2 focus:ring-[#2457A6]/10"
                      />
                    </div>
                  </div>

                  {/* ERROR */}

                  {error && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="mt-4 border border-red-200 bg-red-50 px-3 py-2.5 text-xs leading-5 text-red-600"
                    >
                      {error}
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

                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={
                      shouldReduceMotion ||
                      sending
                        ? undefined
                        : { y: -2 }
                    }
                    whileTap={
                      shouldReduceMotion ||
                      sending
                        ? undefined
                        : { scale: 0.98 }
                    }
                    className="group relative mt-5 flex h-12 w-full items-center justify-center gap-3 overflow-hidden bg-[#2457A6] text-sm font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-[#1D478B] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <span className="relative z-10">
                      {sending
                        ? "Sending..."
                        : "Send Enquiry"}
                    </span>

                    {!sending && (
                      <ArrowRight
                        size={16}
                        className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    )}

                    {sending && (
                      <span className="relative z-10 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    )}
                  </motion.button>

                  <p className="mt-3 text-center text-[10px] text-[#7A8490]">
                    We&apos;ll get back to you regarding your event.
                  </p>
                </form>
              ) : (
                /* =================================================
                   SUCCESS
                ================================================== */

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
                  className="px-6 py-14 text-center sm:px-10"
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
                    <Check size={28} />
                  </motion.div>

                  <h3 className="mt-5 font-display text-3xl text-[#0B1F3A]">
                    Thank You!
                  </h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#5B6470]">
                    Your enquiry has been received.
                    We&apos;ll be in touch with you soon
                    to discuss your celebration.
                  </p>

                  <motion.button
                    type="button"
                    onClick={closeBooking}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { y: -2 }
                    }
                    whileTap={
                      shouldReduceMotion
                        ? undefined
                        : { scale: 0.97 }
                    }
                    className="mt-6 bg-[#2457A6] px-7 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#1D478B]"
                  >
                    Close
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}