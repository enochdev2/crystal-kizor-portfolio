import Image from "next/image";
import { IntentLink } from "@/components/IntentLink";
import { displayHeadingClass, eyebrowClass, textLinkClass } from "@/lib/ui";

type Props = {
  title: string;
  category: string;
  summary: string;
  image: string;
  alt: string;
  staggered?: boolean;
};

export function ProjectCard({ title, category, summary, image, alt, staggered = false }: Props) {
  return (
    <article className={staggered ? "mt-32 max-[760px]:mt-12" : ""}>
      <div
        className={`group bg-paper-deep relative overflow-hidden max-[760px]:min-h-[65svh] ${
          staggered ? "min-h-[clamp(380px,50vw,650px)]" : "min-h-[clamp(420px,58vw,760px)]"
        }`}
      >
        <Image
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.025]"
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 760px) 100vw, 50vw"
        />
      </div>
      <div className="pt-[1.6rem]">
        <p className={eyebrowClass}>{category}</p>
        <h3
          className={`${displayHeadingClass} mb-[0.8rem] text-[clamp(2.15rem,3.5vw,4rem)] leading-none`}
        >
          {title}
        </h3>
        <p className="text-ink-soft max-w-147.5 leading-[1.65]">{summary}</p>
        <IntentLink
          href="#enquire"
          className={`${textLinkClass} mt-[0.7rem]`}
          intent="Architecture / interior project"
          event="project_enquiry_clicked"
          eventData={{ project: title, destination: "form" }}
        >
          Discuss a project <span aria-hidden="true">↗</span>
        </IntentLink>
      </div>
    </article>
  );
}
