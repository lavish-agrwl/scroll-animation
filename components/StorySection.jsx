import HeroStats from "./HeroStats";

export default function StorySection() {
  return (
    <>
      <section id="story" className="relative bg-ink px-5 md:px-10 py-24 md:py-32">
        <div className="mx-auto max-w-7xl grid gap-12 md:grid-cols-2 md:items-end">
          <div>
            <p className="text-[11px] tracking-[0.35em] text-lime mr-[-0.35em]">02 — WHY FIZZ</p>
            <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              Soda&apos;s bite.
              <br />
              <span className="text-cream/40">None of the crash.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base leading-relaxed text-cream/60 md:justify-self-end">
            We cold-press real yuzu and lime into hyper-carbonated spring water,
            then stop. No sugar, no sweeteners, no shortcuts — just pressure,
            citrus oils and ice-cold fizz that hits like a soft drink and
            finishes like sparkling water.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-7xl gap-4 md:grid-cols-3">
          {[
            { t: "Hyper-carbonated", d: "3.8 volumes of CO₂ for a sharper, longer-lasting bite." },
            { t: "Cold-pressed citrus", d: "Real yuzu + lime oils, never heated, never from concentrate." },
            { t: "Zero everything", d: "No sugar, no sweetener, no caffeine. Five calories of intrigue." },
          ].map((c) => (
            <article
              key={c.t}
              className="rounded-2xl border border-cream/10 bg-smoke p-6 md:p-8 transition-colors hover:border-lime/40"
            >
              <h3 className="font-display text-lg md:text-xl font-semibold">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/55">{c.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="impact" className="relative border-t border-cream/10 bg-smoke px-5 md:px-10 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] tracking-[0.35em] text-lime mr-[-0.35em]">03 — IMPACT</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold tracking-tight">
            Loved loudly.
          </h2>
          <div className="mt-10 max-w-3xl">
            <HeroStats />
          </div>
          <p className="mt-6 max-w-md text-sm text-cream/50">
            From a 2,400-person blind tasting across three cities. The scroll
            above was the fun part — this is the receipt.
          </p>
        </div>
      </section>

      <section id="flavours" className="relative border-t border-cream/10 bg-ink px-5 md:px-10 py-24 md:py-32">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
            Thirsty yet?
          </h2>
          <a
            href="#top"
            className="rounded-full bg-lime px-8 py-4 text-xs font-bold tracking-[0.2em] text-ink transition-transform duration-300 hover:scale-105"
          >
            FIND&nbsp;YOUR&nbsp;FIZZ
          </a>
        </div>
      </section>
    </>
  );
}
