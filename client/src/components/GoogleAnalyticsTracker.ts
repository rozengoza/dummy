'use client';
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function GoogleAnalyticsTracker(): null {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('config', 'G-9EMT3STF2Y', {
                page_path: pathname,
            })
        }
    }, [pathname]);
    return null;
}