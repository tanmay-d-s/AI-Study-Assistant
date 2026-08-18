"use client";

import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black flex items-center justify-center px-6">

      <div className="w-full max-w-md rounded-3xl border border-gray-700 bg-white/10 backdrop-blur-xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold text-white text-center">
          Create Account 🚀
        </h1>

        <p className="text-gray-400 text-center mt-2">
          Join your AI Study Assistant
        </p>

        <form className="mt-8 space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-xl bg-black/30 border border-gray-700 px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl bg-black/30 border border-gray-700 px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl bg-black/30 border border-gray-700 px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          <button
            className="w-full rounded-xl bg-green-600 hover:bg-green-700 py-3 font-semibold text-white transition"
          >
            Create Account
          </button>

        </form>

        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-400 hover:text-blue-300"
          >
            Login
          </Link>
        </p>

      </div>

    </main>
  );
}