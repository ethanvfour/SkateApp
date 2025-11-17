"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducer, useRef, useState } from "react";
import {
  initialSignUpState,
  signUpFormReducer,
} from "@/features/signupForm/signupReducer";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { loadingState } from "@/features/loginForm/loginReducerType";
import clsx from "clsx";

/*

Username has to be greater than 4 characters

Usernames can only use letters, numbers, underscores and periods.

- Minimum 8 characters
- At least one letter
- At least one number
- Optional special character

*/

export default function SignUpForm() {
  const [hoverRegister, setHoverRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signUpSent, setSignUpSent] = useState(false);
  const [formState, dispatch] = useReducer(
    signUpFormReducer,
    initialSignUpState
  );

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9_.]+$/;

  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasNumber = /[0-9]/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  const [errorInForm, setErrorInForm] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [isLoading, setIsLoading] = useState<loadingState>({
    currentState: "idle",
  });

  const emailRef = useRef<HTMLInputElement>(null),
    usernameRef = useRef<HTMLInputElement>(null),
    passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const signup = async () => {
    setIsLoading({ currentState: "loading" });
    setErrorInForm(false);
    if (!isEmailValid() || !isUsernameValid() || !isPasswordValid()) {
      setErrorInForm(true);
      return;
    }
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

  const isEmailValid = (): boolean => emailRegex.test(formState.email);

  const isUsernameValid = (): boolean =>
    formState.username.length > 4 && usernameRegex.test(formState.username);

  const isPasswordValid = (): boolean =>
    formState.password.length >= 8 &&
    formState.password.length <= 50 &&
    hasUpperCase.test(formState.password) &&
    hasLowerCase.test(formState.password) &&
    hasNumber.test(formState.password) &&
    hasSpecialChar.test(formState.password);

  const handleSignUp = () => {
    signup();
  };
  return (
    <>
      <form
        id="sign-up-form"
        className="flex flex-col justify-center gap-6 items-center flex-1 w-full px-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
      >
        <div className="relative w-full flex items-start gap-3">
          <input
            type="text"
            value={formState.email}
            className="rounded-2xl px-3 py-3 bg-gray-100 flex-1"
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "email",
                payload: e.target.value,
              })
            }
            placeholder="Email"
            ref={emailRef}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
          {emailFocused && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className={clsx(
                "absolute left-full ml-3 top-0 rounded-lg px-3 py-2 text-xs whitespace-nowrap shadow-md border",
                {
                  "bg-red-50 border-red-200 text-red-700": !isEmailValid(),
                  "bg-green-50 border-green-200 text-green-700": isEmailValid(),
                }
              )}
            >
              <p>
                {isEmailValid()
                  ? "Email is good!"
                  : formState.email.length === 0
                  ? "Email is required"
                  : "Invalid email format"}
              </p>
            </motion.div>
          )}
        </div>

        <div className="relative w-full flex items-start gap-3">
          <input
            type="text"
            value={formState.username}
            className="rounded-2xl px-3 py-3 bg-gray-100 flex-1"
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "username",
                payload: e.target.value,
              })
            }
            placeholder="Username"
            ref={usernameRef}
            onFocus={() => setUsernameFocused(true)}
            onBlur={() => setUsernameFocused(false)}
          />
          {usernameFocused && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className={clsx(
                "absolute left-full ml-3 top-0 rounded-lg px-3 py-2 text-xs whitespace-nowrap shadow-md border",
                {
                  "bg-red-50 border-red-200 text-red-700": !isUsernameValid(),
                  "bg-green-50 border-green-200 text-green-700":
                    isUsernameValid(),
                }
              )}
            >
              {(() => {
                //placeholder
                // check if username exists, make sure to add that thing where its like only do it if after 1.5 seconds the username doesn't change yk
                if (false) return <p>{"Username already taken"}</p>;

                if (formState.username.length <= 4)
                  return <p>{"Username length has to be greater than 4"}</p>;

                if (!usernameRegex.test(formState.username))
                  return (
                    <p>
                      {
                        "Usernames can only use letters, numbers, underscores and periods."
                      }
                    </p>
                  );

                return <p>{"Good username!"}</p>;
              })()}
            </motion.div>
          )}
        </div>

        <div className="relative w-full flex items-start gap-3">
          <div id="passwordInput" className="relative flex-1">
            <input
              type={showPassword ? "text" : "password"}
              value={formState.password}
              className="rounded-2xl px-3 py-3 pr-16 bg-gray-100 w-full"
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "password",
                  payload: e.target.value,
                })
              }
              placeholder="Password"
              ref={passwordRef}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <motion.button
              className="absolute right-3 top-1/2 -translate-y-1/2 font-extralight cursor-pointer text-sm"
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
          {passwordFocused && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className={clsx(
                "absolute left-full ml-3 top-0 rounded-lg px-3 py-2 text-xs shadow-md border",
                {
                  "bg-red-50 border-red-200": !isPasswordValid(),
                  "bg-green-50 border-green-200": isPasswordValid(),
                }
              )}
            >
              <div className="space-y-1">
                <p
                  className={clsx("flex items-center gap-1.5", {
                    "text-green-600":
                      formState.password.length >= 8 &&
                      formState.password.length <= 50,
                    "text-red-600":
                      formState.password.length < 8 ||
                      formState.password.length > 50,
                  })}
                >
                  {formState.password.length >= 8 &&
                  formState.password.length <= 50
                    ? "✓"
                    : "✗"}{" "}
                  8-50 characters
                </p>
                <p
                  className={clsx("flex items-center gap-1.5", {
                    "text-green-600": hasUpperCase.test(formState.password),
                    "text-red-600": !hasUpperCase.test(formState.password),
                  })}
                >
                  {hasUpperCase.test(formState.password) ? "✓" : "✗"} One
                  uppercase letter
                </p>
                <p
                  className={clsx("flex items-center gap-1.5", {
                    "text-green-600": hasLowerCase.test(formState.password),
                    "text-red-600": !hasLowerCase.test(formState.password),
                  })}
                >
                  {hasLowerCase.test(formState.password) ? "✓" : "✗"} One
                  lowercase letter
                </p>
                <p
                  className={clsx("flex items-center gap-1.5", {
                    "text-green-600": hasNumber.test(formState.password),
                    "text-red-600": !hasNumber.test(formState.password),
                  })}
                >
                  {hasNumber.test(formState.password) ? "✓" : "✗"} One number
                </p>
                <p
                  className={clsx("flex items-center gap-1.5", {
                    "text-green-600": hasSpecialChar.test(formState.password),
                    "text-red-600": !hasSpecialChar.test(formState.password),
                  })}
                >
                  {hasSpecialChar.test(formState.password) ? "✓" : "✗"} One
                  special character
                </p>
              </div>
            </motion.div>
          )}
        </div>
        <motion.button
          type="submit"
          className="cursor-pointer mt-2 px-6 py-2.5 bg-black text-white rounded-2xl font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Sign up
        </motion.button>
        {errorInForm && (
          <div className="bg-red-50 border-red-200 text-red-700 text-center p-2 rounded-2xl">
            <p>One of more input fields was not done correctly!</p>
          </div>
        )}
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
            {"Let's get back in then"}
          </motion.p>
        </motion.div>
      </Link>
    </>
  );
}
