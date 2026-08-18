interface ChatBubbleProps {
  role: "user" | "assistant";
  message: string;
}

export default function ChatBubble({
  role,
  message,
}: ChatBubbleProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-5`}
    >
      <div
        className={`max-w-2xl rounded-3xl px-5 py-4 shadow-lg ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-white/10 text-gray-100 border border-white/10"
        }`}
      >
        <p className="whitespace-pre-wrap">
          {message}
        </p>
      </div>
    </div>
  );
}