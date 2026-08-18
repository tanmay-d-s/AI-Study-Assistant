"use client";

import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  return (
    <ProtectedRoute>
      <main className="flex min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <div className="p-8">
            {children}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}