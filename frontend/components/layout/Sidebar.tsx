"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Upload,
  MessageSquare,
  Brain,
  Layers,
  LogOut,
  Sparkles,
} from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      route: "/dashboard",
    },
    {
      name: "Upload PDF",
      icon: Upload,
      route: "/upload",
    },
    {
      name: "Chat",
      icon: MessageSquare,
      route: "/chat",
    },
    {
      name: "Quiz",
      icon: Brain,
      route: "/quiz",
    },
    {
      name: "Flashcards",
      icon: Layers,
      route: "/flashcards",
    },
  ];

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  }

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className="
          hidden
          md:flex
          fixed
          left-0
          top-0
          bottom-0
          z-50
          w-64
          flex-col
          bg-white
          border-r
          border-[#E5EAE7]
          px-5
          py-6
        "
      >
        {/* ================= LOGO ================= */}

        <div className="flex items-center gap-3 px-2 mb-10">
          <div
            className="
              w-11
              h-11
              rounded-2xl
              bg-[#B7F34A]
              flex
              items-center
              justify-center
              text-2xl
              shadow-sm
            "
          >
            🤖
          </div>

          <div>
            <h1 className="text-xl font-bold text-[#111827]">
              AI Study
            </h1>

            <p className="text-xs text-gray-400">
              Your study assistant
            </p>
          </div>
        </div>

        {/* ================= NAVIGATION ================= */}

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.route ||
              pathname.startsWith(item.route + "/");

            return (
              <button
                key={item.route}
                onClick={() => router.push(item.route)}
                className={`
                  w-full
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3.5
                  rounded-2xl
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? "bg-[#B7F34A] text-[#17200D] shadow-sm"
                      : "text-[#5F6B64] hover:bg-[#F3F7F1] hover:text-[#17200D]"
                  }
                `}
              >
                <Icon
                  className={`
                    w-5
                    h-5
                    ${
                      isActive
                        ? "text-[#17200D]"
                        : "text-[#718078]"
                    }
                  `}
                  strokeWidth={2}
                />

                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* ================= STUDY PRO CARD ================= */}

        <div
          className="
            rounded-2xl
            bg-[#E9FBD0]
            border
            border-[#D8F4B0]
            p-4
            mb-4
          "
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="
                w-8
                h-8
                rounded-xl
                bg-white
                flex
                items-center
                justify-center
              "
            >
              <Sparkles
                className="w-4 h-4 text-[#7AAE28]"
              />
            </div>

            <span className="text-sm font-bold text-[#273414]">
              Study Pro
            </span>
          </div>

          <p className="text-xs text-[#65734E] leading-5">
            Upgrade your learning with unlimited AI study tools.
          </p>

          <button
            onClick={() => {
              alert("Study Pro coming soon!");
            }}
            className="
              w-full
              mt-3
              py-2
              rounded-xl
              bg-white
              text-xs
              font-semibold
              text-[#273414]
              hover:bg-[#F8FFF0]
              transition
            "
          >
            + Upgrade to Pro
          </button>
        </div>

        {/* ================= LOGOUT ================= */}

        <button
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            py-3
            rounded-2xl
            bg-white
            border
            border-[#E5EAE7]
            text-[#6B746E]
            text-sm
            font-semibold
            hover:bg-red-50
            hover:border-red-200
            hover:text-red-500
            transition-all
          "
        >
          <LogOut className="w-5 h-5" />

          Logout
        </button>
      </aside>

      {/* ================= MOBILE BOTTOM NAV ================= */}

      <nav
        className="
          md:hidden
          fixed
          bottom-0
          left-0
          right-0
          z-50
          bg-white
          border-t
          border-[#E5EAE7]
          px-2
          py-2
          shadow-[0_-5px_20px_rgba(0,0,0,0.06)]
        "
      >
        <div className="flex items-center justify-around">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.route ||
              pathname.startsWith(item.route + "/");

            return (
              <button
                key={item.route}
                onClick={() => router.push(item.route)}
                className={`
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  min-w-[58px]
                  py-2
                  rounded-xl
                  transition-all
                  ${
                    isActive
                      ? "bg-[#B7F34A] text-[#17200D]"
                      : "text-[#7A847D]"
                  }
                `}
              >
                <Icon
                  className="w-5 h-5"
                  strokeWidth={2}
                />

                <span className="text-[10px] font-medium">
                  {item.name === "Upload PDF"
                    ? "Upload"
                    : item.name}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}