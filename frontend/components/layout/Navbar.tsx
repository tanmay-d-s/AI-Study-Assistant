"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Search,
  Sparkles,
} from "lucide-react";

export default function Navbar() {
  const [userName, setUserName] = useState("Tanmay");

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        setUserName(
          user?.name ||
          user?.username ||
          user?.full_name ||
          "Tanmay"
        );
      }
    } catch (error) {
      console.error("Failed to load user:", error);
    }
  }, []);

  const firstLetter =
    userName?.charAt(0)?.toUpperCase() || "T";

  return (
    <header
      className="
        sticky
        top-0
        z-40
        h-20
        w-full
        bg-white
        border-b
        border-[#E5EAE7]
        flex
        items-center
        justify-between
        px-5
        sm:px-6
        lg:px-8
      "
    >
      {/* ================= LEFT ================= */}

      <div className="flex items-center gap-3">
        <div>
          <p className="text-xs text-[#8A948E] hidden sm:block">
            AI Study Workspace
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-[#17201A]">
            Dashboard
          </h2>
        </div>
      </div>

      {/* ================= RIGHT ================= */}

      <div className="flex items-center gap-3">
        {/* Search */}

        <button
          className="
            hidden
            sm:flex
            w-10
            h-10
            rounded-xl
            items-center
            justify-center
            bg-[#F5F7F5]
            text-[#66716A]
            hover:bg-[#EEF2EE]
            transition
          "
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* AI Button */}

        <button
          className="
            hidden
            sm:flex
            w-10
            h-10
            rounded-xl
            items-center
            justify-center
            bg-[#B7F34A]
            text-[#273414]
            hover:bg-[#AAE93E]
            transition
          "
          aria-label="AI Assistant"
        >
          <Sparkles className="w-5 h-5" />
        </button>

        {/* Notification */}

        <button
          className="
            hidden
            sm:flex
            w-10
            h-10
            rounded-xl
            items-center
            justify-center
            bg-[#F5F7F5]
            text-[#66716A]
            hover:bg-[#EEF2EE]
            transition
          "
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
        </button>

        {/* Profile */}

        <button
          className="
            w-11
            h-11
            rounded-full
            bg-[#B7F34A]
            text-[#17200D]
            flex
            items-center
            justify-center
            font-bold
            text-sm
            shadow-sm
            hover:scale-105
            transition
          "
          title={userName}
        >
          {firstLetter}
        </button>
      </div>
    </header>
  );
}