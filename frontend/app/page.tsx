import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold mb-4">
          AI Study Assistant
        </h1>

        <p className="text-slate-400 text-lg mb-10">
          Upload notes, chat with your documents, generate summaries, and create quizzes.
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/upload"
            className="rounded-xl bg-slate-900 p-6 hover:bg-slate-800 transition"
          >
            <h2 className="text-xl font-semibold mb-2">📄 Upload Notes</h2>
            <p className="text-slate-400">
              Upload PDFs and study materials.
            </p>
          </Link>

          <Link
            href="/chat"
            className="rounded-xl bg-slate-900 p-6 hover:bg-slate-800 transition"
          >
            <h2 className="text-xl font-semibold mb-2">💬 AI Chat</h2>
            <p className="text-slate-400">
              Ask questions about your notes.
            </p>
          </Link>

          <Link
            href="/summary"
            className="rounded-xl bg-slate-900 p-6 hover:bg-slate-800 transition"
          >
            <h2 className="text-xl font-semibold mb-2">📝 Summaries</h2>
            <p className="text-slate-400">
              Generate concise study notes.
            </p>
          </Link>

          <Link
            href="/quiz"
            className="rounded-xl bg-slate-900 p-6 hover:bg-slate-800 transition"
          >
            <h2 className="text-xl font-semibold mb-2">🧠 Quiz Generator</h2>
            <p className="text-slate-400">
              Test your knowledge with AI quizzes.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}