"use client";

import { useEffect, useState } from "react";

interface InteractiveCharactersProps {
  isPasswordFocused: boolean;
  showPassword: boolean;
  loginError: boolean;
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

    window.addEventListener(
      "mousemove",
      handleMouseMove,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  /* =====================================================
     WRONG LOGIN ANIMATION
     ===================================================== */

  useEffect(() => {
    if (!loginError) return;

    setIsShaking(true);

    const timer = setTimeout(() => {
      setIsShaking(false);
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, [loginError]);

  /* =====================================================
     EYES
     ===================================================== */

  /*
    IMPORTANT:

    Password focus ALWAYS closes the eyes.

    showPassword does NOT open the eyes.

    So:

    password focused → 🙈
    password visible → 🙈
    password hidden → 🙈

    Only when password loses focus → 👀
  */

  const eyesClosed = isPasswordFocused;

  /* =====================================================
     PUPIL MOVEMENT
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

  const purpleRotate = mousePos.x * 3;
  const blackRotate = mousePos.x * -3;
  const yellowRotate = mousePos.x * 2;
  const orangeRotate = mousePos.x * -2;

  /*
    Wrong login:
    Shake head left and right.
  */

  const shakeAmount = isShaking
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
          transform: eyesClosed
            ? `
              translate(
                ${shakeAmount + bodyX * 0.4}px,
                10px
              )
              rotate(${shakeAmount * 0.4 - 8}deg)
            `
            : `
              translate(
                ${shakeAmount + bodyX}px,
                ${bodyY}px
              )
              rotate(${purpleRotate + shakeAmount * 0.3}deg)
            `,
        }}
      >

        <div className="flex gap-4">

          {/* PURPLE EYE 1 */}

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


          {/* PURPLE EYE 2 */}

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
          transform: eyesClosed
            ? `
              translate(
                ${shakeAmount + bodyX * 0.3}px,
                12px
              )
              rotate(${shakeAmount * -0.4 + 10}deg)
            `
            : `
              translate(
                ${shakeAmount + bodyX * 0.75}px,
                ${bodyY * 0.8}px
              )
              rotate(${blackRotate + shakeAmount * -0.3}deg)
            `,
        }}
      >

        <div className="flex gap-3">

          {/* BLACK EYE 1 */}

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


          {/* BLACK EYE 2 */}

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
          transform: eyesClosed
            ? `
              translate(
                ${shakeAmount + bodyX * 0.4}px,
                16px
              )
              rotate(${shakeAmount * 0.5}deg)
            `
            : `
              translate(
                ${shakeAmount + bodyX * 1.1}px,
                ${bodyY}px
              )
              rotate(${yellowRotate + shakeAmount * 0.4}deg)
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
          transform: eyesClosed
            ? `
              translate(
                ${shakeAmount + bodyX * 0.4}px,
                0
              )
              rotate(${shakeAmount * -0.4}deg)
              scaleY(0.9)
            `
            : `
              translate(
                ${shakeAmount + bodyX * 1.2}px,
                ${bodyY * 1.1}px
              )
              rotate(${orangeRotate + shakeAmount * -0.3}deg)
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

          {/* ORANGE EYE 1 */}

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


          {/* ORANGE EYE 2 */}

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