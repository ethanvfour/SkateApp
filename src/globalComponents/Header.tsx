"use client";

import Image from "next/image";
import spotsLogo from "../app/images/Spots_logo_black.png";
import AccountSquare from "./components/AccountSquare";
import NavLinks from "./components/NavLinks";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";
import { useRef, useState } from "react";

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const prevY = useRef(0);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest === 0) {
      setHidden(false);
    }
    if (latest > prevY.current + 10) {
      setHidden(true); // scrolling down
    } else if (latest < prevY.current - 10) {
      setHidden(false); // scrolling up
    }
    prevY.current = latest;
  });

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={hidden ? { y: -80, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full sticky top-0 z-40 bg-black"
    >
      <div
        id="header-top"
        className="flex justify-center items-center px-6 py-3 max-w-7xl mx-auto"
      >
        <div className="bg-white p-3 flex justify-center items-center">
          <h1 className="font-extrabold text-xl">SPOTS</h1>
          <div className="relative h-[50px] w-[50px]">
            <Image
              src={spotsLogo}
              alt="Spots Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <NavLinks />
        </div>

        <div className="flex justify-end items-center relative gap-5">
          <AccountSquare />
        </div>
      </div>
    </motion.header>
  );
}
