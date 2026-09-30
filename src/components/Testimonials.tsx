"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";

import { useEffect, useState } from "react";

/* =========================================================
   TESTIMONIAL DATA
   Each review now has its own image.
========================================================= */

const testimonials = [
  {
    name: "Padmaja",
    review:
      "I want to thank you from the bottom of my heart for all your hard work. You did a fantastic job! 👏 A kudos to you and your team for making this event so special for us all.",

    // Existing image verified from your current component
    image: "/images/gallery/wedding/h1.jpg",
  },

  {
    name: "Rashmitha",
    review:
      "Decor was speechless & very nicely decorated. At home they decorated very nicely. Wedding mandapam & entrance was fabulous 😍. And the team was friendly.",

    // CHANGE THIS to Rashmitha's actual event image
    image: "/images/gallery/wedding/5.jpg",
  },

  {
    name: "Priya K.",
    review:
      "Absolutely loved the décor! Everything was so elegant and perfectly arranged. It made our event truly special.",

    // CHANGE THIS to Priya's actual event image
    image: "/images/gallery/events/96.jpg",
  },

  {
    name: "Karthik M.",
    review:
      "From planning to execution, everything was smooth and stress-free. Highly recommended for any event décor.",

    // CHANGE THIS to Karthik's actual event image
    image: "/images/gallery/events/38.jpg",
  },

  {
    name: "Sneha R.",
    review:
      "Highly professional and creative. The setup exceeded our expectations. Thank you for making our day memorable!",

    // CHANGE THIS to Sneha's actual event image
    image: "/images/gallery/birthday/15.jpg",
  },

  {
    name: "AVS Ramachandra Rao",
    review:
      "We thank you for having provided us with the resources and the support. It was a smooth sail due to the above. We also thank that you were monitoring the same so that things should move as per plan and as desired.",

    // CHANGE THIS to AVS Ramachandra Rao's actual event image
    image: "/images/gallery/events/16.jpg",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  /*
   * Current testimonial.
   *
   * Both the review AND image come from this object.
   */
  const current = testimonials[active];

  /* =========================================================
     VIEWPORT DETECTION
  ========================================================== */

  useEffect(() => {
    const element =
      document.getElementById("testimonials");

    if (!element) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          setIsVisible(
            entry.isIntersecting
          );
        },
        {
          rootMargin: "250px 0px",
          threshold: 0,
        }
      );

    observer.observe(element);

    return () =>
      observer.disconnect();
  }, []);

  /* =========================================================
     NEXT REVIEW
  ========================================================== */

  const nextReview = () => {
    setActive(
      (currentIndex) =>
        (currentIndex + 1) %
        testimonials.length
    );
  };

  /* =========================================================
     PREVIOUS REVIEW
  ========================================================== */

  const previousReview = () => {
    setActive(
      (currentIndex) =>
        (currentIndex -
          1 +
          testimonials.length) %
        testimonials.length
    );
  };

  /* =========================================================
     AUTOPLAY
  ========================================================== */

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActive(
        (currentIndex) =>
          (currentIndex + 1) %
          testimonials.length
      );
    }, 5500);

    return () =>
      clearInterval(interval);
  }, [isVisible]);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#faf8f3] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20"
    >
      {/* =====================================================
          LIGHTWEIGHT BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* BLUE GLOW */}

        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#3159b5]/[0.035] blur-3xl" />

        {/* GOLD GLOW */}

        <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#c99a45]/[0.05] blur-3xl" />

        {/* SPARKLES */}

        <Sparkles
          size={19}
          className="absolute left-[8%] top-24 text-[#c99a45]/50"
        />

        <Sparkles
          size={15}
          className="absolute right-[9%] top-32 text-[#3159b5]/40"
        />

        <Sparkles
          size={13}
          className="absolute bottom-24 left-[15%] text-[#3159b5]/30"
        />

      </div>

      <div className="relative mx-auto max-w-[1180px]">

        {/* ===================================================
            HEADING
        ==================================================== */}

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
            duration: 0.6,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="mb-9 text-center"
        >

          <div className="mb-3 flex items-center justify-center gap-3">

            <motion.span
              initial={{
                width: 0,
              }}
              whileInView={{
                width: 48,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.55,
              }}
              className="h-px bg-[#c99a45]"
            />

            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b4873b]">
              Kind Words
            </span>

            <motion.span
              initial={{
                width: 0,
              }}
              whileInView={{
                width: 48,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.55,
              }}
              className="h-px bg-[#c99a45]"
            />

          </div>

          <h2 className="font-serif text-4xl leading-[1.05] text-[#16284a] sm:text-5xl lg:text-6xl">
            Loved by our{" "}
            <span className="text-[#3159b5]">
              clients.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#667085] sm:text-base">
            Real experiences from people who
            trusted Blue Lotus with their
            special celebrations.
          </p>

        </motion.div>

        {/* ===================================================
            REVIEW CARD
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.7,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="group relative mx-auto max-w-[1050px]"
        >

          {/* SOFT GLOW */}

          <div className="pointer-events-none absolute -inset-2 bg-gradient-to-r from-[#3159b5]/[0.05] via-[#c99a45]/[0.08] to-[#3159b5]/[0.05] blur-xl" />

          <div className="relative overflow-hidden border border-[#e5dfd4] bg-white shadow-[0_20px_60px_rgba(22,40,74,0.08)] transition-shadow duration-500 group-hover:shadow-[0_25px_70px_rgba(22,40,74,0.12)]">

            {/* GOLD TOP LINE */}

            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#c99a45] to-[#3159b5]" />

            <div className="grid md:grid-cols-[0.85fr_1.35fr]">

              {/* =================================================
                  IMAGE
              ================================================== */}

              <div className="relative min-h-[300px] overflow-hidden bg-[#17294d] sm:min-h-[340px] md:min-h-[390px]">

                {/* =================================================
                    IMPORTANT:
                    IMAGE NOW CHANGES WITH THE REVIEW
                ================================================== */}

                <AnimatePresence
                  mode="wait"
                >
                  <motion.div
                    key={current.image}
                    initial={{
                      opacity: 0,
                      scale: 1.03,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 1.02,
                    }}
                    transition={{
                      duration:
                        shouldReduceMotion
                          ? 0
                          : 0.45,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={current.image}
                      alt={`${current.name} testimonial`}
                      fill
                      priority={active === 0}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* =================================================
                    IMAGE OVERLAY
                ================================================== */}

                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1c39]/85 via-[#0c1c39]/15 to-transparent" />

                {/* HOVER LIGHT */}

                <div className="pointer-events-none absolute inset-y-0 -left-1/3 z-10 w-1/3 skew-x-[-15deg] bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 blur-xl transition-all duration-700 group-hover:left-full group-hover:opacity-100" />

                {/* DECORATIVE CIRCLE */}

                <div className="absolute right-5 top-5 h-20 w-20 rounded-full border border-white/25" />

                {/* SPARKLE */}

                <Sparkles
                  size={18}
                  className="absolute right-10 top-10 text-white/80"
                />

                {/* =================================================
                    IMAGE TEXT
                ================================================== */}

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">

                  <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/65">
                    Blue Lotus
                  </p>

                  <h3 className="mt-2 font-serif text-2xl text-white sm:text-3xl">
                    Moments made magical.
                  </h3>

                </div>

              </div>

              {/* =================================================
                  REVIEW
              ================================================== */}

              <div className="relative flex min-h-[300px] flex-col justify-center overflow-hidden p-7 sm:min-h-[340px] sm:p-9 lg:p-12">

                {/* BACKGROUND QUOTE */}

                <Quote
                  size={110}
                  strokeWidth={0.7}
                  className="pointer-events-none absolute right-5 top-4 text-[#3159b5]/[0.06]"
                />

                <AnimatePresence mode="wait">

                  <motion.div
                    key={active}
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -15,
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
                    className="relative"
                  >

                    {/* STARS */}

                    <div className="mb-5 flex gap-1.5">

                      {[1, 2, 3, 4, 5].map(
                        (star) => (
                          <Star
                            key={star}
                            size={17}
                            fill="currentColor"
                            className="text-[#c99a45]"
                          />
                        )
                      )}

                    </div>

                    {/* REVIEW */}

                    <p className="max-w-2xl font-serif text-xl leading-[1.55] text-[#263653] sm:text-2xl lg:text-[27px]">
                      “{current.review}”
                    </p>

                    {/* PERSON */}

                    <div className="mt-7 flex items-end justify-between gap-4">

                      <div>

                        <p className="font-serif text-lg text-[#16284a]">
                          {current.name}
                        </p>

                        <div className="mt-1.5 flex items-center gap-2">

                          <span className="h-px w-6 bg-[#c99a45]" />

                          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9b7a43]">
                            Client Review
                          </span>

                        </div>

                      </div>

                      <Quote
                        size={44}
                        strokeWidth={1}
                        className="text-[#3159b5]/60"
                      />

                    </div>

                  </motion.div>

                </AnimatePresence>

              </div>

            </div>

          </div>

        </motion.div>

        {/* =====================================================
            CONTROLS
        ====================================================== */}

        <div className="mx-auto mt-6 flex max-w-[1050px] items-center justify-between">

          {/* =================================================
              DOTS
          ================================================== */}

          <div className="flex items-center gap-2">

            {testimonials.map(
              (item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() =>
                    setActive(index)
                  }
                  aria-label={`View review from ${item.name}`}
                  className="group/dot flex items-center"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-500 ${
                      active === index
                        ? "w-8 bg-[#3159b5]"
                        : "w-1.5 bg-[#cfc8bc] group-hover/dot:bg-[#c99a45]"
                    }`}
                  />
                </button>
              )
            )}

          </div>

          {/* =================================================
              ARROWS
          ================================================== */}

          <div className="flex gap-2">

            <motion.button
              type="button"
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 1.06,
                    }
              }
              whileTap={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 0.94,
                    }
              }
              onClick={previousReview}
              aria-label="Previous review"
              className="flex h-10 w-10 items-center justify-center border border-[#ddd5c8] bg-white text-[#3159b5] transition-all duration-300 hover:border-[#3159b5] hover:bg-[#3159b5] hover:text-white"
            >
              <ArrowLeft size={17} />
            </motion.button>

            <motion.button
              type="button"
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 1.06,
                    }
              }
              whileTap={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 0.94,
                    }
              }
              onClick={nextReview}
              aria-label="Next review"
              className="flex h-10 w-10 items-center justify-center bg-[#3159b5] text-white shadow-lg shadow-[#3159b5]/20 transition-all duration-300 hover:bg-[#244797]"
            >
              <ArrowRight size={17} />
            </motion.button>

          </div>

        </div>

        {/* =====================================================
            BOTTOM TRUST MESSAGE
        ====================================================== */}

        <div className="mt-7 flex items-center justify-center gap-3">

          <Sparkles
            size={13}
            className="text-[#c99a45]"
          />

          <div className="flex gap-1">

            {[1, 2, 3, 4, 5].map(
              (star) => (
                <Star
                  key={star}
                  size={12}
                  fill="currentColor"
                  className="text-[#c99a45]"
                />
              )
            )}

          </div>

          <span className="h-3 w-px bg-[#d8d1c5]" />

          <span className="text-[10px] uppercase tracking-[0.16em] text-[#7b8494]">
            Creating celebrations worth remembering
          </span>

          <Sparkles
            size={13}
            className="text-[#c99a45]"
          />

        </div>

      </div>
    </section>
  );
}