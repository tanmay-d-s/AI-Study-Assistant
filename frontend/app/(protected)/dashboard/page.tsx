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
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  const [stats, setStats] = useState({
    pdfs: 0,
    chats: 0,
    quizzes: 0,
    flashcards: 0,
    recent_uploads: [],
  });

  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

    const t = setTimeout(() => setMounted(true), 20);

    return () => clearTimeout(t);
  }, []);

  // =========================================================
  // DASHBOARD CARDS
  // =========================================================

  const cards = [
    {
      title: "Uploaded PDFs",
      value: stats.pdfs,
      route: "/documents",
      change: "+4 this week",
      icon: FileText,
      gradient: "from-blue-500 via-indigo-500 to-cyan-400",
      glow: "hover:shadow-blue-500/20",
      accent: "text-blue-400",
      borderGlow: "group-hover:border-blue-500/40",
      metric: "98% processed",
    },
    {
      title: "AI Study Chats",
      value: stats.chats,
      route: "/chat",
      change: "+28 today",
      icon: MessageSquare,
      gradient: "from-violet-500 via-purple-500 to-fuchsia-400",
      glow: "hover:shadow-violet-500/20",
      accent: "text-violet-400",
      borderGlow: "group-hover:border-violet-500/40",
      metric: "4.9 avg rating",
    },
    {
      title: "Quizzes Generated",
      value: stats.quizzes,
      route: "/quiz",
      change: "+12 completed",
      icon: Brain,
      gradient: "from-amber-500 via-orange-500 to-rose-400",
      glow: "hover:shadow-amber-500/20",
      accent: "text-amber-400",
      borderGlow: "group-hover:border-amber-500/40",
      metric: "92% accuracy",
    },
    {
      title: "Active Flashcards",
      value: stats.flashcards,
      route: "/flashcards",
      change: "+65 mastered",
      icon: Layers,
      gradient: "from-emerald-500 via-teal-500 to-cyan-400",
      glow: "hover:shadow-emerald-500/20",
      accent: "text-emerald-400",
      borderGlow: "group-hover:border-emerald-500/40",
      metric: "Spaced repetition",
    },
  ];

  // =========================================================
  // RECENT FILES
  // =========================================================

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

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredUploads = recentFiles.filter((doc) =>
    doc.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 p-4 md:p-8 lg:p-10 overflow-hidden font-sans selection:bg-violet-500/30">
      {/* Ambient background glows */}
      <div className="fixed top-0 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="fixed bottom-0 right-10 translate-y-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Grid pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/60">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-violet-300" />
                AI Study Workspace
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Dashboard
            </h1>

            <p className="text-slate-400 text-sm mt-1">
              Here is what is happening across your study materials today.
            </p>
          </div>

          {/* Upload Material */}
          <button
            onClick={() => router.push("/upload")}
            className="relative group overflow-hidden rounded-2xl p-[1px] font-medium text-sm w-fit focus:outline-none"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 transition-all duration-300 group-hover:opacity-90" />

            <span className="relative px-5 py-2.5 rounded-[15px] bg-slate-950 flex items-center gap-2 transition-all duration-300 group-hover:bg-opacity-80 text-white font-semibold">
              <Upload className="w-4 h-4 text-violet-400 group-hover:scale-110 transition-transform" />
              Upload Material
            </span>
          </button>
        </header>

        {/* =====================================================
            STREAK BANNER
        ===================================================== */}

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900/80 via-indigo-950/30 to-slate-900/80 p-6 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">

            <div className="flex items-start gap-4">

              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/30 text-amber-400 shrink-0">
                <Flame className="w-7 h-7 animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">
                    5-Day Study Streak Active
                  </h3>

                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                    On Fire
                  </span>
                </div>

                <p className="text-slate-300 text-sm mt-0.5">
                  You are in the top 5% of active learners this week. Next
                  recommended task: Review Flashcards.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto justify-end border-t lg:border-t-0 border-slate-800 pt-4 lg:pt-0">

              {/* Quick Review */}
              <button
                onClick={() => router.push("/flashcards")}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-all flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Quick Review
              </button>

              {/* Start AI Quiz */}
              <button
                onClick={() => router.push("/quiz")}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs font-semibold text-white transition-all shadow-lg shadow-violet-600/30 flex items-center gap-2"
              >
                Start AI Quiz
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>
          </div>
        </div>

        {/* =====================================================
            STAT CARDS
        ===================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {cards.map((card, i) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                onClick={() => router.push(card.route)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    router.push(card.route);
                  }
                }}
                className={`
                  group relative overflow-hidden rounded-3xl border border-slate-800/80
                  bg-slate-900/40 p-6 backdrop-blur-xl transition-all duration-500 ease-out
                  hover:-translate-y-1.5 hover:border-slate-700 hover:shadow-2xl
                  ${card.glow}
                  ${card.borderGlow}
                  cursor-pointer
                  ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                `}
                style={{
                  transitionDelay: mounted ? `${i * 90}ms` : "0ms",
                }}
              >

                {/* Glow */}
                <div
                  className={`
                    absolute -top-12 -right-12 h-36 w-36 rounded-full
                    bg-gradient-to-br ${card.gradient}
                    opacity-[0.07]
                    blur-3xl
                    transition-all duration-500
                    group-hover:opacity-25
                    group-hover:scale-125
                  `}
                />

                <div className="flex items-start justify-between">

                  <div className="relative inline-flex items-center justify-center h-12 w-12 rounded-2xl p-3 bg-slate-950/80 border border-white/10 shadow-inner transition-transform duration-300 group-hover:scale-110">
                    <Icon
                      className={`w-6 h-6 ${card.accent}`}
                      strokeWidth={2}
                    />
                  </div>

                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    <TrendingUp className="w-3 h-3" />
                    {card.change}
                  </span>

                </div>

                <div className="mt-5">

                  <h2 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    {card.title}
                  </h2>

                  {loading ? (
                    <div className="h-10 w-24 mt-2 rounded-xl bg-slate-800/60 animate-pulse" />
                  ) : (
                    <p className="text-4xl font-extrabold text-white tracking-tight tabular-nums mt-1">
                      {card.value.toLocaleString()}
                    </p>
                  )}

                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
                    <span>{card.metric}</span>

                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300 transition-colors" />
                  </div>

                </div>

                {/* Bottom glow */}
                <div
                  className={`
                    absolute bottom-0 left-0 h-[2px] w-0
                    bg-gradient-to-r ${card.gradient}
                    transition-all duration-500
                    group-hover:w-full
                  `}
                />

              </div>
            );
          })}

        </div>

        {/* =====================================================
            DOCUMENTS + WEEKLY PROGRESS
        ===================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ===================================================
              RECENT DOCUMENTS
          =================================================== */}

          <div className="lg:col-span-2 space-y-4">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/30 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-xl">

              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-violet-400" />
                  Recent Study Documents
                </h2>
              </div>

              {/* Search */}
              <div className="relative min-w-[220px]">

                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  type="text"
                  placeholder="Search PDFs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950/80 text-xs text-slate-200 placeholder-slate-500 rounded-xl pl-9 pr-3 py-2 border border-slate-800 focus:outline-none focus:border-violet-500/50 transition-colors"
                />

              </div>

            </div>

            <div className="space-y-3">

              {filteredUploads.length === 0 ? (
                <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-center">
                  <FileText className="w-8 h-8 mx-auto text-slate-600 mb-2" />

                  <p className="text-sm text-slate-400">
                    No PDFs found
                  </p>
                </div>
              ) : (
                filteredUploads.map((doc) => (

                  <div
                    key={doc.id}
                    className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-violet-500/30 hover:bg-slate-900/70 transition-all duration-300 gap-4"
                  >

                    {/* Document info */}
                    <div className="flex items-start gap-3.5">

                      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0 group-hover:scale-105 transition-transform">
                        <FileText className="w-5 h-5" />
                      </div>

                      <div>

                        <h4 className="text-sm font-semibold text-slate-200 group-hover:text-violet-300 transition-colors line-clamp-1">
                          {doc.title}
                        </h4>

                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">

                          <span>{doc.size}</span>

                          <span>•</span>

                          <span>{doc.pages} Pages</span>

                          <span>•</span>

                          <span className="flex items-center gap-1 text-slate-500">
                            <Clock className="w-3 h-3" />
                            {doc.uploadedAt}
                          </span>

                        </div>

                      </div>
                    </div>

                    {/* Document actions */}
                    <div className="flex items-center gap-2 self-end sm:self-center">

                      {/* CHAT */}
                      <button
                        onClick={() =>
                          router.push(
                            `/chat?document=${encodeURIComponent(doc.id)}`
                          )
                        }
                        className="px-3 py-1.5 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 border border-violet-500/20 text-xs font-medium transition-colors flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Chat
                      </button>

                      {/* QUIZ */}
                      <button
                        onClick={() =>
                          router.push(
                            `/quiz?document=${encodeURIComponent(doc.id)}`
                          )
                        }
                        className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 text-xs font-medium transition-colors flex items-center gap-1.5"
                      >
                        <Brain className="w-3.5 h-3.5" />
                        Quiz
                      </button>

                      {/* MORE */}
                      <button
                        onClick={() => {
                          console.log("More options for document:", doc.id);
                        }}
                        className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                    </div>

                  </div>

                ))
              )}

            </div>

          </div>

          {/* ===================================================
              WEEKLY GOAL
          =================================================== */}

          <div className="space-y-4">

            <div className="p-5 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl">

              <h3 className="text-sm font-bold text-white mb-3 flex items-center justify-between">

                <span>Weekly Goal Progress</span>

                <span className="text-xs text-violet-400 font-semibold">
                  82%
                </span>

              </h3>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">

                <div className="h-full rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 w-[82%]" />

              </div>

              {/* Statistics */}
              <div className="mt-4 space-y-2 text-xs text-slate-400">

                <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                  <span>Target Study Time</span>

                  <span className="font-semibold text-slate-200">
                    14.2 / 18 hrs
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                  <span>Mastered Flashcards</span>

                  <span className="font-semibold text-slate-200">
                    240 cards
                  </span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span>Quiz Accuracy</span>

                  <span className="font-semibold text-emerald-400">
                    92%
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}