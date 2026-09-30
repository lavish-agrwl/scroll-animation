"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroStats from "./HeroStats";
import ScrollVisual from "./ScrollVisual";

gsap.registerPlugin(ScrollTrigger);

const LINE_ONE = "WELCOME".split("");
const LINE_TWO = "ITZ FIZZ".split("");

function Chars({ letters, className = "" }) {
  return (
    <span className={`inline-block whitespace-nowrap ${className}`} aria-hidden="true">
      {letters.map((ch, i) => (
        <span
          key={i}
          data-hero="char"
          className="inline-block will-change-transform"
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      /* ---------- Entrance (load) timeline : subtle, fast, premium ---------- */
      if (!reduced) {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

        intro
          .from('[data-hero="nav"]', { y: -16, opacity: 0, duration: 0.6 })
          .from('[data-hero="eyebrow"]', { y: 14, opacity: 0, duration: 0.5 }, "-=0.35")
          .from('[data-hero="char"]', { y: 44, opacity: 0, duration: 0.7, stagger: 0.035 }, "-=0.35")
          .from('[data-hero="sub"]', { y: 18, opacity: 0, duration: 0.55 }, "-=0.45")
          .from('[data-hero="cta"]', { y: 16, opacity: 0, duration: 0.5 }, "-=0.4")
          .from('[data-hero="stat"]', { y: 26, opacity: 0, duration: 0.55, stagger: 0.12 }, "-=0.35")
          .from('[data-visual="can"]', { y: 60, opacity: 0, scale: 0.94, duration: 0.9 }, 0.25)
          .from('[data-visual="ring"]', { opacity: 0, scale: 0.85, duration: 1 }, 0.4)
          .from('[data-visual="glow"]', { opacity: 0, scale: 0.8, duration: 1.1 }, 0.4)
          .from('[data-hero="hint"]', { opacity: 0, y: 8, duration: 0.5 }, "-=0.3")
          .from('[data-hero="bgword"]', { opacity: 0, duration: 1.2 }, 0.3);

        // Animated counters 0 -> value, part of entrance
        root.querySelectorAll("[data-count]").forEach((el) => {
          const target = Number(el.getAttribute("data-count")) || 0;
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 1.4,
            ease: "power2.out",
            delay: 0.7,
            onUpdate: () => {
              el.textContent = String(Math.round(obj.v));
            },
          });
        });
      } else {
        // Reduced motion: ensure final values are visible, no counters animation
        root.querySelectorAll("[data-count]").forEach((el) => {
          el.textContent = el.getAttribute("data-count");
        });
      }

      /* ---------- Scroll-driven sequence (the core requirement) ---------- */
      if (!reduced) {
        const mm = gsap.matchMedia();

        // Shared scrubbed timeline: scroll position === animation state.
        // Reverses naturally because scrub maps progress 0..1 both ways.
        const buildScroll = (isMobile) => {
          const bar = root.querySelector('[data-hero="progress"]');
          const phaseLabel = root.querySelector('[data-hero="phaselabel"]');
          let lastLabel = "";

          const scrollTl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "+=160%",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              // Direct DOM writes only — no React state updates during scroll.
              onUpdate: (self) => {
                if (bar) bar.style.transform = `scaleX(${self.progress})`;
                if (phaseLabel) {
                  const label =
                    self.progress < 0.34
                      ? "01 — Taste"
                      : self.progress < 0.67
                        ? "02 — Lift"
                        : "03 — Fizz";
                  if (lastLabel !== label) {
                    lastLabel = label;
                    phaseLabel.textContent = label;
                  }
                }
              },
            },
          });

          // Main visual: deliberate diagonal travel + scale + slight rotation.
          scrollTl.to(
            '[data-visual="stage"]',
            {
              x: () => (isMobile ? 0 : window.innerWidth * 0.26),
              y: () => (isMobile ? -window.innerHeight * 0.1 : -window.innerHeight * 0.03),
              scale: isMobile ? 1.1 : 1.3,
              rotation: isMobile ? 6 : 14,
              transformOrigin: "center center",
            },
            0
          );
          scrollTl.to('[data-visual="can"]', { y: -18 }, 0);
          scrollTl.to(
            '[data-visual="ring"]',
            { rotation: 120, scale: 1.18, opacity: 0.7 },
            0
          );
          scrollTl.to('[data-visual="glow"]', { scale: 1.45, opacity: 0.9 }, 0);
          scrollTl.to('[data-visual="shadow"]', { scaleX: 1.4, opacity: 0.35 }, 0);

          // Text drifts out on parallax while visual takes over
          scrollTl.to('[data-hero="headline"]', { yPercent: -55, opacity: 0, scale: 0.96 }, 0);
          scrollTl.to('[data-hero="subrow"]', { y: -46, opacity: 0 }, 0);
          scrollTl.to('[data-hero="stat"]', { y: -30, opacity: 0, stagger: 0.06 }, 0);
          scrollTl.to('[data-hero="bgword"]', { xPercent: isMobile ? -6 : -14, opacity: 0.35 }, 0);
          scrollTl.to('[data-hero="hint"]', { opacity: 0 }, 0);

          // Phase copy cross-fades in as scroll progresses
          scrollTl.fromTo(
            '[data-hero="phase"]',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0 },
            0.35
          );
        };

        mm.add("(max-width: 767px)", () => buildScroll(true));
        mm.add("(min-width: 768px)", () => buildScroll(false));

        // Re-measure once fonts settle so pin distance stays correct
        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", onLoad);
        return () => window.removeEventListener("load", onLoad);
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="ITZ FIZZ hero"
      className="grain relative h-screen overflow-hidden bg-ink"
    >
      {/* Backdrop typography + grid */}
      <div
        data-hero="bgword"
        aria-hidden="true"
        className="text-stroke pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display font-bold leading-none tracking-tight text-[26vw] md:text-[22vw] whitespace-nowrap will-change-transform"
      >
        FIZZ FIZZ
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,241,232,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(245,241,232,0.05) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 45%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 45%, black 30%, transparent 75%)",
        }}
      />

      {/* Nav */}
      <header
        data-hero="nav"
        className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 md:px-10 py-5"
      >
        <a href="#top" className="flex items-center gap-2" aria-label="ITZ FIZZ home">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-lime font-display text-sm font-bold text-ink">
            F
          </span>
          <span className="font-display text-sm font-semibold tracking-[0.3em] mr-[-0.3em]">
            ITZ&nbsp;FIZZ
          </span>
        </a>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-8 text-xs tracking-[0.25em] text-cream/60">
          <a className="hover:text-cream transition-colors" href="#flavours">FLAVOURS</a>
          <a className="hover:text-cream transition-colors" href="#story">STORY</a>
          <a className="hover:text-cream transition-colors" href="#impact">IMPACT</a>
        </nav>
        <a
          href="#impact"
          className="rounded-full bg-cream px-4 md:px-5 py-2 text-[11px] md:text-xs font-semibold tracking-[0.18em] text-ink transition-transform duration-300 hover:scale-105"
        >
          GET&nbsp;FIZZ
        </a>
      </header>

      {/* Content grid */}
      <div className="relative z-10 mx-auto grid h-full max-w-7xl grid-cols-1 items-center content-center gap-1 md:gap-6 px-5 md:grid-cols-[1.1fr_0.9fr] md:px-10 pt-16 md:pt-0">
        {/* Left: copy */}
        <div className="text-center md:text-left">
          <p
            data-hero="eyebrow"
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-cream/15 px-4 py-1.5 text-[10px] md:text-[11px] tracking-[0.3em] text-cream/70 mr-[-0.3em]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
            SPARKLING&nbsp;•&nbsp;YUZU&nbsp;LIME
          </p>

          <h1 data-hero="headline" className="font-display font-bold leading-[1.02]">
            <span className="sr-only">Welcome Itz Fizz</span>
            <Chars
              letters={LINE_ONE}
              className="track-mega block text-[9vw] md:text-[4.6rem] lg:text-[5.4rem] text-cream"
            />
            <Chars
              letters={LINE_TWO}
              className="track-mega mt-2 block text-[9vw] md:text-[4.6rem] lg:text-[5.4rem]"
            />
          </h1>

          <div data-hero="subrow" className="mt-4 md:mt-5">
            <p data-hero="sub" className="mx-auto md:mx-0 max-w-md text-[13px] md:text-base leading-relaxed text-cream/60">
              Citrus-bright sparkling water with zero sugar and all of the
              bite. Crisp yuzu, cold-pressed lime, endless fizz.
            </p>
            <div data-hero="cta" className="mt-4 md:mt-6 flex items-center justify-center md:justify-start gap-3">
              <a
                href="#story"
                className="rounded-full bg-lime px-6 py-3 text-xs font-bold tracking-[0.2em] text-ink transition-transform duration-300 hover:scale-105"
              >
                TASTE&nbsp;IT
              </a>
              <a
                href="#impact"
                className="rounded-full border border-cream/20 px-6 py-3 text-xs font-semibold tracking-[0.2em] text-cream/80 transition-colors hover:border-cream/50 hover:text-cream"
              >
                OUR&nbsp;IMPACT
              </a>
            </div>
          </div>

          <div className="mt-5 md:mt-10">
            <HeroStats />
          </div>
        </div>

        {/* Right: scroll-driven visual */}
        <div className="relative flex items-center justify-center pb-8 md:pb-0">
          {/* Static responsive shrink lives here so GSAP owns `stage` transforms */}
          <div className="scale-[0.62] -my-14 sm:scale-[0.72] sm:-my-10 md:scale-100 md:my-0">
            <div data-visual="stage" className="will-change-transform">
              <ScrollVisual />
            </div>
          </div>

          {/* Phase copy revealed by scroll */}
          <div
            data-hero="phase"
            className="pointer-events-none absolute -bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 text-center md:text-right opacity-0"
          >
            <p data-hero="phaselabel" className="text-[11px] tracking-[0.35em] text-lime mr-[-0.35em]">
              01 — Taste
            </p>
            <p className="mt-1 font-display text-lg md:text-2xl font-semibold text-cream">
              Cold. Crisp. Gone in seconds.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom chrome: hint + progress */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-5 md:px-10 pb-5">
        <div data-hero="hint" className="mb-3 flex items-center justify-center md:justify-between text-[10px] tracking-[0.35em] text-cream/50 mr-[-0.35em]">
          <span className="hidden md:inline">SCROLL&nbsp;SEQUENCE&nbsp;—&nbsp;160%</span>
          <span className="inline-flex items-center gap-2">
            SCROLL
            <span aria-hidden="true" className="inline-block h-8 w-px bg-gradient-to-b from-lime to-transparent" />
          </span>
          <span className="hidden md:inline">PINNED&nbsp;HERO</span>
        </div>
        <div className="h-px w-full bg-cream/10" aria-hidden="true">
          <div
            data-hero="progress"
            className="h-px w-full origin-left bg-lime"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
