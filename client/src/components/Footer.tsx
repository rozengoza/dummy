import React from "react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { SectionContainer } from "./layout/SectionContainer";
import Image from "next/image";
import LevelUpGamingLogoSmall from "@/assets/images/Level-Up-Gaming-Logo-Small.jpeg";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";

interface FooterProps {
  logo?: {
    url: string;
    src: string | StaticImport;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Services",
    links: [
      { name: "PC Games", href: "#" },
      { name: "PS5", href: "#" },
      { name: "Netflix & Chill", href: "#" },
      { name: "Rentals", href: "#" },
      { name: "Tournament Hosting", href: "#" },
    ],
  },
  {
    title: "Cafeteria",
    links: [
      { name: "Snacks & Drinks", href: "#" },
      { name: "Cafe", href: "#" },
    ],
  },
  {
    title: "Helpful Links",
    links: [
      { name: "About", href: "#" },
      { name: "Bookings", href: "#" },
      { name: "Contact", href: "#" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "https://www.instagram.com/levelupgaminglou.nge/?hl=en", label: "Instagram" },
  { icon: <FaFacebook className="size-5" />, href: "https://www.facebook.com/levelupgaminglounge11/", label: "Facebook" },
  { icon: <FaTiktok className="size-5" />, href: "https://www.tiktok.com/@levelupgaminglounge", label: "Twitter" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

const Footer = ({
  logo = {
    url: "/",
    src: LevelUpGamingLogoSmall,
    alt: "Level-Up-Gaming-Logo",
    title: "Level Up Gaming Lounge",
  },
  sections = defaultSections,
  description = "Join Kathmandu’s gaming revolution — where the latest tech, immersive experiences, and passionate gamers come together to redefine play.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2025 level-up-gaming-lounge.netlify.app. All rights reserved.",
  legalLinks = defaultLegalLinks,
}: FooterProps) => {
  return (
    <SectionContainer as="footer" className="py-32">
      <div className="container">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <a href={logo.url}>
                <Image src={logo.src} width={50} height={50} alt={logo.alt} className="rounded-full object-cover"/>
              </a>
              <h2 className="text-xl font-semibold">{logo.title}</h2>
            </div>
            <p className="text-muted-foreground max-w-[70%] text-sm">
              {description}
            </p>
            <ul className="text-muted-foreground flex items-center space-x-6">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="hover:text-primary font-medium">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="text-muted-foreground space-y-3 text-sm">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-primary font-medium"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="text-muted-foreground mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-primary">
                <a href={link.href}> {link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionContainer>
  );
};

export { Footer };
