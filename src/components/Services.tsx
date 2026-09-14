"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import Enquiry from "@/components/Enquiry";

const services = [
  {
    title: "Wedding Decorations",
    shortTitle: "Weddings",
    description:
      "Elegant and beautifully designed wedding décor created around your story, style and celebration.",
    image: "/images/services/wedding.jpeg",
    points: [
      "Wedding stage decoration",
      "Mandap & backdrop styling",
      "Floral arrangements",
      "Entrance & venue décor",
    ],
  },
  {
    title: "Birthday Celebrations",
    shortTitle: "Birthdays",
    description:
      "Fun, creative and memorable birthday setups designed to make every celebration feel special.",
    image: "/images/services/bday1.JPG",
    points: [
      "Theme decorations",
      "Balloon styling",
      "Cake table decoration",
      "Photo & party areas",
    ],
  },
  {
    title: "Engagement & Reception",
    shortTitle: "Engagements",
    description:
      "Sophisticated décor concepts that give your engagement or reception a beautiful and luxurious atmosphere.",
    image: "/images/services/engagement-1.jpeg",
    points: [
      "Stage & backdrop styling",
      "Floral décor",
      "Table arrangements",
      "Lighting & ambience",
    ],
  },
  {
    title: "Corporate Events",
    shortTitle: "Corporate",
    description:
      "Professional event styling that creates an impressive atmosphere for meetings, launches and corporate occasions.",
    image: "/images/services/corporate.jpeg",
    points: [
      "Corporate stage décor",
      "Branding areas",
      "Venue styling",
      "Event ambience",
    ],
  },
  {
    title: "Beautiful Stage Designs",
    shortTitle: "Stage Design",
    description:
      "Statement stages and backdrops designed to become the visual centrepiece of your celebration.",
    image: "/images/services/stage-1.jpeg",
    points: [
      "Custom stage concepts",
      "Backdrop styling",
      "Floral arrangements",
      "Lighting details",
    ],
  },
  {
    title: "Theme Decorations",
    shortTitle: "Themes",
    description:
      "Creative themed decorations personalized to match your occasion, colours and vision.",
    image: "/images/services/theme.jpeg",
    points: [
      "Custom themes",
      "Colour styling",
      "Venue decoration",
      "Personalized details",
    ],
  },
];

type Service = (typeof services)[number];

