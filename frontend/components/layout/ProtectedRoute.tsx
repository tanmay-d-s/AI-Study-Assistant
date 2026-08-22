"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { isAuthenticated } from "@/lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const loggedIn = isAuthenticated();

    if (!loggedIn) {
      router.replace("/login");
      return;
    }

    setAuthenticated(true);
    setChecking(false);
  }, [router]);

  if (checking) {
    return (
      <div
        className="
          min-h-screen
          bg-[#F1F6F3]
          flex
          items-center
          justify-center
        "
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-[#B7F34A]
              flex
              items-center
              justify-center
              text-2xl
              animate-pulse
            "
          >
            🤖
          </div>

          <p className="text-sm text-[#69746D]">
            Loading your study workspace...
          </p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}