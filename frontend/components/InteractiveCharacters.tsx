"use client";

import { useEffect, useState } from "react";

interface InteractiveCharactersProps {
  isPasswordFocused: boolean;
  showPassword: boolean;
  loginError: number;
}

export default function InteractiveCharacters({
  isPasswordFocused,
  showPassword,
  loginError,
}: InteractiveCharactersProps) {
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });

  const [isShaking, setIsShaking] = useState(false);

  /* =====================================================
     MOUSE TRACKING
     ===================================================== */

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x =
        (e.clientX / window.innerWidth - 0.5) * 2;

      const y =
        (e.clientY / window.innerHeight - 0.5) * 2;

      setMousePos({
        x,
        y,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  /* =====================================================
     WRONG LOGIN / SIGNUP ANIMATION
     ===================================================== */

  useEffect(() => {
    if (loginError === 0) return;

    setIsShaking(true);

    const timer = setTimeout(() => {
      setIsShaking(false);
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, [loginError]);

  /* =====================================================
     EYE STATE
     ===================================================== */

  /*
    When password input is focused:

      Show password OFF  → eyes closed
      Show password ON   → eyes STILL closed

    When password input loses focus:

      eyes open and follow cursor
  */

  const eyesClosed = isPasswordFocused;

  /* =====================================================
     EYE MOVEMENT
     ===================================================== */

  const pupilX = eyesClosed
    ? 0
    : mousePos.x * 9;

  const pupilY = eyesClosed
    ? 0
    : mousePos.y * 9;

  /* =====================================================
     BODY MOVEMENT
     ===================================================== */

  const bodyX = mousePos.x * 10;
  const bodyY = mousePos.y * 6;

  /* =====================================================
     HEAD SHAKE
     ===================================================== */

  const shake = isShaking
    ? Math.sin(Date.now() / 35) * 8
    : 0;

  return (
    <div
      className="
        relative
        w-full
        max-w-[380px]
        h-[340px]
        select-none
      "
    >

      {/* =================================================
          PURPLE CHARACTER
          ================================================= */}

      <div
        className="
          absolute
          left-8
          bottom-10
          w-28
          h-48
          bg-[#6C5CE7]
          rounded-t-[32px]
          shadow-lg
          flex
          flex-col
          items-center
          pt-9
          will-change-transform
        "
        style={{
          transform: `
            translate(
              ${bodyX + shake}px,
              ${bodyY}px
            )
            rotate(
              ${mousePos.x * 3 + shake * 0.3}deg
            )
          `,
        }}
      >
        <div className="flex gap-4">

          {/* LEFT EYE */}

          <div
            className="
              relative
              w-5
              h-5
              bg-white
              rounded-full
              flex
              items-center
              justify-center
              overflow-hidden
            "
          >
            {eyesClosed ? (
              <span
                className="
                  w-4
                  h-[2px]
                  bg-black
                  rounded-full
                "
              />
            ) : (
              <div
                className="
                  w-2.5
                  h-2.5
                  bg-black
                  rounded-full
                "
                style={{
                  transform: `
                    translate(
                      ${pupilX}px,
                      ${pupilY}px
                    )
                  `,
                }}
              />
            )}
          </div>

          {/* RIGHT EYE */}

          <div
            className="
              relative
              w-5
              h-5
              bg-white
              rounded-full
              flex
              items-center
              justify-center
              overflow-hidden
            "
          >
            {eyesClosed ? (
              <span
                className="
                  w-4
                  h-[2px]
                  bg-black
                  rounded-full
                "
              />
            ) : (
              <div
                className="
                  w-2.5
                  h-2.5
                  bg-black
                  rounded-full
                "
                style={{
                  transform: `
                    translate(
                      ${pupilX}px,
                      ${pupilY}px
                    )
                  `,
                }}
              />
            )}
          </div>

        </div>
      </div>


      {/* =================================================
          BLACK CHARACTER
          ================================================= */}

      <div
        className="
          absolute
          right-14
          bottom-8
          w-24
          h-52
          bg-[#20262B]
          rounded-t-full
          shadow-xl
          flex
          flex-col
          items-center
          pt-10
          will-change-transform
        "
        style={{
          transform: `
            translate(
              ${bodyX * 0.75 + shake}px,
              ${bodyY * 0.8}px
            )
            rotate(
              ${mousePos.x * -3 - shake * 0.3}deg
            )
          `,
        }}
      >
        <div className="flex gap-3">

          {/* LEFT EYE */}

          <div
            className="
              relative
              w-4
              h-4
              bg-white
              rounded-full
              flex
              items-center
              justify-center
              overflow-hidden
            "
          >
            {eyesClosed ? (
              <span
                className="
                  w-3
                  h-[2px]
                  bg-black
                  rounded-full
                "
              />
            ) : (
              <div
                className="
                  w-2
                  h-2
                  bg-black
                  rounded-full
                "
                style={{
                  transform: `
                    translate(
                      ${pupilX * 0.9}px,
                      ${pupilY * 0.9}px
                    )
                  `,
                }}
              />
            )}
          </div>

          {/* RIGHT EYE */}

          <div
            className="
              relative
              w-4
              h-4
              bg-white
              rounded-full
              flex
              items-center
              justify-center
              overflow-hidden
            "
          >
            {eyesClosed ? (
              <span
                className="
                  w-3
                  h-[2px]
                  bg-black
                  rounded-full
                "
              />
            ) : (
              <div
                className="
                  w-2
                  h-2
                  bg-black
                  rounded-full
                "
                style={{
                  transform: `
                    translate(
                      ${pupilX * 0.9}px,
                      ${pupilY * 0.9}px
                    )
                  `,
                }}
              />
            )}
          </div>

        </div>
      </div>


      {/* =================================================
          YELLOW CHARACTER
          ================================================= */}

      <div
        className="
          absolute
          right-3
          bottom-0
          w-24
          h-40
          bg-[#FDCB6E]
          rounded-t-[30px]
          shadow-lg
          z-10
          will-change-transform
        "
        style={{
          transform: `
            translate(
              ${bodyX * 1.1 + shake}px,
              ${bodyY}px
            )
            rotate(
              ${mousePos.x * 2 + shake * 0.4}deg
            )
          `,
        }}
      >
        <div
          className="
            absolute
            top-9
            left-1/2
            -translate-x-1/2
          "
        >
          <div
            className="
              relative
              w-4
              h-4
              bg-white
              rounded-full
              flex
              items-center
              justify-center
              overflow-hidden
            "
          >
            {eyesClosed ? (
              <span
                className="
                  w-3
                  h-[2px]
                  bg-black
                  rounded-full
                "
              />
            ) : (
              <div
                className="
                  w-2
                  h-2
                  bg-black
                  rounded-full
                "
                style={{
                  transform: `
                    translate(
                      ${pupilX * 0.6}px,
                      ${pupilY * 0.6}px
                    )
                  `,
                }}
              />
            )}
          </div>
        </div>
      </div>


      {/* =================================================
          ORANGE CHARACTER
          ================================================= */}

      <div
        className="
          absolute
          left-0
          bottom-0
          w-48
          h-32
          bg-[#FF7675]
          rounded-t-full
          shadow-lg
          z-20
          will-change-transform
        "
        style={{
          transform: `
            translate(
              ${bodyX * 1.2 + shake}px,
              ${bodyY * 1.1}px
            )
            rotate(
              ${mousePos.x * -2 - shake * 0.3}deg
            )
          `,
        }}
      >
        <div
          className="
            flex
            justify-center
            gap-7
            pt-9
          "
        >

          {/* LEFT EYE */}

          <div
            className="
              relative
              w-4
              h-4
              bg-white
              rounded-full
              flex
              items-center
              justify-center
              overflow-hidden
            "
          >
            {eyesClosed ? (
              <span
                className="
                  w-3
                  h-[2px]
                  bg-black
                  rounded-full
                "
              />
            ) : (
              <div
                className="
                  w-2
                  h-2
                  bg-black
                  rounded-full
                "
                style={{
                  transform: `
                    translate(
                      ${pupilX * 0.75}px,
                      ${pupilY * 0.75}px
                    )
                  `,
                }}
              />
            )}
          </div>

          {/* RIGHT EYE */}

          <div
            className="
              relative
              w-4
              h-4
              bg-white
              rounded-full
              flex
              items-center
              justify-center
              overflow-hidden
            "
          >
            {eyesClosed ? (
              <span
                className="
                  w-3
                  h-[2px]
                  bg-black
                  rounded-full
                "
              />
            ) : (
              <div
                className="
                  w-2
                  h-2
                  bg-black
                  rounded-full
                "
                style={{
                  transform: `
                    translate(
                      ${pupilX * 0.75}px,
                      ${pupilY * 0.75}px
                    )
                  `,
                }}
              />
            )}
          </div>

        </div>


        {/* SMILE */}

        <div
          className="
            w-7
            h-3
            border-b-[3px]
            border-black
            rounded-full
            mx-auto
            mt-2
          "
        />

      </div>

    </div>
  );
}