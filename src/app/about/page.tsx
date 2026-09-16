"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Check,
  Flower2,
  Gem,
  Heart,
  Leaf,
  Palette,
  Sparkles,
  Star,
} from "lucide-react";

const differentiators = [
  "Customised concepts designed around the event, venue, audience and budget.",
  "Capability to handle simple celebrations as well as premium, large-format events.",
  "Transparent pricing and clear coordination across vendors and deliverables.",
  "Professional timeline management and on-time execution.",
  "A client-focused approach built around quality, responsiveness and attention to detail.",
  "Scalable execution across Hyderabad and multi-location requirements.",
];

const process = [
  {
    icon: Sparkles,
    title: "Discover",
    text: "Understand the occasion, vision, traditions, guest profile, venue and budget.",
  },
  {
    icon: Palette,
    title: "Design",
    text: "Develop the event concept, mood, colour palette, layout and key experience elements.",
  },
  {
    icon: Gem,
    title: "Plan",
    text: "Finalise vendors, production, logistics, approvals, schedules and responsibilities.",
  },
  {
    icon: Heart,
    title: "Coordinate",
    text: "Manage client communication, vendor follow-ups, rehearsals and venue readiness.",
  },
  {
    icon: Star,
    title: "Execute",
    text: "Supervise setup, guest experience, programme flow, technical production and quality.",
  },
  {
    icon: Leaf,
    title: "Close",
    text: "Coordinate dismantling, vendor settlement, feedback and post-event completion.",
  },
];

