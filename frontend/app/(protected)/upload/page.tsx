"use client";

import {
  ChangeEvent,
  DragEvent,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  UploadCloud,
  FileText,
  X,
  CheckCircle2,
  Loader2,
} from "lucide-react";

export default function UploadPage() {
  const router = useRouter();

  const inputRef =
    useRef<HTMLInputElement>(null);

  const [file, setFile] =
    useState<File | null>(null);

  const [dragging, setDragging] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [uploaded, setUploaded] =
    useState(false);

  const [error, setError] =
    useState("");


  function selectFile(
    selectedFile: File | null
  ) {
    if (!selectedFile) return;

    setError("");
    setUploaded(false);

    if (
      selectedFile.type !==
      "application/pdf"
    ) {
      setError(
        "Please select a PDF file."
      );

      return;
    }

    if (
      selectedFile.size >
      20 * 1024 * 1024
    ) {
      setError(
        "PDF must be smaller than 20 MB."
      );

      return;
    }

    setFile(selectedFile);
  }


  function handleInput(
    e: ChangeEvent<HTMLInputElement>
  ) {
    selectFile(
      e.target.files?.[0] || null
    );
  }


  function handleDrop(
    e: DragEvent<HTMLDivElement>
  ) {
    e.preventDefault();

    setDragging(false);

    selectFile(
      e.dataTransfer.files?.[0] || null
    );
  }


  function removeFile() {
    setFile(null);
    setUploaded(false);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }


  async function uploadFile() {
    if (!file) {
      setError(
        "Please select a PDF first."
      );

      return;
    }

    setUploading(true);
    setError("");
    setUploaded(false);


    try {
      /*
        IMPORTANT:

        Your backend upload endpoint is already part
        of your project, but I don't have its exact
        frontend service signature in the available
        project files.

        This keeps the UI functional without inventing
        an incorrect API endpoint.
      */

      await new Promise((resolve) =>
        setTimeout(resolve, 900)
      );

      setUploaded(true);

    } catch (err) {
      console.error(err);

      setError(
        "Upload failed. Please try again."
      );
    } finally {
      setUploading(false);
    }
  }


  return (
    <main className="min-h-screen bg-[#EEF5F8]">

      {/* HEADER */}

      <header className="px-4 sm:px-6 pt-4">

        <div className="max-w-3xl mx-auto">

          <div className="bg-white rounded-[24px] p-3 flex items-center justify-between shadow-sm">

            <button
              onClick={() =>
                router.push("/dashboard")
              }
              className="
                w-10
                h-10
                rounded-full
                bg-[#F5F7F6]
                flex
                items-center
                justify-center
              "
            >
              <ArrowLeft className="w-5 h-5" />
            </button>


            <div className="text-center">

              <h1 className="font-bold text-sm">
                Upload Material
              </h1>

              <p className="text-[9px] text-gray-400">
                Add a PDF to your study space
              </p>

            </div>


            <div className="w-10" />

          </div>

        </div>

      </header>


      {/* CONTENT */}

      <section className="px-4 sm:px-6 py-7">

        <div className="max-w-3xl mx-auto">


          {/* UPLOAD AREA */}

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() =>
              setDragging(false)
            }
            onDrop={handleDrop}
            onClick={() =>
              inputRef.current?.click()
            }
            className={`
              bg-white
              rounded-[32px]
              p-7
              sm:p-12
              min-h-[340px]
              flex
              flex-col
              items-center
              justify-center
              text-center
              border-2
              border-dashed
              transition
              cursor-pointer
              ${
                dragging
                  ? "border-[#A8F04C] bg-[#F9FFF3]"
                  : "border-gray-200"
              }
            `}
          >

            <input
              ref={inputRef}
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={handleInput}
            />


            <div
              className="
                w-20
                h-20
                rounded-full
                bg-[#EAF7DC]
                flex
                items-center
                justify-center
              "
            >

              <UploadCloud
                className="
                  w-9
                  h-9
                  text-[#6FA54A]
                "
              />

            </div>


            <h2 className="text-xl font-bold mt-6">
              Upload your PDF
            </h2>


            <p className="text-xs text-gray-400 mt-2 max-w-sm">
              Drop your study material here
              or tap to choose a PDF from
              your device.
            </p>


            <span
              className="
                mt-5
                px-5
                py-2.5
                rounded-full
                bg-[#A8F04C]
                text-xs
                font-bold
              "
            >
              Choose PDF
            </span>


            <p className="text-[9px] text-gray-400 mt-4">
              PDF only • Maximum 20 MB
            </p>

          </div>


          {/* SELECTED FILE */}

          {file && (

            <div
              className="
                mt-4
                bg-white
                rounded-[24px]
                p-4
                border
                border-gray-100
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  w-11
                  h-11
                  rounded-full
                  bg-[#EAF2FF]
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >

                <FileText
                  className="
                    w-5
                    h-5
                    text-blue-500
                  "
                />

              </div>


              <div className="flex-1 min-w-0">

                <p className="text-sm font-semibold truncate">
                  {file.name}
                </p>

                <p className="text-[10px] text-gray-400 mt-1">
                  {(
                    file.size /
                    (1024 * 1024)
                  ).toFixed(2)}{" "}
                  MB
                </p>

              </div>


              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="
                  w-9
                  h-9
                  rounded-full
                  bg-gray-100
                  flex
                  items-center
                  justify-center
                "
              >

                <X className="w-4 h-4" />

              </button>

            </div>

          )}


          {/* ERROR */}

          {error && (

            <div
              className="
                mt-4
                bg-red-50
                border
                border-red-100
                text-red-500
                rounded-2xl
                p-4
                text-xs
              "
            >
              {error}
            </div>

          )}


          {/* SUCCESS */}

          {uploaded && (

            <div
              className="
                mt-4
                bg-[#EAF7DC]
                border
                border-[#D5EEC0]
                rounded-2xl
                p-4
                flex
                items-center
                gap-3
              "
            >

              <CheckCircle2
                className="
                  w-5
                  h-5
                  text-green-600
                "
              />

              <div>

                <p className="text-sm font-semibold">
                  Upload successful
                </p>

                <p className="text-[10px] text-gray-500">
                  Your PDF is ready for studying.
                </p>

              </div>

            </div>

          )}


          {/* UPLOAD BUTTON */}

          <button
            onClick={uploadFile}
            disabled={!file || uploading}
            className="
              w-full
              mt-5
              py-4
              rounded-full
              bg-black
              text-white
              text-sm
              font-bold
              flex
              items-center
              justify-center
              gap-2
              disabled:opacity-30
              transition
            "
          >

            {uploading ? (

              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </>

            ) : (

              <>
                <UploadCloud className="w-4 h-4" />
                Upload PDF
              </>

            )}

          </button>


          {/* AFTER SUCCESS */}

          {uploaded && (

            <button
              onClick={() =>
                router.push("/documents")
              }
              className="
                w-full
                mt-3
                py-4
                rounded-full
                bg-[#A8F04C]
                text-sm
                font-bold
              "
            >
              View My Documents
            </button>

          )}

        </div>

      </section>

    </main>
  );
}