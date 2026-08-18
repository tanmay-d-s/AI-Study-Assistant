"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { login } from "@/lib/services/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await login(email, password);

      localStorage.setItem("token", data.access_token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert("Login Successful!");

      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
        "Login failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black flex items-center justify-center px-6">

      <div className="w-full max-w-md rounded-3xl border border-gray-700 bg-white/10 backdrop-blur-xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold text-white text-center">
          Welcome Back 👋
        </h1>

        <p className="text-gray-400 text-center mt-2">
          Login to AI Study Assistant
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5 mt-8"
        >

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

        </form>

      </div>

    </main>
  );
}