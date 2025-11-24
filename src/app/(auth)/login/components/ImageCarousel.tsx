"use client";

import { useEffect, useState } from "react";
import { skaterPhotos } from "@/features/photosArray";
import Image from "next/image";

export default function ImageCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const nextPhoto = () =>
      setIndex((p) => (p === skaterPhotos.length - 1 ? 0 : p + 1));

    const photoWheel = setInterval(nextPhoto, 4000);

    return () => {
      clearInterval(photoWheel);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {skaterPhotos.map((photo, i) => (
        <Image
          key={i}
          src={photo}
          alt="Photo of a skater"
          fill
          className={`object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          priority={i === 0}
        />
      ))}
      <div className="absolute inset-0 bg-black/20" /> {/* Overlay for better text contrast if needed, or just style */}
    </div>
  );
}
