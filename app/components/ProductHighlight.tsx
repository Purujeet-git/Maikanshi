"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

interface ProductHighlightProps {
    image: string;
    x: string;
    y: string;
}

const creamPath =
    "M170.71,70.27c-.32-15.1-.62-29.36-.62-37.46,0-11.8-6.62-20.05-20.22-25.22C136.21,2.41,114.96,0,83,0,5.99,0,0,25.12,0,32.86c.02,2.64.54,64.97,1.42,84.84,1.16,26.45,28.57,39.3,83.78,39.3,27.62,0,49.36-4.29,64.6-12.75,13.93-7.73,21.6-18.71,21.6-30.92,0-10.19-.35-26.9-.7-43.05ZM85.2,151.33c-57.56,0-77.24-13.89-78.12-33.88-.88-19.99-1.41-84.64-1.41-84.64,0-9.15,12.96-27.15,77.34-27.15s81.41,10.23,81.41,27.15,1.32,60.96,1.32,80.51-22.97,38.01-80.53,38.01Z";

const serumPath =
    "M159.01,20.29c-1.68-11.76-9.84-20.29-19.41-20.29-1.04,0-2.11.1-3.16.3-6.16,1.17-66.39,11.76-102.38,18.09-11.04,1.94-19.59,3.45-23.2,4.08C-2.67,24.86-.13,43.17.83,50.07l.02.17c.94,6.77,4.27,18.13,16,18.13.98,0,2.01-.09,3.05-.26,3.36-.56,23.78-4.19,47.42-8.39,31.04-5.51,69.66-12.38,74.45-13.13,11.13-1.76,19.03-13.79,17.25-26.28Z";

export default function ProductHighlight({
    image,
    x,
    y,
}: ProductHighlightProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    const isSerum =
        image.toLowerCase().includes("lip") ||
        image.toLowerCase().includes("serum");

    const pathData = isSerum
        ? serumPath
        : creamPath;

    const viewBox = isSerum
        ? "0 0 160 70"
        : "0 0 172 157";

    useEffect(() => {
        if (!containerRef.current) return;

        gsap.to(containerRef.current, {
            y: "-=6",
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    }, []);

    useEffect(() => {
        if (!pathRef.current) return;

        const path = pathRef.current;
        const length = path.getTotalLength();

        gsap.set(path, {
            strokeDasharray: `120 ${length}`,
            strokeDashoffset: 0,
        });

        gsap.to(path, {
            strokeDashoffset: -length,
            duration: 5,
            repeat: -1,
            ease: "none",
        });
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                left: x,
                top: y,
            }}
            className="
                absolute
                z-[30]
                -translate-x-1/2
                -translate-y-1/2
            "
        >
            <div
                className={`
                    relative
                    ${
                        isSerum
                            ? "w-[120px] h-[60px]"
                            : "w-[120px] h-[120px]"
                    }
                `}
            >
                {/* SVG Highlight */}
                <svg
                    className="
                        absolute
                        inset-0
                        w-full
                        h-full
                        pointer-events-none
                    "
                    viewBox={viewBox}
                >
                    <path
                        ref={pathRef}
                        d={pathData}
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>

                {/* Product Image */}
                <Image
                    src={image}
                    alt="Product"
                    width={isSerum ? 140 : 420}
                    height={isSerum ? 65 : 90}
                    className="
                        absolute
                        left-1/2
                        top-1/2
                        -translate-x-1/2
                        -translate-y-1/2
                        object-contain
                        transition-all
                        duration-300
                        hover:scale-110
                        drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]
                    "
                />
            </div>
        </div>
    );
}