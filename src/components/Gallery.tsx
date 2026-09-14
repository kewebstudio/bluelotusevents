"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

const galleryImages = [
  {
    src: "/images/gallery/wedding/1.JPG",
  },
  {
    src: "/images/gallery/wedding/5.JPG",
  },
  {
    src: "/images/gallery/birthday/7.jpg",
  },
  {
    src: "/images/gallery/wedding/6.jpg",
  },
  {
    src: "/images/gallery/events/67.JPG",
  },
  {
    src: "/images/gallery/birthday/4.JPG",
  },
  {
    src: "/images/gallery/wedding/80.JPG",
  },
  {
    src: "/images/gallery/events/63.JPG",
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  const [isVisible, setIsVisible] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  /*
   * Only allow decorative animations while the gallery
   * is near the viewport.
   */
  useEffect(() => {
    const element = document.getElementById("gallery");

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

  /*
   * Prevent background page scrolling while the lightbox
   * is open.
   */
  useEffect(() => {
    if (!selectedImage) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedImage]);

  /*
   * Escape key closes lightbox.
   */
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [selectedImage]);

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      {/* =====================================================
          LIGHTWEIGHT BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* STATIC BLUE GLOW */}

        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#3159b5]/[0.035] blur-3xl" />

        {/* STATIC GOLD GLOW */}

        <div className="absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-[#c99a45]/[0.05] blur-3xl" />

        {/* STATIC DECORATIVE SPARKLES */}

        <Sparkles
          size={18}
          className="absolute left-[7%] top-32 text-[#c99a45]/50"
        />

        <Sparkles
          size={14}
          className="absolute right-[8%] top-24 text-[#3159b5]/40"
        />
      </div>

      <div className="relative mx-auto max-w-[1250px]">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-9 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          {/* LEFT */}

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
          >
            <div className="mb-4 flex items-center gap-3">
              <motion.span
                initial={{
                  width: 0,
                }}
                whileInView={{
                  width: 45,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                }}
                className="h-px bg-[#c99a45]"
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a77d38]">
                Our Work
              </span>

              <Sparkles
                size={12}
                className="text-[#c99a45]"
              />
            </div>

            <h2 className="font-serif text-4xl leading-[1] text-[#17294b] sm:text-5xl lg:text-6xl">
              Moments we
              <span className="block text-[#3159b5]">
                love creating.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-[#6c7585] sm:text-base">
              A glimpse of the celebrations and beautiful
              experiences brought to life by Blue Lotus
              Events & Decors.
            </p>
          </motion.div>

          {/* VIEW FULL GALLERY */}

          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3159b5]"
            >
              View Full Gallery

              <motion.span
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        x: 4,
                        rotate: -5,
                      }
                }
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3159b5] text-white shadow-lg shadow-[#3159b5]/20"
              >
                <ArrowRight size={15} />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* =====================================================
            GALLERY GRID
        ====================================================== */}

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3 lg:gap-4">
          {galleryImages.map((image, index) => {
            const featured =
              index === 0 || index === 5;

            return (
              <motion.button
                key={image.src}
                type="button"
                onClick={() =>
                  setSelectedImage(image.src)
                }
                initial={{
                  opacity: 0,
                  y: 25,
                  scale: 0.985,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.08,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -5,
                        scale: 1.01,
                      }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.985,
                      }
                }
                className={`gallery-home-card ${
                  featured
                    ? "col-span-2 row-span-2"
                    : "col-span-1 row-span-1"
                }`}
              >
                {/* IMAGE */}

                <Image
                  src={image.src}
                  alt="Blue Lotus Events & Decors"
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  loading={index < 4 ? "eager" : "lazy"}
                  className="gallery-home-image"
                />

                {/* OVERLAY */}

                <div className="gallery-home-overlay" />

                {/* HOVER LIGHT */}

                <div className="pointer-events-none absolute inset-y-0 -left-1/3 z-10 w-1/3 skew-x-[-15deg] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 blur-lg transition-all duration-700 group-hover:left-full group-hover:opacity-100" />

                {/* SPARKLE */}

                <span className="pointer-events-none absolute right-4 top-4 z-20 text-white/75 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                  <Sparkles size={14} />
                </span>

                {/* FEATURED INDICATOR */}

                {featured && (
                  <span className="pointer-events-none absolute bottom-4 left-4 z-20 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.2em] text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    Featured
                  </span>
                )}

                {/* VIEW ICON */}

                <span className="pointer-events-none absolute bottom-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#3159b5] opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-hover:rotate-[-5deg]">
                  <ArrowRight size={14} />
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* =====================================================
            BOTTOM
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
          className="mt-6 flex items-center justify-center gap-3"
        >
          <span className="h-px w-12 bg-[#ddd7cc]" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#9a7b49]">
            More beautiful moments await
          </span>

          <span className="h-px w-12 bg-[#ddd7cc]" />
        </motion.div>
      </div>

      {/* =====================================================
          LIGHTBOX
      ====================================================== */}

      <AnimatePresence>
        {selectedImage && (
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
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07101f]/95 p-4 backdrop-blur-md sm:p-8"
          >
            {/* STATIC GLOW */}

            <div className="pointer-events-none absolute h-[450px] w-[450px] rounded-full bg-[#3159b5]/15 blur-3xl" />

            {/* STATIC RING */}

            <div className="pointer-events-none absolute h-[min(90vw,700px)] w-[min(90vw,700px)] rounded-full border border-dashed border-[#c99a45]/15" />

            {/* CLOSE BUTTON */}

            <motion.button
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
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-5 top-5 z-[110] flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              aria-label="Close gallery image"
            >
              <X size={20} />
            </motion.button>

            {/* IMAGE */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="relative z-[105] h-[75vh] w-full max-w-[1050px] overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-[0_30px_100px_rgba(0,0,0,0.6)]"
            >
              <Image
                src={selectedImage}
                alt="Blue Lotus Events & Decors"
                fill
                sizes="100vw"
                className="object-contain"
              />

              {/* ONE-TIME LIGHT SWEEP */}

              <motion.div
                initial={{
                  x: "-120%",
                }}
                animate={{
                  x: "120%",
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.1,
                }}
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          GALLERY CSS
      ====================================================== */}

      <style jsx global>{`
        .gallery-home-card {
          position: relative;
          min-height: 150px;
          overflow: hidden;
          border-radius: 14px;
          background: #e9e5dc;
          cursor: pointer;
          isolation: isolate;

          box-shadow:
            0 8px 25px rgba(25, 40, 70, 0.06);

          transition:
            transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.45s ease;
        }

        @media (min-width: 640px) {
          .gallery-home-card {
            min-height: 210px;
            border-radius: 17px;
          }
        }

        .gallery-home-card:hover {
          z-index: 5;

          box-shadow:
            0 20px 45px rgba(25, 40, 70, 0.14),
            0 0 0 1px rgba(201, 154, 69, 0.18);
        }

        .gallery-home-image {
          object-fit: cover;

          transition:
            transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
            filter 0.5s ease;
        }

        .gallery-home-card:hover .gallery-home-image {
          transform: scale(1.07);
          filter: saturate(1.08);
        }

        .gallery-home-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;

          background:
            linear-gradient(
              180deg,
              rgba(5, 15, 30, 0.04),
              transparent 45%,
              rgba(5, 15, 30, 0.65)
            );

          transition:
            background 0.4s ease;
        }

        .gallery-home-card:hover
          .gallery-home-overlay {
          background:
            linear-gradient(
              180deg,
              rgba(5, 15, 30, 0.1),
              transparent 30%,
              rgba(5, 15, 30, 0.75)
            );
        }

        @media (max-width: 639px) {
          .gallery-home-card {
            min-height: 145px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gallery-home-card,
          .gallery-home-image {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}