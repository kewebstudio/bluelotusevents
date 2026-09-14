"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Camera,
  Check,
  ChefHat,
  ChevronDown,
  Clapperboard,
  Gift,
  Headphones,
  Heart,
  Lightbulb,
  Mail,
  MapPin,
  Music,
  Palette,
  PartyPopper,
  Phone,
  Presentation,
  Send,
  Sparkles,
  Truck,
  User,
  WandSparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

/* =========================================================
   COMPANY SERVICE PORTFOLIO
   Source: Blue Lotus Events & Decors Company Profile
========================================================= */

const services = [
  {
    title: "Wedding Planning & Décor",
    description:
      "Mandap, stage, entrance, reception, seating, floral styling and complete wedding environments.",
    icon: Heart,
    image: "/images/gallery/wedding/1.JPG",
  },
  {
    title: "Pre-Wedding Celebrations",
    description:
      "Engagements, mehendi, haldi, sangeet, cocktail evenings and family functions.",
    icon: Sparkles,
    image: "/images/gallery/events/12.JPG",
  },
  {
    title: "Birthdays & Private Events",
    description:
      "Theme-based birthdays, anniversaries, baby showers, housewarmings and intimate celebrations.",
    icon: PartyPopper,
    image: "/images/gallery/birthday/59.JPG",
  },
  {
    title: "Corporate Events",
    description:
      "Product launches, leadership meetings, conferences, employee events and branded experiences.",
    icon: Clapperboard,
    image: "/images/services/corporate.jpeg",
  },
  {
    title: "Themes, Concepts & Design",
    description:
      "Traditional, modern, luxury and bespoke concepts developed for the client’s vision.",
    icon: Palette,
  },
  {
    title: "Venue Selection",
    description:
      "Venue recommendations aligned with guest count, location, style, logistics and budget.",
    icon: MapPin,
  },
  {
    title: "Photography & Films",
    description:
      "Professional photography, candid coverage, cinematic video and event highlights.",
    icon: Camera,
  },
  {
    title: "Lighting, Sound & Production",
    description:
      "Stage lighting, ambient lighting, sound systems, LED screens, DJ and dance-floor production.",
    icon: Lightbulb,
    image: "/images/services/stage-1.jpeg",
  },
  {
    title: "Entertainment & Artists",
    description:
      "DJs, live bands, dancers, performers, celebrity artists and curated entertainment.",
    icon: Music,
  },
  {
    title: "Invitations & Stationery",
    description:
      "Printed invitations, e-invites, signage and event stationery aligned with the theme.",
    icon: Send,
  },
  {
    title: "Catering Coordination",
    description:
      "Caterer selection, menu planning and food-service coordination based on event requirements.",
    icon: ChefHat,
  },
  {
    title: "Guest Logistics",
    description:
      "Transportation, valet support, hospitality coordination and movement planning.",
    icon: Truck,
  },
  {
    title: "Return Gifts & Hampers",
    description:
      "Customised guest gifts, hampers and elegant packaging solutions.",
    icon: Gift,
  },
  {
    title: "Stage Management & Show Flow",
    description:
      "Entries, performances, ceremonies, cues, timing and end-to-end event flow.",
    icon: Presentation,
  },
  {
    title: "Post-Event Support",
    description:
      "Vendor closure, dismantling coordination, clean-up and post-event follow-through.",
    icon: WandSparkles,
  },
  {
    title: "Special Effects & Infrastructure",
    description:
      "Cold-fire effects, dry ice, CO₂ effects, trussing, flooring, lounge furniture and technical support.",
    icon: Headphones,
  },
];

/* =========================================================
   FEATURED SERVICES
========================================================= */

const featuredServices = services.slice(0, 4);

/* =========================================================
   EVENT TYPES
   Same enquiry structure used by Contact page
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

/* =========================================================
   SPARKLE
========================================================= */

