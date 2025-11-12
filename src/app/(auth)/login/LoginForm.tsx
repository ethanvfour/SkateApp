"use client";

import { useReducer, useState } from "react";
import {
  initialLoginState,
  loginFormReducer,
} from "@/features/loginForm/loginReducer";
import { motion } from "framer-motion";

export default function LoginForm() {
  const [formState, dispatch] = useReducer(loginFormReducer, initialLoginState);
  const [hoverRegister, setHoverRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    alert(1);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex flex-col h-1/2 justify-center items-center gap-8 w-full"
    >
      <input
        type="text"
        value={formState.username}
        className="rounded-2xl px-1.5 py-2.5 bg-gray-100 w-1/2"
        onChange={(e) =>
          dispatch({
            type: "SET_FIELD",
            field: "username",
            payload: e.target.value,
          })
        }
        placeholder="Username"
        required
      />
      <div id="passwordInput" className="relative w-1/2 flex justify-center">
        <input
          type={showPassword ? "text" : "password"}
          value={formState.password}
          className="rounded-2xl px-1.5 py-2.5 pr-16 bg-gray-100 w-full"
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "password",
              payload: e.target.value,
            })
          }
          placeholder="Password"
          required
        ></input>
        <motion.button
          className="absolute right-2 top-1/2 -translate-y-1/2 font-extralight"
          onClick={(e) => {
            e.preventDefault();
            setShowPassword((p) => !p);
          }}
          whileHover={{
            scale: 1.05
          }}
        >
            {`${showPassword ? "Hide" : "Show"}`}
        </motion.button>
      </div>

      <motion.button type="submit" className="cursor-pointer">
        Log in
      </motion.button>

      <motion.button
        onClick={(e) => {
            e.preventDefault();
        }}
        className="flex flex-col h-[25px] overflow-hidden cursor-pointer"
        onHoverStart={() => setHoverRegister(true)}
        onHoverEnd={() => setHoverRegister(false)}
      >
        <motion.p
          className="h-[25px] transition-transform duration-100 ease-in"
          style={{
            transform: `translateY(${hoverRegister ? "-25px" : "0px"})`,
          }}
        >
          {"Don't have an account yet?"}
        </motion.p>
        <motion.p
          className="h-[25px] transition-transform duration-100 ease-in"
          style={{
            transform: `translateY(${hoverRegister ? "-25px" : "50px"})`,
          }}
        >
          {"Let's change that"}
        </motion.p>
      </motion.button>
    </form>
  );
}
