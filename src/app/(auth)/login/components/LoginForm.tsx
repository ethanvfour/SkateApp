"use client";

import { useReducer, useState } from "react";
import {
  initialLoginState,
  loginFormReducer,
} from "@/features/loginForm/loginReducer";
import { motion } from "framer-motion";
import { createClient } from "@/utils/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loadingState } from "@/features/loginForm/loginReducerType";

export default function LoginForm() {
  const [formState, dispatch] = useReducer(loginFormReducer, initialLoginState);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsgs, setErrorMsgs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<loadingState>({
    currentState: "idle",
  });

  const router = useRouter();
  const supabase = createClient();
  
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
        window.location.href = "/";
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
    <div className="w-full flex flex-col gap-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col w-full gap-4"
      >
        {errorMsgs.length !== 0 && (
          <div
            id="error-msgs"
            className="bg-red-50 border border-red-200 text-red-600 rounded-lg w-full p-3 text-sm"
          >
            <p className="font-medium">Error</p>
            <ul className="list-disc list-inside">
              {errorMsgs.map((errorMsg) => (
                <li key={errorMsg}>{errorMsg}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="space-y-4">
          <input
            type="text"
            value={formState.email}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "email",
                payload: e.target.value,
              })
            }
            placeholder="Email address"
          />
          
          <div id="passwordInput" className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              value={formState.password}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-16 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "password",
                  payload: e.target.value,
                })
              }
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-800 font-medium"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword((p) => !p);
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <Link
            href="/forgotPassword"
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <motion.button
          type="submit"
          className={`w-full bg-black text-white rounded-lg py-3 font-medium transition-all ${
            isLoading.currentState !== "idle" ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800"
          }`}
          disabled={isLoading.currentState !== "idle"}
          whileTap={{ scale: 0.98 }}
        >
          {(() => {
            switch (isLoading.currentState) {
              case "idle":
                return "Log in";
              case "loading":
                return "Logging in...";
              case "success":
                return "Success!";
            }
          })()}
        </motion.button>
      </form>

      <div className="text-center text-sm text-gray-600">
        Don't have an account yet?{" "}
        <Link href="/signup" className="font-medium text-black hover:underline">
          Let's sign up
        </Link>
      </div>
    </div>
  );
}
