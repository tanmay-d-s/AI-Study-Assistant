"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Upload,
  MessageSquare,
  Brain,
  Layers,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Upload PDF",
    href: "/upload",
    icon: Upload,
  },
  {
    name: "Chat",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    name: "Quiz",
    href: "/quiz",
    icon: Brain,
  },
  {
    name: "Flashcards",
    href: "/flashcards",
    icon: Layers,
  },
];

export default function Sidebar() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  }

  return (
    <aside className="w-72 min-h-screen bg-black/40 backdrop-blur-xl border-r border-white/10 p-6">

      <h1 className="text-3xl font-bold text-white mb-10">
        🤖 AI Study
      </h1>

      <nav className="space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-4 p-4 rounded-xl text-gray-300 hover:bg-blue-600 hover:text-white transition"
            >
              <Icon size={22} />

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-16 w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 transition"
      >
        <LogOut size={20} />

        Logout
      </button>

    </aside>
  );
}