import { TrackedLink } from "@/components/TrackedLink";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://ng.linkedin.com/in/crystal-kizor",
  },
  {
    label: "Studio COKA",
    href: "https://studiocoka.com/",
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-moss-deep px-[clamp(1.5rem,4vw,4.5rem)] py-[clamp(2.5rem,4vw,4rem)] text-white">
      <div className="mx-auto max-w-[1600px]">
        {/* Top row */}
        <div className="flex items-start justify-between gap-10 max-[760px]:flex-col">
          {/* Brand */}
          <a
            href="#top"
            aria-label="Crystal Kizor home"
            className="font-display inline-flex flex-col text-[1.7rem] leading-[0.75] font-medium tracking-[-0.065em] text-white uppercase"
          >
            <span>Crystal</span>
            <span>Kizor</span>
          </a>

          {/* Links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-end gap-x-8 gap-y-4 text-[0.8rem] text-white/70 max-[760px]:justify-start"
          >
            {socialLinks.map((link) => (
              <TrackedLink
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                event="initiative_link_clicked"
                eventData={{
                  initiative: link.label,
                  source: "footer",
                }}
                className="transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </TrackedLink>
            ))}

            <a href="#enquire" className="transition-colors duration-200 hover:text-white">
              Enquiries
            </a>
          </nav>
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex items-end justify-between gap-8 border-t border-white/10 pt-6 max-[760px]:flex-col max-[760px]:items-start">
          <div>
            <p className="m-0 text-[0.78rem] text-white/65">
              © {new Date().getFullYear()} Crystal Kizor. All rights reserved.
            </p>

            <p className="mt-2 text-[0.72rem] text-white/45">
              Architecture · Design · Education · Research · Impact
            </p>
          </div>

          <div className="flex items-center gap-7 text-[0.75rem] text-white/60">
            <a href="#top" className="transition-colors duration-200 hover:text-white">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
