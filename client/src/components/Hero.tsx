"use client";

import { useRef } from "react";
import Image from "next/image";
import HeroImg from "@/assets/images/landing/hero.png";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { fadeInUp } from "@/lib/gsapAnimations";
import { useGSAP } from "@gsap/react";

interface HeroContent {
  heading: string;
  description: string;
  buttons: {
    label: string;
    variant?: "outline" | "default";
    onClick?: () => void;
  }[];
  image: {
    src: typeof HeroImg;
    alt: string;
  };
}

const defaultHeroContent: HeroContent = {
  heading: "Welcome to Level Up Gaming Lounge",
  description:
    "Step inside a world designed to elevate your play and ignite your passion — where every match, every challenge, and every hangout feels extraordinary.",
  buttons: [
    { label: "Get Started" },
    { label: "Services", variant: "outline" },
  ],
  image: {
    src: HeroImg,
    alt: "Level Up Gaming Lounge hero image",
  },
};

interface HeroProps {
  content?: HeroContent;
}

const Hero = ({ content = defaultHeroContent }: HeroProps) => {
  const scope = useRef(null);

  useGSAP(() => {
    fadeInUp(".hero-heading", 0);
    fadeInUp(".hero-background", 0);
  }, { scope });

  return (
    <SectionContainer ref={scope} as="section" className="py-4">
      <div className="grid items-center gap-8 bg-muted-2 lg:grid-cols-2">
        <div className="flex flex-col items-center p-16 text-center lg:items-start lg:text-left">
          <h1 className="hero-heading my-6 text-4xl font-bold text-pretty lg:text-6xl">
            {content.heading}
          </h1>
          <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
            {content.description}
          </p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
            {content.buttons.map(({ label, variant }, i) => (
              <Button key={i} variant={variant === "outline" ? "outline" : undefined}>
                {label}
                {label === "Get Started" && <ArrowRight className="size-4" />}
              </Button>
            ))}
          </div>
        </div>
        <Image
          src={content.image.src}
          alt={content.image.alt}
          className="hero-background h-full w-full object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </SectionContainer>
  );
};

export { Hero };