export default function Services() {
  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  /*
   * Only run decorative animations while this section
   * is near the viewport.
   */
  useEffect(() => {
    const element = document.getElementById("services");

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: "250px 0px",
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const animateDecorations =
    isVisible && !shouldReduceMotion;

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#FAF7F0] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      {/* =====================================================
          LIGHTWEIGHT BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* BLUE GLOW */}

        <div className="absolute -left-48 top-10 h-[380px] w-[380px] rounded-full bg-[#2457A6]/[0.06] blur-[80px]" />

        {/* GOLD GLOW */}

        <div className="absolute -right-48 bottom-0 h-[380px] w-[380px] rounded-full bg-[#D6B773]/[0.06] blur-[80px]" />

        {/* SMALL ORBS */}

        {animateDecorations && (
          <>
            <motion.div
              animate={{
                y: [0, -10, 0],
                opacity: [0.2, 0.55, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-[12%] top-[30%] h-2 w-2 rounded-full bg-[#D6B773]"
            />

            <motion.div
              animate={{
                y: [0, 12, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute right-[13%] top-[45%] h-2 w-2 rounded-full bg-[#2457A6]"
            />
          </>
        )}

        {/* STATIC SPARKLES */}

        <Sparkles
          size={18}
          className="absolute left-[7%] top-28 text-[#D6B773]/50"
        />

        <Sparkles
          size={15}
          className="absolute right-[8%] top-24 text-[#2457A6]/40"
        />
      </div>

      <div className="relative mx-auto max-w-[1250px]">
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-10 max-w-2xl lg:mb-12"
        >
          <div className="mb-4 flex items-center gap-3">
            <motion.span
              initial={{
                width: 0,
              }}
              whileInView={{
                width: 50,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
              className="h-px bg-[#D6B773] sm:w-[52px]"
            />

            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8A6F32]">
              What We Create
            </span>

            <Sparkles
              size={13}
              className="text-[#D6B773]"
            />
          </div>

          <h2 className="font-serif text-4xl leading-[1.05] tracking-[-0.025em] text-[#0B1F3A] sm:text-5xl lg:text-6xl">
            Celebrations designed
            <span className="block text-[#2457A6]">
              to be remembered.
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-6 text-[#5F6B7A] sm:text-base">
            From intimate moments to grand celebrations, we
            transform spaces into beautiful experiences filled
            with personality, elegance and unforgettable
            details.
          </p>
        </motion.div>

        {/* =====================================================
            SERVICES GRID
        ====================================================== */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.button
              key={service.title}
              type="button"
              onClick={() => setSelectedService(service)}
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.08,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -6,
                    }
              }
              whileTap={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 0.985,
                    }
              }
              className="group relative text-left"
            >
              {/* =================================================
                  CARD
              ================================================== */}

              <div className="relative overflow-hidden rounded-[1.35rem] bg-white shadow-[0_10px_35px_rgba(23,41,75,0.07)] transition-shadow duration-300 group-hover:shadow-[0_22px_55px_rgba(23,41,75,0.14)]">
                {/* IMAGE */}

                <div className="relative h-[235px] overflow-hidden sm:h-[245px]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />

                  {/* IMAGE OVERLAY */}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/75 via-[#0B1F3A]/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* HOVER SHINE */}

                  <div className="pointer-events-none absolute inset-y-0 -left-1/3 z-10 w-1/3 skew-x-[-15deg] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />

                  {/* SPARKLE */}

                  <span className="absolute right-4 top-4 z-20 text-white/80 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                    <Sparkles size={16} />
                  </span>

                  {/* CORNER GLOW */}

                  <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#D6B773]/20 blur-2xl" />

                  {/* FLOATING LABEL */}

                  <span className="absolute bottom-4 left-4 z-20 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-[#2457A6]/80">
                    {service.shortTitle}
                  </span>

                  {/* EXPAND ICON */}

                  <span className="absolute bottom-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2457A6] shadow-lg transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#2457A6] group-hover:text-white">
                    <ArrowUpRight size={16} />
                  </span>
                </div>

                {/* CARD CONTENT */}

                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-2">
                    <span className="h-px w-6 bg-[#D6B773] transition-all duration-300 group-hover:w-10" />

                    <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#8A6F32]">
                      {service.shortTitle}
                    </p>
                  </div>

                  <h3 className="mt-3 font-serif text-2xl leading-tight text-[#0B1F3A] transition-colors duration-300 group-hover:text-[#2457A6]">
                    {service.title}
                  </h3>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#667384]">
                    {service.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-[#0B1F3A]/10 pt-4">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#2457A6]">
                      Discover
                    </span>

                    <ArrowRight
                      size={16}
                      className="text-[#2457A6] transition-transform duration-300 group-hover:translate-x-2"
                    />
                  </div>
                </div>

                {/* HOVER BORDER */}

                <div className="pointer-events-none absolute inset-0 rounded-[1.35rem] border border-transparent transition-colors duration-300 group-hover:border-[#D6B773]/35" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* =====================================================
            BOTTOM DECORATION
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mt-12 flex items-center justify-center gap-3"
        >
          <span className="h-px w-[30px] bg-[#D8D2C7] sm:w-[45px]" />

          <Sparkles
            size={13}
            className="text-[#D6B773]"
          />

          <span className="text-center text-[9px] font-semibold uppercase tracking-[0.25em] text-[#8A6F32]">
            Your celebration · Your story · Your style
          </span>

          <Sparkles
            size={13}
            className="text-[#D6B773]"
          />

          <span className="h-px w-[30px] bg-[#D8D2C7] sm:w-[45px]" />
        </motion.div>
      </div>

      {/* =====================================================
          EXPANDED SERVICE LIGHTBOX
      ====================================================== */}

      <AnimatePresence>
        {selectedService && (
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
            transition={{
              duration: 0.25,
            }}
            onClick={() => setSelectedService(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#0B1F3A]/95 p-4 backdrop-blur-md sm:p-8"
          >
            {/* BACKGROUND GLOW */}

            <div className="pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-[#2457A6]/15 blur-3xl" />

            {/* STATIC RING */}

            <div className="pointer-events-none absolute h-[min(90vw,700px)] w-[min(90vw,700px)] rounded-full border border-dashed border-[#D6B773]/15" />

            {/* SPARKLES */}

            <Sparkles
              size={24}
              className="pointer-events-none absolute left-[10%] top-[20%] text-[#D6B773]/60"
            />

            <Sparkles
              size={20}
              className="pointer-events-none absolute bottom-[20%] right-[10%] text-[#2457A6]/60"
            />

            {/* CLOSE */}

            <motion.button
              type="button"
              onClick={() => setSelectedService(null)}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 1.08,
                      rotate: 90,
                    }
              }
              whileTap={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 0.92,
                    }
              }
              className="fixed right-5 top-5 z-[120] flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              aria-label="Close service details"
            >
              <X size={20} />
            </motion.button>

            {/* MODAL */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(event) => event.stopPropagation()}
              className="relative z-[110] my-10 w-full max-w-[1000px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0B1F3A] shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
            >
              <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                {/* MODAL IMAGE */}

                <div className="relative h-[300px] overflow-hidden sm:h-[430px] lg:h-[600px]">
                  <Image
                    src={selectedService.image}
                    alt={selectedService.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/70 via-transparent to-transparent" />

                  {/* ONE-TIME LIGHT SWEEP */}

                  <motion.div
                    initial={{
                      x: "-120%",
                    }}
                    animate={{
                      x: "120%",
                    }}
                    transition={{
                      duration: 1.3,
                      delay: 0.15,
                    }}
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />

                  <Sparkles
                    size={20}
                    className="absolute right-6 top-6 text-white/80"
                  />

                  <div className="absolute bottom-6 left-6 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                    {selectedService.shortTitle}
                  </div>
                </div>

                {/* MODAL CONTENT */}

                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-[#D6B773]" />

                    <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#D6B773]">
                      Blue Lotus Events & Decors
                    </span>
                  </div>

                  <h3 className="mt-5 font-serif text-3xl leading-tight text-white sm:text-4xl">
                    {selectedService.title}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-white/60">
                    {selectedService.description}
                  </p>

                  {/* FEATURES */}

                  <div className="mt-7 space-y-3">
                    {selectedService.points.map(
                      (point, index) => (
                        <motion.div
                          key={point}
                          initial={{
                            opacity: 0,
                            x: -10,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            duration: 0.35,
                            delay:
                              0.1 + index * 0.06,
                          }}
                          className="flex items-center gap-3 text-sm text-white/75"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2457A6] text-white">
                            <Check size={12} />
                          </span>

                          {point}
                        </motion.div>
                      )
                    )}
                  </div>

                  {/* CTA */}

                  <div className="mt-9">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedService(null);
                        setEnquiryOpen(true);
                      }}
                      className="group inline-flex items-center gap-3 bg-[#2457A6] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#1D478B] hover:shadow-[0_12px_30px_rgba(49,89,181,0.3)]"
                    >
                      Enquire About This

                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-45">
                        <ArrowUpRight size={14} />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          EXISTING ENQUIRY FORM POPUP
          Uses the same Enquiry.tsx component — no duplicate form.
      ====================================================== */}

      <Enquiry
        popup
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />
    </section>
  );
}