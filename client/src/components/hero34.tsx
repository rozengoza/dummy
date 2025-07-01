"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import HeroImg  from "@/assets/images/landing/hero.png"
import { Button } from "@/components/ui/button";
import { SectionContainer} from "@/components/layout/SectionContainer";
import { fadeInUp } from "@/lib/gsapAnimations";
const Hero34 = () => {

  const titleRef = useRef(null);
  useEffect(() => {
    fadeInUp(titleRef.current)
  })
  return (
    <SectionContainer as="section" className="py-4">
        <div className="grid items-center gap-8 bg-muted-2 lg:grid-cols-2">
          <div className="flex flex-col items-center p-16 text-center lg:items-start lg:text-left">
            <p>New Release</p>
            <h1 ref={titleRef} className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
              Welcome to Our Website
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
              doloremque mollitia fugiat omnis! Porro facilis quo animi
              consequatur. Explicabo.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button>
                Primary
                <ArrowRight className="size-4" />
              </Button>
              <Button variant="outline">Secondary</Button>
            </div>
          </div>
          <Image
            src={HeroImg}
            alt="placeholder hero"
            className="h-full w-full object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
    </SectionContainer>
  );
};

export { Hero34 };