function Sparkle({
  className = "",
  delay = 0,
  size = 13,
}: {
  className?: string;
  delay?: number;
  size?: number;
}) {
  return (
    <motion.span
      className={`pointer-events-none absolute text-[#D6B773] ${className}`}
      animate={{
        opacity: [0.15, 0.85, 0.15],
        scale: [0.8, 1.08, 0.8],
        rotate: [0, 25, 0],
      }}
      transition={{
        duration: 3.5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Sparkles size={size} strokeWidth={1.1} />
    </motion.span>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function ServicesPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [eventDropdownOpen, setEventDropdownOpen] =
    useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    eventDate: "",
    message: "",
  });

  /* =======================================================
     OPEN POPUP
  ======================================================== */

  const openBooking = () => {
    setBookingOpen(true);
    setEventDropdownOpen(false);
    setSubmitted(false);
    setSubmitError("");
    setSending(false);

    document.body.style.overflow = "hidden";
  };

  /* =======================================================
     CLOSE POPUP
  ======================================================== */

  const closeBooking = () => {
    setBookingOpen(false);
    setEventDropdownOpen(false);
    setSubmitted(false);
    setSubmitError("");
    setSending(false);

    document.body.style.overflow = "";
  };

  /* =======================================================
     ESCAPE
  ======================================================== */

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && bookingOpen) {
        closeBooking();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow = "";
    };
  }, [bookingOpen]);

  /* =======================================================
     FORM UPDATE
  ======================================================== */

  const updateForm = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setSubmitError("");
  };

  /* =======================================================
     WEB3FORMS
  ======================================================== */

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

      setEventDropdownOpen(true);

      return;
    }

    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!accessKey) {
      setSubmitError(
        "The enquiry service is not configured. Please check your Web3Forms key."
      );

      return;
    }

    setEventDropdownOpen(false);
    setSending(true);

    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            access_key: accessKey,

            subject:
              "New Event Enquiry — Blue Lotus Events & Decors",

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
              "No additional message provided.",
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to send the enquiry."
        );
      }

      setSubmitted(true);

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
        "Web3Forms submission error:",
        error
      );

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to send your enquiry right now. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <main className="overflow-hidden bg-[#FAF7F0] text-[#0B1F3A]">

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative overflow-hidden bg-[#FAF7F0]">

          <div className="pointer-events-none absolute -left-32 -top-32 h-[320px] w-[320px] rounded-full border border-dashed border-[#D6B773]/20 animate-[spin_26s_linear_infinite]" />

          <div className="pointer-events-none absolute -right-40 -top-20 h-[420px] w-[420px] rounded-full bg-[#2457A6]/[0.045] blur-3xl" />

          <Sparkle
            className="left-[8%] top-[28%]"
            size={15}
          />

          <Sparkle
            className="right-[14%] top-[18%]"
            size={12}
            delay={1}
          />

          <div className="relative mx-auto grid max-w-[1350px] items-center gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:px-10 lg:py-20">

            {/* COPY */}

            <motion.div
              initial={{
                opacity: 0,
                x: -25,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
              }}
            >

              <div className="flex items-center gap-3">

                <span className="h-px w-9 bg-[#D6B773]" />

                <span className="text-[8px] font-semibold uppercase tracking-[0.35em] text-[#8A6F32]">
                  Our Service Portfolio
                </span>

                <Sparkles
                  size={11}
                  strokeWidth={1}
                  className="text-[#D6B773]"
                />

              </div>

              <h1 className="mt-5 max-w-[600px] font-serif text-[48px] leading-[0.94] tracking-[-2px] sm:text-[64px] lg:text-[78px]">

                Creative concepts.

                <br />

                <span className="text-[#2457A6]">
                  Elegant décor.
                </span>

                <br />

                Seamless celebrations.

              </h1>

              <div className="mt-6 h-px w-12 bg-[#D6B773]" />

              <p className="mt-5 max-w-[520px] text-[13px] leading-7 text-[#5F6B7A] sm:text-[14px]">
                Blue Lotus provides flexible support—from
                individual décor services to complete
                end-to-end event management.
              </p>

              <button
                type="button"
                onClick={openBooking}
                className="group mt-6 inline-flex items-center gap-3 bg-[#2457A6] px-6 py-3.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_14px_35px_rgba(49,93,184,.18)] transition-all duration-500 hover:-translate-y-1 hover:bg-[#1D478B]"
              >
                Plan Your Event

                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>

            </motion.div>


            {/* HERO IMAGE */}

            <motion.div
              initial={{
                opacity: 0,
                x: 30,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.9,
                delay: 0.1,
              }}
              className="relative"
            >

              <div className="absolute -right-4 -top-4 z-20 flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-[#D6B773]/50 animate-[spin_22s_linear_infinite] sm:-right-7 sm:-top-7 sm:h-20 sm:w-20">

                <Sparkles
                  size={20}
                  strokeWidth={1}
                  className="text-[#D6B773]"
                />

              </div>

              <div className="absolute -bottom-5 -left-5 h-24 w-24 border-b border-l border-[#D6B773]/60" />

              <div className="group relative overflow-hidden rounded-[22px] shadow-[0_25px_70px_rgba(20,35,65,.15)]">

                <Image
                  src="/images/services/wedding.jpeg"
                  alt="Wedding Planning & Décor"
                  width={1300}
                  height={900}
                  priority
                  className="h-[360px] w-full object-cover transition duration-[1400ms] group-hover:scale-105 sm:h-[470px] lg:h-[535px]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#10182c]/70 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md">

                      <Heart
                        size={15}
                        strokeWidth={1.1}
                      />

                    </div>

                    <div>

                      <p className="font-serif text-[21px] leading-none text-white">
                        Wedding Planning &amp; Décor
                      </p>

                      <p className="mt-1 text-[7px] uppercase tracking-[0.3em] text-white/65">
                        Blue Lotus Events &amp; Decors
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </motion.div>

          </div>

        </section>


        {/* =====================================================
            FLEXIBLE SUPPORT
        ====================================================== */}

        <section className="relative bg-white px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">

          <div className="mx-auto max-w-[1250px]">

            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
              }}
              className="grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end"
            >

              <div>

                <div className="flex items-center gap-3">

                  <span className="h-px w-8 bg-[#D6B773]" />

                  <span className="text-[8px] font-semibold uppercase tracking-[0.32em] text-[#8A6F32]">
                    Blue Lotus Services
                  </span>

                </div>

                <h2 className="mt-3 max-w-[750px] font-serif text-[40px] leading-[0.95] tracking-[-1px] sm:text-[55px]">

                  From individual décor services

                  <br />

                  <span className="text-[#2457A6]">
                    to complete event management.
                  </span>

                </h2>

              </div>

              <p className="text-[13px] leading-7 text-[#5F6B7A]">
                Blue Lotus provides flexible support—from
                individual décor services to complete
                end-to-end event management.
              </p>

            </motion.div>

          </div>

        </section>


        {/* =====================================================
            FEATURED SERVICES
        ====================================================== */}

        <section className="relative bg-[#FAF7F0] px-5 py-11 sm:px-8 sm:py-15 lg:px-10 lg:py-18">

          <div className="mx-auto max-w-[1320px]">

            <div className="mb-7 flex items-end justify-between">

              <div>

                <div className="flex items-center gap-2">

                  <Sparkles
                    size={12}
                    className="text-[#D6B773]"
                  />

                  <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#8A6F32]">
                    Featured
                  </span>

                </div>

                <h2 className="mt-2 font-serif text-[38px] leading-none sm:text-[50px]">
                  Celebrations &amp; events
                </h2>

              </div>

              <div className="hidden h-px w-20 bg-[#D6B773]/40 sm:block" />

            </div>


            <div className="grid gap-4 md:grid-cols-2">

              {featuredServices.map(
                (service, index) => {
                  const Icon = service.icon;

                  return (
                    <motion.article
                      key={service.title}
                      initial={{
                        opacity: 0,
                        y: 20,
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
                        duration: 0.55,
                        delay: index * 0.06,
                      }}
                      className="group overflow-hidden rounded-[20px] border border-[#D8D2C7] bg-white"
                    >

                      <div className="grid sm:grid-cols-[0.85fr_1.15fr]">

                        <div className="flex flex-col justify-between p-6 sm:p-7">

                          <div>

                            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D6B773]/40">

                              <Icon
                                size={16}
                                strokeWidth={1.1}
                                className="text-[#8A6F32]"
                              />

                            </div>

                            <h3 className="mt-5 font-serif text-[27px] leading-none text-[#0B1F3A]">
                              {service.title}
                            </h3>

                            <p className="mt-4 text-[12px] leading-6 text-[#5F6B7A]">
                              {service.description}
                            </p>

                          </div>

                          <div className="mt-6 flex items-center gap-2">

                            <span className="h-px w-6 bg-[#D6B773] transition-all duration-500 group-hover:w-11" />

                            <span className="text-[7px] uppercase tracking-[0.25em] text-[#8A6F32]">
                              Blue Lotus
                            </span>

                          </div>

                        </div>


                        {service.image && (
                          <div className="relative min-h-[230px] overflow-hidden">

                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              sizes="(max-width: 640px) 100vw, 50vw"
                              className="object-cover transition duration-[1300ms] group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-[#10182c]/35 to-transparent" />

                            <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-transform duration-500 group-hover:rotate-45">

                              <ArrowUpRight size={13} />

                            </div>

                          </div>
                        )}

                      </div>

                    </motion.article>
                  );
                }
              )}

            </div>

          </div>

        </section>


        {/* =====================================================
            ALL 16 SERVICES
        ====================================================== */}

        <section
          id="services"
          className="relative bg-white px-5 py-11 sm:px-8 sm:py-16 lg:px-10 lg:py-18"
        >

          <Sparkle
            className="right-[7%] top-[9%]"
            size={13}
          />

          <div className="mx-auto max-w-[1300px]">

            <div className="mb-8">

              <div className="flex items-center gap-3">

                <span className="h-px w-8 bg-[#D6B773]" />

                <span className="text-[8px] font-semibold uppercase tracking-[0.32em] text-[#8A6F32]">
                  Complete Service Portfolio
                </span>

              </div>

              <div className="mt-3 flex flex-col justify-between gap-3 lg:flex-row lg:items-end">

                <h2 className="font-serif text-[40px] leading-[0.95] tracking-[-1px] sm:text-[54px]">

                  Our services.

                </h2>

                <p className="max-w-[430px] text-[12px] leading-6 text-[#5F6B7A]">
                  Creative design, detailed planning and
                  dependable on-ground execution.
                </p>

              </div>

            </div>


            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

              {services.map(
                (service, index) => {
                  const Icon = service.icon;

                  return (
                    <motion.article
                      key={service.title}
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
                        amount: 0.12,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: Math.min(
                          index * 0.035,
                          0.25
                        ),
                      }}
                      whileHover={{
                        y: -4,
                      }}
                      className="group relative overflow-hidden rounded-[16px] border border-[#D8D2C7] bg-[#FAF7F0] p-5 transition-all duration-500 hover:border-[#D6B773]/50 hover:shadow-[0_18px_45px_rgba(23,41,75,.07)]"
                    >

                      <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#2457A6]/[0.04] blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      <div className="relative z-10 flex items-start justify-between">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D6B773]/40 bg-white">

                          <Icon
                            size={16}
                            strokeWidth={1.1}
                            className="text-[#8A6F32] transition-transform duration-500 group-hover:scale-110"
                          />

                        </div>

                        <Sparkles
                          size={11}
                          strokeWidth={1}
                          className="text-[#D6B773]/30 transition-all duration-500 group-hover:rotate-90 group-hover:text-[#D6B773]"
                        />

                      </div>


                      <h3 className="relative z-10 mt-5 font-serif text-[24px] leading-[1] text-[#0B1F3A]">
                        {service.title}
                      </h3>

                      <p className="relative z-10 mt-3 text-[12px] leading-[1.75] text-[#5F6B7A]">
                        {service.description}
                      </p>

                      <div className="relative z-10 mt-5 flex items-center gap-2">

                        <span className="h-px w-5 bg-[#D6B773] transition-all duration-500 group-hover:w-9" />

                        <span className="text-[7px] uppercase tracking-[0.22em] text-[#8A6F32]">
                          Service
                        </span>

                      </div>

                    </motion.article>
                  );
                }
              )}

            </div>

          </div>

        </section>


        {/* =====================================================
            RESPONSIBLE EVENT DESIGN
            Exact company-profile information
        ====================================================== */}

        <section className="relative overflow-hidden bg-[#E8EFF6] px-5 py-11 text-center sm:px-8 sm:py-15 lg:py-18">

          <Sparkle
            className="left-[13%] top-[28%]"
            size={12}
          />

          <Sparkle
            className="right-[14%] bottom-[25%]"
            size={11}
            delay={1}
          />

          <div className="mx-auto max-w-[820px]">

            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#D6B773]/40 bg-white">

              <Sparkles
                size={16}
                strokeWidth={1.1}
                className="text-[#8A6F32]"
              />

            </div>

            <p className="mt-4 text-[8px] font-semibold uppercase tracking-[0.34em] text-[#8A6F32]">
              Responsible Event Design
            </p>

            <h2 className="mt-3 font-serif text-[39px] leading-[0.96] sm:text-[52px]">

              Thoughtful details.

              <br />

              <span className="text-[#2457A6]">
                Elegant finish.
              </span>

            </h2>

            <p className="mx-auto mt-4 max-w-[720px] text-[13px] leading-7 text-[#5F6B7A]">
              Where appropriate, Blue Lotus incorporates
              reusable structures, natural fabrics, fresh or
              reusable floral elements and biodegradable
              materials to reduce unnecessary waste while
              maintaining an elegant finish.
            </p>

          </div>

        </section>


        {/* =====================================================
            FINAL CTA
            Exact company-profile wording
        ====================================================== */}

        <section className="relative overflow-hidden bg-[#2457A6] px-5 py-12 text-center sm:px-8 sm:py-16 lg:py-18">

          <div className="pointer-events-none absolute -left-24 -top-24 h-52 w-52 rounded-full border border-white/10 animate-[spin_24s_linear_infinite]" />

          <div className="pointer-events-none absolute -bottom-28 -right-28 h-64 w-64 rounded-full border border-white/10 animate-[spin_22s_linear_infinite_reverse]" />

          <Sparkle
            className="left-[14%] top-[25%] text-white"
            size={11}
          />

          <Sparkle
            className="right-[14%] top-[20%] text-[#D6B773]"
            size={11}
            delay={1}
          />

          <div className="relative mx-auto max-w-[800px]">

            <Sparkles
              size={23}
              strokeWidth={1}
              className="mx-auto text-[#D6B773]"
            />

            <h2 className="mt-4 font-serif text-[40px] leading-[0.95] text-white sm:text-[57px]">

              Let&apos;s create

              <span className="block text-[#D6B773]">
                something beautiful.
              </span>

            </h2>

            <p className="mx-auto mt-4 max-w-[620px] text-[13px] leading-6 text-white/75">
              Your occasion deserves a setting that
              feels personal, polished and unforgettable.
            </p>

            <button
              type="button"
              onClick={openBooking}
              className="group mt-6 inline-flex items-center gap-3 bg-white px-6 py-3.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#2457A6] shadow-[0_15px_35px_rgba(0,0,0,.16)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(0,0,0,.22)]"
            >
              Plan Your Event

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2457A6] text-white transition-transform duration-500 group-hover:rotate-45">

                <ArrowUpRight size={13} />

              </span>

            </button>

          </div>

        </section>

      </main>


      {/* =========================================================
          ENQUIRY POPUP
      ========================================================== */}

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
            className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto bg-[#081329]/75 px-4 py-5 backdrop-blur-md sm:px-6"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                closeBooking();
              }
            }}
          >

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.97,
              }}
              transition={{
                duration: 0.35,
              }}
              className="relative my-auto w-full max-w-2xl overflow-visible bg-white shadow-[0_30px_90px_rgba(0,0,0,.35)]"
              onMouseDown={(event) =>
                event.stopPropagation()
              }
            >

              {/* GOLD/BLUE TOP LINE */}

              <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#2457A6] via-[#D6B773] to-[#2457A6]" />


              {/* HEADER */}

              <div className="flex items-start justify-between border-b border-gray-100 px-5 py-5 sm:px-7 sm:py-6">

                <div>

                  <div className="flex items-center gap-2">

                    <span className="h-px w-7 bg-[#D6B773]" />

                    <span className="text-[8px] font-semibold uppercase tracking-[0.25em] text-[#2457A6]">
                      Let&apos;s celebrate
                    </span>

                    <Sparkles
                      size={12}
                      className="text-[#D6B773]"
                    />

                  </div>

                  <h2 className="mt-2 font-serif text-2xl text-[#0B1F3A] sm:text-3xl">
                    Book Your Event
                  </h2>

                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    Tell us a little about your celebration.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={closeBooking}
                  aria-label="Close enquiry form"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all duration-300 hover:rotate-90 hover:border-[#2457A6] hover:bg-[#2457A6] hover:text-white"
                >
                  <X size={17} />
                </button>

              </div>


              {/* SUCCESS */}

              {submitted ? (

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className="px-6 py-12 text-center sm:px-10"
                >

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#2457A6]/10 text-[#D6B773]">

                    <Check size={28} />

                  </div>

                  <h3 className="mt-5 font-serif text-2xl text-[#0B1F3A]">
                    Enquiry Received!
                  </h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                    Thank you for reaching out.
                    We&apos;ll be in touch with you soon.
                  </p>

                  <button
                    type="button"
                    onClick={closeBooking}
                    className="mt-6 bg-[#2457A6] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#274b9d]"
                  >
                    Close
                  </button>

                </motion.div>

              ) : (

                <form
                  onSubmit={handleSubmit}
                  className="px-5 py-5 sm:px-7 sm:py-6"
                >

                  {/* NAME + PHONE */}

                  <div className="grid gap-4 sm:grid-cols-2">

                    <div>

                      <label
                        htmlFor="services-name"
                        className="mb-1.5 block text-xs font-semibold text-[#0B1F3A]"
                      >
                        Your Name
                      </label>

                      <div className="relative">

                        <User
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                          id="services-name"
                          type="text"
                          value={form.name}
                          onChange={(event) =>
                            updateForm(
                              "name",
                              event.target.value
                            )
                          }
                          required
                          autoComplete="name"
                          placeholder="Enter your name"
                          className="h-11 w-full border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm outline-none transition focus:border-[#2457A6] focus:bg-white focus:ring-2 focus:ring-[#2457A6]/10"
                        />

                      </div>

                    </div>


                    <div>

                      <label
                        htmlFor="services-phone"
                        className="mb-1.5 block text-xs font-semibold text-[#0B1F3A]"
                      >
                        Phone Number
                      </label>

                      <div className="relative">

                        <Phone
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                          id="services-phone"
                          type="tel"
                          value={form.phone}
                          onChange={(event) =>
                            updateForm(
                              "phone",
                              event.target.value
                            )
                          }
                          required
                          autoComplete="tel"
                          placeholder="Enter phone number"
                          className="h-11 w-full border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm outline-none transition focus:border-[#2457A6] focus:bg-white focus:ring-2 focus:ring-[#2457A6]/10"
                        />

                      </div>

                    </div>

                  </div>


                  {/* EMAIL + EVENT */}

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">

                    <div>

                      <label
                        htmlFor="services-email"
                        className="mb-1.5 block text-xs font-semibold text-[#0B1F3A]"
                      >
                        Email Address
                      </label>

                      <div className="relative">

                        <Mail
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                          id="services-email"
                          type="email"
                          value={form.email}
                          onChange={(event) =>
                            updateForm(
                              "email",
                              event.target.value
                            )
                          }
                          required
                          autoComplete="email"
                          placeholder="Enter email address"
                          className="h-11 w-full border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm outline-none transition focus:border-[#2457A6] focus:bg-white focus:ring-2 focus:ring-[#2457A6]/10"
                        />

                      </div>

                    </div>


                    <div className="relative">

                      <label className="mb-1.5 block text-xs font-semibold text-[#0B1F3A]">
                        Event Type
                      </label>

                      <button
                        type="button"
                        onClick={() =>
                          setEventDropdownOpen(
                            (value) => !value
                          )
                        }
                        className={`flex h-11 w-full items-center justify-between border px-3 text-left text-sm transition ${
                          eventDropdownOpen
                            ? "border-[#2457A6] bg-white ring-2 ring-[#2457A6]/10"
                            : "border-gray-200 bg-gray-50"
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
                          className={`text-[#2457A6] transition-transform ${
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
                              y: -5,
                            }}
                            animate={{
                              opacity: 1,
                              y: 3,
                            }}
                            exit={{
                              opacity: 0,
                              y: -5,
                            }}
                            className="absolute left-0 right-0 top-full z-[100] overflow-hidden border border-gray-200 bg-white shadow-[0_20px_45px_rgba(23,35,79,.18)]"
                          >

                            <div className="h-[3px] bg-gradient-to-r from-[#2457A6] via-[#D6B773] to-[#2457A6]" />

                            <div className="p-1.5">

                              {eventTypes.map(
                                (type) => (
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
                                    className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition ${
                                      form.eventType ===
                                      type
                                        ? "bg-[#2457A6] text-white"
                                        : "text-[#0B1F3A] hover:bg-[#E8EFF6]"
                                    }`}
                                  >

                                    <span className="flex items-center gap-2">

                                      <span
                                        className={`h-1.5 w-1.5 rounded-full ${
                                          form.eventType ===
                                          type
                                            ? "bg-[#e5c57b]"
                                            : "bg-[#D6B773]"
                                        }`}
                                      />

                                      {type}

                                    </span>

                                    {form.eventType ===
                                      type && (
                                      <Check
                                        size={14}
                                        className="text-[#e5c57b]"
                                      />
                                    )}

                                  </button>
                                )
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
                      htmlFor="services-date"
                      className="mb-1.5 block text-xs font-semibold text-[#0B1F3A]"
                    >
                      Event Date
                    </label>

                    <div className="relative">

                      <CalendarDays
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="services-date"
                        type="date"
                        value={form.eventDate}
                        onChange={(event) =>
                          updateForm(
                            "eventDate",
                            event.target.value
                          )
                        }
                        className="h-11 w-full border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm outline-none transition focus:border-[#2457A6] focus:bg-white focus:ring-2 focus:ring-[#2457A6]/10"
                      />

                    </div>

                  </div>


                  {/* MESSAGE */}

                  <div className="mt-4">

                    <label
                      htmlFor="services-message"
                      className="mb-1.5 block text-xs font-semibold text-[#0B1F3A]"
                    >
                      Tell Us About Your Event
                    </label>

                    <textarea
                      id="services-message"
                      value={form.message}
                      onChange={(event) =>
                        updateForm(
                          "message",
                          event.target.value
                        )
                      }
                      rows={3}
                      placeholder="Tell us about your venue, guest count, preferred style or budget..."
                      className="w-full resize-none border border-gray-200 bg-gray-50 px-3 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#2457A6] focus:bg-white focus:ring-2 focus:ring-[#2457A6]/10"
                    />

                  </div>


                  {/* ERROR */}

                  {submitError && (

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -4,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="mt-4 border border-red-200 bg-red-50 px-4 py-3 text-center text-xs text-red-600"
                    >
                      {submitError}
                    </motion.div>

                  )}


                  {/* SUBMIT */}

                  <button
                    type="submit"
                    disabled={sending}
                    className="group mt-5 flex h-12 w-full items-center justify-center gap-3 bg-[#2457A6] text-sm font-semibold text-white transition hover:bg-[#274b9d] disabled:cursor-not-allowed disabled:opacity-70"
                  >

                    {sending ? (
                      <>
                        <span>
                          Sending...
                        </span>

                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      </>
                    ) : (
                      <>
                        <span>
                          Send Enquiry
                        </span>

                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}

                  </button>

                  <p className="mt-3 text-center text-[10px] text-gray-400">
                    We&apos;ll get back to you regarding your event.
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