import React from "react";

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  loading: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  onKeyDown,
  loading,
}: ChatInputProps) {
  return (
    <div className="border-t border-white/10 pt-4">
      <textarea
        rows={3}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Ask anything..."
        className="w-full rounded-2xl bg-white/10 border border-white/10 p-4 text-white resize-none outline-none"
      />

      <button
        onClick={onSend}
        disabled={loading}
        className="mt-4 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
}