"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import PS5Games from "@/assets/images/services/ps5.png";
import PCGames from "@/assets/images/services/pc-games.png";
import Netflix from "@/assets/images/services/netflix.png";
import Image from "next/image";
import type { StaticImageData } from "next/image";

interface ServicesItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string | StaticImageData;
  rate?: number;
}

interface ServicesBookingComponentProps {
  heading?: string;
  demoUrl?: string;
  items?: ServicesItem[];
}

const ServicesBookingComponent = ({
  heading = "Gaming Zone",
  demoUrl = "/services",
  items = [
    {
      id: "playStation",
      title: "PlayStation",
      summary:
        "Immerse yourself in competitive gaming on PS5 consoles within spacious, well-partitioned booths designed for both competitive edge and comfort. Enjoy high-end displays, ambient lighting, and proper ventilation, making it ideal for solo players or groups. Relax on plush seating while playing a wide selection of popular titles — including FIFA and other top-rated games — in an environment tailored for long gaming sessions.Immerse yourself in next-gen gaming on PS5 consoles within spacious, well-partitioned booths designed for both competitive edge and comfort. Enjoy high-end displays, ambient lighting, and proper ventilation, making it ideal for solo players or groups. Relax on plush seating while playing a wide selection of popular titles — including FIFA and other top-rated games — in an environment tailored for long gaming sessions.",
      url: "#",
      image: PS5Games,
      rate: 200,
    },
    {
      id: "pcGames",
      title: "PC Games",
      summary: "Dive into lag-free competitive gaming on high-performance PCs featuring top-tier CPUs and GPUs, high refresh rate monitors, and premium mechanical keyboards and gaming mice. Enjoy ultra-low latency, consistently high FPS, blazing-fast internet, and uninterrupted sessions with power backup. Immerse yourself in every game with high-fidelity sound and RGB-lit, fully-optimized setups designed for serious gamers.",
      url: "#",
      image: PCGames,
      rate: 150,
    },
    {
      id: "netflixRoom",
      title: "Netflix & Chill",
      summary: "Unwind in a private, soundproof Netflix room designed for couples or groups of friends. Enjoy your favorite shows and movies on high-end smart TVs with immersive surround sound, all while relaxing on spacious, ultra-comfy sofas. The room is fully air-conditioned for a chill viewing experience and comes with optional snacks and drinks, making it the perfect escape for movie nights, date nights, or binge sessions.",
      url: "#",
      image: Netflix,
      rate: 300,
    },
  ],
}: ServicesBookingComponentProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);
  return (
    <section className="py-32 w-full px-4 xl:px-[8%] max-w-[1600px] mx-auto">
      <div className="container">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div>
            <h2 className="mb-3 text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              {heading}
            </h2>
            <a
              href={demoUrl}
              className="group flex items-center gap-1 text-sm font-medium md:text-base lg:text-lg"
            >
              Make a Booking
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="relative w-full max-w-full md:left-[-1rem]"
        >
          <CarouselContent className="hide-scrollbar w-full max-w-full md:-mr-4 md:ml-8 2xl:ml-[max(8rem,calc(50vw-700px+1rem))] 2xl:mr-[max(0rem,calc(50vw-700px-1rem))]">
            {items.map((item) => (
              <CarouselItem key={item.id} className="ml-8 md:max-w-[452px]">
                <a
                  href={item.url}
                  className="group flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-3/2 flex overflow-clip rounded-xl">
                      <div className="flex-1">
                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={100}
                            height={100}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
                    {item.title}
                  </div>
                  <div className="text-muted-foreground mb-8 line-clamp-2 text-sm md:mb-12 md:text-base lg:mb-9">
                    {item.summary}
                  </div>
                  <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-lg font-semibold">
                      NPR. {item?.rate}/hr
                    </div>
                    <Button size="sm" variant="secondary" className="w-fit">
                      Make a Booking
                    </Button>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { ServicesBookingComponent };
