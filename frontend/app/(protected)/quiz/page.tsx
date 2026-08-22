"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  ArrowLeft,
  Brain,
  Check,
  X,
  RotateCcw,
  Sparkles,
} from "lucide-react";

type Question = {
  question: string;
  options: string[];
  answer: number;
};

const defaultQuestions: Question[] = [
  {
    question:
      "Which data structure follows the FIFO principle?",
    options: [
      "Stack",
      "Queue",
      "Tree",
      "Graph",
    ],
    answer: 1,
  },
  {
    question:
      "Which language is primarily used for React development?",
    options: [
      "Python",
      "Java",
      "JavaScript",
      "C",
    ],
    answer: 2,
  },
  {
    question:
      "What does AI stand for?",
    options: [
      "Automated Internet",
      "Artificial Intelligence",
      "Advanced Input",
      "Applied Information",
    ],
    answer: 1,
  },
  {
    question:
      "Which keyword creates a constant in JavaScript?",
    options: [
      "var",
      "let",
      "const",
      "static",
    ],
    answer: 2,
  },
  {
    question:
      "What does PDF stand for?",
    options: [
      "Personal Data File",
      "Portable Document Format",
      "Program Document File",
      "Public Data Format",
    ],
    answer: 1,
  },
];

export default function QuizPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const documentId = searchParams.get("document");

  const [questions, setQuestions] =
    useState<Question[]>(defaultQuestions);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] =
    useState<number | null>(null);

  const [score, setScore] = useState(0);
  const [finished, setFinished] =
    useState(false);

  const [generating, setGenerating] =
    useState(false);


  const question = questions[current];


  function selectAnswer(index: number) {
    if (selected !== null) return;

    setSelected(index);

    if (index === question.answer) {
      setScore((prev) => prev + 1);
    }
  }


  function nextQuestion() {
    if (selected === null) return;

    if (current === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrent((prev) => prev + 1);
    setSelected(null);
  }


  function restartQuiz() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }


  function generateQuiz() {
    setGenerating(true);

    setTimeout(() => {
      setQuestions(defaultQuestions);
      setCurrent(0);
      setSelected(null);
      setScore(0);
      setFinished(false);
      setGenerating(false);
    }, 700);
  }


  if (finished) {
    return (
      <main className="min-h-screen bg-[#EEF5F8] flex items-center justify-center px-5">

        <div className="w-full max-w-md bg-white rounded-[32px] p-7 text-center shadow-sm">

          <div className="w-20 h-20 rounded-full bg-[#A8F04C] mx-auto flex items-center justify-center">

            <Sparkles className="w-8 h-8" />

          </div>


          <p className="text-xs text-gray-400 mt-6">
            Quiz completed
          </p>

          <h1 className="text-3xl font-bold mt-1">
            Great work! 🎉
          </h1>


          <div className="mt-6 bg-[#F6F8F7] rounded-[25px] p-5">

            <p className="text-xs text-gray-400">
              Your Score
            </p>

            <p className="text-5xl font-bold mt-1">
              {score}/{questions.length}
            </p>

          </div>


          <div className="flex gap-2 mt-5">

            <button
              onClick={restartQuiz}
              className="
                flex-1
                py-3
                rounded-full
                bg-black
                text-white
                text-sm
                font-semibold
                flex
                items-center
                justify-center
                gap-2
              "
            >

              <RotateCcw className="w-4 h-4" />

              Retry

            </button>


            <button
              onClick={() =>
                router.push("/dashboard")
              }
              className="
                flex-1
                py-3
                rounded-full
                bg-[#A8F04C]
                text-sm
                font-semibold
              "
            >
              Dashboard
            </button>

          </div>

        </div>

      </main>
    );
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
            className="w-10 h-10 rounded-full bg-[#F5F7F6] flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>


          <div className="flex items-center gap-2">

            <div className="w-9 h-9 rounded-full bg-[#FFF0D7] flex items-center justify-center">

              <Brain className="w-4 h-4 text-[#C77A22]" />

            </div>

            <div>

              <p className="font-bold text-sm">
                AI Quiz
              </p>

              <p className="text-[9px] text-gray-400">
                {documentId
                  ? "Based on document"
                  : "Practice mode"}
              </p>

            </div>

          </div>


          <button
            onClick={generateQuiz}
            disabled={generating}
            className="
              px-3
              py-2
              rounded-full
              bg-[#A8F04C]
              text-[10px]
              font-bold
              disabled:opacity-50
            "
          >
            {generating
              ? "Generating..."
              : "Generate"}
          </button>

        </div>

      </header>


      {/* QUIZ */}

      <section className="px-4 sm:px-6 py-6">

        <div className="max-w-3xl mx-auto">

          {/* PROGRESS */}

          <div className="flex items-center justify-between mb-3">

            <p className="text-xs text-gray-400">
              Question {current + 1} of{" "}
              {questions.length}
            </p>

            <p className="text-xs font-semibold">
              Score: {score}
            </p>

          </div>


          <div className="h-2 bg-white rounded-full overflow-hidden">

            <div
              className="
                h-full
                bg-[#A8F04C]
                rounded-full
                transition-all
              "
              style={{
                width: `${
                  ((current + 1) /
                    questions.length) *
                  100
                }%`,
              }}
            />

          </div>


          {/* QUESTION */}

          <div className="bg-white rounded-[30px] p-5 sm:p-8 mt-5 shadow-sm">

            <div className="w-12 h-12 rounded-full bg-[#EAF7DC] flex items-center justify-center mb-5">

              <Brain className="w-5 h-5 text-[#70A548]" />

            </div>


            <h1 className="text-xl sm:text-2xl font-bold leading-relaxed">
              {question.question}
            </h1>


            <div className="mt-6 space-y-3">

              {question.options.map(
                (option, index) => {

                  const isSelected =
                    selected === index;

                  const isCorrect =
                    index ===
                    question.answer;

                  let style =
                    "bg-[#F7F9F8] border-gray-100 text-gray-700";

                  if (
                    selected !== null &&
                    isCorrect
                  ) {
                    style =
                      "bg-[#EAF7DC] border-[#A8F04C] text-[#436827]";
                  }

                  if (
                    isSelected &&
                    !isCorrect
                  ) {
                    style =
                      "bg-[#FFECEC] border-red-200 text-red-600";
                  }

                  return (
                    <button
                      key={option}
                      onClick={() =>
                        selectAnswer(index)
                      }
                      className={`
                        w-full
                        p-4
                        rounded-[20px]
                        border
                        text-left
                        text-sm
                        font-medium
                        flex
                        items-center
                        gap-3
                        transition
                        ${style}
                      `}
                    >

                      <span
                        className="
                          w-8
                          h-8
                          rounded-full
                          bg-white
                          flex
                          items-center
                          justify-center
                          text-xs
                          font-bold
                          shrink-0
                        "
                      >
                        {String.fromCharCode(
                          65 + index
                        )}
                      </span>

                      <span className="flex-1">
                        {option}
                      </span>

                      {selected !== null &&
                        isCorrect && (
                          <Check className="w-4 h-4 text-green-600" />
                        )}

                      {isSelected &&
                        !isCorrect && (
                          <X className="w-4 h-4 text-red-500" />
                        )}

                    </button>
                  );
                }
              )}

            </div>


            {/* NEXT */}

            <button
              onClick={nextQuestion}
              disabled={selected === null}
              className="
                w-full
                mt-5
                py-3.5
                rounded-full
                bg-black
                text-white
                text-sm
                font-semibold
                disabled:opacity-30
              "
            >
              {current === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}