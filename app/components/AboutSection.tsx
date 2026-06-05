"use client";

import { WindSong } from "next/font/google";

const wind = WindSong({
  variable: "--wind",
  subsets: ["latin"],
  weight: ["400"],
});

export default function AboutSection() {
  return (
    <div
      className="absolute top-0 left-0 w-full h-[60vh] z-0 flex flex-col justify-center px-10 text-black font-mono"
      style={{
        backgroundColor: "#f7f5f0",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q 25 25 50 50 T 100 50' fill='none' stroke='%23e6e2d8' stroke-width='0.5' /%3E%3Cpath d='M0 60 Q 25 35 50 60 T 100 60' fill='none' stroke='%23e6e2d8' stroke-width='0.5' /%3E%3Cpath d='M0 70 Q 25 45 50 70 T 100 70' fill='none' stroke='%23e6e2d8' stroke-width='0.5' /%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 w-full max-w-7xl mx-auto pt-24 pb-12">
        {/* LEFT COLUMN */}
        <div className="flex flex-col justify-between h-full space-y-12">
          <p className="text-[0.65rem] md:text-[0.7rem] tracking-[0.2em] leading-loose max-w-[400px] font-bold">
            maikanshi was created by a 130-year-old Japanese sake brewery.
          </p>

          <div className="flex gap-6 mt-8">
            <div className="flex flex-col items-center gap-3">
              {/* Seed / Oval */}
              <svg width="12" height="18" viewBox="0 0 12 18" fill="none" stroke="currentColor" strokeWidth="1">
                <ellipse cx="6" cy="9" rx="5" ry="8" />
              </svg>
              <span className="text-[0.65rem] tracking-widest">mai</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              {/* Leaf */}
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M7 1 C 12 5, 14 10, 7 17 C 0 10, 2 5, 7 1 Z" />
                <line x1="7" y1="1" x2="7" y2="17" />
              </svg>
              <span className="text-[0.65rem] tracking-widest">ka</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              {/* Drop */}
              <svg width="12" height="18" viewBox="0 0 12 18" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M6 1 C 6 1, 11 9, 11 13 C 11 16, 8 17, 6 17 C 4 17, 1 16, 1 13 C 1 9, 6 1, 6 1 Z" />
              </svg>
              <span className="text-[0.65rem] tracking-widest">sui</span>
            </div>
          </div>

          <div className="flex items-center gap-8 mt-auto pt-10">
            <div className="flex flex-col items-center">
              <span className={`${wind.className} text-4xl leading-none`}>m</span>
              <span className="text-[0.4rem] tracking-[0.3em] mt-1">*m*</span>
            </div>
            <span className="text-[0.65rem] tracking-[0.2em]">Nihonsakari Co., Ltd.</span>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col justify-between h-full space-y-10">
          <p className="text-[0.65rem] md:text-[0.7rem] tracking-[0.2em] leading-loose">
            maikanshi is a gentle connection between hands and nature, tradition and the everyday. Our name weaves together three elements at the heart of every formula:
          </p>

          <div className="flex flex-col gap-2 text-[0.65rem] md:text-[0.7rem] tracking-[0.2em] leading-relaxed">
            <p>&quot;mai&quot; (米) rice, a symbol of nourishment and timeless beauty</p>
            <p>&quot;ka&quot; (花) flowers, for their seasonal fragrance and quiet power</p>
            <p>&quot;sui&quot; (水) water, pure and essential for healthy skin</p>
          </div>

          <p className="text-[0.65rem] md:text-[0.7rem] tracking-[0.2em] leading-loose">
            We use natural ingredients with care, and package them with the same intention: embossed rice paper boxes, glass containers, and <strong className="font-bold">vegan-certified</strong> formulas made with kindness.
          </p>
        </div>
      </div>
    </div>
  );
}
