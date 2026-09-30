"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, MapPin, Phone, Search } from "lucide-react";

export default function Footer() {
  const reduceMotion = useReducedMotion();

  const reveal = {
    initial: reduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 14 },

    whileInView: {
      opacity: 1,
      y: 0,
    },

    viewport: {
      once: true,
      amount: 0.2,
    },

    transition: {
      duration: reduceMotion ? 0 : 0.6,
    },
  };

  return (
    <footer className="relative overflow-hidden bg-lotus-midnight text-white">
      {/* =========================================================
          BACKGROUND MOTIF
      ========================================================== */}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Soft blue atmosphere */}
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#315FA8]/10 blur-3xl" />

        {/* Soft gold atmosphere */}
        <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#D6B773]/10 blur-3xl" />

        {/* Lotus geometry */}
        <span className="lotus-petal absolute -right-14 top-10 h-28 w-28 border-white/[0.07]" />

        <span className="lotus-petal absolute -left-16 bottom-20 h-32 w-32 border-[#D6B773]/10" />

        <span className="lotus-ripple absolute -bottom-20 left-[18%] h-48 w-48 border-[#D6B773]/10" />

        {/* Fine gold accents */}
        <span className="absolute left-[8%] top-[25%] h-px w-10 bg-[#D6B773]/30" />

        <span className="absolute right-[8%] top-[25%] h-px w-10 bg-[#D6B773]/30" />
      </div>

      {/* =========================================================
          MAIN CONTAINER
      ========================================================== */}

      <div className="site-container relative py-5 sm:py-7">

        {/* =======================================================
            LOGO
        ======================================================== */}

        <motion.div
          {...reveal}
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          {/* Small decorative accent */}

          <div className="mb-1 flex items-center gap-2">
            <span className="h-px w-7 bg-[#D6B773]/50" />

            <span className="text-[9px] text-[#D6B773]">
              ✦
            </span>

            <span className="h-px w-7 bg-[#D6B773]/50" />
          </div>

          {/* =====================================================
              COMPACT LOGO PLAQUE
          ====================================================== */}

          <Link
            href="/"
            aria-label="Blue Lotus Events & Decors home"
            className="group relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B773] focus-visible:ring-offset-3 focus-visible:ring-offset-lotus-midnight"
          >
            {/* Very subtle glow */}

            <div className="absolute -inset-1 rounded-[12px] bg-[#D6B773]/5 blur-md" />

            {/* Compact ivory background */}

            <div className="relative flex items-center justify-center rounded-[12px] border border-[#D6B773]/25 bg-[#F8F6F1] px-1.5 py-1 shadow-[0_5px_16px_rgba(0,0,0,0.18)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#D6B773]/45">
              <img
                src="/logo.png"
                alt="Blue Lotus Events & Decors"
                width={493}
                height={506}
                className="block h-auto w-[100px] sm:w-[112px]"
              />
            </div>
          </Link>

          {/* Tagline */}

          <p className="mx-auto mt-2 max-w-xl font-sans text-sm leading-5 text-white/65 sm:text-[15px] sm:leading-6">
            Creative concepts. Elegant décor. Seamless celebrations.
          </p>
        </motion.div>

        {/* =======================================================
            DIVIDER
        ======================================================== */}

        <div className="mx-auto mt-4 flex max-w-xl items-center justify-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D6B773]/30" />

          <span className="text-[9px] text-[#D6B773]">
            ✦
          </span>

          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D6B773]/30" />
        </div>

        {/* =======================================================
            VISIT US
        ======================================================== */}

        <motion.a
          {...reveal}
          href="https://maps.app.goo.gl/UwjUEz13VjQhYuGk9"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Blue Lotus Events location in Google Maps"
          className="mx-auto mt-4 flex w-fit items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-2.5 transition-all duration-300 hover:border-[#D6B773]/30 hover:bg-white/[0.045] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B773]"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#D6B773]/20 bg-[#D6B773]/5">
            <MapPin
              size={16}
              strokeWidth={1.5}
              className="text-[#D6B773]"
              aria-hidden="true"
            />
          </span>

          <span className="text-left">
            <span className="block font-sans text-sm font-semibold leading-5 text-white/90">
              Madhapur, Hyderabad
            </span>

            <span className="block font-sans text-[11px] leading-4 text-white/45">
              Telangana, India · Open in Google Maps
            </span>
          </span>
        </motion.a>

        {/* =======================================================
            CONNECT
        ======================================================== */}

        <motion.div
          {...reveal}
          className="mx-auto mt-5 flex max-w-2xl flex-col items-center"
        >
          {/* Connect title */}

          <div className="flex items-center gap-2.5">
            <span className="h-px w-6 bg-[#D6B773]/50" />

            <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-[#D6B773]">
              Connect
            </span>

            <span className="h-px w-6 bg-[#D6B773]/50" />
          </div>

          {/* =====================================================
              SOCIAL BUTTONS
          ====================================================== */}

          <div className="mt-3 flex items-center gap-2">

            {/* Instagram */}

            <motion.a
              href="https://www.instagram.com/bluelotusby_sandhyareddy?igsh=c3U4OTZjdHY4N3Fy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Blue Lotus Events on Instagram"
              whileHover={
                reduceMotion ? undefined : { y: -2 }
              }
              whileTap={
                reduceMotion ? undefined : { scale: 0.96 }
              }
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] text-white/75 transition-all duration-300 hover:border-[#D6B773]/50 hover:bg-[#D6B773]/10 hover:text-[#D6B773] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B773]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-[17px] w-[17px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
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
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </motion.a>

            {/* Facebook */}

            <motion.a
              href="https://www.facebook.com/61585468478207/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Blue Lotus Events on Facebook"
              whileHover={
                reduceMotion ? undefined : { y: -2 }
              }
              whileTap={
                reduceMotion ? undefined : { scale: 0.96 }
              }
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] text-white/75 transition-all duration-300 hover:border-[#D6B773]/50 hover:bg-[#D6B773]/10 hover:text-[#D6B773] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B773]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-[17px] w-[17px]"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M14.5 8H17V4.5c-.5-.1-1.7-.2-3.2-.2-3.2 0-5.4 2-5.4 5.6V13H5.8v3.9h2.6V24h4.1v-7.1h3.3l.5-3.9h-3.8V10c0-1.1.3-2 1.5-2Z" />
              </svg>
            </motion.a>

            {/* Google */}

            <motion.a
              href="https://www.google.com/search?q=Blue+Lotus+Events+%26+Decors+Hyderabad"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Blue Lotus Events on Google"
              whileHover={
                reduceMotion ? undefined : { y: -2 }
              }
              whileTap={
                reduceMotion ? undefined : { scale: 0.96 }
              }
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] text-white/75 transition-all duration-300 hover:border-[#D6B773]/50 hover:bg-[#D6B773]/10 hover:text-[#D6B773] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B773]"
            >
              <Search
                size={17}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </motion.a>
          </div>

          {/* =====================================================
              PHONE + EMAIL
          ====================================================== */}

          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-sans text-[11px] text-white/50 sm:text-xs">

            <a
              href="tel:+917416242200"
              aria-label="Call Blue Lotus Events at +91 74162 42200"
              className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B773]"
            >
              <Phone
                size={14}
                strokeWidth={1.5}
                className="text-[#D6B773]"
                aria-hidden="true"
              />

              <span>+91 74162 42200</span>
            </a>

            <a
              href="mailto:bluelotusevents1@gmail.com"
              aria-label="Email Blue Lotus Events"
              className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B773]"
            >
              <Mail
                size={14}
                strokeWidth={1.5}
                className="text-[#D6B773]"
                aria-hidden="true"
              />

              <span>
                bluelotusevents1@gmail.com
              </span>
            </a>
          </div>
        </motion.div>

        {/* =======================================================
            BOTTOM BAR
        ======================================================== */}

        <motion.div
          {...reveal}
          className="mt-5 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-4 text-center sm:flex-row sm:text-left"
        >
          <p className="font-sans text-[10px] text-white/40 sm:text-[11px]">
            © {new Date().getFullYear()} Blue Lotus Events & Decors
          </p>

          <p className="font-sans text-[9px] uppercase tracking-[0.12em] text-white/30 sm:text-[10px]">
            Seamless Events, Unforgettable Experiences
          </p>
        </motion.div>
      </div>
    </footer>
  );
}