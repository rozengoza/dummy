import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { Gallery } from "@/components/gallery";
import ScrollSmootherProvider from "@/lib/scrollSmootherProvider";
export default function Home() {
  return (
    <>
    <Hero />
    <ServicesSection />
    <Gallery/>
    </>
  );
}
