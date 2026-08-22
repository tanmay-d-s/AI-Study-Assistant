import Link from "next/link";

export default function Home() {
  return (
    <main
      className="
        relative
        min-h-screen
        w-full
        bg-[#F1F2F4]
        text-gray-900
        flex
        items-center
        justify-center
        px-4
        sm:px-6
        py-10
        overflow-hidden
      "
    >

      {/* ================================================= */}
      {/* SOFT BACKGROUND */}
      {/* ================================================= */}

      <div
        className="
          absolute
          -top-40
          -left-40
          w-[500px]
          h-[500px]
          bg-[#E5E1FF]
          rounded-full
          blur-[120px]
          opacity-60
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          -bottom-40
          -right-40
          w-[500px]
          h-[500px]
          bg-[#FFE3D9]
          rounded-full
          blur-[120px]
          opacity-60
          pointer-events-none
        "
      />

      {/* ================================================= */}
      {/* FLOATING DOTS */}
      {/* ================================================= */}

      <div
        className="
          absolute
          top-20
          left-[15%]
          w-3
          h-3
          rounded-full
          bg-[#6C5CE7]/30
          animate-pulse
        "
      />

      <div
        className="
          absolute
          top-[25%]
          right-[15%]
          w-4
          h-4
          rounded-full
          bg-[#FF7675]/30
          animate-pulse
        "
      />

      <div
        className="
          absolute
          bottom-20
          left-[25%]
          w-3
          h-3
          rounded-full
          bg-[#FDCB6E]/50
        "
      />


      {/* ================================================= */}
      {/* MAIN CARD */}
      {/* ================================================= */}

      <div
        className="
          relative
          w-full
          max-w-5xl
          min-h-[600px]
          bg-white
          rounded-[32px]
          shadow-[0_25px_80px_rgba(0,0,0,0.12)]
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
            relative
            bg-[#F7F8FA]
            flex
            items-center
            justify-center
            min-h-[350px]
            md:min-h-full
            overflow-hidden
          "
        >

          {/* Decorative circles */}

          <div
            className="
              absolute
              w-[380px]
              h-[380px]
              rounded-full
              border
              border-gray-200
            "
          />

          <div
            className="
              absolute
              w-[300px]
              h-[300px]
              rounded-full
              border
              border-gray-200/70
            "
          />


          {/* ================= CHARACTERS ================= */}

          <div
            className="
              relative
              w-[340px]
              h-[300px]
            "
          >

            {/* PURPLE CHARACTER */}

            <div
              className="
                absolute
                left-10
                bottom-10
                w-24
                h-40
                bg-[#6C5CE7]
                rounded-t-[28px]
                shadow-lg
                animate-[float_4s_ease-in-out_infinite]
              "
            >

              <div
                className="
                  flex
                  gap-3
                  justify-center
                  pt-8
                "
              >

                <div
                  className="
                    w-4
                    h-4
                    bg-white
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                >
                  <div
                    className="
                      w-2
                      h-2
                      bg-black
                      rounded-full
                    "
                  />
                </div>

                <div
                  className="
                    w-4
                    h-4
                    bg-white
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                >
                  <div
                    className="
                      w-2
                      h-2
                      bg-black
                      rounded-full
                    "
                  />
                </div>

              </div>

            </div>


            {/* BLACK CHARACTER */}

            <div
              className="
                absolute
                right-12
                bottom-10
                w-20
                h-44
                bg-[#20262B]
                rounded-t-full
                shadow-lg
                animate-[floatSlow_4.5s_ease-in-out_infinite]
              "
            >

              <div
                className="
                  flex
                  gap-2
                  justify-center
                  pt-9
                "
              >

                <div
                  className="
                    w-3.5
                    h-3.5
                    bg-white
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                >
                  <div
                    className="
                      w-1.5
                      h-1.5
                      bg-black
                      rounded-full
                    "
                  />
                </div>

                <div
                  className="
                    w-3.5
                    h-3.5
                    bg-white
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                >
                  <div
                    className="
                      w-1.5
                      h-1.5
                      bg-black
                      rounded-full
                    "
                  />
                </div>

              </div>

            </div>


            {/* YELLOW CHARACTER */}

            <div
              className="
                absolute
                right-0
                bottom-0
                w-20
                h-32
                bg-[#FDCB6E]
                rounded-t-[25px]
                shadow-lg
                animate-[float_3.5s_ease-in-out_infinite]
              "
            >

              <div
                className="
                  absolute
                  top-7
                  left-1/2
                  -translate-x-1/2
                  w-3
                  h-3
                  bg-black
                  rounded-full
                "
              />

            </div>


            {/* ORANGE CHARACTER */}

            <div
              className="
                absolute
                left-0
                bottom-0
                w-40
                h-24
                bg-[#FF7675]
                rounded-t-full
                shadow-lg
                z-10
                animate-[floatSlow_4s_ease-in-out_infinite]
              "
            >

              <div
                className="
                  flex
                  justify-center
                  gap-6
                  pt-7
                "
              >

                <div
                  className="
                    w-3
                    h-3
                    bg-black
                    rounded-full
                  "
                />

                <div
                  className="
                    w-3
                    h-3
                    bg-black
                    rounded-full
                  "
                />

              </div>


              {/* Smile */}

              <div
                className="
                  w-5
                  h-2
                  border-b-2
                  border-black
                  rounded-full
                  mx-auto
                  mt-1
                "
              />

            </div>

          </div>


          {/* Floating Cursor */}

          <div
            className="
              absolute
              top-[30%]
              left-[35%]
              text-3xl
              text-gray-800
              rotate-[-20deg]
              animate-[cursorFloat_4s_ease-in-out_infinite]
            "
          >
            ↖
          </div>

        </div>


        {/* ================================================= */}
        {/* RIGHT SIDE - CONTENT */}
        {/* ================================================= */}

        <div
          className="
            p-8
            sm:p-12
            md:p-14
            lg:p-16
            flex
            flex-col
            justify-center
          "
        >

          {/* LOGO */}

          <div
            className="
              w-11
              h-11
              rounded-2xl
              bg-black
              text-white
              flex
              items-center
              justify-center
              text-xl
              font-bold
              mb-7
            "
          >
            AI
          </div>


          {/* TITLE */}

          <h1
            className="
              text-4xl
              sm:text-5xl
              font-bold
              tracking-tight
              text-gray-900
            "
          >
            AI Study
            <br />
            Assistant
          </h1>


          {/* DESCRIPTION */}

          <p
            className="
              mt-5
              text-base
              sm:text-lg
              leading-relaxed
              text-gray-500
              max-w-md
            "
          >
            Study smarter with AI. Upload your
            notes, chat with PDFs, generate
            quizzes and flashcards, and keep
            your learning organized in one place.
          </p>


          {/* FEATURES */}

          <div
            className="
              mt-7
              grid
              grid-cols-2
              gap-x-5
              gap-y-3
              max-w-md
            "
          >

            {/* PDF CHAT */}

            <div
              className="
                flex
                items-center
                gap-2
                text-sm
                text-gray-600
              "
            >

              <span
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-[#6C5CE7]
                "
              />

              PDF Chat

            </div>


            {/* AI SUMMARIES */}

            <div
              className="
                flex
                items-center
                gap-2
                text-sm
                text-gray-600
              "
            >

              <span
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-[#FF7675]
                "
              />

              AI Summaries

            </div>


            {/* QUIZZES */}

            <div
              className="
                flex
                items-center
                gap-2
                text-sm
                text-gray-600
              "
            >

              <span
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-[#FDCB6E]
                "
              />

              Smart Quizzes

            </div>


            {/* FLASHCARDS */}

            <div
              className="
                flex
                items-center
                gap-2
                text-sm
                text-gray-600
              "
            >

              <span
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-[#20262B]
                "
              />

              Flashcards

            </div>

          </div>


          {/* ================================================= */}
          {/* BUTTONS */}
          {/* ================================================= */}

          <div
            className="
              flex
              flex-col
              sm:flex-row
              gap-3
              mt-9
            "
          >

            {/* LOGIN */}

            <Link
              href="/login"
              className="
                flex-1
                h-12
                px-7
                rounded-xl
                bg-black
                text-white
                flex
                items-center
                justify-center
                text-sm
                font-semibold
                transition-all
                hover:bg-gray-800
                hover:-translate-y-0.5
                active:translate-y-0
                shadow-sm
              "
            >
              Log in
            </Link>


            {/* SIGN UP */}

            <Link
              href="/signup"
              className="
                flex-1
                h-12
                px-7
                rounded-xl
                bg-white
                text-gray-900
                border
                border-gray-200
                flex
                items-center
                justify-center
                text-sm
                font-semibold
                transition-all
                hover:bg-gray-50
                hover:border-gray-300
                hover:-translate-y-0.5
                active:translate-y-0
              "
            >
              Create account
            </Link>

          </div>


          {/* FOOTER */}

          <p
            className="
              mt-6
              text-xs
              text-gray-400
            "
          >
            Your personal AI-powered study companion.
          </p>

        </div>

      </div>

    </main>
  );
}