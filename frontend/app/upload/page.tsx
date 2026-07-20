export default function UploadPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Upload Notes</h1>

      <div className="max-w-xl rounded-xl border-2 border-dashed border-slate-700 p-10 text-center">
        <p className="text-slate-400 mb-4">
          Upload your PDF notes to start studying.
        </p>

        <input
          type="file"
          accept=".pdf"
          className="block w-full text-sm"
        />
      </div>
    </main>
  );
}