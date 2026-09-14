"use client";

import { ChevronUp, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateVisibility = () => {
      const shouldShow = window.scrollY > 400;

      setVisible((previous) => {
        if (previous === shouldShow) {
          return previous;
        }

        return shouldShow;
      });

      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;

      window.requestAnimationFrame(updateVisibility);

      ticking = true;
    };

    updateVisibility();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`
        group
        fixed
        bottom-24
        right-5
        z-[80]
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        border
        border-[#3159b5]/20
        bg-[#faf9f6]
        text-[#3159b5]
        shadow-[0_8px_25px_rgba(20,35,60,0.14)]
        outline-none
        transition-all
        duration-400
        ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:-translate-y-1.5
        hover:border-[#3159b5]
        hover:bg-[#3159b5]
        hover:text-white
        hover:shadow-[0_12px_30px_rgba(49,89,181,0.25)]
        focus-visible:ring-2
        focus-visible:ring-[#c59d59]
        focus-visible:ring-offset-2
        sm:right-6
        ${
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-90 opacity-0"
        }
      `}
    >
      {/* GOLD SPARKLE */}

      <Sparkles
        size={9}
        strokeWidth={1.7}
        className="
          pointer-events-none
          absolute
          -right-1
          -top-1
          text-[#c59d59]
          opacity-0
          transition-all
          duration-300
          group-hover:scale-110
          group-hover:opacity-100
        "
      />

      {/* OUTER GLOW */}

      <span
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-full
          bg-[#3159b5]/10
          opacity-0
          blur-md
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      {/* ICON */}

      <ChevronUp
        size={18}
        strokeWidth={2}
        className="
          relative
          z-10
          transition-transform
          duration-300
          group-hover:-translate-y-0.5
        "
      />
    </button>
  );
}