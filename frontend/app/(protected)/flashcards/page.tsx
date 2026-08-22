"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  Layers,
  RotateCcw,
  Check,
  X,
  Shuffle,
} from "lucide-react";

type Flashcard = {
  id: number;
  front: string;
  back: string;
};

const initialCards: Flashcard[] = [
  {
    id: 1,
    front: "What is Artificial Intelligence?",
    back:
      "Artificial Intelligence is the field of creating systems that can perform tasks that normally require human intelligence.",
  },
  {
    id: 2,
    front: "What is a Stack?",
    back:
      "A stack is a linear data structure that follows the LIFO principle: Last In, First Out.",
  },
  {
    id: 3,
    front: "What is an API?",
    back:
      "An API is an interface that allows different software components or applications to communicate with each other.",
  },
  {
    id: 4,
    front: "What is a database?",
    back:
      "A database is an organized collection of data that can be stored, accessed, managed and updated.",
  },
];

export default function FlashcardsPage() {
  const router = useRouter();

  const [cards, setCards] =
    useState(initialCards);

  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] =
    useState(false);

  const [mastered, setMastered] =
    useState<number[]>([]);

  const card = cards[current];


  function nextCard() {
    setFlipped(false);

    setCurrent((prev) =>
      prev === cards.length - 1
        ? 0
        : prev + 1
    );
  }


  function markMastered() {
    if (!mastered.includes(card.id)) {
      setMastered((prev) => [
        ...prev,
        card.id,
      ]);
    }

    nextCard();
  }


  function shuffleCards() {
    const shuffled = [...cards].sort(
      () => Math.random() - 0.5
    );

    setCards(shuffled);
    setCurrent(0);
    setFlipped(false);
  }


  function resetProgress() {
    setMastered([]);
    setCurrent(0);
    setFlipped(false);
  }


  return (
    <main className="min-h-screen bg-[#EEF5F8]">

      {/* HEADER */}

      <header className="px-4 sm:px-6 pt-4">

        <div className="max-w-3xl mx-auto bg-white rounded-[24px] p-3 flex items-center justify-between shadow-sm">

          <button
            onClick={() =>
              router.push("/dashboard")
            }
            className="
              w-10
              h-10
              rounded-full
              bg-[#F5F7F6]
              flex
              items-center
              justify-center
            "
          >
            <ArrowLeft className="w-5 h-5" />
          </button>


          <div className="flex items-center gap-2">

            <div className="w-9 h-9 rounded-full bg-[#EAF7DC] flex items-center justify-center">

              <Layers className="w-4 h-4 text-[#69A64C]" />

            </div>

            <div>

              <p className="font-bold text-sm">
                Flashcards
              </p>

              <p className="text-[9px] text-gray-400">
                Quick Review
              </p>

            </div>

          </div>


          <button
            onClick={shuffleCards}
            className="
              w-10
              h-10
              rounded-full
              bg-[#F5F7F6]
              flex
              items-center
              justify-center
            "
          >
            <Shuffle className="w-4 h-4" />
          </button>

        </div>

      </header>


      {/* CONTENT */}

      <section className="px-4 sm:px-6 py-6">

        <div className="max-w-3xl mx-auto">


          {/* PROGRESS */}

          <div className="flex justify-between items-center">

            <div>

              <p className="text-xs text-gray-400">
                Card {current + 1} of{" "}
                {cards.length}
              </p>

              <p className="text-sm font-bold mt-1">
                {mastered.length} mastered
              </p>

            </div>


            <button
              onClick={resetProgress}
              className="
                text-xs
                text-gray-400
                flex
                items-center
                gap-1
              "
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>

          </div>


          <div className="h-2 bg-white rounded-full mt-4 overflow-hidden">

            <div
              className="h-full bg-[#A8F04C] rounded-full transition-all"
              style={{
                width: `${
                  ((current + 1) /
                    cards.length) *
                  100
                }%`,
              }}
            />

          </div>


          {/* FLASHCARD */}

          <button
            onClick={() =>
              setFlipped((prev) => !prev)
            }
            className="
              w-full
              mt-6
              min-h-[390px]
              bg-white
              rounded-[34px]
              shadow-sm
              border
              border-white
              p-7
              flex
              flex-col
              items-center
              justify-center
              text-center
              relative
              overflow-hidden
            "
          >

            <div
              className="
                absolute
                -right-16
                -top-16
                w-44
                h-44
                rounded-full
                bg-[#A8F04C]
                opacity-20
              "
            />

            <div
              className="
                absolute
                -left-20
                -bottom-20
                w-48
                h-48
                rounded-full
                bg-[#DDEFF4]
                opacity-70
              "
            />


            <div className="relative z-10">

              <div
                className="
                  w-14
                  h-14
                  rounded-full
                  bg-[#EAF7DC]
                  flex
                  items-center
                  justify-center
                  mx-auto
                  mb-7
                "
              >

                <Layers className="w-6 h-6 text-[#69A64C]" />

              </div>


              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                {flipped
                  ? "Answer"
                  : "Question"}
              </p>


              <h1
                className="
                  text-xl
                  sm:text-2xl
                  font-bold
                  mt-4
                  max-w-xl
                "
              >
                {flipped
                  ? card.back
                  : card.front}
              </h1>


              <p className="text-[10px] text-gray-400 mt-8">
                Tap card to flip
              </p>

            </div>

          </button>


          {/* ACTIONS */}

          <div className="grid grid-cols-2 gap-3 mt-4">

            <button
              onClick={nextCard}
              className="
                bg-white
                rounded-[22px]
                py-4
                flex
                items-center
                justify-center
                gap-2
                text-sm
                font-semibold
                border
                border-gray-100
              "
            >

              <X className="w-4 h-4 text-red-400" />

              Review Again

            </button>


            <button
              onClick={markMastered}
              className="
                bg-[#A8F04C]
                rounded-[22px]
                py-4
                flex
                items-center
                justify-center
                gap-2
                text-sm
                font-bold
              "
            >

              <Check className="w-4 h-4" />

              Mastered

            </button>

          </div>


          {/* COMPLETION */}

          {mastered.length === cards.length && (

            <div
              className="
                mt-5
                bg-white
                rounded-[24px]
                p-5
                text-center
                border
                border-gray-100
              "
            >

              <div className="text-2xl">
                🎉
              </div>

              <h2 className="font-bold mt-2">
                All cards mastered!
              </h2>

              <p className="text-xs text-gray-400 mt-1">
                Great job. Keep your streak going.
              </p>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}