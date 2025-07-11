import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { Gallery } from "@/components/gallery";
// import ScrollSmootherProvider from "@/lib/scrollSmootherProvider";
export default function Home() {
  debugger;
  const register = async () => {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "John",
        email: "johsn@example.com",
        password: "123456"
      })
    });

    const data = await res;
    console.log(data);
  }
  register();
  return (
    <>
      <Hero />
      <ServicesSection />
      <Gallery />
    </>
  );
}
