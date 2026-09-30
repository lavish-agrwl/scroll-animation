"use client";

/**
 * ScrollVisual — the hero's primary visual element.
 * A CSS-built sparkling-drink can (no external asset needed) so the
 * page is self-contained and fast. Only transform/opacity are animated
 * by GSAP in the parent; bubbles use cheap composited keyframes.
 */
export default function ScrollVisual() {
  return (
    <div
      className="relative flex items-center justify-center will-change-transform"
      aria-hidden="true"
    >
      {/* Ambient glow — animated via GSAP (scale/opacity only) */}
      <div
        data-visual="glow"
        className="absolute h-[26rem] w-[26rem] md:h-[36rem] md:w-[36rem] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(closest-side, rgba(200,240,75,0.32), rgba(200,240,75,0.08) 55%, transparent 72%)",
          filter: "saturate(1.1)",
        }}
      />

      {/* Orbit ring */}
      <div
        data-visual="ring"
        className="absolute h-[19rem] w-[19rem] md:h-[27rem] md:w-[27rem] rounded-full border border-cream/15 will-change-transform"
      >
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-lime shadow-[0_0_18px_4px_rgba(200,240,75,0.7)]" />
        <span className="absolute top-1/2 -right-1 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cream/60" />
      </div>

      {/* Can */}
      <div data-visual="can" className="relative will-change-transform">
        <div className="relative h-[300px] w-[168px] md:h-[420px] md:w-[232px]">
          {/* Lid */}
          <div className="absolute -top-2 left-1/2 h-7 w-[132px] md:w-[184px] -translate-x-1/2">
            <div className="h-full w-full rounded-[50%] bg-gradient-to-b from-zinc-100 via-zinc-300 to-zinc-500 shadow-[0_2px_6px_rgba(0,0,0,0.5)]" />
            <div className="absolute left-1/2 top-1/2 h-3 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-400/80" />
            <div className="absolute left-1/2 top-1/2 h-1.5 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-600" />
          </div>

          {/* Body */}
          <div className="absolute inset-x-0 top-2 bottom-6 overflow-hidden rounded-[28px] md:rounded-[38px] bg-[#151517] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.25)] ring-1 ring-white/15">
            {/* Base lime field */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#DFFB80] via-[#C8F04B] to-[#8FBF1F]" />
            {/* Ink wave label */}
            <div className="absolute inset-x-0 top-[30%] bottom-[18%] bg-ink [clip-path:ellipse(120%_55%_at_50%_45%)]">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 pt-6">
                <span className="text-[10px] md:text-xs font-semibold tracking-[0.45em] text-lime/80 mr-[-0.45em]">
                  ITZ
                </span>
                <span className="font-display text-4xl md:text-6xl font-bold tracking-tight text-cream leading-none">
                  FIZZ
                </span>
                <span className="mt-1 rounded-full border border-cream/25 px-3 py-1 text-[8px] md:text-[10px] tracking-[0.3em] text-cream/80 mr-[-0.3em]">
                  YUZU&nbsp;•&nbsp;LIME
                </span>
              </div>
            </div>
            {/* Citrus badge */}
            <div className="absolute left-1/2 top-[8%] -translate-x-1/2 rounded-full bg-ink px-3 py-1 text-[9px] md:text-[11px] font-semibold tracking-[0.25em] text-cream mr-[-0.25em] shadow-lg">
              0&nbsp;SUGAR
            </div>
            {/* Bottom microcopy */}
            <div className="absolute bottom-2 inset-x-0 text-center text-[7px] md:text-[9px] tracking-[0.3em] text-ink/60 font-semibold mr-[-0.3em]">
              SPARKLING&nbsp;•&nbsp;330ML
            </div>
            {/* Sheen — transform-friendly overlay */}
            <div className="can-sheen absolute inset-0" />
            {/* Left edge light */}
            <div className="absolute inset-y-0 left-2 w-3 rounded-full bg-white/40 blur-[6px]" />
          </div>

          {/* Base rim */}
          <div className="absolute bottom-3 left-1/2 h-5 w-[140px] md:w-[196px] -translate-x-1/2 rounded-[50%] bg-gradient-to-b from-zinc-500 to-zinc-800" />

          {/* Floor shadow */}
          <div
            data-visual="shadow"
            className="absolute -bottom-8 left-1/2 h-6 w-[180px] md:w-[260px] -translate-x-1/2 rounded-[50%] bg-black/60 blur-xl"
          />
        </div>

        {/* Floating bubbles */}
        <span className="bubble absolute -left-8 top-10 h-2 w-2 rounded-full bg-lime/80" />
        <span className="bubble absolute -right-10 top-24 h-1.5 w-1.5 rounded-full bg-cream/70" />
        <span className="bubble absolute -left-10 bottom-24 h-3 w-3 rounded-full border border-lime/60" />
        <span className="bubble absolute -right-6 bottom-10 h-2 w-2 rounded-full bg-lime/50" />
      </div>

      <style jsx>{`
        .bubble {
          animation: rise 3.4s ease-in-out infinite;
          will-change: transform, opacity;
        }
        .bubble:nth-child(2) { animation-delay: 0.6s; }
        .bubble:nth-child(3) { animation-delay: 1.2s; }
        .bubble:nth-child(4) { animation-delay: 1.8s; }
        @keyframes rise {
          0%, 100% { transform: translateY(0); opacity: 0.9; }
          50% { transform: translateY(-14px); opacity: 0.35; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bubble { animation: none; }
        }
      `}</style>
    </div>
  );
}
