"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducer, useState } from "react";
import {
  initialSignUpState,
  signUpFormReducer,
} from "@/features/signupForm/signupReducer";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [hoverRegister, setHoverRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signUpSent, setSignUpSent] = useState(false);
  const [formState, dispatch] = useReducer(
    signUpFormReducer,
    initialSignUpState
  );

  const router = useRouter();

  const signup = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formState.email,
        password: formState.password,
        options: {
          data: {
            username: formState.username, // Store username in user metadata
          },
        },
      });

      if (error) {
        console.error("Signup error:", error);
        alert(`Signup failed: ${error.message}`);
        return;
      }

      if (data) {
        console.log("Signup successful:", data);

        // Check if email confirmation is required
        if (data.user && !data.session) {
          setSignUpSent(true);
          alert("Please check your email to confirm your account!");
        } else {
          // Auto-login successful, redirect to home
          alert("Signup successful!");
          router.push("/login");
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred");
    }
  };

  const handleSignUp = () => {
    signup();
  };
  return (
    <>
      <form
        id="sign-up-form"
        className="flex flex-col justify-center gap-10 items-center flex-1"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
      >
        <input
          type="email"
          value={formState.email}
          className="rounded-2xl px-1.5 py-2.5 bg-gray-100 w-full"
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "email",
              payload: e.target.value,
            })
          }
          placeholder="Email"
          required
        />

        <input
          type="email"
          value={formState.username}
          className="rounded-2xl px-1.5 py-2.5 bg-gray-100 w-full"
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

        <div id="passwordInput" className="relative w-full flex justify-center">
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
        <motion.button type="submit" className="cursor-pointer">
          Sign up
        </motion.button>
      </form>
      <Link
        href="/login"
        className="flex flex-col h-[25px] overflow-hidden cursor-pointer mb-2"
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
            {"Have an account already?"}
          </motion.p>
          <motion.p
            className="h-[25px] transition-transform duration-100 ease-in"
            style={{
              transform: `translateY(${hoverRegister ? "-25px" : "50px"})`,
            }}
          >
            {"Let's get back then"}
          </motion.p>
        </motion.div>
      </Link>
    </>
  );
}
