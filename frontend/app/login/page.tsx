"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import InteractiveCharacters from "@/components/InteractiveCharacters";
import { login } from "@/lib/services/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] =
    useState(false);

  const [loading, setLoading] = useState(false);

  /*
    Every wrong login increases this number.

    Example:

    0 → normal
    1 → shake
    2 → shake again
    3 → shake again
  */
  const [loginError, setLoginError] = useState(0);

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await login(
        email,
        password
      );

      localStorage.setItem(
        "token",
        data.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert("Login Successful!");

      router.push("/dashboard");

    } catch (error: any) {
      console.error(error);

      /*
        Trigger the head-shake animation.
      */
      setLoginError(
        (previous) => previous + 1
      );

      alert(
        error?.response?.data?.detail ||
        "Invalid email or password."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="
        min-h-screen
        bg-[#F1F2F4]
        flex
        items-center
        justify-center
        p-4
      "
    >

      <div
        className="
          w-full
          max-w-5xl
          min-h-[600px]
          bg-white
          rounded-[28px]
          shadow-[0_25px_70px_rgba(0,0,0,0.12)]
          overflow-hidden
          grid
          grid-cols-1
          md:grid-cols-2
        "
      >

        {/* ================================================= */}
        {/* LEFT SIDE - CHARACTERS */}
        {/* ================================================= */}

        <div
          className="
            bg-[#F7F8FA]
            border-r
            border-gray-100
            flex
            items-center
            justify-center
            p-8
          "
        >

          <InteractiveCharacters
            isPasswordFocused={
              isPasswordFocused
            }
            showPassword={
              showPassword
            }
            loginError={
              loginError
            }
          />

        </div>


        {/* ================================================= */}
        {/* RIGHT SIDE - LOGIN */}
        {/* ================================================= */}

        <div
          className="
            p-8
            sm:p-12
            md:p-14
            flex
            flex-col
            justify-center
          "
        >

          {/* HEADER */}

          <div className="text-center mb-8">

            <h1
              className="
                text-3xl
                sm:text-4xl
                font-bold
                text-gray-900
                tracking-tight
              "
            >
              Welcome back!
            </h1>

            <p
              className="
                text-sm
                text-gray-500
                mt-2
              "
            >
              Login to your AI Study Assistant
            </p>

          </div>


          {/* FORM */}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* EMAIL */}

            <div>

              <label
                htmlFor="email"
                className="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  mb-2
                "
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="anna@gmail.com"
                autoComplete="email"
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  text-gray-900
                  placeholder:text-gray-400
                  outline-none
                  transition
                  focus:border-black
                  focus:ring-2
                  focus:ring-black/10
                "
              />

            </div>


            {/* PASSWORD */}

            <div>

              <label
                htmlFor="password"
                className="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  mb-2
                "
              >
                Password
              </label>

              <div className="relative">

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  required
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  onFocus={() =>
                    setIsPasswordFocused(true)
                  }
                  onBlur={() =>
                    setIsPasswordFocused(false)
                  }
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="
                    w-full
                    px-4
                    py-3
                    pr-16
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    text-gray-900
                    placeholder:text-gray-400
                    outline-none
                    transition
                    focus:border-black
                    focus:ring-2
                    focus:ring-black/10
                  "
                />

                {/* SHOW / HIDE */}

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (previous) =>
                        !previous
                    )
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-xs
                    font-semibold
                    text-gray-500
                    hover:text-black
                    transition
                  "
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

            </div>


            {/* FORGOT PASSWORD */}

            <div
              className="
                flex
                justify-end
                text-sm
              "
            >

              <Link
                href="/forgot-password"
                className="
                  text-gray-500
                  hover:text-gray-900
                  hover:underline
                "
              >
                Forgot password?
              </Link>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-black
                text-white
                py-3.5
                rounded-xl
                font-semibold
                text-sm
                transition
                hover:bg-gray-800
                active:scale-[0.99]
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading
                ? "Logging in..."
                : "Log in"}
            </button>


            {/* GOOGLE */}

            <button
              type="button"
              className="
                w-full
                border
                border-gray-200
                text-gray-700
                py-3.5
                rounded-xl
                font-medium
                hover:bg-gray-50
                transition
                flex
                items-center
                justify-center
                gap-3
                text-sm
              "
            >

              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >

                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />

                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />

                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />

                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />

              </svg>

              Log in with Google

            </button>

          </form>


          {/* SIGNUP */}

          <p
            className="
              text-center
              text-sm
              text-gray-500
              mt-7
            "
          >
            Don't have an account?

            <Link
              href="/signup"
              className="
                ml-1
                font-semibold
                text-gray-900
                hover:underline
              "
            >
              Sign up
            </Link>

          </p>

        </div>

      </div>

    </main>
  );
}