import Image from "next/image";
import { TrackedLink } from "./TrackedLink";

type HeroSectionProps = {
  eyebrowClass: string;
  displayHeadingClass: string;
  buttonClass: string;
  textLinkClass: string;
};

export function HeroSection({
  eyebrowClass,
  displayHeadingClass,
  buttonClass,
  textLinkClass,
}: HeroSectionProps) {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="bg-ink relative isolate min-h-[calc(100svh-82px)] overflow-hidden text-white max-[760px]:min-h-[calc(100svh-72px)]"
    >
      {/* Full-page architectural background */}
      <Image
        src="/images/projects/nature-home.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="-z-30 object-cover object-center"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(16,24,19,.48),rgba(16,24,19,.18)_30%,rgba(16,24,19,.18)_70%,rgba(16,24,19,.48))]"
      />

      {/* Main hero block */}
      <div className="relative z-10 mx-auto min-h-[calc(100svh-82px)] max-w-[1720px] px-[clamp(1rem,2vw,1.75rem)] max-[760px]:min-h-[calc(100svh-72px)] max-[760px]:px-0">
        <div className="grid min-h-[calc(100svh-82px)] grid-cols-[51%_49%] items-stretch max-[1000px]:grid-cols-1 max-[760px]:min-h-[calc(100svh-72px)]">
          {/* Left text panel */}
          <div className="bg-moss flex min-h-[calc(100svh-82px)] flex-col justify-center px-[clamp(1.5rem,4.5vw,5rem)] py-[clamp(2.5rem,5vw,5rem)] max-[1000px]:min-h-0 max-[1000px]:pt-24 max-[1000px]:pb-14">
            <p className={eyebrowClass}>Architect · Designer · Founder · Researcher</p>

            <h1
              id="hero-title"
              className={` ${displayHeadingClass} m-0 mt-5 max-w-205 text-[clamp(3rem,4.6vw,5.4rem)] leading-[0.95] tracking-[-0.045em] max-[760px]:text-[clamp(2.9rem,12vw,4.4rem)]`}
            >
              Crystal Kizor designs{" "}
              <em className="text-sand font-normal italic">climate-responsive</em> spaces, products
              and ideas for better living.
            </h1>

            <p className="mt-8 max-w-162.5 text-[clamp(1rem,1.15vw,1.12rem)] leading-[1.68] text-white/76">
              Across architecture, products, education and research, her work explores how
              thoughtful design can improve how people live, learn and grow.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <TrackedLink
                href="#ecosystem"
                className={`${buttonClass} bg-paper text-ink`}
                event="cta_clicked"
                eventData={{
                  source: "hero",
                  action: "explore_ecosystem",
                }}
              >
                Explore the ecosystem
              </TrackedLink>

              <TrackedLink
                href="#enquire"
                className={`${textLinkClass} text-white`}
                event="cta_clicked"
                eventData={{
                  source: "hero",
                  action: "start_enquiry",
                }}
              >
                Work with Crystal <span aria-hidden="true">↗</span>
              </TrackedLink>
            </div>

            <div aria-label="Crystal Kizor ecosystem" className="mt-4 pt-5"></div>
          </div>

          {/* Right portrait block */}
          <div className="relative min-h-[calc(100svh-82px)] overflow-hidden max-[1000px]:min-h-[72svh] max-[760px]:min-h-[68svh]">
            <Image
              src="/images/crystal/crystal-hero.webp"
              alt="Crystal Kizor standing in an architecture studio"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1000px) 100vw, 49vw"
              className="object-cover object-[center_28%] saturate-[.9]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(52,70,55,.12),transparent_22%),linear-gradient(0deg,rgba(0,0,0,.12),transparent_38%)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
