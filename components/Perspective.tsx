import { proofPoints } from "@/data/site";
import { eyebrowClass } from "@/lib/ui";

const principles = [
  {
    label: "Climate responsive",
    description: "Design shaped by heat, light, air and environmental conditions.",
  },
  {
    label: "Context driven",
    description: "Solutions grounded in place, culture and how people actually live.",
  },
  {
    label: "Research led",
    description: "Observation and inquiry inform decisions before form takes over.",
  },
  {
    label: "People focused",
    description: "The experience of the end user remains central to the work.",
  },
] as const;

export function Perspective() {
  return (
    <section
      aria-labelledby="perspective-title"
      className="border-ink/15 bg-paper border-b px-[clamp(1.5rem,5vw,5.5rem)] py-[clamp(5rem,8vw,8rem)]"
    >
      <div className="mx-auto max-w-360">
        {/* Main composition */}
        <div className="grid grid-cols-[1.15fr_.85fr] gap-[clamp(4rem,8vw,9rem)] max-[950px]:grid-cols-1 max-[950px]:gap-12">
          {/* Left */}
          <div>
            <p className={eyebrowClass}>Perspective</p>

            <h2
              id="perspective-title"
              className="font-display mt-5 max-w-190 text-[clamp(2rem,4vw,4.8rem)] leading-[0.94] font-medium tracking-[-0.045em]"
            >
              One idea across everything she builds
              <span className="text-clay mt-6 block font-normal italic">
                Design should improve everyday life.
              </span>
            </h2>

            <p className="text-ink-soft mt-8 max-w-162.5 text-[0.98rem] leading-[1.75]">
              Crystal&apos;s work spans architecture, products, education, research and community
              initiatives. What connects them is a focus on creating environments, tools and
              opportunities that help people live, learn and thrive.
            </p>

            {/* Principles */}
            <div className="mt-12 grid grid-cols-4 gap-6 max-[1100px]:grid-cols-2 max-[560px]:grid-cols-1">
              {principles.map((principle) => (
                <div key={principle.label}>
                  <div className="bg-clay mb-4 h-px w-8" />

                  <strong className="text-ink block text-[0.68rem] font-bold tracking-widest uppercase">
                    {principle.label}
                  </strong>

                  <p className="text-ink-soft mt-3 text-[0.8rem] leading-[1.55]">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — replaces reference image */}
          <aside className="bg-moss flex min-h-130 flex-col justify-between p-[clamp(2.5rem,5vw,5rem)] text-white max-[950px]:min-h-0">
            <div>
              <p className={eyebrowClass}>One point of view</p>

              <p className="font-display mt-7 max-w-117.5 text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.98] font-medium tracking-[-0.04em]">
                Different forms.
                <br />
                One intention.
              </p>
            </div>

            <div>
              <div className="mb-7 h-px w-12 bg-white/35" />

              <p className="max-w-115 text-[0.95rem] leading-[1.75] text-white/72">
                Whether the output is a building, a product, a learning platform or a community
                initiative, the underlying question stays similar: how can thoughtful design create
                better conditions for people?
              </p>
            </div>
          </aside>
        </div>

        {/* Evidence */}
        <div className="border-ink/15 mt-[clamp(4rem,7vw,7rem)] border-t pt-8">
          <div className="mb-8 flex items-end justify-between gap-8 max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-3">
            <div>
              <p className={eyebrowClass}>Selected practice outcomes</p>

              <h3 className="font-display mt-3 max-w-150 text-[clamp(2rem,3vw,3.5rem)] leading-none font-medium tracking-[-0.035em]">
                Performance made measurable.
              </h3>
            </div>

            <p className="text-ink-soft max-w-97.5 text-[1rem] leading-[1.65]">
              Evidence of design performance from Studio COKA&apos;s published work.
            </p>
          </div>

          <div className="border-ink/15 grid grid-cols-3 border-t border-l max-[760px]:grid-cols-1">
            {proofPoints.map((point) => (
              <article
                key={point.label}
                className="border-ink/15 min-h-57.5 border-r border-b p-[clamp(1.5rem,3vw,2.75rem)]"
              >
                <strong className="font-display block text-[clamp(3rem,5vw,5.4rem)] leading-[0.85] font-medium tracking-[-0.045em]">
                  {point.value}
                </strong>

                <span className="mt-5 block text-[0.75rem] font-bold tracking-[0.04em]">
                  {point.label}
                </span>

                <p className="text-ink-soft mt-3 max-w-65 text-[0.8rem] leading-[1.55]">
                  {point.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
