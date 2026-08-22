"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import InteractiveCharacters from "@/components/InteractiveCharacters";
import { signup } from "@/lib/services/auth";

export default function SignupPage() {
  const router = useRouter();

  /* =========================================
     FORM STATE
  ========================================= */

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  /* =========================================
     PASSWORD STATE
  ========================================= */

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [isPasswordFocused, setIsPasswordFocused] =
    useState(false);

  /* =========================================
     ERROR ANIMATION
  ========================================= */

  const [errorTrigger, setErrorTrigger] =
    useState(0);

  /* =========================================
     LOADING
  ========================================= */

  const [loading, setLoading] = useState(false);


  /* =========================================
     SIGNUP
  ========================================= */

  async function handleSignup(
    e: React.FormEvent
  ) {
    e.preventDefault();

    /* =====================================
       VALIDATION
    ===================================== */

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setErrorTrigger(
        (prev) => prev + 1
      );

      alert(
        "Please fill in all fields."
      );

      return;
    }


    /* =====================================
       PASSWORD MATCH
    ===================================== */

    if (password !== confirmPassword) {
      setErrorTrigger(
        (prev) => prev + 1
      );

      alert(
        "Passwords do not match."
      );

      return;
    }


    /* =====================================
       SIGNUP API
    ===================================== */

    try {
      setLoading(true);

      const data = await signup(
        name,
        email,
        password
      );

      console.log(
        "Signup successful:",
        data
      );

      alert(
        "Account created successfully!"
      );

      router.push("/login");

    } catch (error: any) {

      console.error(
        "Signup error:",
        error
      );

      /* =================================
         TRIGGER WRONG ANIMATION
      ================================= */

      setErrorTrigger(
        (prev) => prev + 1
      );

      alert(
        error?.response?.data?.detail ||
        "Signup failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  }


  return (
    <main
      className="
        min-h-screen
        bg-[#F0F2F5]
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
          bg-white
          rounded-3xl
          shadow-xl
          overflow-hidden
          grid
          grid-cols-1
          md:grid-cols-2
          min-h-[620px]
        "
      >

        {/* =====================================
            LEFT SIDE
        ===================================== */}

        <div
          className="
            bg-[#F8F9FB]
            border-r
            border-gray-100
            flex
            items-center
            justify-center
            p-6
            sm:p-8
            overflow-hidden
          "
        >

          <InteractiveCharacters
            isPasswordFocused={
              isPasswordFocused
            }
            showPassword={
              showPassword &&
              showConfirmPassword
            }
            errorTrigger={
              errorTrigger
            }
          />

        </div>


        {/* =====================================
            RIGHT SIDE
        ===================================== */}

        <div
          className="
            p-7
            sm:p-10
            md:p-12
            lg:p-14
            flex
            flex-col
            justify-center
          "
        >

          {/* =================================
              TITLE
          ================================= */}

          <div
            className="
              text-center
              mb-7
            "
          >

            <h1
              className="
                text-3xl
                font-bold
                text-gray-900
                tracking-tight
              "
            >
              Create your account
            </h1>

            <p
              className="
                text-sm
                text-gray-500
                mt-1
              "
            >
              Start your AI-powered study journey
            </p>

          </div>


          {/* =================================
              FORM
          ================================= */}

          <form
            onSubmit={handleSignup}
            className="space-y-4"
          >

            {/* =================================
                NAME
            ================================= */}

            <div>

              <label
                className="
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  mb-2
                "
              >
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Tanmay Patil"
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
                  focus:outline-none
                  focus:ring-2
                  focus:ring-black/10
                  focus:border-black
                  transition
                "
              />

            </div>


            {/* =================================
                EMAIL
            ================================= */}

            <div>

              <label
                className="
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  mb-2
                "
              >
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
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
                  focus:outline-none
                  focus:ring-2
                  focus:ring-black/10
                  focus:border-black
                  transition
                "
              />

            </div>


            {/* =================================
                PASSWORD
            ================================= */}

            <div>

              <label
                className="
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  mb-2
                "
              >
                Password
              </label>


              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  onFocus={() =>
                    setIsPasswordFocused(
                      true
                    )
                  }
                  onBlur={() =>
                    setIsPasswordFocused(
                      false
                    )
                  }
                  placeholder="••••••••"
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
                    focus:outline-none
                    focus:ring-2
                    focus:ring-black/10
                    focus:border-black
                    transition
                    pr-16
                  "
                />


                <button
                  type="button"
                  onMouseDown={(e) =>
                    e.preventDefault()
                  }
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-xs
                    font-semibold
                    text-gray-500
                    hover:text-gray-800
                    transition
                  "
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

            </div>


            {/* =================================
                CONFIRM PASSWORD
            ================================= */}

            <div>

              <label
                className="
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  mb-2
                "
              >
                Confirm Password
              </label>


              <div className="relative">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  onFocus={() =>
                    setIsPasswordFocused(
                      true
                    )
                  }
                  onBlur={() =>
                    setIsPasswordFocused(
                      false
                    )
                  }
                  placeholder="••••••••"
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
                    focus:outline-none
                    focus:ring-2
                    focus:ring-black/10
                    focus:border-black
                    transition
                    pr-16
                  "
                />


                <button
                  type="button"
                  onMouseDown={(e) =>
                    e.preventDefault()
                  }
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-xs
                    font-semibold
                    text-gray-500
                    hover:text-gray-800
                    transition
                  "
                >
                  {showConfirmPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

            </div>


            {/* =================================
                SIGNUP BUTTON
            ================================= */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-black
                text-white
                py-3
                rounded-xl
                font-semibold
                hover:bg-gray-800
                transition
                shadow-sm
                disabled:opacity-50
                disabled:cursor-not-allowed
                mt-2
              "
            >

              {loading
                ? "Creating account..."
                : "Create Account"}

            </button>


            {/* =================================
                LOGIN LINK
            ================================= */}

            <p
              className="
                text-center
                text-xs
                text-gray-500
                mt-5
              "
            >

              Already have an account?{" "}

              <button
                type="button"
                onClick={() =>
                  router.push("/login")
                }
                className="
                  font-semibold
                  text-gray-900
                  hover:underline
                "
              >
                Log in
              </button>

            </p>

          </form>

        </div>

      </div>

    </main>
  );
}