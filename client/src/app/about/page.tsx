"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function About() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(
                containerRef.current.querySelectorAll(".fade-in"),
                {
                    opacity: 0,
                    y: 40,
                },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.2,
                    duration: 1,
                    ease: "power3.out",
                }
            );
        }
    }, []);
    return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gray-900 text-white px-6 py-16 sm:px-12 lg:px-32"
    >
    </div>
  );
}
