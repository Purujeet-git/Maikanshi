"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  x: string;
  y: string;
  onClick?: () => void;
};

export default function Hotspot({
  x,
  y,
  onClick,
}: Props) {
  const hotspotRef =
    useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!hotspotRef.current) return;

    gsap.to(hotspotRef.current, {
      left: x,
      top: y,
      duration: 1.2,
      ease: "power3.inOut",
    });
  }, [x, y]);

  return (
    <button
      ref={hotspotRef}
      onClick={onClick}
      style={{
        left: x,
        top: y,
      }}
      className="
        absolute
        z-40
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-black
        text-white
        hover:scale-110
        transition-transform
      "
    >
      +
    </button>
  );
}