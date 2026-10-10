"use client";

import { useEffect, useRef, useState } from "react";
import { TrackedLink } from "@/components/TrackedLink";

const links = [
  ["Home", "#top", "top"],
  ["Work", "#work", "work"],
  ["Ecosystem", "#ecosystem", "ecosystem"],
  ["Impact", "#impact", "impact"],
  ["About", "#about", "about"],
] as const;

const sectionIds = links.map(([, , id]) => id);

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileNavRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateActiveSection = () => {
      const headerOffset = 130;
      const currentPosition = window.scrollY + headerOffset;

      let current = "top";

      for (const id of sectionIds) {
        const section = document.getElementById(id);

        if (section && section.offsetTop <= currentPosition) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    if (mobileNavRef.current) {
      mobileNavRef.current.inert = !open;
    }

    document.body.style.overflow = open ? "hidden" : "";

    if (!open) {
      return () => {
        document.body.style.overflow = "";
      };
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <header className="border-ink/10 bg-paper/95 text-ink supports-backdrop-filter:bg-paper/90 sticky top-0 z-50 border-t-[3px] border-b backdrop-blur-md">
        <div className="relative mx-auto flex h-19.5 max-w-[1920px] items-center px-[clamp(1.5rem,3.5vw,4.5rem)] max-[980px]:h-17.5 max-[980px]:px-5">
          {/* Brand */}
          <a
            href="#top"
            aria-label="Crystal Kizor home"
            className="font-display text-ink relative z-10 flex shrink-0 flex-col uppercase"
          >
            <span className="text-[1.6rem] leading-[0.72] font-medium tracking-[-0.065em]">
              Crystal
            </span>

            <span className="text-[1.6rem] leading-[0.82] font-medium tracking-[-0.065em]">
              Kizor
            </span>
          </a>

          {/* Desktop primary navigation */}
          <nav
            aria-label="Primary navigation"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[clamp(1.75rem,2.7vw,3.4rem)] min-[981px]:flex"
          >
            {links.map(([label, href, section]) => {
              const active = activeSection === section;

              return (
                <a
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`after:bg-clay relative py-2 text-[0.91rem] font-medium tracking-[0.01em] transition-colors duration-200 after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-left after:transition-transform after:duration-200 ${
                    active
                      ? "text-clay after:scale-x-100"
                      : "text-ink/65 hover:text-ink after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Desktop secondary actions */}
          <div className="ml-auto hidden items-center gap-7 min-[981px]:flex">
            <TrackedLink
              href="https://studiocoka.com/"
              target="_blank"
              rel="noopener noreferrer"
              event="initiative_link_clicked"
              eventData={{
                initiative: "Studio COKA",
                source: "header",
              }}
              className="text-ink/60 hover:text-ink text-[0.9rem] font-medium transition-colors duration-200"
            >
              Studio COKA
            </TrackedLink>

            <TrackedLink
              href="#enquire"
              event="cta_clicked"
              eventData={{
                cta: "Work with Crystal",
                source: "header",
              }}
              className="bg-clay hover:bg-ink inline-flex min-h-11 items-center justify-center rounded-full px-7 text-[0.9rem] font-semibold text-white transition-[background-color,transform] duration-200 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Work with Crystal
            </TrackedLink>
          </div>

          {/* Mobile trigger */}
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
            className="relative z-80 ml-auto hidden h-11 w-11 items-center justify-center bg-transparent text-current max-[980px]:flex"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>

            <span className="relative block h-4 w-6">
              <span
                className={`absolute top-0.75 left-0 block h-px w-full bg-current transition-transform duration-200 ${
                  open ? "translate-y-1.25 rotate-45" : ""
                }`}
              />

              <span
                className={`absolute bottom-0.75 left-0 block h-px w-full bg-current transition-transform duration-200 ${
                  open ? "-translate-y-1.25 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile menu — outside header so fixed positioning uses viewport */}
      <nav
        ref={mobileNavRef}
        id="mobile-navigation"
        aria-label="Mobile navigation"
        // aria-hidden={!open}
        className={`bg-moss text-ink fixed inset-0 z-60 hidden min-h-dvh flex-col px-6 pt-28 pb-8 transition-[opacity,transform,visibility] duration-300 max-[980px]:flex ${
          open
            ? "pointer-events-auto visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-5 opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => {
            closeMenu();
            menuButtonRef.current?.focus();
          }}
          className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center text-white"
        >
          <span className="relative block h-6 w-6">
            <span className="absolute top-1/2 left-0 block h-px w-full -translate-y-1/2 rotate-45 bg-current" />
            <span className="absolute top-1/2 left-0 block h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
          </span>
        </button>
        <div className="flex flex-col">
          {links.map(([label, href, section]) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              aria-current={activeSection === section ? "page" : undefined}
             className={`font-display border-b py-5 text-[2.15rem] leading-none transition-colors duration-200 ${
  activeSection === section
    ? "border-clay text-white"
    : "border-white/10 text-white/80 hover:text-white"
}`}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-4 pt-10">
          <TrackedLink
            href="https://studiocoka.com/"
            target="_blank"
            rel="noopener noreferrer"
            event="initiative_link_clicked"
            eventData={{
              initiative: "Studio COKA",
              source: "mobile_header",
            }}
            onClick={closeMenu}
            className="text-sm font-medium text-white/60"
          >
            Visit Studio COKA ↗
          </TrackedLink>

          <TrackedLink
            href="#enquire"
            event="cta_clicked"
            eventData={{
              cta: "Work with Crystal",
              source: "mobile_header",
            }}
            onClick={closeMenu}
            className="bg-clay inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 text-sm font-semibold text-white"
          >
            Work with Crystal
          </TrackedLink>
        </div>
      </nav>
    </>
  );
}
