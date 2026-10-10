import Image from "next/image";

import { TrackedLink } from "@/components/TrackedLink";
import { eyebrowClass, sectionPadClass, textLinkClass } from "@/lib/ui";

const projects = [
  {
    title: "Nature Home",
    category: "Residential Architecture · Studio COKA",
    summary:
      "A residential project where shade, natural ventilation, greenery, light and material warmth work together as one living system.",
    image: "/images/projects/nature-home.webp",
    alt: "Exterior view of Nature Home with shaded facade and landscaping",
  },
  {
    title: "Kasa Kofo Community Centre",
    category: "Community Architecture · Senegal",
    summary:
      "A community environment shaped around gathering, local materials, natural light and cooling, and a strong relationship between indoor and outdoor life.",
    image: "/images/projects/community-centre.webp",
    alt: "Community centre visualisation with people gathered around a central tree",
  },
] as const;

const details = [
  {
    image: "/images/projects/nature-detail-1.webp",
    title: "Indoor–outdoor continuity",
    description:
      "Openings extend the living space toward the surrounding landscape, allowing interior and exterior areas to read as one environment.",
    alt: "Nature Home kitchen opening toward a landscaped outdoor space",
  },
  {
    image: "/images/projects/nature-detail-2.webp",
    title: "Material warmth and daylight",
    description:
      "Natural finishes, soft daylight and planting create a calm interior atmosphere centred on everyday living.",
    alt: "Nature Home dining space with timber finishes and natural light",
  },
  {
    image: "/images/projects/nature-detail-3.webp",
    title: "Framed landscape and retreat",
    description:
      "Deep openings frame vegetation and bring the landscape into quieter private spaces throughout the home.",
    alt: "Nature Home bedroom overlooking dense tropical landscaping",
  },
] as const;

export function SelectedWork() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className={`${sectionPadClass} border-ink/15 border-b`}
    >
      {/* Section introduction */}
      <div className="mb-[clamp(3rem,5vw,5rem)] grid grid-cols-[1fr_.72fr] items-end gap-[clamp(2rem,5vw,6rem)] max-[800px]:grid-cols-1 max-[800px]:gap-5">
        <div>
          <p className={eyebrowClass}>Selected work</p>

          <h2
            id="work-title"
            className="font-display mt-3 max-w-155 text-[clamp(3.2rem,5vw,5.8rem)] leading-[0.92] font-medium tracking-[-0.045em]"
          >
            Built ideas, made tangible.
          </h2>
        </div>

        <p className="text-ink-soft mb-2 max-w-107.5 justify-self-end text-[0.95rem] leading-[1.7] max-[800px]:mb-0 max-[800px]:justify-self-start">
          Architecture sits at the centre of the practice: context, climate and daily life shape the
          decisions from concept through delivery.
        </p>
      </div>

      {/* Primary projects */}
      <div className="grid grid-cols-2 gap-[clamp(1.5rem,3vw,3rem)] max-[760px]:grid-cols-1 max-[760px]:gap-12">
        {projects.map((project) => (
          <article key={project.title} className="group">
            <div className="bg-ink/5 relative aspect-4/3 overflow-hidden">
              <Image
                src={project.image}
                alt={project.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                sizes="(max-width: 760px) 100vw, 50vw"
              />
            </div>

            <div className="border-ink/15 border-b py-6">
              <p className="text-clay text-[0.66rem] font-bold tracking-[0.08em] uppercase">
                {project.category}
              </p>

              <h3 className="font-display mt-3 text-[clamp(2.1rem,3vw,3.5rem)] leading-[0.96] font-medium tracking-[-0.04em]">
                {project.title}
              </h3>

              <p className="text-ink-soft mt-4 max-w-140 text-[0.92rem] leading-[1.65]">
                {project.summary}
              </p>

              <TrackedLink
                href="https://studiocoka.com/"
                target="_blank"
                rel="noreferrer"
                className={`${textLinkClass} mt-6`}
                event="project_card_clicked"
                eventData={{
                  project: project.title,
                  destination: "Studio COKA",
                }}
              >
                Explore Studio COKA <span aria-hidden="true">↗</span>
              </TrackedLink>
            </div>
          </article>
        ))}
      </div>

      {/* Detail introduction */}
      <div className="border-ink/15 mt-[clamp(4rem,7vw,7rem)] mb-8 flex items-end justify-between gap-8 border-t pt-8 max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-3">
        <div>
          <p className={eyebrowClass}>Nature Home · Details</p>

          <h3 className="font-display mt-3 text-[clamp(2rem,3vw,3.4rem)] leading-none font-medium tracking-[-0.035em]">
            Designed through the details.
          </h3>
        </div>

        <p className="text-ink-soft max-w-97.5 text-[0.88rem] leading-[1.65]">
          Material, light and landscape work together to shape the experience of the home.
        </p>
      </div>

      {/* Detail images */}
      <div className="grid grid-cols-3 gap-[clamp(1rem,2vw,1.6rem)] max-[760px]:grid-cols-1 max-[760px]:gap-10">
        {details.map((detail) => (
          <article key={detail.title} className="group">
            <div className="bg-ink/5 relative aspect-4/5 overflow-hidden">
              <Image
                src={detail.image}
                alt={detail.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                sizes="(max-width: 760px) 100vw, 33vw"
              />
            </div>

            <div className="pt-5">
              <h4 className="font-display text-[clamp(1.55rem,2vw,2.2rem)] leading-none font-medium tracking-[-0.03em]">
                {detail.title}
              </h4>

              <p className="text-ink-soft mt-3 max-w-97.5 text-[0.84rem] leading-[1.65]">
                {detail.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
