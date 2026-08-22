"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getDashboardStats } from "@/lib/services/dashboard";

import {
  FileText,
  MessageSquare,
  Brain,
  Layers,
  Sparkles,
  TrendingUp,
  Clock,
  ArrowRight,
  Flame,
  Search,
  Upload,
  Zap,
  MoreVertical,
  BookOpen,
  X,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  const [stats, setStats] = useState({
    pdfs: 0,
    chats: 0,
    quizzes: 0,
    flashcards: 0,
    recent_uploads: [] as any[],
  });

  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();

    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  /* =========================================================
     YOUR EXISTING BUTTONS / ROUTES
  ========================================================= */

  const cards = [
    {
      title: "Uploaded PDFs",
      value: stats.pdfs,
      route: "/documents",
      change: "+4 this week",
      icon: FileText,
      bg: "bg-[#E9F1FF]",
      iconBg: "bg-[#DDE9FF]",
      iconColor: "text-[#5B7FE8]",
      metric: "98% processed",
    },
    {
      title: "AI Study Chats",
      value: stats.chats,
      route: "/chat",
      change: "+28 today",
      icon: MessageSquare,
      bg: "bg-[#F1E9FF]",
      iconBg: "bg-[#E8D9FF]",
      iconColor: "text-[#9B6DE3]",
      metric: "4.9 avg rating",
    },
    {
      title: "Quizzes Generated",
      value: stats.quizzes,
      route: "/quiz",
      change: "+12 completed",
      icon: Brain,
      bg: "bg-[#FFF1DE]",
      iconBg: "bg-[#FFE3BC]",
      iconColor: "text-[#E79B3B]",
      metric: "92% accuracy",
    },
    {
      title: "Active Flashcards",
      value: stats.flashcards,
      route: "/flashcards",
      change: "+65 mastered",
      icon: Layers,
      bg: "bg-[#E7F7E4]",
      iconBg: "bg-[#D5F0CF]",
      iconColor: "text-[#62A957]",
      metric: "Spaced repetition",
    },
  ];

  const recentFiles = stats.recent_uploads?.length
    ? stats.recent_uploads
    : [
        {
          id: "1",
          title: "Quantum Mechanics & Wave Theory.pdf",
          size: "4.2 MB",
          pages: 32,
          uploadedAt: "2 hours ago",
          topics: ["Physics", "Quantum"],
        },
        {
          id: "2",
          title: "Organic Chemistry Reaction Pathways.pdf",
          size: "8.7 MB",
          pages: 64,
          uploadedAt: "Yesterday",
          topics: ["Chemistry", "Organic"],
        },
        {
          id: "3",
          title: "Macroeconomics Principles & Fiscal Policy.pdf",
          size: "2.1 MB",
          pages: 18,
          uploadedAt: "3 days ago",
          topics: ["Economics", "Finance"],
        },
      ];

  const filteredUploads = recentFiles.filter((doc: any) => {
  const title =
    doc.title ||
    doc.name ||
    doc.filename ||
    "";

  const query =
    searchQuery.trim().toLowerCase();

  if (!query) {
    return true;
  }

  return title
    .toLowerCase()
    .includes(query);
});
  return (
    <main className="min-h-screen bg-[#EEF5F8] text-[#17201D] overflow-x-hidden">

      {/* =====================================================
          DESKTOP SIDE EFFECT / MAIN CONTAINER
      ===================================================== */}

      <div className="w-full max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-10 py-5 sm:py-7">

        {/* ===================================================
            TOP HEADER
        =================================================== */}

        <header className="flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            <button
              onClick={() => router.push("/documents")}
              className="
                w-11
                h-11
                rounded-full
                bg-white
                border
                border-white
                shadow-sm
                flex
                items-center
                justify-center
                hover:scale-105
                transition
              "
            >
              <BookOpen className="w-5 h-5 text-gray-700" />
            </button>

            <div className="hidden sm:block">

              <p className="text-[10px] text-gray-400">
                AI Study Workspace
              </p>

              <h1 className="font-bold text-sm">
                Study Assistant
              </h1>

            </div>

          </div>


          {/* RIGHT */}

          <div className="flex items-center gap-2">

            {/* EXISTING UPLOAD BUTTON */}

            <button
              onClick={() => router.push("/upload")}
              className="
                h-11
                px-4
                rounded-full
                bg-[#A8F04C]
                text-[#23320F]
                font-bold
                text-xs
                flex
                items-center
                gap-2
                shadow-sm
                hover:bg-[#98E43D]
                transition
              "
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">
                Upload Material
              </span>
            </button>

            {/* EXISTING QUICK REVIEW */}

            <button
              onClick={() => router.push("/flashcards")}
              className="
                w-11
                h-11
                rounded-full
                bg-white
                border
                border-white
                shadow-sm
                flex
                items-center
                justify-center
                hover:scale-105
                transition
              "
              title="Quick Review"
            >
              <Zap className="w-5 h-5 text-[#6FAF42]" />
            </button>

          </div>

        </header>


        {/* ===================================================
            HERO
        =================================================== */}

        <section className="mt-8">

          <h2
            className="
              text-[34px]
              sm:text-[44px]
              lg:text-[50px]
              leading-[1.03]
              tracking-[-1.8px]
              font-semibold
            "
          >
            Need help
            <br />

            <span className="font-normal">
              studying
            </span>{" "}

            <span className="font-semibold">
              today?
            </span>
          </h2>


          <p className="mt-3 text-sm text-gray-500 max-w-md">
            Your AI-powered study workspace for
            notes, quizzes, chats and flashcards.
          </p>

        </section>


        {/* ===================================================
            EXISTING QUICK ACTIONS
            SAME FUNCTIONALITY
        =================================================== */}

        <section className="mt-6">

          <div
            className="
              flex
              items-center
              gap-2
              overflow-x-auto
              pb-2
              scrollbar-hide
            "
          >

            {/* SEARCH / ASK AREA */}

            <button
              onClick={() => router.push("/chat")}
              className="
                shrink-0
                px-5
                py-3
                rounded-full
                bg-white
                border-2
                border-[#D9F1B9]
                shadow-sm
                text-sm
                font-semibold
                hover:bg-[#FAFFF5]
                transition
              "
            >
              Ask a Question
            </button>


            {/* EXISTING DOCUMENT BUTTON */}

            <button
              onClick={() => router.push("/documents")}
              className="
                shrink-0
                w-12
                h-12
                rounded-full
                bg-white
                shadow-sm
                flex
                items-center
                justify-center
                hover:scale-105
                transition
              "
              title="Documents"
            >
              <FileText className="w-5 h-5 text-[#6FA6B0]" />
            </button>


            {/* EXISTING QUIZ BUTTON */}

            <button
              onClick={() => router.push("/quiz")}
              className="
                shrink-0
                w-12
                h-12
                rounded-full
                bg-white
                shadow-sm
                flex
                items-center
                justify-center
                hover:scale-105
                transition
              "
              title="Quiz"
            >
              <Brain className="w-5 h-5 text-[#D99A48]" />
            </button>


            {/* EXISTING FLASHCARD BUTTON */}

            <button
              onClick={() => router.push("/flashcards")}
              className="
                shrink-0
                w-12
                h-12
                rounded-full
                bg-white
                shadow-sm
                flex
                items-center
                justify-center
                hover:scale-105
                transition
              "
              title="Flashcards"
            >
              <Layers className="w-5 h-5 text-[#6FA957]" />
            </button>

          </div>

        </section>


        {/* ===================================================
            EXISTING STREAK + AI QUIZ
        =================================================== */}

        <section
          className="
            mt-5
            bg-white
            rounded-[28px]
            p-5
            sm:p-6
            shadow-sm
            border
            border-white
          "
        >

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

            <div className="flex items-center gap-4">

              <div
                className="
                  w-12
                  h-12
                  rounded-full
                  bg-[#EAF7DC]
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <Flame className="w-6 h-6 text-[#75AF43]" />
              </div>


              <div>

                <div className="flex items-center gap-2 flex-wrap">

                  <h3 className="font-bold text-sm sm:text-base">
                    5-Day Study Streak Active
                  </h3>

                  <span
                    className="
                      text-[9px]
                      font-bold
                      px-2
                      py-1
                      rounded-full
                      bg-[#FFF0D6]
                      text-[#C47D22]
                    "
                  >
                    ON FIRE
                  </span>

                </div>

                <p className="text-[11px] text-gray-400 mt-1">
                  Keep studying and maintain your streak.
                </p>

              </div>

            </div>


            {/* SAME EXISTING BUTTON */}

            <button
              onClick={() => router.push("/quiz")}
              className="
                w-full
                sm:w-auto
                px-5
                py-3
                rounded-full
                bg-[#A8F04C]
                text-[#253414]
                text-xs
                font-bold
                flex
                items-center
                justify-center
                gap-2
                hover:bg-[#98E43D]
                transition
              "
            >
              Start AI Quiz
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </section>


        {/* ===================================================
            SAME 4 STAT CARDS
        =================================================== */}

        <section className="mt-7">

          <div className="flex items-center justify-between mb-3">

            <h2 className="font-bold text-lg">
              Your Study
            </h2>

          </div>


          <div
            className="
              flex
              lg:grid
              lg:grid-cols-4
              gap-3
              overflow-x-auto
              lg:overflow-visible
              pb-2
            "
          >

            {cards.map((card, index) => {

              const Icon = card.icon;

              return (

                <button
                  key={card.title}
                  onClick={() => router.push(card.route)}
                  className={`
                    shrink-0
                    w-[190px]
                    sm:w-[220px]
                    lg:w-auto
                    min-h-[155px]
                    ${card.bg}
                    rounded-[26px]
                    p-5
                    text-left
                    border
                    border-white
                    shadow-sm
                    hover:-translate-y-1
                    transition-all
                    duration-300
                    ${
                      mounted
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-3"
                    }
                  `}
                  style={{
                    transitionDelay: `${index * 70}ms`,
                  }}
                >

                  <div className="flex items-start justify-between">

                    <div
                      className={`
                        w-11
                        h-11
                        rounded-full
                        ${card.iconBg}
                        flex
                        items-center
                        justify-center
                      `}
                    >

                      <Icon
                        className={`
                          w-5
                          h-5
                          ${card.iconColor}
                        `}
                      />

                    </div>


                    <TrendingUp
                      className="
                        w-4
                        h-4
                        text-green-500
                      "
                    />

                  </div>


                  <div className="mt-5">

                    <p className="text-[10px] text-gray-500">
                      {card.title}
                    </p>


                    {loading ? (

                      <div
                        className="
                          w-12
                          h-8
                          mt-1
                          bg-black/5
                          rounded-lg
                          animate-pulse
                        "
                      />

                    ) : (

                      <p className="text-2xl font-bold mt-1">
                        {card.value.toLocaleString()}
                      </p>

                    )}


                    <p className="text-[9px] text-gray-400 mt-1">
                      {card.metric}
                    </p>

                  </div>

                </button>

              );

            })}

          </div>

        </section>


        {/* ===================================================
            RECENT STUDY DOCUMENTS
        =================================================== */}

        <section className="mt-7">

          <div className="flex items-center justify-between mb-3">

            <h2 className="font-bold text-lg flex items-center gap-2">

              <BookOpen className="w-5 h-5 text-[#6DAD53]" />

              Recent Study Documents

            </h2>

          </div>


          {/* SEARCH */}

          <div className="relative w-full sm:w-[280px]">

  <Search
    className="
      absolute
      left-4
      top-1/2
      -translate-y-1/2
      w-4
      h-4
      text-gray-400
      pointer-events-none
    "
  />

  <input
    type="text"
    value={searchQuery}
    onChange={(e) =>
      setSearchQuery(e.target.value)
    }
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        router.push(
          `/documents?search=${encodeURIComponent(
            searchQuery
          )}`
        );
      }
    }}
    placeholder="Search PDFs..."
    className="
      w-full
      h-12
      bg-white
      text-sm
      text-gray-800
      placeholder:text-gray-400
      rounded-2xl
      pl-11
      pr-10
      border
      border-gray-200
      shadow-sm
      focus:outline-none
      focus:ring-2
      focus:ring-[#B7F34A]/60
      focus:border-[#B7F34A]
      transition
    "
  />

  {searchQuery && (
    <button
      type="button"
      onClick={() =>
        setSearchQuery("")
      }
      className="
        absolute
        right-3
        top-1/2
        -translate-y-1/2
        w-7
        h-7
        rounded-full
        bg-gray-100
        flex
        items-center
        justify-center
        hover:bg-gray-200
      "
    >
      <X className="w-3.5 h-3.5 text-gray-500" />
    </button>
  )}

</div>


          {/* DOCUMENTS */}

          <div className="space-y-3">

            {filteredUploads.length === 0 ? (

              <div
                className="
                  bg-white
                  rounded-[24px]
                  p-8
                  text-center
                  shadow-sm
                "
              >

                <FileText
                  className="
                    w-8
                    h-8
                    mx-auto
                    text-gray-300
                    mb-2
                  "
                />

                <p className="text-sm text-gray-400">
                  No PDFs found
                </p>

              </div>

            ) : (

              filteredUploads.map((doc: any) => (

                <div
                  key={doc.id}
                  className="
                    bg-white
                    rounded-[24px]
                    p-4
                    shadow-sm
                    border
                    border-white
                  "
                >

                  <div className="flex items-start gap-3">

                    <div
                      className="
                        w-11
                        h-11
                        rounded-full
                        bg-[#EAF2FF]
                        flex
                        items-center
                        justify-center
                        shrink-0
                      "
                    >

                      <FileText
                        className="
                          w-5
                          h-5
                          text-[#6288DB]
                        "
                      />

                    </div>


                    <div className="flex-1 min-w-0">

                      <h3
                        className="
                          text-sm
                          font-semibold
                          truncate
                        "
                      >
                        {doc.title}
                      </h3>


                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-2
                          text-[10px]
                          text-gray-400
                          mt-1
                        "
                      >

                        <span>{doc.size}</span>

                        <span>•</span>

                        <span>
                          {doc.pages} Pages
                        </span>

                        <span>•</span>

                        <span className="flex items-center gap-1">

                          <Clock className="w-3 h-3" />

                          {doc.uploadedAt}

                        </span>

                      </div>

                    </div>


                    {/* SAME MORE BUTTON */}

                    <div className="relative">

                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === doc.id
                              ? null
                              : doc.id
                          )
                        }
                        className="
                          w-9
                          h-9
                          rounded-full
                          bg-gray-50
                          flex
                          items-center
                          justify-center
                          hover:bg-gray-100
                        "
                      >

                        <MoreVertical
                          className="
                            w-4
                            h-4
                            text-gray-500
                          "
                        />

                      </button>


                      {openMenu === doc.id && (

                        <div
                          className="
                            absolute
                            right-0
                            top-10
                            z-50
                            w-40
                            bg-white
                            rounded-2xl
                            shadow-xl
                            border
                            border-gray-100
                            p-1
                          "
                        >

                          <button
                            onClick={() => {
                              setOpenMenu(null);
                              router.push("/documents");
                            }}
                            className="
                              w-full
                              text-left
                              px-3
                              py-2.5
                              rounded-xl
                              text-xs
                              hover:bg-gray-50
                            "
                          >
                            Open Documents
                          </button>


                          <button
                            onClick={() => {
                              setOpenMenu(null);

                              router.push(
                                `/chat?document=${encodeURIComponent(
                                  doc.id
                                )}`
                              );
                            }}
                            className="
                              w-full
                              text-left
                              px-3
                              py-2.5
                              rounded-xl
                              text-xs
                              hover:bg-gray-50
                            "
                          >
                            Open Chat
                          </button>


                          <button
                            onClick={() => {
                              setOpenMenu(null);

                              router.push(
                                `/quiz?document=${encodeURIComponent(
                                  doc.id
                                )}`
                              );
                            }}
                            className="
                              w-full
                              text-left
                              px-3
                              py-2.5
                              rounded-xl
                              text-xs
                              hover:bg-gray-50
                            "
                          >
                            Generate Quiz
                          </button>

                        </div>

                      )}

                    </div>

                  </div>


                  {/* SAME CHAT + QUIZ BUTTONS */}

                  <div className="flex gap-2 mt-4">

                    <button
                      onClick={() =>
                        router.push(
                          `/chat?document=${encodeURIComponent(
                            doc.id
                          )}`
                        )
                      }
                      className="
                        flex-1
                        py-2.5
                        rounded-full
                        bg-[#F0E8FF]
                        text-[#8151C5]
                        text-xs
                        font-semibold
                        flex
                        items-center
                        justify-center
                        gap-1.5
                        hover:bg-[#E8DCFA]
                        transition
                      "
                    >

                      <MessageSquare className="w-3.5 h-3.5" />

                      Chat

                    </button>


                    <button
                      onClick={() =>
                        router.push(
                          `/quiz?document=${encodeURIComponent(
                            doc.id
                          )}`
                        )
                      }
                      className="
                        flex-1
                        py-2.5
                        rounded-full
                        bg-[#FFF0DA]
                        text-[#C67A20]
                        text-xs
                        font-semibold
                        flex
                        items-center
                        justify-center
                        gap-1.5
                        hover:bg-[#FFE6C5]
                        transition
                      "
                    >

                      <Brain className="w-3.5 h-3.5" />

                      Quiz

                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        </section>


        {/* ===================================================
            WEEKLY GOAL
        =================================================== */}

        <section
          className="
            mt-7
            bg-white
            rounded-[28px]
            p-5
            sm:p-6
            shadow-sm
          "
        >

          <div className="flex items-center justify-between">

            <h2 className="font-bold text-lg">
              Weekly Goal Progress
            </h2>

            <span
              className="
                text-sm
                font-bold
                text-[#70A94D]
              "
            >
              82%
            </span>

          </div>


          <div
            className="
              h-2
              bg-gray-100
              rounded-full
              overflow-hidden
              mt-4
            "
          >

            <div
              className="
                h-full
                w-[82%]
                bg-[#A8F04C]
                rounded-full
              "
            />

          </div>


          <div
            className="
              grid
              grid-cols-3
              gap-2
              mt-5
            "
          >

            <div className="bg-[#F7F9FA] rounded-2xl p-3">

              <p className="text-[9px] text-gray-400">
                Study Time
              </p>

              <p className="text-sm font-bold mt-1">
                14.2h
              </p>

            </div>


            <div className="bg-[#F7F9FA] rounded-2xl p-3">

              <p className="text-[9px] text-gray-400">
                Flashcards
              </p>

              <p className="text-sm font-bold mt-1">
                240
              </p>

            </div>


            <div className="bg-[#F7F9FA] rounded-2xl p-3">

              <p className="text-[9px] text-gray-400">
                Accuracy
              </p>

              <p className="text-sm font-bold text-green-600 mt-1">
                92%
              </p>

            </div>

          </div>

        </section>


        {/* ===================================================
            SAME QUICK REVIEW BUTTON
        =================================================== */}

        <section className="mt-5">

          <button
            onClick={() =>
              router.push("/flashcards")
            }
            className="
              w-full
              bg-[#A8F04C]
              rounded-[26px]
              p-5
              flex
              items-center
              justify-between
              shadow-sm
              hover:bg-[#9AE33E]
              transition
            "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  w-11
                  h-11
                  rounded-full
                  bg-[#7FC238]
                  flex
                  items-center
                  justify-center
                "
              >

                <Zap className="w-5 h-5 text-white" />

              </div>


              <div className="text-left">

                <p className="font-bold text-sm">
                  Quick Review
                </p>

                <p className="text-[10px] text-[#52752C] mt-1">
                  Review your active flashcards
                </p>

              </div>

            </div>


            <ArrowRight className="w-5 h-5" />

          </button>

        </section>

      </div>

    </main>
  );
}