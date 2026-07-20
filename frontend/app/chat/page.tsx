export default function ChatPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">AI Chat</h1>

      <div className="rounded-xl bg-slate-900 p-6 h-[500px] flex flex-col justify-between">
        <div className="text-slate-400">
          Upload a document to start chatting.
        </div>

        <input
          type="text"
          placeholder="Ask a question..."
          className="w-full rounded-lg bg-slate-800 p-3 outline-none"
        />
      </div>
    </main>
  );
}