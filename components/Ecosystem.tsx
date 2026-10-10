import Image from "next/image";

import { IntentLink } from "@/components/IntentLink";
import { TrackedLink } from "@/components/TrackedLink";

import { initiativeGroups, studioCoka } from "@/data/site";

import { eyebrowClass, sectionPadClass, textLinkClass } from "@/lib/ui";

export function Ecosystem() {
  return (
    <section
      id="ecosystem"
      aria-labelledby="ecosystem-title"
      className={`${sectionPadClass} border-ink/15 border-t border-b`}
    >
      {/* Heading */}
      <div className="mb-[clamp(3rem,5vw,5rem)] grid grid-cols-[1fr_.7fr] items-end gap-[clamp(2rem,5vw,6rem)] max-[850px]:grid-cols-1 max-[850px]:gap-5">
        <div>
          <p className={eyebrowClass}>Ecosystem</p>

          <h2
            id="ecosystem-title"
            className="font-display mt-3 max-w-190 text-[clamp(3rem,4.7vw,5.4rem)] leading-[0.94] font-medium tracking-[-0.045em]"
          >
            Architecture leads.
            <span className="text-clay block font-normal italic">
              The wider work extends the impact.
            </span>
          </h2>
        </div>

        <p className="text-ink-soft mb-1 max-w-110 justify-self-end text-[0.95rem] leading-[1.7] max-[850px]:justify-self-start">
          Crystal&apos;s initiatives move from designing places and products, to sharing knowledge,
          to widening access and community.
        </p>
      </div>

      {/* Primary practice */}
      <article className="bg-moss-deep grid grid-cols-[1.05fr_.95fr] overflow-hidden text-white max-[850px]:grid-cols-1">
        {/* Image */}
        <div className="relative min-h-90 max-[850px]:min-h-[48svh] max-[600px]:min-h-[40svh]">
          <Image
            src="/images/projects/nature-detail-2.webp"
            alt="Warm, material-led Studio COKA interior"
            fill
            className="object-cover"
            sizes="(max-width: 850px) 100vw, 48vw"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center px-[clamp(2rem,5vw,5rem)] py-[clamp(3rem,5vw,5rem)]">
          <p className={eyebrowClass}>Primary practice</p>

          <h3 className="font-display mt-4 text-[clamp(2.8rem,4.2vw,4.8rem)] leading-[0.94] font-medium tracking-[-0.04em]">
            {studioCoka.name}
          </h3>

          <p className="mt-5 max-w-135 text-[0.95rem] leading-[1.7] text-white/75">
            {studioCoka.description}
          </p>

          <p className="mt-3 max-w-125 text-[0.78rem] leading-[1.6] text-white/55">
            {studioCoka.audience}
          </p>

          <TrackedLink
            href={studioCoka.href}
            target="_blank"
            rel="noreferrer"
            event="initiative_link_clicked"
            eventData={{
              initiative: studioCoka.name,
              destination: "external",
            }}
            className={`${textLinkClass} mt-7 text-white`}
          >
            {studioCoka.cta} <span aria-hidden="true">↗</span>
          </TrackedLink>
        </div>
      </article>

      {/* Ecosystem groups */}
      <div className="mt-8 grid cursor-pointer grid-cols-3 gap-4 max-[950px]:grid-cols-1">
        {initiativeGroups.map((group) => (
          <section
            key={group.key}
            aria-labelledby={`ecosystem-${group.key}`}
            className="group/card border-ink/15 bg-paper relative border p-[clamp(1.75rem,3vw,2.75rem)] transition-[transform,box-shadow,background-color] duration-500 ease-out hover:scale-[0.985] hover:bg-white/40 hover:shadow-[0_20px_60px_rgba(20,27,22,0.06)]"
          >
            <p className={eyebrowClass}>{group.label}</p>

            <h3
              id={`ecosystem-${group.key}`}
              className="font-display mt-3 text-[clamp(2rem,2.7vw,3rem)] leading-none font-medium tracking-[-0.035em]"
            >
              {group.title}
            </h3>

            <p className="text-ink-soft mt-4 max-w-90 text-[0.85rem] leading-[1.6]">
              {group.description}
            </p>

            {/* Initiatives inside group */}
            <div className="divide-ink/15 border-ink/15 mt-8 divide-y border-t">
              {group.initiatives.map((item) => (
                <article key={item.name} className="py-6 first:pt-6 last:pb-0">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-clay text-[0.62rem] font-bold tracking-[0.08em] uppercase">
                        {item.eyebrow}
                      </p>

                      <h4 className="font-display mt-2 text-[1.65rem] leading-none font-medium tracking-tight">
                        {item.name}
                      </h4>
                    </div>

                    <span
                      className="text-ink/40 mt-1 text-[0.8rem] transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </div>

                  <p className="text-ink-soft mt-3 text-[0.82rem] leading-[1.55]">
                    {item.description}
                  </p>

                  {item.external ? (
                    <TrackedLink
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      event="initiative_link_clicked"
                      eventData={{
                        initiative: item.name,
                        destination: "external",
                      }}
                      className={`${textLinkClass} mt-4`}
                    >
                      {item.cta}
                    </TrackedLink>
                  ) : (
                    <IntentLink
                      href="#enquire"
                      intent={item.intent || "General enquiry"}
                      event="initiative_link_clicked"
                      eventData={{
                        initiative: item.name,
                        destination: "form",
                      }}
                      className={`${textLinkClass} mt-4`}
                    >
                      {item.cta}
                    </IntentLink>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
