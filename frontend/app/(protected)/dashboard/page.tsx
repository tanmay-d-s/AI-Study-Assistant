"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/lib/services/dashboard";

import {
  FileText,
  MessageSquare,
  Brain,
  Layers,
} from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    pdfs: 0,
    chats: 0,
    quizzes: 0,
    flashcards: 0,
    recent_uploads: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const cards = [
    {
      title: "Uploaded PDFs",
      value: stats.pdfs,
      icon: FileText,
    },
    {
      title: "AI Chats",
      value: stats.chats,
      icon: MessageSquare,
    },
    {
      title: "Quizzes",
      value: stats.quizzes,
      icon: Brain,
    },
    {
      title: "Flashcards",
      value: stats.flashcards,
      icon: Layers,
    },
  ];

  return (
    <>
      <h1 className="text-4xl font-bold text-white mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <Icon
                size={40}
                className="text-blue-400 mb-4"
              />

              <h2 className="text-white">
                {card.title}
              </h2>

              <p className="text-5xl font-bold text-white mt-4">
                {loading ? "..." : card.value}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}