"use client";

import { useEffect, useState } from "react";

interface InteractiveCharactersProps {
  isPasswordFocused: boolean;
  showPassword: boolean;
  errorTrigger: number;
}

export default function InteractiveCharacters({
  isPasswordFocused,
  showPassword,
  errorTrigger,
}: InteractiveCharactersProps) {
  const [pointer, setPointer] = useState({
    x: 0,
    y: 0,
  });

  const [isShaking, setIsShaking] = useState(false);

  /* =========================================
     CURSOR MOVEMENT
  ========================================= */

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const x =
        (e.clientX / window.innerWidth - 0.5) * 2;

      const y =
        (e.clientY / window.innerHeight - 0.5) * 2;

      setPointer({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );
    };
  }, []);

  /* =========================================
     ERROR / WRONG ANIMATION
  ========================================= */

  useEffect(() => {
    if (errorTrigger === 0) return;

    setIsShaking(true);

    const timer = setTimeout(() => {
      setIsShaking(false);
    }, 550);

    return () => clearTimeout(timer);
  }, [errorTrigger]);

  /* =========================================
     PASSWORD MODE
  ========================================= */

  const eyesClosed =
    isPasswordFocused && !showPassword;

  /* =========================================
     EYE MOVEMENT
  ========================================= */

  const pupilX = eyesClosed
    ? 0
    : pointer.x * 7;

  const pupilY = eyesClosed
    ? 0
    : pointer.y * 7;

  /* =========================================
     BODY MOVEMENT
  ========================================= */

  const purpleX = eyesClosed
    ? 0
    : pointer.x * 14;

  const purpleY = eyesClosed
    ? 10
    : pointer.y * 8;

  const blackX = eyesClosed
    ? 0
    : pointer.x * 10;

  const blackY = eyesClosed
    ? 12
    : pointer.y * 6;

  const yellowX = eyesClosed
    ? 0
    : pointer.x * 7;

  const yellowY = eyesClosed
    ? 15
    : pointer.y * 5;

  const orangeX = eyesClosed
    ? 0
    : pointer.x * 5;

  const orangeY = eyesClosed
    ? 0
    : pointer.y * 4;

  /* =========================================
     BODY ROTATION
  ========================================= */

  const purpleRotate = eyesClosed
    ? -8
    : pointer.x * 4;

  const blackRotate = eyesClosed
    ? 10
    : pointer.x * -3;

  const yellowRotate = eyesClosed
    ? 0
    : pointer.x * 2;

  const orangeRotate = eyesClosed
    ? 0
    : pointer.x * -1.5;

  return (
    <div
      className={`
        relative
        w-full
        h-[280px]
        sm:h-[310px]
        md:h-[360px]
        max-w-[400px]
        select-none
        pointer-events-none
        ${isShaking ? "character-shake" : ""}
      `}
    >

      {/* =========================================
          PURPLE CHARACTER
      ========================================= */}

      <div
        className="
          absolute
          left-[13%]
          bottom-[15%]
          w-[27%]
          h-[58%]
          bg-[#6C5CE7]
          rounded-t-[28px]
          sm:rounded-t-[34px]
          shadow-lg
          flex
          flex-col
          items-center
          pt-[10%]
          transition-transform
          duration-150
          ease-out
        "
        style={{
          transform: `
            translate(
              ${purpleX}px,
              ${purpleY}px
            )
            rotate(${purpleRotate}deg)
          `,
        }}
      >
        <div className="flex gap-3 sm:gap-4">

          <Eye
            closed={eyesClosed}
            x={pupilX}
            y={pupilY}
          />

          <Eye
            closed={eyesClosed}
            x={pupilX}
            y={pupilY}
          />

        </div>
      </div>


      {/* =========================================
          BLACK CHARACTER
      ========================================= */}

      <div
        className="
          absolute
          right-[14%]
          bottom-[14%]
          w-[23%]
          h-[63%]
          bg-[#20262B]
          rounded-t-full
          shadow-xl
          flex
          flex-col
          items-center
          pt-[13%]
          transition-transform
          duration-200
          ease-out
        "
        style={{
          transform: `
            translate(
              ${blackX}px,
              ${blackY}px
            )
            rotate(${blackRotate}deg)
          `,
        }}
      >
        <div className="flex gap-2 sm:gap-3">

          <Eye
            closed={eyesClosed}
            x={pupilX * 0.8}
            y={pupilY * 0.8}
            small
          />

          <Eye
            closed={eyesClosed}
            x={pupilX * 0.8}
            y={pupilY * 0.8}
            small
          />

        </div>
      </div>


      {/* =========================================
          YELLOW CHARACTER
      ========================================= */}

      <div
        className="
          absolute
          right-[5%]
          bottom-0
          w-[23%]
          h-[43%]
          bg-[#FDCB6E]
          rounded-t-[28px]
          shadow-lg
          z-10
          transition-transform
          duration-200
          ease-out
        "
        style={{
          transform: `
            translate(
              ${yellowX}px,
              ${yellowY}px
            )
            rotate(${yellowRotate}deg)
          `,
        }}
      >
        <div
          className="
            absolute
            top-[24%]
            left-1/2
            -translate-x-1/2
          "
        >
          <Eye
            closed={eyesClosed}
            x={pupilX * 0.45}
            y={pupilY * 0.45}
            tiny
          />
        </div>
      </div>


      {/* =========================================
          ORANGE CHARACTER
      ========================================= */}

      <div
        className="
          absolute
          left-[3%]
          bottom-0
          w-[48%]
          h-[35%]
          bg-[#FF7675]
          rounded-t-full
          shadow-lg
          z-20
          transition-transform
          duration-150
          ease-out
        "
        style={{
          transform: `
            translate(
              ${orangeX}px,
              ${orangeY}px
            )
            rotate(${orangeRotate}deg)
            ${eyesClosed ? "scaleY(0.9)" : "scaleY(1)"}
          `,
        }}
      >
        <div
          className="
            flex
            justify-center
            gap-5
            sm:gap-7
            pt-[18%]
          "
        >

          <Eye
            closed={eyesClosed}
            x={pupilX * 0.7}
            y={pupilY * 0.7}
            tiny
          />

          <Eye
            closed={eyesClosed}
            x={pupilX * 0.7}
            y={pupilY * 0.7}
            tiny
          />

        </div>

        {/* SMILE */}

        <div
          className="
            w-6
            sm:w-7
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


/* =========================================
   EYE COMPONENT
========================================= */

function Eye({
  closed,
  x,
  y,
  small = false,
  tiny = false,
}: {
  closed: boolean;
  x: number;
  y: number;
  small?: boolean;
  tiny?: boolean;
}) {
  const size = tiny
    ? "w-3 h-3 sm:w-3.5 sm:h-3.5"
    : small
      ? "w-3.5 h-3.5 sm:w-4 sm:h-4"
      : "w-4 h-4 sm:w-5 sm:h-5";

  return (
    <div
      className={`
        relative
        ${size}
        bg-white
        rounded-full
        flex
        items-center
        justify-center
        overflow-hidden
      `}
    >

      {closed ? (

        <span
          className="
            w-[70%]
            h-[2px]
            bg-black
            rounded-full
          "
        />

      ) : (

        <div
          className="
            w-[48%]
            h-[48%]
            bg-black
            rounded-full
            transition-transform
            duration-75
            ease-out
          "
          style={{
            transform: `
              translate(
                ${x}px,
                ${y}px
              )
            `,
          }}
        />

      )}

    </div>
  );
}