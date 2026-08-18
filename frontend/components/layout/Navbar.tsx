"use client";

export default function Navbar() {
  return (
    <header className="h-20 flex items-center justify-between px-8 border-b border-white/10 bg-black/20 backdrop-blur-xl">

      <div>
        <h2 className="text-2xl font-bold text-white">
          Dashboard
        </h2>

        <p className="text-gray-400">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
          T
        </div>

      </div>

    </header>
  );
}