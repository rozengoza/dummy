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
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="fade-in text-4xl font-bold tracking-tight text-center sm:text-left">
          About Level Up Gaming Lounge
        </h1>

        <p className="fade-in text-lg text-gray-300">
          <strong>Level Up Gaming Lounge</strong> isn’t just a gaming venue — it’s your ultimate entertainment hub. We blend the thrill of competitive play with spaces designed for comfort, chill, and connection. From high-end setups to cozy lounges, we’ve built an experience around how gamers truly want to play and relax.
        </p>

        <p className="fade-in text-md text-gray-400">
          Whether you're in the mood for intense PC or PS5 gaming, a laid-back movie night, or a quick bite between matches, we've got you covered.
        </p>

        <div className="fade-in border-t border-gray-700 pt-8">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>
              <strong>Netflix & Chill Lounges</strong> — Private spaces with plush seating and streaming access for you and your friends to unwind.
            </li>
            <li>
              <strong>Café & Bar</strong> — Grab a coffee, energy drink, or a bite to eat while you game or socialize.
            </li>
            <li>
              <strong>PS5 Gaming Zones</strong> — Latest titles and comfortable setups for console lovers.
            </li>
            <li>
              <strong>High-Performance PC Rigs</strong> — Top-tier specs, fast response times, and buttery smooth gameplay.
            </li>
            <li>
              <strong>Rentals</strong> — Hassle-free, budget-friendly rentals tailored for your tournaments and private events.
            </li>
          </ul>
        </div>

        <p className="fade-in text-center text-sm text-gray-500 pt-10">
          Whether you're leveling up solo or rolling with your squad — Level Up is your place to play, chill, and vibe.
        </p>
      </div>
    </div>
  );
}
