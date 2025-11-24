"use client";

import { useAnimate, stagger } from "framer-motion";
import { useEffect } from "react";

export default function StatsCounterRight() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const animateStats = async () => {
      await animate(
        ".stat-item",
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.5, delay: stagger(0.2) }
      );
    };

    animateStats();
  }, [animate]);

  return (
    <div
      ref={scope}
      className="w-full h-full bg-black text-white p-12 flex flex-col justify-center gap-12"
      id="rightSideStats"
    >
      <div className="space-y-4">
        <h2 className="text-5xl font-bold tracking-tight leading-tight">
          JOIN A GROWING
          <br />
          <span className="text-6xl text-gray-200">COMMUNITY</span>
        </h2>
        <p className="text-gray-400 text-lg">of passionate skaters worldwide</p>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col gap-1 stat-item" style={{ opacity: 0 }}>
          <p className="text-2xl font-semibold">
            <span className="text-white text-3xl font-bold">1000+</span> spots
          </p>
          <p className="text-base text-gray-400">
            Discover hidden gems in your city
          </p>
        </div>

        <div className="flex flex-col gap-1 stat-item" style={{ opacity: 0 }}>
          <p className="text-2xl font-semibold">Share your clips</p>
          <p className="text-base text-gray-400">
            Show the community your best moves
          </p>
        </div>

        <div className="flex flex-col gap-1 stat-item" style={{ opacity: 0 }}>
          <p className="text-2xl font-semibold">Map the scene</p>
          <p className="text-base text-gray-400">
            Add spots for others to find
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-500 italic mt-auto">
        ...or keep your spots secret 😏
      </p>
    </div>
  );
}
