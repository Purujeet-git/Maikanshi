"use client";

import { Scene } from "../types/scene";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import Hotspot from "./Hotspot";
import Timeline from "./Timeline";
import ProductPopup, { ProductInfo } from "./ProductPopup";

import { getSceneByTime } from "@/utils/getSceneByTime";
import { scenes } from "../data/scenes";
import ProductHighlight from "./ProductHighlight";
import { AnimatePresence, motion } from "framer-motion";

interface HeroSceneProps {
  scene: Scene;
  isAboutVisible?: boolean;
}

export default function HeroScene({
  scene,
  isAboutVisible = false,
}: HeroSceneProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductInfo | null>(null);

  const timezone =
    Intl.DateTimeFormat()
      .resolvedOptions()
      .timeZone;

  const city =
    timezone.split("/")[1]
      ?.replace("_", " ");

  const currentTime = new Intl.DateTimeFormat(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  ).format(new Date());

  const initialVideo = (() => {
    const hour = Number(
      new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        hour12: false,
        timeZone: timezone,
      }).format(new Date())
    );

    return getSceneByTime(hour);
  })();

  const initialScene =
    scenes.find(
      (scene) =>
        scene.video === initialVideo
    ) || scenes[0];

  const [currentScene, setCurrentScene] =
    useState(initialScene);

  useEffect(() => {
    if (!contentRef.current) return;

    gsap.fromTo(
      contentRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      }
    );
  }, [currentScene]);

  // Handle slide down effect when About is visible
  useEffect(() => {
    if (!containerRef.current) return;
    
    // We want the hero to slide down and its top corners to become clipped/rounded
    if (isAboutVisible) {
      gsap.to(containerRef.current, {
        y: "55vh",
        scale: 0.95,
        borderTopLeftRadius: "24px",
        borderTopRightRadius: "24px",
        duration: 0.85,
        ease: "power3.inOut"
      });
    } else {
      gsap.to(containerRef.current, {
        y: "0vh",
        scale: 1,
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        duration: 0.85,
        ease: "power3.inOut"
      });
    }
  }, [isAboutVisible]);

  const isNight =
    currentScene.video.includes(
      "night"
    ) ||
    currentScene.video.includes(
      "evening"
    );

  return (
    <section 
      ref={containerRef}
      className="absolute inset-0 z-10 h-screen w-full overflow-hidden origin-bottom bg-black will-change-transform"
    >
      <AnimatePresence mode="wait">
        <motion.video
          key={currentScene.video}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          initial={{
            opacity: 0,
            scale: 1.05,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.98,
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <source
            src={currentScene.video}
            type="video/mp4"
          />
        </motion.video>
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/10" />

      {currentScene.hotspots.map(
        (hotspot, index) => (
          <Hotspot
            key={hotspot.id}
            x={hotspot.x}
            y={hotspot.y}
            onClick={() => setSelectedProduct(currentScene.products[index] as ProductInfo)}
          />
        )
      )}

      {currentScene.products.map((product) => (
        <div key={product.id} className="cursor-pointer" onClick={() => setSelectedProduct(product as ProductInfo)}>
          <ProductHighlight
              image={product.image}
              x={product.x}
              y={product.y}
          />
        </div>
      ))}

      {selectedProduct && (
        <ProductPopup 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      <div
        ref={contentRef}
        className="absolute bottom-24 right-20 z-40"
      >
        <div className="bg-black px-10 py-4 text-white">
          {city} — {currentTime}
        </div>
      </div>

      <Timeline
        currentScene={currentScene}
        setCurrentScene={
          setCurrentScene
        }
      />
    </section>
  );
}