import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Study Assistant",
  description:
    "Your personal AI-powered study companion for notes, PDFs, quizzes, summaries, and flashcards.",
  keywords: [
    "AI Study Assistant",
    "PDF Chat",
    "AI Notes",
    "Flashcards",
    "Quiz Generator",
  ],
};

export const viewport: Viewport = {
  themeColor: "#F1F2F4",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body
        className="
          min-h-screen
          flex
          flex-col
          bg-[#F1F2F4]
          text-gray-900
          overflow-x-hidden
        "
      >
        {children}
      </body>
    </html>
  );
}