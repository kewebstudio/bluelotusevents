"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  MessageCircle,
  Phone,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div className="fixed bottom-5 right-5 z-[80] sm:bottom-7 sm:right-7">
      {/* =====================================================
          EXPANDED OPTIONS
      ====================================================== */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 14, scale: 0.96 }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 14, scale: 0.96 }
            }
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[72px] right-0 w-[220px]"
          >
            <div className="overflow-hidden border border-[#0B1F3A]/10 bg-[#FAF7F0] p-2 shadow-[0_18px_55px_rgba(11,31,58,0.16)]">
              {/* HEADER */}

              <div className="relative overflow-hidden bg-[#0B1F3A] px-4 py-3.5">
                <span className="pointer-events-none absolute -right-7 -top-7 h-20 w-20 rounded-full border border-[#D6B773]/20" />

                <div className="relative">
                  <div className="flex items-center gap-2">
                    <span className="h-px w-5 bg-[#D6B773]" />

                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FAF7F0]/65">
                      Let&apos;s connect
                    </span>
                  </div>

                  <p className="mt-1 font-display text-xl font-semibold text-[#FAF7F0]">
                    Plan your event
                  </p>
                </div>
              </div>

              {/* WHATSAPP */}

              <motion.a
                href="https://wa.me/917416242200"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduceMotion ? undefined : { x: 3 }}
                className="group mt-1 flex items-center gap-3 border-b border-[#0B1F3A]/[0.07] px-3 py-3.5 transition-colors duration-300 hover:bg-[#E8EFF6]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#2457A6]/20 bg-[#E8EFF6] text-[#2457A6] transition-all duration-300 group-hover:border-[#2457A6] group-hover:bg-[#2457A6] group-hover:text-[#FAF7F0]">
                  <MessageCircle size={18} strokeWidth={1.6} />
                </span>

                <span>
                  <span className="block text-xs font-semibold text-[#0B1F3A]">
                    WhatsApp
                  </span>

                  <span className="mt-0.5 block text-[10px] text-[#0B1F3A]/50">
                    Chat with us
                  </span>
                </span>
              </motion.a>

              {/* CALL */}

              <motion.a
                href="tel:+917416242200"
                whileHover={reduceMotion ? undefined : { x: 3 }}
                className="group flex items-center gap-3 px-3 py-3.5 transition-colors duration-300 hover:bg-[#FAF7F0]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#D6B773]/35 bg-[#D6B773]/10 text-[#0B1F3A] transition-all duration-300 group-hover:border-[#D6B773] group-hover:bg-[#D6B773]">
                  <Phone size={17} strokeWidth={1.6} />
                </span>

                <span>
                  <span className="block text-xs font-semibold text-[#0B1F3A]">
                    Call us
                  </span>

                  <span className="mt-0.5 block text-[10px] text-[#0B1F3A]/50">
                    +91 74162 42200
                  </span>
                </span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          FLOATING BUTTON
      ====================================================== */}

      <div className="relative">
        {/* Restrained pulse */}

        {!reduceMotion && (
          <motion.span
            animate={{
              scale: [1, 1.22, 1],
              opacity: [0.16, 0, 0.16],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute inset-0 rounded-full bg-[#2457A6]"
          />
        )}

        {/* Approved 45° petal motif */}

        <span
          className="pointer-events-none absolute -inset-1.5 rotate-45 border border-[#D6B773]/55"
          aria-hidden="true"
        />

        {/* Small accent */}

        {!reduceMotion && (
          <motion.span
            animate={{
              y: [0, -3, 0],
              opacity: [0.45, 0.9, 0.45],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -right-1 -top-2 z-20 text-[#D6B773]"
          >
            <Sparkles size={12} strokeWidth={1.4} />
          </motion.span>
        )}

        <motion.button
          type="button"
          onClick={() => setOpen((value) => !value)}
          whileHover={reduceMotion ? undefined : { scale: 1.04 }}
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          aria-label={
            open ? "Close contact options" : "Open contact options"
          }
          aria-expanded={open}
          className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#2457A6] bg-[#2457A6] text-[#FAF7F0] shadow-[0_10px_30px_rgba(11,31,58,0.2)] transition-all duration-300 hover:border-[#0B1F3A] hover:bg-[#0B1F3A] sm:h-16 sm:w-16"
        >
          <motion.span
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.25 }}
          >
            {open ? (
              <X size={22} strokeWidth={1.7} />
            ) : (
              <MessageCircle size={22} strokeWidth={1.7} />
            )}
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
}
