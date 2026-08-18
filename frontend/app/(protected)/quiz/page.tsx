"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function QuizPage() {
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateQuiz() {
    try {
      setLoading(true);

      const response = await api.get("/quiz");

      setQuiz(response.data.quiz);
    } catch (error) {
      console.error(error);
      alert("Failed to generate quiz.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        📝 AI Quiz Generator
      </h1>

      <button
        onClick={generateQuiz}
        className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl"
      >
        {loading ? "Generating..." : "Generate Quiz"}
      </button>

      {quiz && (
        <div className="mt-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Generated Quiz
          </h2>

          <pre className="whitespace-pre-wrap text-gray-300">
            {quiz}
          </pre>

        </div>
      )}

    </main>
  );
}