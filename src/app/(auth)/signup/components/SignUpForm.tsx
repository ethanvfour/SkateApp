"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducer, useRef, useState } from "react";
import {
  initialSignUpState,
  signUpFormReducer,
} from "@/features/signupForm/signupReducer";
import { createClient } from "@/utils/client";
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
  const supabase = createClient();

  const signup = async () => {
    setIsLoading({ currentState: "loading" });
    setErrorInForm(false);
    if (!isEmailValid() || !isUsernameValid() || !isPasswordValid()) {
      setIsLoading({ currentState: "idle" });
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
        setIsLoading({ currentState: "idle" });
        alert(`Signup failed: ${error.message}`);
        return;
      }

      if (data) {
        console.log("Signup successful:", data);

        // Check if email confirmation is required
        if (data.user && !data.session) {
          setSignUpSent(true);
          alert("Please check your email to confirm your account!");
          setIsLoading({ currentState: "success" });
          return;
        } else {
          // Auto-login successful, redirect to home
          //alert("Signup successful!");
          router.push("/login");
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred");
    }
    setIsLoading({ currentState: "idle" });
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
    <div className="w-full flex flex-col gap-6">
      <form
        id="sign-up-form"
        className="flex flex-col w-full gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
      >
        {errorInForm && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg w-full p-3 text-sm">
            <p className="font-medium">Please check your inputs</p>
            <p className="text-xs mt-1">One or more fields are incorrect.</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="relative w-full">
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
              ref={emailRef}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
            {emailFocused && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={clsx(
                  "absolute z-10 left-0 right-0 mt-2 rounded-lg p-3 text-xs shadow-lg border bg-white",
                  {
                    "border-red-200 text-red-700": !isEmailValid(),
                    "border-green-200 text-green-700": isEmailValid(),
                  }
                )}
              >
                <p>
                  {isEmailValid()
                    ? "Email looks good!"
                    : formState.email.length === 0
                    ? "Email is required"
                    : "Please enter a valid email address"}
                </p>
              </motion.div>
            )}
          </div>

          <div className="relative w-full">
            <input
              type="text"
              value={formState.username}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={clsx(
                  "absolute z-10 left-0 right-0 mt-2 rounded-lg p-3 text-xs shadow-lg border bg-white",
                  {
                    "border-red-200 text-red-700": !isUsernameValid(),
                    "border-green-200 text-green-700": isUsernameValid(),
                  }
                )}
              >
                {(() => {
                  if (formState.username.length <= 4)
                    return <p>Username must be longer than 4 characters</p>;

                  if (!usernameRegex.test(formState.username))
                    return (
                      <p>
                        Only letters, numbers, underscores and periods allowed.
                      </p>
                    );

                  return <p>Great username!</p>;
                })()}
              </motion.div>
            )}
          </div>

          <div className="relative w-full">
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
                ref={passwordRef}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
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
            {passwordFocused && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={clsx(
                  "absolute z-10 left-0 right-0 mt-2 rounded-lg p-3 text-xs shadow-lg border bg-white",
                  {
                    "border-red-200": !isPasswordValid(),
                    "border-green-200": isPasswordValid(),
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
        </div>

        <motion.button
          type="submit"
          className={`w-full bg-black text-white rounded-lg py-3 font-medium transition-all mt-2 ${
            isLoading.currentState !== "idle"
              ? "opacity-70 cursor-not-allowed"
              : "hover:bg-gray-800"
          }`}
          disabled={isLoading.currentState !== "idle"}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading.currentState === "loading"
            ? "Creating account..."
            : "Sign up"}
        </motion.button>
      </form>

      <div className="text-center text-sm text-gray-600">
        Have an account already?{" "}
        <Link href="/login" className="font-medium text-black hover:underline">
          Log in
        </Link>
      </div>
    </div>
  );
}
