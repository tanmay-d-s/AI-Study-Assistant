"use client";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div
        className="
          min-h-screen
          w-full
          bg-[#EEF5F7]
          text-[#17201A]
          overflow-x-hidden
        "
      >
        {/* ================= SIDEBAR ================= */}

        <Sidebar />

        {/* ================= MAIN AREA ================= */}

        <div
          className="
            min-h-screen
            w-full
            md:ml-64
            md:w-[calc(100%-16rem)]
          "
        >
          {/* ================= NAVBAR ================= */}

          <Navbar />

          {/* ================= PAGE CONTENT ================= */}

          <main
            className="
              w-full
              min-w-0
              px-4
              sm:px-6
              lg:px-8
              py-6
              pb-24
              md:pb-8
            "
          >
            <div className="w-full min-w-0">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}