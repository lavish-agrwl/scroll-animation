import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import StorySection from "@/components/StorySection";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="relative bg-ink text-cream overflow-x-clip">
      <Hero />
      <Marquee />
      <StorySection />
      <Footer />
    </main>
  );
}
