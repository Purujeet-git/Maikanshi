"use client";

import Image from "next/image";
import { useEffect } from "react";
import gsap from "gsap";

export type ProductInfo = {
  id: number;
  title: string;
  size: string;
  description: string;
  bullets: string[];
  image: string;
};

interface ProductPopupProps {
  product: ProductInfo;
  onClose: () => void;
}

export default function ProductPopup({ product, onClose }: ProductPopupProps) {
  useEffect(() => {
    // macOS window open style animation
    gsap.fromTo(
      ".product-popup-container",
      { opacity: 0, scale: 0.8, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" }
    );
    gsap.fromTo(
      ".product-popup-backdrop",
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    );
  }, []);

  const handleClose = () => {
    // macOS window close style animation
    gsap.to(".product-popup-container", { opacity: 0, scale: 0.8, y: 20, duration: 0.3, ease: "power3.in" });
    gsap.to(".product-popup-backdrop", { opacity: 0, duration: 0.3, ease: "power2.in", onComplete: onClose });
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="product-popup-backdrop absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" 
        onClick={handleClose} 
      />

      {/* Popup Content */}
      <div className="product-popup-container relative flex flex-col md:flex-row w-full max-w-[900px] shadow-2xl">
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black z-10 hover:scale-110 transition-transform shadow-lg"
          aria-label="Close"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M1 1L11 11M11 1L1 11" />
          </svg>
        </button>

        {/* Left Side (Image) */}
        <div className="w-full md:w-1/2 bg-[#fdf2ee] flex items-center justify-center p-12 min-h-[400px]">
          <Image 
            src={product.image} 
            alt={product.title} 
            width={300} 
            height={300} 
            className="object-contain"
          />
        </div>

        {/* Right Side (Text) */}
        <div className="w-full md:w-1/2 bg-black text-white p-12 font-mono flex flex-col justify-center">
          <h2 className="text-[0.7rem] md:text-[0.8rem] tracking-[0.15em] font-bold uppercase mb-1">
            {product.title}
          </h2>
          <p className="text-[0.65rem] tracking-[0.1em] text-white/60 mb-8">
            {product.size}
          </p>

          <div className="text-[0.65rem] tracking-[0.1em] leading-loose text-white/80 whitespace-pre-wrap mb-10">
            {product.description}
          </div>

          <ul className="text-[0.65rem] tracking-[0.1em] text-white/80 space-y-2">
            {product.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start">
                <span className="mr-3 mt-[0.2rem] opacity-70">●</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
