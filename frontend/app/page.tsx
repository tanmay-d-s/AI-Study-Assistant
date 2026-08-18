import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      <h1 className="text-6xl font-bold mb-6">
        AI Study Assistant
      </h1>

      <p className="text-gray-400 text-xl text-center max-w-2xl">
        Upload notes, chat with PDFs, generate quizzes and flashcards using AI.
      </p>

      <div className="flex gap-6 mt-12">

        <Link
          href="/login"
          className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg font-semibold transition"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="border border-gray-600 hover:bg-gray-800 px-8 py-4 rounded-xl text-lg font-semibold transition"
        >
          Sign Up
        </Link>

      </div>

    </main>
  );
}