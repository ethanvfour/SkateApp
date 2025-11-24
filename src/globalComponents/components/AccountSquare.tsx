"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import { useCallback, useState } from "react";
import { createClient } from "@/utils/client";

export default function AccountSquare() {
  const usernameTemp = "skater111";

  const supabase = createClient();

  const [profileVisible, setProfileVisible] = useState(false);
  const [errorLoggingOut, setErrorLoggingOut] = useState(false);

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
  }, [supabase]);

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setProfileVisible(true)}
        whileHover={{ scale: 1.05 }}
        className="w-[50px] h-[50px] cursor-pointer"
      >
        <CgProfile className="w-full h-full" />
      </motion.button>
      <h4>{usernameTemp}</h4>
      <AnimatePresence>
        {profileVisible && (
          <motion.div
            id="profile"
            className="absolute top-16 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
          >
            <div className="p-6 flex flex-col items-center border-b border-gray-100 relative">
              <motion.button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setProfileVisible(false)}
              >
                <RxCross1 size={18} />
              </motion.button>

              <div className="h-20 w-20 rounded-full bg-gray-800 shadow-md mb-3 flex items-center justify-center text-white text-3xl font-bold">
                {usernameTemp.charAt(0).toUpperCase()}
              </div>
              <h4 className="font-bold text-lg text-gray-900">
                {usernameTemp}
              </h4>
            </div>

            <div className="p-3 bg-gray-50">
              <motion.button
                onClick={handleSignOut}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white border border-gray-200 text-red-600 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-red-50 hover:border-red-100 transition-colors shadow-sm"
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
                    className="text-center font-bold text-xs text-red-600 overflow-hidden"
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
