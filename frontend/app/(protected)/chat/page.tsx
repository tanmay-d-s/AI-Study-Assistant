"use client";

import { useState, useRef, useEffect } from "react";
import api from "@/lib/api";

import ChatBubble from "@/components/chat/ChatBubble";
import ChatInput from "@/components/chat/ChatInput";
import Typing from "@/components/chat/Typing";

interface Message {
  role: "user" | "assistant";
  message: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendMessage() {
    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        message: userQuestion,
      },
    ]);

    setQuestion("");

    try {
      setLoading(true);

      const response = await api.post("/chat", {
        question: userQuestion,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          message: response.data.answer,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          message: "❌ Failed to get AI response.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="max-w-5xl mx-auto h-[85vh] flex flex-col">

      <h1 className="text-4xl font-bold text-white mb-6">
        💬 AI Chat
      </h1>

      <div className="flex-1 rounded-3xl border border-white/10 bg-white/5 p-6 overflow-y-auto">

        {messages.length === 0 && (
          <p className="text-gray-400 text-center mt-20">
            Ask anything about your uploaded PDF.
          </p>
        )}

        {messages.map((msg, index) => (
          <ChatBubble
            key={index}
            role={msg.role}
            message={msg.message}
          />
        ))}

        {loading && <Typing />}

        <div ref={bottomRef} />

      </div>

      <div className="mt-5">
      <ChatInput
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        onSend={sendMessage}
        loading={loading}
      />
      </div>

    </div>
  );
}