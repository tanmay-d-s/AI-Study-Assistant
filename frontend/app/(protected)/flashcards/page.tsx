"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateFlashcards() {
    try {
      setLoading(true);

      const response = await api.get("/flashcards");

      setFlashcards(response.data.flashcards);
    } catch (error) {
      console.error(error);
      alert("Failed to generate flashcards.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        🃏 AI Flashcards
      </h1>

      <button
        onClick={generateFlashcards}
        className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl"
      >
        {loading ? "Generating..." : "Generate Flashcards"}
      </button>

      {flashcards && (
        <div className="mt-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Generated Flashcards
          </h2>

          <pre className="whitespace-pre-wrap text-gray-300">
            {flashcards}
          </pre>

        </div>
      )}

    </main>
  );
}