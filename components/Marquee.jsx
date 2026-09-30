"use client";

const ITEMS = ["YUZU", "LIME", "ZERO SUGAR", "ENDLESS FIZZ", "COLD-PRESSED", "SPARKLING"];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <section aria-label="Flavour notes" className="relative border-y border-cream/10 bg-smoke py-5 overflow-hidden">
      <div className="flex w-max items-center gap-8 whitespace-nowrap animate-[marquee_22s_linear_infinite]">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 text-xs font-semibold tracking-[0.35em] text-cream/60 mr-[-0.35em]">
            {item}
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-lime" />
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          div { animation: none; }
        }
      `}</style>
    </section>
  );
}
