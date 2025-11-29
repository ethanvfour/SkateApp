"use client";

import { nav } from "framer-motion/client";
import { useEffect, useState } from "react";

export default function MapSpots() {
  // Default to New York City
  const [lat, setLat] = useState(40.7128);
  const [lng, setLng] = useState(-74.006);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat(pos.coords.latitude);
          setLng(pos.coords.longitude);
        }
      );
    }
  }, []);

  return (
    <>
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">
          Discover Spots Nearby
        </h2>
        <p className="text-lg text-gray-500">
          Explore new skate parks around your location.
        </p>
        <p className="text-sm text-gray-500">Soon to add user custom spots</p>
      </div>
      <div id="map">
        <iframe
          width="600"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/search?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=skate+park&center=${lat},${lng}&zoom=12`}
        ></iframe>
      </div>
    </>
  );
}
