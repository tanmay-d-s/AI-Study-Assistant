"use client";

import { useRef, useState } from "react";
import api from "@/lib/api";

export default function UploadPage() {
  const fileRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  async function uploadFile() {
    if (!fileRef.current?.files?.length) {
      alert("Please select a PDF.");
      return;
    }

    const file = fileRef.current.files[0];

    if (file.type !== "application/pdf") {
      alert("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setSummary("");

      const response = await api.post(
        "/upload",
        formData
      );

      setSummary(response.data.summary);

      alert("PDF uploaded successfully!");
    } catch (error: any) {
      console.error("Upload error:", error);

      alert(
        error?.response?.data?.detail ||
        "Upload failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto">

      <h1 className="text-4xl font-bold text-white mb-8">
        📄 Upload Study Notes
      </h1>

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

        <input
          type="file"
          accept=".pdf,application/pdf"
          ref={fileRef}
          className="mb-6 block text-white"
        />

        <button
          onClick={uploadFile}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-8 py-3 rounded-xl text-white"
        >
          {loading ? "Uploading..." : "Upload PDF"}
        </button>

      </div>

      {summary && (
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

          <h2 className="text-2xl font-bold text-white mb-4">
            🤖 AI Summary
          </h2>

          <p className="text-gray-300 whitespace-pre-wrap">
            {summary}
          </p>

        </div>
      )}

    </div>
  );
}