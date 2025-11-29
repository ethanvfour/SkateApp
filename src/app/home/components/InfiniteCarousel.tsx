"use client";
import { motion } from "framer-motion";

const items = [
  "TRENDING POSTS",
  "TRENDING POSTS",
  "TRENDING POSTS",
  "TRENDING POSTS",
  "TRENDING POSTS",
];

export default function InfiniteCarousel() {
  return (
    <div className="overflow-hidden w-full bg-black py-2 flex">
      <motion.div
        className="flex justify-around items-center gap-1 pr-1"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ minWidth: "100%" }}
      >
        {[...items].map((text, i) => (
          <h1
            key={i}
            className="mr-8 text-2xl font-bold text-white inline-block whitespace-nowrap"
          >
            {text}
          </h1>
        ))}
      </motion.div>
      <motion.div
        aria-hidden
        className="flex justify-around items-center gap-1 pr-1"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ minWidth: "100%" }}
      >
        {[...items].map((text, i) => (
          <h1
            key={i}
            className="mr-8 text-2xl font-bold text-white inline-block whitespace-nowrap"
          >
            {text}
          </h1>
        ))}
      </motion.div>
    </div>
  );
}
