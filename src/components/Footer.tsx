"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, MapPin, Phone, Search } from "lucide-react";

export default function Footer() {
  const reduceMotion = useReducedMotion();

  const reveal = {
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: reduceMotion ? 0 : 0.6 },
  };

  return (
    <footer className="relative overflow-hidden bg-lotus-midnight text-white">
      {/* Restrained brand motif: precise 45° petal geometry + partial ripple arcs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <span className="lotus-petal absolute -right-10 top-10 h-24 w-24 border-white/10" />
        <span className="lotus-ripple absolute -bottom-16 -left-10 h-40 w-40 border-lotus-champagne/15" />
        <span className="absolute right-[12%] top-[20%] h-px w-12 bg-lotus-champagne/30" />
      </div>

      <div className="site-container relative py-10 sm:py-12">
        {/* Logo + description */}
        <motion.div {...reveal} className="mx-auto max-w-2xl text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lotus-champagne focus-visible:ring-offset-4 focus-visible:ring-offset-lotus-midnight"
            aria-label="Blue Lotus Events & Decors home"
          >
            <img
              src="/blue-lotus-lockup-reversed.svg"
              alt="Blue Lotus Events & Decors"
              className="block h-auto w-[150px] sm:w-[170px]"
            />
          </Link>

          <p className="mx-auto mt-5 max-w-xl font-sans text-sm leading-6 text-white/65 sm:text-[15px] sm:leading-7">
            Creative concepts. Elegant décor. Seamless celebrations.
          </p>
        </motion.div>

        {/* Visit us */}
        <motion.a
          {...reveal}
          href="https://maps.app.goo.gl/UwjUEz13VjQhYuGk9"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Blue Lotus Events location in Google Maps"
          className="mx-auto mt-8 flex w-fit items-center gap-3 border-t border-white/10 pt-5 text-left transition-opacity duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lotus-champagne"
        >
          <MapPin
            size={18}
            strokeWidth={1.5}
            className="shrink-0 text-lotus-champagne"
            aria-hidden="true"
          />
          <span>
            <span className="block font-sans text-sm font-medium text-white/90">
              Madhapur, Hyderabad
            </span>
            <span className="mt-0.5 block font-sans text-xs text-white/50">
              Telangana, India · Open in Google Maps
            </span>
          </span>
        </motion.a>

        {/* Social + contact */}
        <motion.div
          {...reveal}
          className="mx-auto mt-8 flex max-w-2xl flex-col items-center"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-lotus-champagne/60" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-lotus-champagne">
              Connect
            </span>
            <span className="h-px w-6 bg-lotus-champagne/60" />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <motion.a
              href="https://www.instagram.com/bluelotusby_sandhyareddy?igsh=c3U4OTZjdHY4N3Fy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Blue Lotus Events on Instagram"
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/80 transition-colors duration-300 hover:border-lotus-champagne/70 hover:text-lotus-champagne focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lotus-champagne"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-[18px] w-[18px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </motion.a>

            <motion.a
              href="https://www.facebook.com/61585468478207/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Blue Lotus Events on Facebook"
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/80 transition-colors duration-300 hover:border-lotus-champagne/70 hover:text-lotus-champagne focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lotus-champagne"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-[18px] w-[18px]"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M14.5 8H17V4.5c-.5-.1-1.7-.2-3.2-.2-3.2 0-5.4 2-5.4 5.6V13H5.8v3.9h2.6V24h4.1v-7.1h3.3l.5-3.9h-3.8V10c0-1.1.3-2 1.5-2Z" />
              </svg>
            </motion.a>

            <motion.a
              href="https://www.google.com/search?q=Blue+Lotus+Events+%26+Decors+Hyderabad"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Blue Lotus Events on Google"
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/80 transition-colors duration-300 hover:border-lotus-champagne/70 hover:text-lotus-champagne focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lotus-champagne"
            >
              <Search size={18} strokeWidth={1.5} aria-hidden="true" />
            </motion.a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 font-sans text-xs text-white/60 sm:text-sm">
            <a
              href="tel:+917416242200"
              aria-label="Call Blue Lotus Events at +91 74162 42200"
              className="inline-flex items-center gap-2 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lotus-champagne"
            >
              <Phone size={15} strokeWidth={1.5} aria-hidden="true" />
              <span>+91 74162 42200</span>
            </a>

            <a
              href="mailto:bluelotusevents1@gmail.com"
              aria-label="Email Blue Lotus Events"
              className="inline-flex items-center gap-2 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lotus-champagne"
            >
              <Mail size={15} strokeWidth={1.5} aria-hidden="true" />
              <span>bluelotusevents1@gmail.com</span>
            </a>
          </div>
        </motion.div>

        {/* Bottom line */}
        <motion.div
          {...reveal}
          className="mt-9 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 text-center sm:flex-row sm:text-left"
        >
          <p className="font-sans text-[11px] text-white/45 sm:text-xs">
            © {new Date().getFullYear()} Blue Lotus Events & Decors
          </p>

          <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-white/35 sm:text-[11px]">
            Seamless Events, Unforgettable Experiences
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
