import { ElementType, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";
interface SectionContainerProps {
    as?: ElementType;
    children: ReactNode;
    className?: string;
}

export const SectionContainer = forwardRef<HTMLElement, SectionContainerProps>(({ as: Component = "section", children, className = "" }, ref) => {
    return (
        <Component ref={ref} className={cn("w-full px-4 xl:px-[8%] max-w-[1600px] mx-auto", className)}>
            {children}
        </Component>
    )
}
)

SectionContainer.displayName = "SectionContainer";