import { ArrowRight } from "lucide-react";
import PS5Games from "@/assets/images/services/ps5.png";
import PCGames from "@/assets/images/services/pc-games.png";
import Netflix from "@/assets/images/services/netflix.png";
import Snacks from "@/assets/images/services/snacks.png";
import Image from "next/image";
// import { StaticImport } from "next/dist/shared/lib/get-img-props";
const Feature74 = () => {
  return (
    <section className="py-32 w-full px-4 xl:px-[8%] max-w-[1600px] mx-auto">
      <div className="container flex flex-col gap-16 lg:px-16">
        <div className="lg:max-w-sm">
          <h2 className="mb-3 text-xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
            What We Offer
          </h2>
          <p className="mb-8 text-muted-foreground lg:text-lg">
            A curated blend of thrilling gaming stations and comfortable chill-out zones. Dive into fast-paced matches or relax with your favorite shows in style.
          </p>
          <a
            href="#"
            className="group flex items-center text-xs font-medium md:text-base lg:text-lg"
          >
            Book a spot{" "}
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          <div className="flex flex-col overflow-clip rounded-xl border border-border md:col-span-2 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
            <div className="md:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[32rem]">
              <Image
                src={PS5Games}
                alt="Feature 1"
                className="aspect-16/9 h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col justify-center px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
              <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                PS5 Games
              </h3>
              <p className="text-muted-foreground lg:text-lg">
                Step into the ultimate PS5 gaming experience at Level Up. Enjoy smooth gameplay on Ultra HD displays, all from the comfort of premium lounge couches designed for long sessions. Each setup is housed in a private, spacious cage-style zone—well-ventilated, immersive, and perfect for solo or squad battles. It’s more than just a game—it’s a space built for focus, fun, and next-gen energy.
              </p>
            </div>
          </div>
          <div className="flex flex-col-reverse overflow-clip rounded-xl border border-border md:col-span-2 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
            <div className="flex flex-col justify-center px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
              <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                PC Games
              </h3>
              <p className="text-muted-foreground lg:text-lg">
                Dominate every match in our state-of-the-art PC gaming zone—where power, precision, and performance meet. Each setup features high-end rigs with curved monitors, mechanical keyboards, and crystal-clear audio gear. Set in a sleek, spacious partition, players enjoy comfortable gaming chairs and vibrant RGB ambiance. It’s the perfect battlefield for serious squads and solo grinders alike.
              </p>
            </div>
            <div className="md:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[32rem]">
              <Image
                src={PCGames}
                alt="Feature 2"
                className="aspect-16/9 h-full w-full object-cover object-center"
              />
            </div>
          </div>
           <div className="flex flex-col overflow-clip rounded-xl border border-border md:col-span-2 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
            <div className="md:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[32rem]">
              <Image
                src={Netflix}
                alt="Feature 1"
                className="aspect-16/9 h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col justify-center px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
              <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                Netflix & Chill
              </h3>
              <p className="text-muted-foreground lg:text-lg">
                Refuel your game time at our fully stocked Snacks Corner! Grab your favorite munchies—from cheesy balls and crispy chips to chocolates and packaged fries—straight off our neatly organized shelves. Chill out with refreshing beverages from our twin fridges loaded with sodas and energy drinks. It’s the perfect pit stop to recharge between matches or movies.
              </p>
            </div>
          </div>
          <div className="flex flex-col-reverse overflow-clip rounded-xl border border-border md:col-span-2 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
            <div className="flex flex-col justify-center px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
              <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                Snacks
              </h3>
              <p className="text-muted-foreground lg:text-lg">
               Refuel your game time at our fully stocked Snacks Corner! Grab your favorite munchies—from cheesy balls and crispy chips to chocolates and packaged fries—straight off our neatly organized shelves. Chill out with refreshing beverages from our twin fridges loaded with sodas and energy drinks. It’s the perfect pit stop to recharge between matches or movies.
              </p>
            </div>
            <div className="md:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[32rem]">
              <Image
                src={Snacks}
                alt="Feature 2"
                className="aspect-16/9 h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature74 };
