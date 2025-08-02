import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { ServicesBookingComponent } from "@/components/ServicesBookingComponent";
// import ScrollSmootherProvider from "@/lib/scrollSmootherProvider";
export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ServicesBookingComponent />
    </>
  );
}
