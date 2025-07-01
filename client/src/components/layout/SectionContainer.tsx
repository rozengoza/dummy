import { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
interface SectionContainerProps {
    as?: ElementType;
    children: ReactNode;
    className?: string;
}

export const SectionContainer = ({ as: Component = "section",children, className = "" }: SectionContainerProps) => {
    return(
        <Component className={cn("w-full px-4 xl:px-[8%] max-w-[1600px] mx-auto", className)}>
            {children}
        </Component>
    )
}