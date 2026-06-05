"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface LoaderProps {
    onComplete: () => void;
}

export default function Loader({
    onComplete,
}: LoaderProps) {
    const logoRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const t1 = gsap.timeline({
            onComplete,
        });

        t1.fromTo(
            logoRef.current,
            {
                opacity: 1,
            },
            {
                opacity: 0.2,
                duration: 0.75,
                ease: "ease.in",
            }
        )
            .to({}, { duration: 0.25 })
            .to(
                overlayRef.current,
                {
                    opacity: 0,
                    duration: 1.5,
                    ease: "power2.inOut",
                }
            );
    }, [onComplete]);

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-9999 bg-black flex items-center justify-center"
        >
            <div ref={logoRef}>
                <Image
                    src='/logo.png'
                    alt="logo"
                    className="invert"
                    width={90}
                    height={60}
                    priority
                />
            </div>
        </div>
    );
}