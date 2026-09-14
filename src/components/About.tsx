"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#FAF7F0] py-10 sm:py-14 lg:py-18"
    >
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="lotus-petal absolute left-[6%] top-24 opacity-50" />
        <span className="lotus-petal absolute right-[7%] top-[52%] opacity-35" />
        <span className="lotus-ripple -right-20 top-[28%] h-56 w-56" />
        <span className="lotus-ripple -left-24 bottom-[10%] h-64 w-64" />
      </div>

      <div className="relative mx-auto site-container">

        {/* =========================================================
            INTRO
        ========================================================= */}

        <div className="max-w-[850px]">

          {/* Label */}

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.55,
            }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-9 bg-[#D6B773]" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#2457A6] sm:text-[10px]">
              About Blue Lotus
            </span>

            <Sparkles
              size={12}
              strokeWidth={1.4}
              className="text-[#D6B773]"
            />
          </motion.div>

          {/* =======================================================
              HEADING
          ======================================================= */}

          <motion.h2
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 28,
                  }
            }
            whileInView={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-4 max-w-[820px] font-display text-[41px] leading-[0.95] tracking-[-1.8px] text-[#0B1F3A] sm:text-[56px] lg:text-[72px]"
          >
            Creative concepts.

            <span className="block text-[#2457A6]">
              Elegant décor.
            </span>

            <span className="block text-[#D6B773]">
              Seamless celebrations.
            </span>
          </motion.h2>

          {/* =======================================================
              COMPANY DESCRIPTION
          ======================================================= */}

          <motion.p
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 15,
                  }
            }
            whileInView={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.6,
              delay: 0.12,
            }}
            className="mt-5 max-w-[760px] text-[13px] leading-[1.75] text-[rgba(11, 31, 58, 0.66)] sm:text-[14px] sm:leading-7"
          >
            Blue Lotus Events & Decors is a Hyderabad-based event planning
            and decoration company led by Sandhya Reddy, with more than a
            decade of experience in the events and décor industry. Having
            delivered over 1,000 successful events, the company creates
            personalised environments for weddings, private celebrations,
            home functions and corporate gatherings—combining creative
            design, detailed planning and dependable on-ground execution.
          </motion.p>

          {/* =======================================================
              STATS
          ======================================================= */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 12,
                  }
            }
            whileInView={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            className="mt-5 flex items-center gap-6"
          >
            {/* 10+ */}

            <div className="border-l-2 border-[#D6B773] pl-3">
              <div className="font-display text-[25px] leading-none text-[#2457A6]">
                10+
              </div>

              <div className="mt-1 text-[7px] font-semibold uppercase tracking-[0.18em] text-[rgba(11, 31, 58, 0.52)]">
                Years of experience
              </div>
            </div>

            {/* Divider */}

            <div className="h-9 w-px bg-[#E8EFF6]" />

            {/* 1000+ */}

            <div>
              <div className="font-display text-[25px] leading-none text-[#2457A6]">
                1,000+
              </div>

              <div className="mt-1 text-[7px] font-semibold uppercase tracking-[0.18em] text-[rgba(11, 31, 58, 0.52)]">
                Successful events
              </div>
            </div>
          </motion.div>

          {/* =======================================================
              DISCOVER STORY
          ======================================================= */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 10,
                  }
            }
            whileInView={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              delay: 0.28,
            }}
          >
            <Link
              href="/about"
              className="group mt-5 inline-flex items-center gap-3"
            >
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#2457A6]">
                Discover Our Story
              </span>

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2457A6] text-white shadow-[0_8px_20px_rgba(49,91,180,0.18)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-45">
                <ArrowUpRight size={14} />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* =========================================================
            IMAGE SHOWCASE
        ========================================================= */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 35,
                }
          }
          whileInView={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{
            once: true,
            amount: 0.12,
          }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mt-8 sm:mt-10 lg:mt-12"
        >

          {/* =======================================================
              FLOATING SPARKLE
          ======================================================= */}

          {!reduceMotion && (
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 10, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute -right-2 top-8 z-40 hidden text-[#D6B773] sm:block"
            >
              <Sparkles
                size={21}
                strokeWidth={1.3}
              />
            </motion.div>
          )}

          {/* =======================================================
              GOLD OFFSET FRAME
          ======================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              -bottom-3
              -right-3
              h-[94%]
              w-[94%]
              border
              border-[#D6B773]/40
            "
          />

          {/* =======================================================
              BLUE OFFSET FRAME
          ======================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              -left-2
              -top-2
              h-[94%]
              w-[94%]
              border
              border-[#2457A6]/12
            "
          />

          {/* =======================================================
              IMAGE FRAME
          ======================================================= */}

          <div className="relative z-10 bg-white p-1.5 shadow-[0_24px_65px_rgba(20,35,60,0.14)] sm:p-2">

            <div className="group relative overflow-hidden bg-[#E8EFF6]">

              {/* =================================================
                  IMAGE

                  IMPORTANT:
                  Natural height is retained so the logo inside
                  about-1.jpeg does not get chopped.
              ================================================== */}

              <motion.div
                initial={{
                  scale: 1,
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 1.045,
                      }
                }
                transition={{
                  duration: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative origin-center"
              >
                <Image
                  src="/images/gallery/wedding/57.JPG"
                  alt="Blue Lotus Events & Decors"
                  width={1800}
                  height={1200}
                  sizes="(max-width: 768px) 100vw, 92vw"
                  className="
                    block
                    h-auto
                    w-full
                    object-contain
                  "
                />
              </motion.div>

              {/* =================================================
                  CINEMATIC GRADIENT
              ================================================== */}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/55 via-transparent to-transparent" />

              {/* =================================================
                  LIGHT SWEEP
              ================================================== */}

              {!reduceMotion && (
                <motion.div
                  initial={{
                    x: "-130%",
                    opacity: 0,
                  }}
                  whileInView={{
                    x: "130%",
                    opacity: [0, 0.4, 0],
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.45,
                    ease: "easeInOut",
                  }}
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    left-0
                    z-20
                    w-[24%]
                    -skew-x-[18deg]
                    bg-gradient-to-r
                    from-transparent
                    via-white/30
                    to-transparent
                  "
                />
              )}

              {/* =================================================
                  SPARKLE 1
              ================================================== */}

              {!reduceMotion && (
                <motion.span
                  animate={{
                    y: [0, -7, 0],
                    opacity: [0.25, 0.9, 0.25],
                    scale: [0.9, 1.1, 0.9],
                  }}
                  transition={{
                    duration: 3.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute right-[13%] top-[17%] z-30 text-[#D6B773]"
                >
                  ✦
                </motion.span>
              )}

              {/* =================================================
                  SPARKLE 2
              ================================================== */}

              {!reduceMotion && (
                <motion.span
                  animate={{
                    y: [0, 6, 0],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{
                    duration: 4.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8,
                  }}
                  className="pointer-events-none absolute left-[9%] top-[34%] z-30 text-[14px] text-[#D6B773]"
                >
                  ✧
                </motion.span>
              )}

              {/* =================================================
                  IMAGE LABEL
              ================================================== */}

              <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 p-5 sm:p-7">

                <div className="flex items-center gap-2">
                  <span className="h-px w-8 bg-[#D6B773]" />

                  <span className="text-[7px] font-semibold uppercase tracking-[0.3em] text-[#D6B773]">
                    Blue Lotus
                  </span>
                </div>

                <h3 className="mt-1 font-display text-[25px] leading-none text-white sm:text-[34px]">
                  Events & Decors
                </h3>
              </div>

              {/* =================================================
                  HOVER BORDER
              ================================================== */}

              <div className="pointer-events-none absolute inset-0 z-40 border border-white/0 transition-all duration-700 group-hover:border-white/20" />
            </div>
          </div>
        </motion.div>

        {/* =========================================================
            MOVING EVENT STRIP
        ========================================================= */}

        <div className="relative mt-4 overflow-hidden border-y border-[#E8EFF6] py-3.5 sm:mt-5">

          {/* Left fade */}

          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-12 bg-gradient-to-r from-[#FAF7F0] to-transparent" />

          {/* Right fade */}

          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-12 bg-gradient-to-l from-[#FAF7F0] to-transparent" />

          {/* Moving content */}

          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    x: ["0%", "-50%"],
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 26,
                    repeat: Infinity,
                    ease: "linear",
                  }
            }
            className="flex w-max items-center"
          >
            {[1, 2].map((group) => (
              <div
                key={group}
                className="flex items-center"
              >

                <span className="mx-4 whitespace-nowrap font-display text-[13px] text-[#2457A6]/70 sm:mx-7">
                  Weddings
                </span>

                <span className="text-[8px] text-[#D6B773]">
                  ✦
                </span>

                <span className="mx-4 whitespace-nowrap font-display text-[13px] text-[#2457A6]/70 sm:mx-7">
                  Private Celebrations
                </span>

                <span className="text-[8px] text-[#D6B773]">
                  ✦
                </span>

                <span className="mx-4 whitespace-nowrap font-display text-[13px] text-[#2457A6]/70 sm:mx-7">
                  Home Functions
                </span>

                <span className="text-[8px] text-[#D6B773]">
                  ✦
                </span>

                <span className="mx-4 whitespace-nowrap font-display text-[13px] text-[#2457A6]/70 sm:mx-7">
                  Corporate Gatherings
                </span>

                <span className="mx-4 text-[8px] text-[#D6B773] sm:mx-7">
                  ✦
                </span>

              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}