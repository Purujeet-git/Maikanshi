"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import HeroScene from "./components/HeroScene";
import { scenes } from "./data/scenes";
import Loader from "./components/Loader";
import AboutSection from "./components/AboutSection";
import Navbar from "./components/NavBar";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const lastScrollTime = useRef(0);

  // Scroll / wheel event listener
  useEffect(() => {
    const THROTTLE_MS = 800;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < THROTTLE_MS) return;
      lastScrollTime.current = now;

      if (e.deltaY > 0) {
        setIsAboutVisible(true);
      } else if (e.deltaY < 0) {
        setIsAboutVisible(false);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < THROTTLE_MS) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;

      if (Math.abs(diff) < 40) return; // ignore small swipes

      lastScrollTime.current = now;

      if (diff > 0) {
        setIsAboutVisible(true);
      } else {
        setIsAboutVisible(false);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const handleToggle = () => setIsAboutVisible((prev) => !prev);
    window.addEventListener("toggleAboutSection", handleToggle);
    return () => window.removeEventListener("toggleAboutSection", handleToggle);
  }, []);
  
  const isNight = scenes[activeIndex].video.includes("night") || scenes[activeIndex].video.includes("evening");

  return(
    <main className="relative w-full h-screen overflow-hidden bg-[#f7f5f0]">
      {/* Background About Section */}
      <AboutSection />

      {/* Main Hero that slides down */}
      <HeroScene scene={scenes[activeIndex]} isAboutVisible={isAboutVisible} />

      {/* Fixed Navbar on top */}
      <Navbar isNight={isNight} isAboutVisible={isAboutVisible} />

      {loading && (
        <Loader
          onComplete={() => setLoading(false)}
        />
      )}
    </main>
  )
}