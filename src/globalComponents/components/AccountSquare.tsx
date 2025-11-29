"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/client";
import { useUser } from "@/hooks/useUser";
const supabase = createClient();

export default function AccountSquare() {
  
  const [profileVisible, setProfileVisible] = useState(false);
  const [errorLoggingOut, setErrorLoggingOut] = useState(false);

  const {username} = useUser();

  const handleSignOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setErrorLoggingOut(true);
      const setItFalse = () => {
        setErrorLoggingOut(false);
      };

      setTimeout(setItFalse, 3000);

      return;
    }

    window.location.href = "/login";
  }, []);

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setProfileVisible(true)}
        whileHover={{ scale: 1.05 }}
        className="w-[50px] h-[50px] cursor-pointer bg-white text-black border-2 border-black rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
      >
        {username ? (
          <span className="font-bold text-xl uppercase">
            {username.charAt(0)}
          </span>
        ) : (
          <CgProfile className="w-8 h-8" />
        )}
      </motion.button>
      
      <AnimatePresence>
        {profileVisible && (
          <motion.div
            id="profile"
            className="absolute top-16 right-0 w-72 bg-white border-2 border-black rounded-xl shadow-xl z-50 overflow-hidden"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
          >
            <div className="p-6 flex flex-col items-center border-b-2 border-black relative bg-white">
              <motion.button
                className="absolute top-2 right-2 text-black hover:text-red-600 p-1 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setProfileVisible(false)}
              >
                <RxCross1 size={20} />
              </motion.button>

              <div className="h-20 w-20 border-2 border-black bg-black text-white mb-3 flex items-center justify-center text-3xl font-bold uppercase rounded-full shadow-md">
                {username ? username.charAt(0).toUpperCase() : "?"}
              </div>
              <h4 className="font-bold text-xl uppercase tracking-tight text-black">
                {username || "Guest"}
              </h4>
            </div>

            <div className="p-4 bg-white">
              <motion.button
                onClick={handleSignOut}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-red-600 border-2 border-black text-white px-4 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide shadow-md hover:shadow-lg transition-all"
              >
                Log Out
              </motion.button>
              <AnimatePresence>
                {errorLoggingOut && (
                  <motion.h4
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      marginTop: "0.5rem",
                    }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="text-center font-bold uppercase text-xs text-red-600 overflow-hidden"
                  >
                    Error logging out!
                  </motion.h4>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
