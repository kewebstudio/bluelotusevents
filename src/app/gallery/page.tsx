"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Mail,
  Phone,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const galleryCategories = [
  "All",
  "Weddings",
  "Birthdays",
  "Events",
] as const;

type GalleryCategory = (typeof galleryCategories)[number];

type GalleryImage = {
  id: number;
  src: string;
  category: GalleryCategory;
  name: string;
};



/* =========================================================
   EXACT CONTACT PAGE EVENT TYPES
========================================================= */

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

type FormState = {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  eventType: "",
  eventDate: "",
  message: "",
};

export default function GalleryPage() {
  /* =========================================================
     GALLERY
  ========================================================= */

  const [selected, setSelected] =
    useState<number | null>(null);

  const [images, setImages] =
    useState<GalleryImage[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory>("All");

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const response = await fetch("/api/gallery", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load gallery images");
        }

        const data: GalleryImage[] =
          await response.json();

        setImages(data);
      } catch (error) {
        console.error(
          "Failed to load gallery:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  const filteredImages =
    activeCategory === "All"
      ? images
      : images.filter(
          (image) =>
            image.category === activeCategory
        );

  /* =========================================================
     ENQUIRY MODAL
  ========================================================= */

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

  const [form, setForm] =
    useState<FormState>(initialForm);

  /* =========================================================
     OPEN / CLOSE BOOKING
  ========================================================= */

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

  /* =========================================================
     BODY LOCK
  ========================================================= */

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* =========================================================
     ESCAPE KEY
  ========================================================= */

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === "Escape" &&
        bookingOpen
      ) {
        closeBooking();
      }

      if (
        event.key === "Escape" &&
        selected !== null
      ) {
        setSelected(null);
      }

      if (
        selected !== null &&
        event.key === "ArrowLeft"
      ) {
        setSelected((current) =>
          current === null
            ? null
            : current === 0
              ? images.length - 1
              : current - 1
        );
      }

      if (
        selected !== null &&
        event.key === "ArrowRight"
      ) {
        setSelected((current) =>
          current === null
            ? null
            : current === images.length - 1
              ? 0
              : current + 1
        );
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
  }, [bookingOpen, selected]);

  /* =========================================================
     GALLERY NAVIGATION
  ========================================================= */

  const previousImage = () => {
    setSelected((current) => {
      if (current === null) return null;

      return current === 0
        ? images.length - 1
        : current - 1;
    });
  };

  const nextImage = () => {
    setSelected((current) => {
      if (current === null) return null;

      return current === images.length - 1
        ? 0
        : current + 1;
    });
  };

  /* =========================================================
     FORM UPDATE
  ========================================================= */

  const updateForm = (
    field: keyof FormState,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setSubmitError("");
  };

  /* =========================================================
     WEB3FORMS — SAME AS CONTACT PAGE
  ========================================================= */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (sending) return;

    setSubmitError("");

    if (!form.eventType) {
      setSubmitError(
        "Please select your event type."
      );
      return;
    }

    setSending(true);

    try {
      const accessKey =
        process.env
          .NEXT_PUBLIC_WEB3FORMS_KEY;

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
            "Content-Type":
              "application/json",
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
              form.eventDate ||
              "Not specified",

            message:
              form.message ||
              "No additional message",

            botcheck: "",
          }),
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Your enquiry could not be sent. Please try again."
        );
      }

      setSubmitted(true);
      setEventDropdownOpen(false);

      setForm(initialForm);
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
           GALLERY MOTION
        ====================================================== */

        .gallery-float {
          animation:
            galleryFloat 7s
            ease-in-out infinite;
          will-change: transform;
        }

        @keyframes galleryFloat {
          0%,
          100% {
            transform: translate3d(
              0,
              0,
              0
            );
          }

          50% {
            transform: translate3d(
              0,
              -8px,
              0
            );
          }
        }

        /* =====================================================
           CTA SHIMMER
        ====================================================== */

        .gallery-shimmer {
          animation:
            galleryShimmer 4s
            ease-in-out infinite;
        }

        @keyframes galleryShimmer {
          0% {
            transform: translateX(-130%)
              skewX(-18deg);
          }

          55%,
          100% {
            transform: translateX(130%)
              skewX(-18deg);
          }
        }

        /* =====================================================
           REDUCED MOTION
        ====================================================== */

        @media (
          prefers-reduced-motion: reduce
        ) {
          .gallery-float,
          .gallery-shimmer {
            animation: none !important;
          }
        }
      `}</style>

      <main className="min-h-screen overflow-hidden bg-[#f8f6f1] text-[#17294b]">

        {/* =====================================================
            INTRO
        ====================================================== */}

        <section className="relative overflow-hidden border-b border-[#17294b]/8 bg-[#f8f6f1]">

          {/* subtle glow */}

          <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-[#3159b5]/8 blur-3xl" />

          <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-[#c99a45]/8 blur-3xl" />

          {/* sparkles */}

          <motion.div
            animate={{
              y: [0, -8, 0],
              opacity: [0.25, 0.8, 0.25],
              rotate: [0, 8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute right-[12%] top-[28%] text-[#c99a45]"
          >
            <Sparkles size={17} />
          </motion.div>

          <motion.div
            animate={{
              y: [0, 7, 0],
              opacity: [0.15, 0.6, 0.15],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute left-[8%] bottom-[20%] text-[#3159b5]/50"
          >
            <Sparkles size={13} />
          </motion.div>

          <div className="relative mx-auto max-w-[1400px] px-5 pb-8 pt-12 sm:px-8 sm:pb-10 sm:pt-16 lg:px-12 lg:pb-12">

            <div className="mb-5 flex items-center gap-3">

              <span className="h-px w-9 bg-[#c99a45]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#a67a32]">
                Blue Lotus Events & Decors
              </span>

              <Sparkles
                size={12}
                className="text-[#c99a45]"
              />

            </div>

            <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">

              <div>

                <h1 className="max-w-4xl font-serif text-[43px] leading-[0.95] tracking-[-1.5px] sm:text-[55px] lg:text-[67px]">

                  Moments{" "}

                  <span className="text-[#3159b5]">
                    beautifully
                  </span>

                  <br />

                  remembered.

                </h1>

                <p className="mt-5 max-w-[620px] text-[13px] leading-6 text-[#687489] sm:text-[14px] sm:leading-7">

                  A glimpse into celebrations,
                  décor and environments created
                  by Blue Lotus Events & Decors.

                </p>

              </div>

              {/* =================================================
                  PLAN YOUR EVENT
                  IMPORTANT: OPENS MODAL
              ================================================== */}

              <button
                type="button"
                onClick={openBooking}
                className="group relative inline-flex w-fit items-center gap-3 overflow-hidden bg-[#3159b5] px-5 py-3.5 text-[12px] font-semibold text-white shadow-[0_12px_30px_rgba(49,89,181,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#274b9d] hover:shadow-[0_18px_38px_rgba(49,89,181,0.24)] active:scale-[0.98]"
              >

                <span className="gallery-shimmer pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <span className="relative z-10">
                  Plan Your Event
                </span>

                <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight
                    size={14}
                  />
                </span>

              </button>

            </div>

          </div>
        </section>

        {/* =====================================================
            GALLERY HEADER
        ====================================================== */}

        <section className="mx-auto max-w-[1400px] px-4 pb-5 pt-8 sm:px-7 sm:pb-7 sm:pt-10 lg:px-10">

          <div className="mb-5 flex items-end justify-between gap-5">

            <div>

              <div className="mb-2 flex items-center gap-2">

                <span className="h-px w-7 bg-[#c99a45]" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#a67a32]">
                  Our Work
                </span>

              </div>

              <h2 className="max-w-2xl font-serif text-[31px] leading-[1] tracking-[-0.8px] sm:text-[40px] lg:text-[48px]">

                Where ideas bloom into{" "}

                <span className="text-[#3159b5]">
                  unforgettable
                </span>{" "}

                experiences.

              </h2>

            </div>

            <div className="hidden items-center gap-2 pb-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9aa1ad] sm:flex">

              <span>
                {filteredImages.length}{" "}
                {filteredImages.length === 1
                  ? "moment"
                  : "moments"}
              </span>

              <span className="text-[#c99a45]">
                ✦
              </span>

              <span>
                Hyderabad
              </span>

            </div>

          </div>

          {/* =====================================================
              GALLERY CATEGORIES
          ====================================================== */}

          <div className="mb-6 -mx-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex min-w-max items-center gap-2">
              {galleryCategories.map((category) => {
                const active =
                  activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setActiveCategory(category)
                    }
                    className={`shrink-0 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 ${
                      active
                        ? "bg-[#3159b5] text-white shadow-sm"
                        : "border border-[#17294b]/10 bg-white text-[#17294b]/65 hover:border-[#3159b5]/35 hover:text-[#3159b5]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* =====================================================
              GALLERY GRID — ORIGINAL LAYOUT PRESERVED
          ====================================================== */}

          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4 lg:gap-4">

            {loading ? (
              <div className="col-span-2 py-16 text-center text-sm text-[#687489] lg:col-span-4">
                Loading our gallery...
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="col-span-2 py-16 text-center text-sm text-[#687489] lg:col-span-4">
                No images found in this category.
              </div>
            ) : (
              filteredImages.map(
                (image) => {

                const originalIndex =
                  images.findIndex(
                    (item) =>
                      item.id === image.id
                  );

                const wide =
                  originalIndex % 9 === 0;

                return (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() =>
                      setSelected(originalIndex)
                    }
                    className={`group relative overflow-hidden rounded-[4px] bg-[#e7e4dd] outline-none focus-visible:ring-2 focus-visible:ring-[#3159b5] focus-visible:ring-offset-2 ${
                      wide
                        ? "col-span-2 aspect-[2/1]"
                        : "col-span-1 aspect-[1/1.12]"
                    }`}
                  >

                    <Image
                      src={image.src}
                      alt={`Blue Lotus Events & Decors — event ${image.id}`}
                      fill
                      loading="lazy"
                      sizes={
                        wide
                          ? "(max-width: 640px) 100vw, 50vw"
                          : "(max-width: 640px) 50vw, 25vw"
                      }
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                    />

                    <span className="absolute inset-0 bg-[#07152d]/0 transition-colors duration-500 group-hover:bg-[#07152d]/10" />

                    <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-[#162544] opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 sm:right-3 sm:top-3 sm:h-8 sm:w-8">

                      <ArrowUpRight
                        size={14}
                      />

                    </span>

                  </button>
                );
                }
              )
            )}

          </div>

        </section>

        {/* =====================================================
            SMALL CTA AFTER GALLERY
            NOT A GIANT FOOTER CTA
        ====================================================== */}

        <section className="px-5 pb-16 pt-8 sm:px-8 sm:pb-20">

          <div className="relative mx-auto max-w-[850px] overflow-hidden bg-[#17294b] px-6 py-9 text-center sm:px-10 sm:py-11">

            <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-[#3159b5]/30 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-[#c99a45]/20 blur-3xl" />

            <div className="relative">

              <div className="mb-3 flex items-center justify-center gap-2">

                <span className="h-px w-7 bg-[#c99a45]" />

                <Sparkles
                  size={13}
                  className="text-[#c99a45]"
                />

                <span className="h-px w-7 bg-[#c99a45]" />

              </div>

              <h3 className="font-serif text-3xl text-white sm:text-4xl">

                Planning something
                beautiful?

              </h3>

              <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-white/55 sm:text-sm">

                Tell us about your celebration
                and let&apos;s create an experience
                that feels uniquely yours.

              </p>

              <button
                type="button"
                onClick={openBooking}
                className="group relative mt-6 inline-flex items-center gap-3 bg-[#c99a45] px-6 py-3.5 text-xs font-semibold text-[#17294b] transition-all duration-300 hover:-translate-y-1 hover:bg-[#d7aa5d]"
              >

                Plan Your Event

                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#17294b]/10 transition-transform duration-300 group-hover:rotate-45">

                  <ArrowUpRight
                    size={13}
                  />

                </span>

              </button>

            </div>

          </div>

        </section>

        {/* =====================================================
            GALLERY LIGHTBOX
        ====================================================== */}

        <AnimatePresence>

          {selected !== null && (

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
              className="fixed inset-0 z-[900] flex items-center justify-center bg-[#071224]/95 p-3 backdrop-blur-sm sm:p-6"
              onMouseDown={(event) => {
                if (
                  event.target ===
                  event.currentTarget
                ) {
                  setSelected(null);
                }
              }}
            >

              {/* CLOSE */}

              <button
                type="button"
                onClick={() =>
                  setSelected(null)
                }
                aria-label="Close image"
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
              >
                <X size={20} />
              </button>

              {/* PREVIOUS */}

              <button
                type="button"
                onClick={previousImage}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:left-7"
              >
                ←
              </button>

              {/* NEXT */}

              <button
                type="button"
                onClick={nextImage}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:right-7"
              >
                →
              </button>

              {/* IMAGE */}

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className="relative max-h-[88vh] max-w-[92vw]"
              >

                <Image
                  src={
                    images[selected].src
                  }
                  alt="Blue Lotus Events & Decors"
                  width={1600}
                  height={1200}
                  priority
                  className="max-h-[84vh] w-auto max-w-[90vw] rounded-lg object-contain"
                />

                <div className="mt-3 text-center text-[9px] font-semibold uppercase tracking-[0.25em] text-[#d9b776]">
                  Blue Lotus Events & Decors
                </div>

              </motion.div>

            </motion.div>

          )}

        </AnimatePresence>

        {/* =====================================================
            EXACT CONTACT FORM — POPUP
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
              className="fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto bg-[#081329]/75 px-4 py-6 backdrop-blur-md sm:px-6"
              onMouseDown={(event) => {
                if (
                  event.target ===
                  event.currentTarget
                ) {
                  closeBooking();
                }
              }}
            >

              {/* GLOWS */}

              <div className="pointer-events-none fixed -left-32 -top-32 h-80 w-80 rounded-full bg-[#3159b5]/20 blur-3xl gallery-float" />

              <div className="pointer-events-none fixed -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#c99a45]/15 blur-3xl gallery-float" />

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
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="relative my-auto w-full max-w-2xl overflow-hidden bg-white shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
              >

                {/* TOP ACCENT */}

                <div className="absolute left-0 right-0 top-0 h-1 overflow-hidden bg-gradient-to-r from-[#3159b5] via-[#c99a45] to-[#3159b5]">

                  <div className="gallery-shimmer absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                </div>

                {/* HEADER */}

                <div className="flex items-start justify-between border-b border-gray-100 px-5 py-5 sm:px-7 sm:py-6">

                  <div>

                    <div className="mb-2 flex items-center gap-2">

                      <span className="h-px w-7 bg-[#c99a45]" />

                      <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#3159b5]">
                        Let&apos;s celebrate
                      </span>

                      <Sparkles
                        size={13}
                        className="text-[#c99a45]"
                      />

                    </div>

                    <h2 className="font-serif text-2xl text-[#17234f] sm:text-3xl">
                      Book Your Event
                    </h2>

                    <p className="mt-1.5 text-xs text-gray-500 sm:text-sm">
                      Tell us a little about
                      your celebration.
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={closeBooking}
                    aria-label="Close enquiry form"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all duration-300 hover:rotate-90 hover:border-[#3159b5] hover:bg-[#3159b5] hover:text-white"
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
                    className="px-6 py-12 text-center sm:px-10"
                  >

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#3159b5]/10 text-[#c99a45]">
                      <Check size={28} />
                    </div>

                    <h3 className="mt-5 font-serif text-2xl text-[#17234f]">
                      Enquiry Received!
                    </h3>

                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                      Thank you for reaching
                      out. We&apos;ll be in touch
                      with you soon.
                    </p>

                    <button
                      type="button"
                      onClick={closeBooking}
                      className="mt-6 bg-[#3159b5] px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#274b9d]"
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
                          htmlFor="gallery-name"
                          className="mb-1.5 block text-xs font-semibold text-[#17234f]"
                        >
                          Your Name
                        </label>

                        <div className="relative">

                          <User
                            size={15}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          />

                          <input
                            id="gallery-name"
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
                            className="h-11 w-full border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#3159b5] focus:bg-white focus:ring-2 focus:ring-[#3159b5]/10"
                          />

                        </div>

                      </div>

                      {/* PHONE */}

                      <div>

                        <label
                          htmlFor="gallery-phone"
                          className="mb-1.5 block text-xs font-semibold text-[#17234f]"
                        >
                          Phone Number
                        </label>

                        <div className="relative">

                          <Phone
                            size={15}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          />

                          <input
                            id="gallery-phone"
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
                            className="h-11 w-full border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#3159b5] focus:bg-white focus:ring-2 focus:ring-[#3159b5]/10"
                          />

                        </div>

                      </div>

                    </div>

                    {/* EMAIL + EVENT */}

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">

                      {/* EMAIL */}

                      <div>

                        <label
                          htmlFor="gallery-email"
                          className="mb-1.5 block text-xs font-semibold text-[#17234f]"
                        >
                          Email Address
                        </label>

                        <div className="relative">

                          <Mail
                            size={15}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          />

                          <input
                            id="gallery-email"
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
                            className="h-11 w-full border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#3159b5] focus:bg-white focus:ring-2 focus:ring-[#3159b5]/10"
                          />

                        </div>

                      </div>

                      {/* EVENT TYPE */}

                      <div className="relative">

                        <label className="mb-1.5 block text-xs font-semibold text-[#17234f]">
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
                              ? "border-[#3159b5] bg-white ring-2 ring-[#3159b5]/10"
                              : "border-gray-200 hover:border-[#3159b5]/50"
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
                            className={`text-[#3159b5] transition-transform duration-300 ${
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
                              className="absolute left-0 right-0 top-full z-[100] overflow-hidden border border-[#3159b5]/15 bg-white shadow-[0_20px_45px_rgba(23,35,79,0.18)]"
                            >

                              <div className="h-[3px] bg-gradient-to-r from-[#3159b5] via-[#c99a45] to-[#3159b5]" />

                              <div className="p-1.5">

                                {eventTypes.map(
                                  (type) => {

                                    const selectedType =
                                      form.eventType ===
                                      type;

                                    return (

                                      <button
                                        key={type}
                                        type="button"
                                        role="option"
                                        aria-selected={
                                          selectedType
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
                                          selectedType
                                            ? "bg-[#3159b5] text-white"
                                            : "text-[#17234f] hover:bg-[#f4f6fb] hover:pl-4"
                                        }`}
                                      >

                                        <span className="flex items-center gap-2.5">

                                          <span
                                            className={`h-1.5 w-1.5 rounded-full ${
                                              selectedType
                                                ? "bg-[#e5c57b]"
                                                : "bg-[#c99a45]/60"
                                            }`}
                                          />

                                          {type}

                                        </span>

                                        {selectedType && (
                                          <Check
                                            size={15}
                                            className="text-[#e5c57b]"
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
                        htmlFor="gallery-date"
                        className="mb-1.5 block text-xs font-semibold text-[#17234f]"
                      >
                        Event Date
                      </label>

                      <div className="relative">

                        <CalendarDays
                          size={15}
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                          id="gallery-date"
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
                          className="h-11 w-full border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-700 outline-none transition-all duration-300 focus:border-[#3159b5] focus:bg-white focus:ring-2 focus:ring-[#3159b5]/10"
                        />

                      </div>

                    </div>

                    {/* MESSAGE */}

                    <div className="mt-4">

                      <label
                        htmlFor="gallery-message"
                        className="mb-1.5 block text-xs font-semibold text-[#17234f]"
                      >
                        Tell Us About Your Event
                      </label>

                      <textarea
                        id="gallery-message"
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
                        className="w-full resize-none border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#3159b5] focus:bg-white focus:ring-2 focus:ring-[#3159b5]/10"
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
                      className="group relative mt-5 flex h-12 w-full items-center justify-center gap-3 overflow-hidden bg-[#3159b5] text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#274b9d] disabled:cursor-not-allowed disabled:opacity-70"
                    >

                      {!sending && (
                        <span className="gallery-shimmer absolute inset-y-0 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
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
                      We&apos;ll get back to you
                      regarding your event.
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