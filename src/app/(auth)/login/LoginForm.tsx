"use client";

import { useReducer, useState } from "react";
import {
  initialLoginState,
  loginFormReducer,
} from "@/features/loginForm/loginReducer";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loadingState } from "@/features/loginForm/loginReducerType";

export default function LoginForm() {
  const [formState, dispatch] = useReducer(loginFormReducer, initialLoginState);
  const [hoverRegister, setHoverRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsgs, setErrorMsgs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<loadingState>({
    currentState: "idle",
  });

  const router = useRouter();
  const login = async () => {
    setErrorMsgs([]);
    setIsLoading({ currentState: "loading" });
    const possErrorMsgs: string[] = [];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formState.email.length === 0 || !emailRegex.test(formState.email))
      possErrorMsgs.push("Please enter a valid email.");
    if (formState.password.length === 0)
      possErrorMsgs.push("Enter a password at least.");

    if (possErrorMsgs.length !== 0) {
      setErrorMsgs(possErrorMsgs);
      setIsLoading({ currentState: "idle" });
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formState.email,
        password: formState.password,
      });

      if (error) {
        possErrorMsgs.push("Your email or password was typed incorrectly.");
        setErrorMsgs(possErrorMsgs);
        setIsLoading({ currentState: "idle" });
        return;
      }

      if (data) {
        console.log("Login successful:", data);
        setIsLoading({ currentState: "success" });
        router.push("/"); // Redirect to home page after login
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred");
    }
  };

  const handleSubmit = () => {
    login();
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col h-1/2 justify-center items-center gap-8 w-full"
      >
        {errorMsgs.length !== 0 && (
          <div
            id="error-msgs"
            className="bg-red-50 border border-red-200 text-red-700 rounded-2xl w-fit max-w-1/2 flex flex-col justify-center items-start p-2"
          >
            <p className="self-center">Error!</p>
            {errorMsgs.map((errorMsg) => (
              <p key={errorMsg}> - {errorMsg}</p>
            ))}
          </div>
        )}
        <input
          type="text"
          value={formState.email}
          className="rounded-2xl px-1.5 py-2.5 bg-gray-100 w-1/2"
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "email",
              payload: e.target.value,
            })
          }
          placeholder="Email"
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
          />
          <motion.button
            className="absolute right-2 top-1/2 -translate-y-1/2 font-extralight cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              setShowPassword((p) => !p);
            }}
            whileHover={{
              scale: 1.05,
            }}
          >
            {`${showPassword ? "Hide" : "Show"}`}
          </motion.button>
        </div>

        <motion.button
          type="submit"
          className={`${
            isLoading.currentState !== "idle" ? "" : "cursor-pointer"
          }`}
          disabled={isLoading.currentState !== "idle"}
          whileHover={{
            opacity : 0.6
          }}
        >
          {(() => {
            switch (isLoading.currentState) {
              case "idle":
                return "Log in";
              case "loading":
                return "Loading in...";
              case "success":
                return "Success!";
            }
          })()}
        </motion.button>
      </form>
      <Link
        href="/forgotPassword">
          <motion.p
            whileHover={{
              opacity : 0.6
            }}
          >Forgot your password?</motion.p>
      </Link>
      <Link
        href="/signup"
        className="flex flex-col h-[25px] overflow-hidden cursor-pointer"
      >
        <motion.div
          onHoverStart={() => setHoverRegister(true)}
          onHoverEnd={() => setHoverRegister(false)}
          className="flex flex-col"
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
        </motion.div>
      </Link>
    </>
  );
}
