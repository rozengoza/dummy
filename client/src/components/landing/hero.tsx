import { Button } from "@/components/ui/button";
import HeroImg  from "@/assets/images/landing/hero.png"
const Hero = () => {
  return (
    <section className="dark relative flex h-svh max-h-[1400px] w-svw overflow-hidden  bg-cover bg-center bg-no-repeat font-sans after:absolute after:top-0 after:left-0 after:z-10 after:h-full after:w-full after:bg-black/20 after:content-[''] md:h-svh"
     style={{
        backgroundImage: `url(${HeroImg.src})`, 
      }}>
      <div className="relative z-30 m-auto flex max-w-[46.25rem] flex-col items-center justify-center gap-6 p-5 rounded-xl bg-white/2 backdrop-blur-xs">
        <h1 className="text-center font-serif text-4xl leading-tight text-foreground md:text-6xl xl:text-[4.4rem]">
          JOIN THE REVOLUTION — LEVEL UP YOUR GAME
        </h1>
        <p className="text-center text-base text-foreground">
         Ultra-fast PCs. Next-gen PS5s. Immersive vibes. LevelUp isn’t just a lounge — it’s Kathmandu’s gaming heartbeat.
        </p>
        <Button className="h-fit w-fit rounded-full px-7 py-4 text-sm leading-tight font-medium">
          Get Started
        </Button>
      </div>
      <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-[url(https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/noise.png)] bg-repeat opacity-15" />
    </section>
  );
};

export { Hero };
