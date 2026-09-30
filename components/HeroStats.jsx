"use client";

/**
 * HeroStats — impact statistics row.
 * Values count up once on entrance (GSAP), then participate in the
 * scroll-out stagger handled by the parent Hero timeline.
 */
const STATS = [
  { value: 87, suffix: "%", label: "would swap daily soda for FIZZ", index: "01" },
  { value: 64, suffix: "%", label: "less sugar than leading sodas", index: "02" },
  { value: 92, suffix: "%", label: "felt fresher after the first sip", index: "03" },
];

export default function HeroStats() {
  return (
    <dl className="grid grid-cols-3 gap-4 md:gap-10 max-w-3xl mx-auto md:mx-0">
      {STATS.map((s) => (
        <div
          key={s.index}
          data-hero="stat"
          className="hero-stat relative flex flex-col border-t border-cream/15 pt-3 md:pt-5 text-left will-change-transform"
        >
          <dt className="order-2 mt-1 text-[10px] md:text-xs leading-snug text-cream/55 max-w-[14ch] md:max-w-[20ch]">
            {s.label}
          </dt>
          <dd className="order-1 font-display text-xl md:text-5xl font-semibold tracking-tight text-cream">
            <span data-count={s.value}>0</span>
            <span className="text-lime">{s.suffix}</span>
          </dd>
          <span className="absolute -top-px left-0 h-px w-8 bg-lime" aria-hidden="true" />
          <span className="sr-only">{`Statistic ${s.index}`}</span>
        </div>
      ))}
    </dl>
  );
}
