"use client";

import { useState } from "react";
import { Scene } from "../types/scene";
import { scenes } from "../data/scenes";

interface TimelineProps {
  currentScene: Scene;
  setCurrentScene: React.Dispatch<
    React.SetStateAction<Scene>
  >;
}

export default function Timeline({
  currentScene,
  setCurrentScene,
}: TimelineProps) {
  const [hoveredIndex, setHoveredIndex] =
    useState<number | null>(null);

  const bars = Array.from({ length: 96 });

  const userTimezone =
    Intl.DateTimeFormat()
      .resolvedOptions()
      .timeZone;

  const now = new Date();

  const localHour = Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: userTimezone,
    }).format(now)
  );

  const localMinute = Number(
    new Intl.DateTimeFormat("en-US", {
      minute: "numeric",
      timeZone: userTimezone,
    }).format(now)
  );

  const totalMinutes =
    localHour * 60 + localMinute;

  const percentage =
    (totalMinutes / 1440) * 100;

  return (
    <div className="absolute bottom-0 left-0 z-40 w-full px-6 pb-4">
      <div
        className="relative flex items-end w-full gap-[2px]"
        onMouseLeave={() => {
          setHoveredIndex(null);
        }}
      >
        {bars.map((_, index) => {
          const firstThird =
            bars.length / 3;

          const secondThird =
            (bars.length / 3) * 2;

          const distance =
            hoveredIndex === null
              ? 999
              : Math.abs(
                  hoveredIndex - index
                );

          let height = 20;

          if (distance === 0)
            height = 70;
          else if (distance === 1)
            height = 50;
          else if (distance === 2)
            height = 35;

          return (
            <div
              key={index}
              onMouseEnter={() => {
                setHoveredIndex(index);

                if (
                  index < firstThird
                ) {
                  setCurrentScene(
                    scenes[0]
                  );
                } else if (
                  index < secondThird
                ) {
                  setCurrentScene(
                    scenes[1]
                  );
                } else {
                  setCurrentScene(
                    scenes[2]
                  );
                }
              }}
              className="w-[2px] bg-white/70 transition-all duration-300 ease-out"
              style={{
                height,
              }}
            />
          );
        })}

        {/* NOW Marker */}
        <div
          className="absolute bottom-0"
          style={{
            left: `${percentage}%`,
          }}
        >
          <div className="h-16 w-[1px] bg-white" />

          
        </div>
      </div>
    </div>
  );
}