function GoldSparkle({
  className = "",
  delay = 0,
  size = 14,
}: {
  className?: string;
  delay?: number;
  size?: number;
}) {
  return (
    <motion.span
      animate={{
        opacity: [0.25, 1, 0.25],
        scale: [0.8, 1.12, 0.8],
        rotate: [0, 45, 0],
      }}
      transition={{
        duration: 3.5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`pointer-events-none absolute text-[#D6B773] ${className}`}
    >
      <Sparkles size={size} strokeWidth={1.1} />
    </motion.span>
  );
}

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-[#FAF7F0] text-[#0B1F3A]">

      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative overflow-hidden">

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-10 h-[300px] w-[300px] rounded-full bg-[#2457A6]/[0.035] blur-3xl sm:h-[360px] sm:w-[360px]" />

          <div className="absolute -right-32 bottom-0 h-[340px] w-[340px] rounded-full bg-[#D6B773]/[0.055] blur-3xl sm:h-[420px] sm:w-[420px]" />

          <GoldSparkle
            className="left-[9%] top-[25%]"
            size={12}
          />

          <GoldSparkle
            className="right-[12%] top-[19%]"
            size={10}
            delay={1}
          />

          <GoldSparkle
            className="bottom-[13%] left-[45%]"
            size={8}
            delay={2}
          />
        </div>

        <div
          className="
            relative mx-auto grid max-w-[1380px] items-center
            gap-5 px-5 pb-8 pt-10
            sm:gap-8 sm:px-8 sm:pb-14 sm:pt-20
            lg:grid-cols-[0.94fr_1.06fr]
            lg:gap-8 lg:px-12 lg:pb-16 lg:pt-28
          "
        >

          {/* HERO TEXT */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="relative z-10"
          >

            <div className="mb-4 flex items-center gap-3 sm:mb-6">

              <span className="h-px w-9 bg-[#D6B773] sm:w-12" />

              <span className="text-[8px] font-semibold uppercase tracking-[0.36em] text-[#2457A6]">
                About Blue Lotus
              </span>

              <Sparkles
                size={11}
                strokeWidth={1.2}
                className="text-[#D6B773]"
              />

            </div>

            <h1
              className="
                font-serif text-[46px] leading-[0.94]
                tracking-[-0.055em]
                sm:text-7xl
                md:text-8xl
                lg:text-[91px]
              "
            >
              Where ideas

              <br />

              <span className="text-[#2457A6]">
                bloom into
              </span>

              <br />

              <span className="relative inline-block text-[#8A6F32]">
                unforgettable

                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.7,
                    ease: "easeOut",
                  }}
                  className="absolute bottom-[-4px] left-0 h-px w-[70%] origin-left bg-[#D6B773]"
                />
              </span>

              <br />

              experiences.
            </h1>

            <p
              className="
                mt-5 max-w-xl
                text-[13px] leading-6
                text-[#5F6B7A]
                sm:mt-7 sm:text-base sm:leading-8
              "
            >
              Blue Lotus Events &amp; Decors is a Hyderabad-based event
              planning and decoration company led by Sandhya Reddy, with more
              than a decade of experience in the events and décor industry.
            </p>

            <div className="mt-5 flex items-center gap-3 sm:mt-7">

              <motion.div
                whileHover={{ rotate: -8, scale: 1.05 }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D6B773]/50 sm:h-10 sm:w-10"
              >
                <ArrowDown
                  size={14}
                  strokeWidth={1.2}
                  className="text-[#8A6F32]"
                />
              </motion.div>

              <span className="text-[8px] font-semibold uppercase tracking-[0.28em] text-[#0B1F3A]/45">
                Discover our story
              </span>

            </div>

          </motion.div>


          {/* HERO IMAGE */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="
              relative mx-auto mt-1
              h-[370px] w-full max-w-[620px]
              sm:mt-0 sm:h-[590px]
            "
          >

            <div
              className="
                absolute bottom-[-8px] left-[8%]
                h-[87%] w-[82%]
                border border-[#D6B773]/60
                sm:bottom-[-13px]
              "
            />

            <div
              className="
                absolute left-[5%] top-[2%]
                h-[88%] w-[84%]
                overflow-hidden
                shadow-[0_18px_50px_rgba(23,41,75,0.12)]
              "
            >

              <Image
                src="/images/about/about-1.jpeg"
                alt="Blue Lotus Events and Decors"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 50vw"
                className="
                  object-cover
                  transition-transform duration-[1400ms]
                  hover:scale-[1.035]
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/45 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 border-l border-[#D6B773] pl-3 sm:bottom-6 sm:left-6 sm:pl-4">

                <p className="text-[7px] font-semibold uppercase tracking-[0.3em] text-[#D6B773]">
                  Hyderabad
                </p>

                <p className="mt-1 font-serif text-xl text-white sm:text-2xl">
                  Blue Lotus
                </p>

              </div>

            </div>

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute bottom-[3%] right-0 z-20
                bg-[#FAF7F0]
                px-4 py-3
                shadow-[0_10px_28px_rgba(23,41,75,0.09)]
                sm:bottom-[4%] sm:right-[1%] sm:px-5 sm:py-4
              "
            >

              <div className="flex items-center gap-2.5">

                <Flower2
                  size={17}
                  strokeWidth={1.1}
                  className="text-[#D6B773]"
                />

                <div>

                  <p className="font-serif text-xl leading-none text-[#2457A6] sm:text-2xl">
                    10+
                  </p>

                  <p className="mt-1 text-[6px] font-semibold uppercase tracking-[0.2em] text-[#0B1F3A]/45 sm:text-[7px]">
                    Years of experience
                  </p>

                </div>

              </div>

            </motion.div>

            <GoldSparkle
              className="right-[6%] top-[9%]"
              size={16}
              delay={0.5}
            />

          </motion.div>

        </div>
      </section>


      {/* =========================================================
          WHO WE ARE
      ========================================================== */}

      <section className="bg-white py-10 sm:py-16 lg:py-20">

        <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-12">

          <div className="grid items-center gap-9 lg:grid-cols-[1fr_0.9fr] lg:gap-20">

            {/* IMAGE */}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >

              <GoldSparkle
                className="-left-2 -top-3"
                size={17}
              />

              <div className="relative ml-[3%] h-[370px] overflow-hidden sm:h-[500px] lg:h-[565px]">

                <Image
                  src="/images/about/about-2.jpeg"
                  alt="Blue Lotus Events and Decors"
                  fill
                  sizes="(max-width: 1024px) 92vw, 52vw"
                  className="
                    object-cover
                    transition-transform duration-[1400ms]
                    hover:scale-[1.035]
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/25 to-transparent" />

              </div>

              <div
                className="
                  absolute bottom-[-12px] left-0
                  max-w-[270px]
                  bg-[#FAF7F0]
                  p-4
                  shadow-[0_10px_28px_rgba(23,41,75,0.08)]
                  sm:bottom-[-17px] sm:p-6
                "
              >

                <div className="flex items-start gap-3">

                  <Flower2
                    size={17}
                    strokeWidth={1.2}
                    className="mt-1 shrink-0 text-[#8A6F32]"
                  />

                  <p className="font-serif text-base leading-tight text-[#0B1F3A] sm:text-lg">
                    Personalised environments for meaningful celebrations.
                  </p>

                </div>

              </div>

            </motion.div>


            {/* TEXT */}

            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >

              <div className="flex items-center gap-3">

                <span className="text-[8px] font-semibold uppercase tracking-[0.34em] text-[#8A6F32]">
                  Who We Are
                </span>

                <span className="h-px w-9 bg-[#D6B773]" />

              </div>

              <h2 className="mt-4 font-serif text-4xl leading-[1] tracking-[-0.04em] sm:text-5xl lg:text-6xl">

                More than

                <br />

                <span className="text-[#2457A6]">
                  a decade
                </span>

                <br />

                of experience.

              </h2>

              <div className="mt-5 space-y-4 text-[13px] leading-6 text-[#5F6B7A] sm:mt-7 sm:space-y-5 sm:text-[15px] sm:leading-8">

                <p>
                  Blue Lotus Events &amp; Decors is a Hyderabad-based event
                  planning and decoration company led by Sandhya Reddy, with
                  more than a decade of experience in the events and décor
                  industry.
                </p>

                <p>
                  Having delivered over 1,000 successful events, the company
                  creates personalised environments for weddings, private
                  celebrations, home functions and corporate gatherings.
                </p>

                <p>
                  Blue Lotus combines creative design, detailed planning and
                  dependable on-ground execution.
                </p>

              </div>

              {/* COMPACT STATS */}

              <div className="mt-5 flex items-center gap-5 border-t border-[#D8D2C7] pt-4 sm:mt-7 sm:pt-6">

                <div>
                  <p className="font-serif text-3xl text-[#2457A6] sm:text-4xl">
                    1,000+
                  </p>

                  <p className="mt-1 text-[7px] font-semibold uppercase tracking-[0.2em] text-[#0B1F3A]/45 sm:text-[8px]">
                    Successful events
                  </p>
                </div>

                <span className="h-8 w-px bg-[#D8D2C7]" />

                <div>
                  <p className="font-serif text-3xl text-[#2457A6] sm:text-4xl">
                    10+
                  </p>

                  <p className="mt-1 text-[7px] font-semibold uppercase tracking-[0.2em] text-[#0B1F3A]/45 sm:text-[8px]">
                    Years experience
                  </p>
                </div>

              </div>

            </motion.div>

          </div>

        </div>
      </section>


      {/* =========================================================
          PHILOSOPHY
      ========================================================== */}

      <section className="relative overflow-hidden bg-[#FAF7F0] py-10 sm:py-16 lg:py-20">

        <div className="pointer-events-none absolute right-[-90px] top-[-90px] h-[240px] w-[240px] rounded-full border border-[#D6B773]/20" />

        <GoldSparkle
          className="right-[18%] top-[15%]"
          size={13}
          delay={1}
        />

        <div className="relative mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-12">

          <div className="grid items-center gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >

              <div className="mb-4 flex items-center gap-3">

                <Sparkles
                  size={13}
                  strokeWidth={1.1}
                  className="text-[#D6B773]"
                />

                <span className="text-[8px] font-semibold uppercase tracking-[0.34em] text-[#8A6F32]">
                  The Blue Lotus Philosophy
                </span>

              </div>

              <h2 className="font-serif text-4xl leading-[1] tracking-[-0.04em] sm:text-5xl lg:text-6xl">

                Every celebration

                <br />

                begins with

                <br />

                <span className="text-[#2457A6]">
                  your story.
                </span>

              </h2>

            </motion.div>


            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid items-end gap-7 md:grid-cols-[1fr_0.85fr]"
            >

              <div className="relative h-[320px] overflow-hidden sm:h-[450px]">

                <Image
                  src="/images/gallery/wedding/64.JPG"
                  alt="Blue Lotus event experience"
                  fill
                  sizes="(max-width: 768px) 90vw, 45vw"
                  className="
                    object-cover
                    transition-transform duration-[1400ms]
                    hover:scale-[1.035]
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/30 to-transparent" />

                <div className="absolute bottom-5 left-5 flex items-center gap-2 text-white">

                  <Sparkles
                    size={12}
                    strokeWidth={1.1}
                    className="text-[#D6B773]"
                  />

                  <span className="text-[7px] font-semibold uppercase tracking-[0.27em]">
                    Your vision
                  </span>

                </div>

              </div>


              <div>

                <div className="mb-5 h-px w-11 bg-[#D6B773]" />

                <p className="text-[13px] leading-6 text-[#5F6B7A] sm:text-[15px] sm:leading-8">
                  Our work begins with the client&apos;s story. We translate
                  ideas, traditions, brand objectives and practical requirements
                  into cohesive event experiences that feel elegant, meaningful
                  and well managed.
                </p>

                <p className="mt-4 text-[13px] leading-6 text-[#5F6B7A] sm:mt-5 sm:text-[15px] sm:leading-8">
                  From venue selection and décor concepts to production,
                  entertainment, logistics and event flow, Blue Lotus offers
                  coordinated solutions under one trusted team.
                </p>

              </div>

            </motion.div>

          </div>

        </div>

      </section>


      {/* =========================================================
          MISSION / VISION
      ========================================================== */}

      <section className="bg-white py-10 sm:py-16 lg:py-20">

        <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-12">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-7 text-center"
          >

            <div className="flex items-center justify-center gap-3">

              <span className="h-px w-9 bg-[#D6B773]" />

              <Sparkles
                size={12}
                strokeWidth={1.1}
                className="text-[#D6B773]"
              />

              <span className="h-px w-9 bg-[#D6B773]" />

            </div>

            <p className="mt-3 text-[8px] font-semibold uppercase tracking-[0.35em] text-[#8A6F32]">
              What Guides Us
            </p>

            <h2 className="mt-2 font-serif text-3xl tracking-[-0.03em] sm:text-5xl">
              The principles behind our work
            </h2>

          </motion.div>


          <div className="grid gap-4 lg:grid-cols-2">

            {/* MISSION */}

            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="relative overflow-hidden border border-[#D8D2C7] bg-[#FAF7F0] p-6 sm:p-9"
            >

              <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#D6B773]/35">

                <Palette
                  size={16}
                  strokeWidth={1.1}
                  className="text-[#8A6F32]"
                />

              </div>

              <div className="flex items-center gap-3">

                <span className="h-1.5 w-1.5 rounded-full bg-[#D6B773]" />

                <p className="text-[8px] font-semibold uppercase tracking-[0.32em] text-[#8A6F32]">
                  Our Mission
                </p>

              </div>

              <h3 className="mt-4 max-w-xl font-serif text-2xl leading-tight text-[#0B1F3A] sm:text-4xl">
                Creative, high-quality and budget-conscious experiences.
              </h3>

              <p className="mt-4 text-[13px] leading-6 text-[#5F6B7A] sm:text-[15px] sm:leading-8">
                To deliver creative, high-quality and budget-conscious event
                experiences tailored to each client&apos;s vision, with a
                strong focus on detail, timely execution and personalised
                service.
              </p>

            </motion.article>


            {/* VISION */}

            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="relative overflow-hidden border border-[#D8D2C7] bg-[#FAF7F0] p-6 sm:p-9"
            >

              <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#D6B773]/35">

                <Gem
                  size={16}
                  strokeWidth={1.1}
                  className="text-[#8A6F32]"
                />

              </div>

              <div className="flex items-center gap-3">

                <span className="h-1.5 w-1.5 rounded-full bg-[#2457A6]" />

                <p className="text-[8px] font-semibold uppercase tracking-[0.32em] text-[#8A6F32]">
                  Our Vision
                </p>

              </div>

              <h3 className="mt-4 max-w-xl font-serif text-2xl leading-tight text-[#0B1F3A] sm:text-4xl">
                A trusted and preferred event brand.
              </h3>

              <p className="mt-4 text-[13px] leading-6 text-[#5F6B7A] sm:text-[15px] sm:leading-8">
                To be a trusted and preferred event brand known for elegant,
                memorable celebrations and consistently professional delivery.
              </p>

            </motion.article>

          </div>


          {/* PROMISE / STYLE */}

          <div className="mt-4 grid gap-4 lg:grid-cols-2">

            <motion.div
              whileHover={{ y: -2 }}
              className="border-l-2 border-[#D6B773] bg-[#FAF7F0] p-6 sm:p-8"
            >

              <div className="flex items-center gap-3">

                <Heart
                  size={16}
                  strokeWidth={1.1}
                  className="text-[#8A6F32]"
                />

                <p className="text-[8px] font-semibold uppercase tracking-[0.32em] text-[#8A6F32]">
                  Our Promise
                </p>

              </div>

              <h3 className="mt-3 font-serif text-2xl text-[#0B1F3A] sm:text-3xl">
                Transparent communication and thoughtful design.
              </h3>

              <p className="mt-3 text-[13px] leading-6 text-[#5F6B7A]">
                Transparent communication, thoughtful design, responsible
                coordination and careful execution from the first conversation
                to final wrap-up.
              </p>

            </motion.div>


            <motion.div
              whileHover={{ y: -2 }}
              className="border-l-2 border-[#2457A6] bg-[#FAF7F0] p-6 sm:p-8"
            >

              <div className="flex items-center gap-3">

                <Flower2
                  size={16}
                  strokeWidth={1.1}
                  className="text-[#8A6F32]"
                />

                <p className="text-[8px] font-semibold uppercase tracking-[0.32em] text-[#8A6F32]">
                  Our Style
                </p>

              </div>

              <h3 className="mt-3 font-serif text-2xl text-[#0B1F3A] sm:text-3xl">
                Personalised concepts with purpose.
              </h3>

              <p className="mt-3 text-[13px] leading-6 text-[#5F6B7A]">
                Personalised concepts that balance aesthetics, functionality,
                cultural relevance, guest comfort and the client&apos;s budget.
              </p>

            </motion.div>

          </div>

        </div>
      </section>


      {/* =========================================================
          DIFFERENCE
      ========================================================== */}

      <section className="bg-[#FAF7F0] py-10 sm:py-16 lg:py-20">

        <div className="mx-auto max-w-[1250px] px-5 sm:px-8 lg:px-12">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
          >

            <div>

              <div className="flex items-center gap-3">

                <Star
                  size={15}
                  strokeWidth={1.1}
                  className="text-[#D6B773]"
                />

                <span className="text-[8px] font-semibold uppercase tracking-[0.35em] text-[#8A6F32]">
                  The Blue Lotus Difference
                </span>

              </div>

              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                What sets Blue Lotus apart
              </h2>

            </div>

            <p className="max-w-sm text-[12px] leading-6 text-[#6B7480] sm:text-right">
              A client-focused approach built around quality, responsiveness
              and attention to detail.
            </p>

          </motion.div>


          <div className="grid gap-x-12 border-t border-[#D8D2C7] md:grid-cols-2">

            {differentiators.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.04,
                }}
                className="group flex gap-4 border-b border-[#D8D2C7] py-4"
              >

                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D6B773]/50">

                  <Check
                    size={11}
                    strokeWidth={1.5}
                    className="text-[#8A6F32]"
                  />

                </span>

                <p className="text-[13px] leading-6 text-[#555d68] sm:text-[14px] sm:leading-7">
                  {item}
                </p>

              </motion.div>
            ))}

          </div>

        </div>
      </section>


      {/* =========================================================
          HOW WE DELIVER
      ========================================================== */}

      <section className="bg-white py-10 sm:py-16 lg:py-20">

        <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-12">

          <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >

              <div className="flex items-center gap-3">

                <Sparkles
                  size={14}
                  strokeWidth={1.1}
                  className="text-[#D6B773]"
                />

                <span className="text-[8px] font-semibold uppercase tracking-[0.35em] text-[#8A6F32]">
                  How We Deliver Your Event
                </span>

              </div>

              <h2 className="mt-4 font-serif text-4xl leading-[1] sm:text-5xl lg:text-6xl">

                From idea

                <br />

                <span className="text-[#2457A6]">
                  to execution.
                </span>

              </h2>

              <p className="mt-4 max-w-sm text-[13px] leading-6 text-[#667384] sm:text-[14px] sm:leading-7">
                Every stage is coordinated with attention to detail, from the
                first conversation through final completion.
              </p>

            </motion.div>


            <div className="grid gap-3 sm:grid-cols-2">

              {process.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.05,
                    }}
                    whileHover={{ y: -3 }}
                    className="
                      group relative overflow-hidden
                      border border-[#D8D2C7]
                      bg-[#FAF7F0]
                      p-5
                      transition-shadow duration-300
                      hover:shadow-[0_12px_30px_rgba(23,41,75,0.07)]
                    "
                  >

                    <div className="flex items-center justify-between">

                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D6B773]/40">

                        <Icon
                          size={15}
                          strokeWidth={1.1}
                          className="text-[#8A6F32] transition-transform duration-500 group-hover:rotate-12"
                        />

                      </div>

                      <Sparkles
                        size={11}
                        strokeWidth={1.1}
                        className="text-[#D6B773]/40 transition-all duration-300 group-hover:rotate-90 group-hover:text-[#D6B773]"
                      />

                    </div>

                    <h3 className="mt-4 font-serif text-2xl text-[#0B1F3A]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[12px] leading-6 text-[#667384] sm:text-[13px]">
                      {item.text}
                    </p>

                  </motion.div>
                );
              })}

            </div>

          </div>

        </div>
      </section>


      {/* =========================================================
          RESPONSIBLE EVENT DESIGN
      ========================================================== */}

      <section className="relative overflow-hidden bg-[#E8EFF6] py-10 sm:py-16 lg:py-20">

        <div className="pointer-events-none absolute right-[-70px] top-[-70px] h-[220px] w-[220px] rounded-full border border-[#2457A6]/10" />

        <div className="pointer-events-none absolute bottom-[-80px] left-[-70px] h-[230px] w-[230px] rounded-full border border-[#D6B773]/15" />

        <GoldSparkle
          className="right-[20%] top-[18%]"
          size={13}
        />

        <div className="relative mx-auto max-w-[1000px] px-5 text-center sm:px-8">

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >

            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#2457A6]/20 bg-white">

              <Leaf
                size={16}
                strokeWidth={1.2}
                className="text-[#2457A6]"
              />

            </div>

            <p className="mt-4 text-[8px] font-semibold uppercase tracking-[0.38em] text-[#2457A6]">
              Responsible Event Design
            </p>

            <h2 className="mt-3 font-serif text-4xl leading-tight text-[#0B1F3A] sm:text-5xl lg:text-6xl">

              Beautiful events.

              <br />

              <span className="text-[#2457A6]">
                Thoughtfully designed.
              </span>

            </h2>

            <div className="mx-auto mt-4 h-px w-11 bg-[#D6B773]" />

            <p className="mx-auto mt-4 max-w-3xl text-[13px] leading-6 text-[#66707c] sm:text-[15px] sm:leading-8">
              Where appropriate, Blue Lotus incorporates reusable structures,
              natural fabrics, fresh or reusable floral elements and
              biodegradable materials to reduce unnecessary waste while
              maintaining an elegant finish.
            </p>

          </motion.div>

        </div>

      </section>


      {/* =========================================================
          LEADERSHIP
      ========================================================== */}

      <section className="bg-white py-10 sm:py-16 lg:py-20">

        <div className="mx-auto max-w-[1150px] px-5 sm:px-8 lg:px-12">

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden border border-[#D8D2C7] bg-[#FAF7F0] p-6 sm:p-9 lg:p-11"
          >

            <GoldSparkle
              className="right-6 top-6"
              size={16}
            />

            <div className="grid items-center gap-7 lg:grid-cols-[0.7fr_1.3fr]">

              <div>

                <div className="flex items-center gap-3">

                  <Flower2
                    size={16}
                    strokeWidth={1.1}
                    className="text-[#8A6F32]"
                  />

                  <p className="text-[8px] font-semibold uppercase tracking-[0.35em] text-[#8A6F32]">
                    Leadership
                  </p>

                </div>

                <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
                  Sandhya Reddy
                </h2>

                <div className="mt-2 flex items-center gap-2">

                  <span className="h-px w-7 bg-[#D6B773]" />

                  <p className="text-[7px] font-semibold uppercase tracking-[0.25em] text-[#2457A6]">
                    Blue Lotus Events &amp; Decors
                  </p>

                </div>

              </div>


              <div>

                <p className="max-w-2xl text-[13px] leading-6 text-[#5F6B7A] sm:text-[15px] sm:leading-8">
                  Blue Lotus Events &amp; Decors brings together creative
                  design, detailed planning and dependable on-ground execution
                  to create personalised environments for weddings, private
                  celebrations, home functions and corporate gatherings.
                </p>

                <div className="mt-5 flex items-center gap-5">

                  <div>

                    <p className="font-serif text-3xl text-[#2457A6]">
                      10+
                    </p>

                    <p className="mt-1 text-[7px] font-semibold uppercase tracking-[0.2em] text-[#0B1F3A]/40">
                      Years
                    </p>

                  </div>

                  <span className="h-7 w-px bg-[#D8D2C7]" />

                  <div>

                    <p className="font-serif text-3xl text-[#2457A6]">
                      1,000+
                    </p>

                    <p className="mt-1 text-[7px] font-semibold uppercase tracking-[0.2em] text-[#0B1F3A]/40">
                      Successful events
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </section>


      {/* =========================================================
          COMPACT CLOSING SIGNATURE
      ========================================================== */}

      <section className="relative overflow-hidden bg-[#FAF7F0] py-9 sm:py-14 lg:py-20">

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D6B773]/15 sm:h-[330px] sm:w-[330px]" />

        <GoldSparkle
          className="left-[17%] top-[25%]"
          size={12}
          delay={1}
        />

        <GoldSparkle
          className="right-[17%] bottom-[25%]"
          size={10}
          delay={2}
        />

        <div className="relative mx-auto max-w-[900px] px-5 text-center sm:px-8">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >

            <div className="flex items-center justify-center gap-3">

              <span className="h-px w-8 bg-[#D6B773]" />

              <Sparkles
                size={11}
                strokeWidth={1.1}
                className="text-[#D6B773]"
              />

              <span className="h-px w-8 bg-[#D6B773]" />

            </div>

            <h2
              className="
                mt-4
                font-serif text-[36px]
                leading-[0.98]
                tracking-[-0.045em]
                text-[#0B1F3A]
                sm:text-5xl
                lg:text-6xl
              "
            >
              Creative concepts.

              <br />

              <span className="text-[#2457A6]">
                Elegant décor.
              </span>

              <br />

              Seamless celebrations.
            </h2>

            <p className="mx-auto mt-3 max-w-[320px] font-serif text-[15px] leading-6 text-[#5F6B7A] sm:max-w-none sm:text-xl">
              Where ideas bloom into unforgettable experiences.
            </p>

          </motion.div>

        </div>

      </section>

    </main>
  );
}