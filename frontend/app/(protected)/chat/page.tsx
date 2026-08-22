"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  ArrowLeft,
  Send,
  Sparkles,
  Plus,
  FileText,
  Bot,
  User,
  Trash2,
} from "lucide-react";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const documentId = searchParams.get("document");

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text:
        documentId
          ? "Hi! I’m ready to help you understand this document. Ask me anything about it."
          : "Hi! I’m your AI Study Assistant. Ask me anything about your studies.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    const text = message.trim();

    if (!text || loading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    /*
      IMPORTANT:
      We are not inventing your backend endpoint here.

      Once your existing chat service/endpoint is connected,
      replace the simulated response below with that service.
    */

    setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text:
          "I received your question. Your existing FastAPI/Gemini chat endpoint can be connected here.",
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);

      setLoading(false);
    }, 700);
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function clearChat() {
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        text:
          "Chat cleared. What would you like to study?",
      },
    ]);
  }

  return (
    <main className="min-h-screen bg-[#EEF5F8] flex flex-col">

      {/* HEADER */}

      <header className="px-4 sm:px-6 pt-4">

        <div className="max-w-4xl mx-auto">

          <div className="bg-white rounded-[24px] px-4 py-3 flex items-center justify-between shadow-sm border border-gray-100">

            <button
              onClick={() =>
                router.push("/dashboard")
              }
              className="w-10 h-10 rounded-full bg-[#F5F7F6] flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>


            <div className="flex items-center gap-2">

              <div className="w-9 h-9 rounded-full bg-[#A8F04C] flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>

              <div className="text-center">

                <h1 className="font-bold text-sm">
                  AI Study Assistant
                </h1>

                <p className="text-[9px] text-gray-400">
                  {documentId
                    ? "Document Chat"
                    : "Ready to help"}
                </p>

              </div>

            </div>


            <button
              onClick={clearChat}
              className="w-10 h-10 rounded-full bg-[#F5F7F6] flex items-center justify-center"
              title="Clear chat"
            >
              <Trash2 className="w-4 h-4 text-gray-500" />
            </button>

          </div>

        </div>

      </header>


      {/* DOCUMENT CONTEXT */}

      {documentId && (
        <div className="px-4 sm:px-6 mt-3">

          <div className="max-w-4xl mx-auto">

            <div className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 border border-gray-100">

              <div className="w-9 h-9 rounded-full bg-[#EAF2FF] flex items-center justify-center">

                <FileText className="w-4 h-4 text-blue-500" />

              </div>

              <div>

                <p className="text-xs font-semibold">
                  Selected Document
                </p>

                <p className="text-[9px] text-gray-400">
                  Document ID: {documentId}
                </p>

              </div>

            </div>

          </div>

        </div>
      )}


      {/* CHAT */}

      <section className="flex-1 px-4 sm:px-6 py-5">

        <div className="max-w-4xl mx-auto space-y-4">

          {messages.map((item) => (

            <div
              key={item.id}
              className={`flex ${
                item.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`
                  flex
                  gap-2
                  max-w-[88%]
                  sm:max-w-[75%]
                  ${
                    item.role === "user"
                      ? "flex-row-reverse"
                      : ""
                  }
                `}
              >

                <div
                  className={`
                    w-9
                    h-9
                    rounded-full
                    shrink-0
                    flex
                    items-center
                    justify-center
                    ${
                      item.role === "user"
                        ? "bg-black text-white"
                        : "bg-[#A8F04C]"
                    }
                  `}
                >

                  {item.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}

                </div>


                <div
                  className={`
                    px-4
                    py-3
                    rounded-[22px]
                    text-sm
                    leading-relaxed
                    ${
                      item.role === "user"
                        ? "bg-black text-white rounded-tr-md"
                        : "bg-white text-gray-700 border border-gray-100 rounded-tl-md shadow-sm"
                    }
                  `}
                >
                  {item.text}
                </div>

              </div>

            </div>

          ))}


          {loading && (

            <div className="flex gap-2">

              <div className="w-9 h-9 rounded-full bg-[#A8F04C] flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>

              <div className="bg-white rounded-[22px] px-5 py-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>

            </div>

          )}

        </div>

      </section>


      {/* SUGGESTIONS */}

      <div className="px-4 sm:px-6 pb-3">

        <div className="max-w-4xl mx-auto flex gap-2 overflow-x-auto scrollbar-hide">

          {[
            "Explain simply",
            "Summarize this",
            "Give an example",
            "Create questions",
          ].map((suggestion) => (

            <button
              key={suggestion}
              onClick={() =>
                setMessage(suggestion)
              }
              className="
                shrink-0
                bg-white
                border
                border-gray-100
                rounded-full
                px-4
                py-2
                text-[10px]
                text-gray-500
              "
            >
              {suggestion}
            </button>

          ))}

        </div>

      </div>


      {/* INPUT */}

      <footer className="px-4 sm:px-6 pb-4 safe-bottom">

        <div className="max-w-4xl mx-auto">

          <div className="bg-white rounded-[25px] p-2 border border-gray-100 shadow-lg flex items-end gap-2">

            <button
              className="
                w-10
                h-10
                rounded-full
                bg-[#F3F5F4]
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <Plus className="w-4 h-4" />
            </button>


            <textarea
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Ask a question..."
              rows={1}
              className="
                flex-1
                resize-none
                bg-transparent
                py-2.5
                px-1
                text-sm
                min-h-[40px]
                max-h-[120px]
              "
            />


            <button
              onClick={sendMessage}
              disabled={!message.trim() || loading}
              className="
                w-10
                h-10
                rounded-full
                bg-[#A8F04C]
                flex
                items-center
                justify-center
                shrink-0
                disabled:opacity-40
                hover:scale-105
                transition
              "
            >
              <Send className="w-4 h-4" />
            </button>

          </div>

        </div>

      </footer>

    </main>
  );
}