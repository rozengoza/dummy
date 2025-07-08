import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);
type AnimationType = "fromRight" | "fromTop" | "rotateLines";
export { gsap, ScrollTrigger, SplitText };

export const fadeInUp = (target: gsap.TweenTarget, delay = 0, y = 40) => {
    return gsap.fromTo(
        target,
        { opacity: 0, y },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            delay,
            ease: "power3.out"
        }
    );
};

export const splitTextAnimation = (
    target: HTMLElement,
    type: "chars" | "words" | "lines",
    animationType: AnimationType
): {
    split: SplitText,
    animation: gsap.core.Tween;
} => {
    const split = SplitText.create(target, { type: "chars, words, lines" });
    const aniMap: Record<AnimationType, () => gsap.core.Tween> = {
        fromRight: () =>
            gsap.from(split.chars, {
                x: 150,
                opacity: 0,
                duration: 0.7,
                ease: "power4",
                stagger: 0.04
            }),
        fromTop: () =>
            gsap.from(split.words, {
                y: -100,
                opacity: 0,
                rotation: "random(-80,80)",
                duration: 0.7,
                ease: "back",
                stagger: 0.15,
            }),
        rotateLines: () =>
            gsap.from(split.lines, {
                rotationX: -100,
                transformOrigin: "50% 50%- 160px",
                opacity: 0,
                duration: 0.8,
                ease: "power3",
                stagger: 0.25
            }),
    };

    const animation = aniMap[animationType]();

    return { split, animation };
}