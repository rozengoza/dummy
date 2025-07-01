import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = (target: gsap.TweenTarget, delay = 0, y = 40 ) => {
    return gsap.fromTo(
        target,
        {opacity: 0, y},
        {
            opacity: 1,
            y: 0,
            duration: 1,
            delay,
            ease: "power3.out"
        }
    );
};