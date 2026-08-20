"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signup } from "@/lib/services/auth";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!fullName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await signup(
        fullName,
        email,
        password
      );

      console.log("Signup successful:", response);

      setSuccess("Account created successfully! Redirecting...");

      setTimeout(() => {
        router.push("/login");
      }, 1000);

    } catch (err: any) {
      console.error("Signup error:", err);

      if (err?.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Unable to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black flex items-center justify-center px-6">

      <div className="w-full max-w-md rounded-3xl border border-gray-700 bg-white/10 backdrop-blur-xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold text-white text-center">
          Create Account 🚀
        </h1>

        <p className="text-gray-400 text-center mt-2">
          Join your AI Study Assistant
        </p>

        <form
          onSubmit={handleSignup}
          className="mt-8 space-y-5"
        >

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-xl bg-black/30 border border-gray-700 px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl bg-black/30 border border-gray-700 px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl bg-black/30 border border-gray-700 px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl bg-green-500/10 border border-green-500/30 px-4 py-3 text-green-400 text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-600 hover:bg-green-700 disabled:bg-gray-600 py-3 font-semibold text-white transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
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