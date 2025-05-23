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
      <section className="fade-up text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Get in Touch</h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Whether you&rsquo;re planning a tournament, reserving a chill lounge, or just want to say hi — we&rsquo;re here to help.
        </p>
      </section>

      <section className="fade-up grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Contact Info</h2>
          <p className="text-gray-400">📍 Elite CA, Old Baneshwor, Kathmandu</p>
          <p className="text-gray-400">📞 9863314966, 9841324580</p>
          <p className="text-gray-400">✉️ rozengoza22@gmail.com</p>
          <h3 className="pt-6 text-xl font-semibold">Opening Hours</h3>
          <ul className="text-gray-400 space-y-1">
            <li>Mon &apos; Fri: 10:00 AM &apos; 11:00 PM</li>
            <li>Sat &apos; Sun: 12:00 PM &apos; 1:00 AM</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 transition text-white font-semibold px-6 py-3 rounded-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <section className="fade-up text-center">
        <h2 className="text-2xl font-semibold mb-2">Follow Us</h2>
        <p className="text-gray-400 mb-4">Stay updated on events, offers & more!</p>
        <div className="flex justify-center gap-6 text-lg">
          <a href="#" className="hover:text-purple-400">Instagram</a>
          <a href="#" className="hover:text-purple-400">Twitter</a>
          <a href="#" className="hover:text-purple-400">Facebook</a>
        </div>
      </section>
    </div>
  );
}
