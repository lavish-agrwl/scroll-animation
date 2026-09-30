export default function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-ink px-5 md:px-10 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="font-display text-xs font-semibold tracking-[0.3em] mr-[-0.3em]">
          ITZ&nbsp;FIZZ
        </p>
        <p className="text-xs text-cream/40">
          A scroll-driven hero concept. Built with Next.js, Tailwind &amp; GSAP ScrollTrigger.
        </p>
        <p className="text-xs text-cream/40">© 2026 Itz Fizz Co.</p>
      </div>
    </footer>
  );
}
