import Image from "next/image";
import { EnquiryForm } from "@/components/EnquiryForm";
import { IntentLink } from "@/components/IntentLink";
import { Navigation } from "@/components/Navigation";
import { TrackedLink } from "@/components/TrackedLink";
import { getSiteUrl } from "@/lib/site-url";
import {
  buttonClass,
  displayHeadingClass,
  eyebrowClass,
  sectionPadClass,
  sectionTitleClass,
  textLinkClass,
} from "@/lib/ui";
import { Footer } from "@/components/Footer";
import { SelectedWork } from "@/components/SelectedWork";
import { Perspective } from "@/components/Perspective";
import { Ecosystem } from "@/components/Ecosystem";
import { HeroSection } from "@/components/HeroSection";

const siteUrl = getSiteUrl();

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#crystal-kizor`,
      name: "Crystal Kizor",
      url: siteUrl,
      image: `${siteUrl}/images/crystal/crystal-hero.webp`,
      jobTitle: "Architect, Designer and Design Director",
      description:
        "Architect, designer, entrepreneur, speaker, researcher and creator working across architecture, climate-responsive design, products, education and community initiatives.",
      sameAs: ["https://ng.linkedin.com/in/crystal-kizor"],
      knowsAbout: [
        "Climate-responsive architecture",
        "Interior design",
        "African cities",
        "Design education",
      ],
      worksFor: { "@id": `${siteUrl}/#studio-coka` },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#studio-coka`,
      name: "Studio COKA",
      url: "https://studiocoka.com/",
      founder: { "@id": `${siteUrl}/#crystal-kizor` },
      sameAs: ["https://www.linkedin.com/company/studio-coka"],
      description:
        "A climate-responsive architecture, interior design and design-build studio in Nigeria working across Africa and globally.",
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#ako-alliance`,
      name: "AKO Alliance",
      founder: { "@id": `${siteUrl}/#crystal-kizor` },
      description:
        "An initiative focused on expanding access to education and opportunity for children and young people.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Crystal Kizor",
      inLanguage: "en",
      about: { "@id": `${siteUrl}/#crystal-kizor` },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <a
        className="bg-ink fixed -top-20 left-4 z-999 px-4 py-[0.8rem] text-white focus:top-4"
        href="#main"
      >
        Skip to main content
      </a>
      <Navigation />

      <main id="main">
        <HeroSection
          eyebrowClass={eyebrowClass}
          displayHeadingClass={displayHeadingClass}
          buttonClass={buttonClass}
          textLinkClass={textLinkClass}
        />

        <Perspective />

        <SelectedWork />

        <Ecosystem />

        <section
          id="impact"
          aria-labelledby="impact-title"
          className="bg-ink px-[clamp(1.5rem,5vw,6rem)] py-[clamp(5rem,8vw,8rem)] text-white"
        >
          <div className="mx-auto grid max-w-[1600px] grid-cols-[0.78fr_1.22fr] items-center gap-[clamp(3rem,7vw,8rem)] max-[1000px]:grid-cols-1 max-[1000px]:gap-12">
            {/* Content */}
            <div className="max-w-145">
              <p className={eyebrowClass}>Impact beyond practice</p>

              <h2
                id="impact-title"
                className={` ${displayHeadingClass} mt-6 max-w-140 text-[clamp(2.8rem,4.7vw,5.4rem)] leading-[0.94] tracking-[-0.045em]`}
              >
                Design is also about who gets access to possibility.
              </h2>

              <div className="bg-clay mt-8 h-px w-12" />

              <p className="mt-8 max-w-130 text-[0.95rem] leading-[1.75] text-white/70">
                Through AKO Alliance, education initiatives and faith-rooted community work, the
                ecosystem extends beyond commissioned design into learning, identity, opportunity
                and human development.
              </p>

              <IntentLink
                className={`${textLinkClass} mt-8 text-white`}
                href="#enquire"
                intent="Partnership / collaboration"
                event="cta_clicked"
                eventData={{
                  source: "impact",
                  destination: "form",
                }}
              >
                Discuss a partnership <span aria-hidden="true">↗</span>
              </IntentLink>
            </div>

            {/* Images */}
            <div className="grid grid-cols-2 gap-4 max-[640px]:gap-2">
              <div className="relative aspect-3/4 overflow-hidden bg-white/5">
                <Image
                  src="/images/projects/community-wide.webp"
                  alt="Community centre visualisation showing architecture designed around outdoor gathering"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1000px) 50vw, 30vw"
                />
              </div>

              <div className="relative aspect-3/4 overflow-hidden bg-white/5">
                <Image
                  src="/images/projects/community-centre.webp"
                  alt="Community centre visualisation showing people gathering beneath a large central tree"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1000px) 50vw, 30vw"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className={`${sectionPadClass} grid grid-cols-[.84fr_1.16fr] items-center gap-[clamp(3rem,8vw,9rem)] max-[1000px]:grid-cols-1`}
          id="about"
          aria-labelledby="about-title"
        >
          <div className="relative min-h-180 max-[1000px]:min-h-[70svh] max-[760px]:min-h-[62svh]">
            <Image
              className="object-cover"
              src="/images/crystal/crystal-seated.webp"
              alt="Crystal Kizor seated in a warm studio environment"
              fill
              sizes="(max-width: 900px) 100vw, 42vw"
            />
          </div>
          <div>
            <Image
              className="mb-12 h-auto w-full max-w-105 object-contain object-left"
              src="/images/brand/crystal-wordmark.png"
              alt="Crystal Kizor"
              width={547}
              height={58}
            />
            <p className={eyebrowClass}> About Crystal</p>
            <h2 id="about-title" className={`${sectionTitleClass} max-w-200`}>
              An architect and founder building across practice, knowledge and impact.
            </h2>
            <p className="text-ink-soft mt-[1.7rem] max-w-175 leading-[1.75]">
              Crystal Kizor is an architect, designer, entrepreneur, speaker, researcher and
              creator. She is Design Director at Studio COKA, where her work centres on
              climate-responsive architecture, interiors and contextual design.
            </p>
            <p className="text-ink-soft mt-[1.7rem] max-w-175 leading-[1.75]">
              Beyond commissioned practice, she works across product design, professional education,
              research, speaking and initiatives focused on expanding opportunity and community.
            </p>
            <TrackedLink
              href="https://ng.linkedin.com/in/crystal-kizor"
              target="_blank"
              rel="noreferrer"
              className={`${textLinkClass} mt-8`}
              event="initiative_link_clicked"
              eventData={{
                initiative: "Crystal Kizor LinkedIn",
                destination: "external",
              }}
            >
              Follow Crystal&apos;s work <span aria-hidden="true">↗</span>
            </TrackedLink>
          </div>
        </section>

        <section
          id="enquire"
          aria-labelledby="contact-title"
          className="border-ink/15 bg-paper text-ink border-t px-[clamp(1.5rem,4vw,4.5rem)] py-[clamp(5rem,8vw,8rem)]"
        >
          <div className="mx-auto grid max-w-[1600px] grid-cols-[0.72fr_1.28fr] gap-[clamp(4rem,8vw,9rem)] max-[980px]:grid-cols-1 max-[980px]:gap-14">
            {/* Left information column */}
            <div className="max-w-460px">
              <h2
                id="contact-title"
                className="font-display mt-4 text-[clamp(2.8rem,4.3vw,4.8rem)] leading-[0.95] font-medium tracking-[-0.045em]"
              >
                Start a conversation.
              </h2>

              <p className="text-ink-soft mt-7 max-w-102.5 leading-[1.7]">
                Share a little about what you would like to build, discuss or collaborate on.
                Relevant context helps make the first conversation more useful.
              </p>

              <div className="border-ink/15 mt-10 border-t pt-8">
                <p className="text-clay text-[0.72rem] font-bold tracking-[0.08em] uppercase">
                  Architecture & interiors
                </p>

                <p className="text-ink-soft mt-3 max-w-92.5 text-[0.95rem] leading-[1.65]">
                  For architecture, interior design and construction enquiries, Studio COKA is the
                  primary practice.
                </p>

                <TrackedLink
                  href="https://studiocoka.com/"
                  target="_blank"
                  rel="noreferrer"
                  className={`${textLinkClass} mt-5`}
                  event="initiative_link_clicked"
                  eventData={{
                    initiative: "Studio COKA",
                    destination: "external_contact",
                  }}
                >
                  Visit Studio COKA <span aria-hidden="true">↗</span>
                </TrackedLink>
              </div>

              <div className="border-ink/15 mt-10 border-t pt-8">
                <p className="text-clay text-[0.72rem] font-bold tracking-[0.08em] uppercase">
                  Follow Crystal
                </p>

                <TrackedLink
                  href="https://ng.linkedin.com/in/crystal-kizor"
                  target="_blank"
                  rel="noreferrer"
                  className={`${textLinkClass} mt-4`}
                  event="initiative_link_clicked"
                  eventData={{
                    initiative: "Crystal Kizor LinkedIn",
                    destination: "external",
                  }}
                >
                  LinkedIn <span aria-hidden="true">↗</span>
                </TrackedLink>
              </div>
            </div>

            {/* Right form column */}
            <EnquiryForm />
          </div>
        </section>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replaceAll("<", "\\u003c"),
        }}
      />
    </>
  );
}
