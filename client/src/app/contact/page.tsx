"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = containerRef.current?.querySelectorAll(".fade-up");
    if (sections) {
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            ease: "power3.out",
          }
        );
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-[#0f0f0f] text-white min-h-screen px-6 py-16 sm:px-12 lg:px-32 space-y-20"
    >
    </div>
  );
}
