"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ProfileHeader({
  profileName,
}: {
  profileName: string;
}) {
  const [followers] = useState(() => Math.floor(Math.random() * 500001));
  const [following] = useState(() => Math.floor(Math.random() * 500001));
  const [hasProfilePicture, setHasProfilePicture] = useState<boolean>(false);
  useEffect(() => {
    /*
            fetching user data, like background image, and profile image
        */
    // You can fetch and update followerCount here if needed from an API
  }, []);

  return (
    <div className="relative w-full h-[200px] border bg-linear-to-br from-[#6a2e64] to-[#a209af]">
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="absolute bottom-0 left-1/8 w-1/4 h-fit bg-black text-white flex flex-row justify-around items-end px-2 pt-3"
      >
        <div className="flex flex-col items-center">
          <div className="h-[25px] w-[25px] rounded-4xl self-start bg-white text-black">
            <p className="text-center font-bold">{profileName.charAt(0)}</p>
          </div>
          <h1 className="text-2xl font-extrabold italic">{profileName}</h1>
        </div>
        <div className="flex flex-col items-start justify-center">
          <p className="text-sm italic">{`followers: ${followers}`}</p>
          <p className="text-sm italic">{`following: ${following}`}</p>
        </div>
      </motion.div>
    </div>
  );
}
