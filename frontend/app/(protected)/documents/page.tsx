"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { getDashboardStats } from "@/lib/services/dashboard";

import {
  ArrowLeft,
  Search,
  FileText,
  MessageSquare,
  Brain,
  Upload,
  MoreVertical,
  Clock,
  X,
} from "lucide-react";

type DocumentItem = {
  id: string | number;
  title?: string;
  name?: string;
  filename?: string;
  size?: string;
  pages?: number;
  page_count?: number;
  uploadedAt?: string;
  uploaded_at?: string;
};

export default function DocumentsPage() {
  const router = useRouter();

  const [documents, setDocuments] = useState<
    DocumentItem[]
  >([]);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  useEffect(() => {
    async function loadDocuments() {
      try {
        setLoading(true);
        setError("");

        const data = await getDashboardStats();

        const uploads =
          Array.isArray(data?.recent_uploads)
            ? data.recent_uploads
            : [];

        setDocuments(uploads);

      } catch (err) {
        console.error(
          "Failed to load documents:",
          err
        );

        setError(
          "Unable to load your documents."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDocuments();
  }, []);


  const filteredDocuments = useMemo(() => {
    const query =
      searchQuery.trim().toLowerCase();

    if (!query) {
      return documents;
    }

    return documents.filter((doc) => {
      const title =
        doc.title ||
        doc.name ||
        doc.filename ||
        "";

      return title
        .toLowerCase()
        .includes(query);
    });
  }, [documents, searchQuery]);


  function clearSearch() {
    setSearchQuery("");
  }


  return (
    <main className="min-h-screen bg-[#EEF5F7]">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-5">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <button
              onClick={() =>
                router.push("/dashboard")
              }
              className="
                w-10
                h-10
                rounded-full
                bg-white
                border
                border-gray-100
                flex
                items-center
                justify-center
                hover:bg-gray-50
                transition
              "
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#17201A]">
                My Documents
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Manage your uploaded study PDFs
              </p>
            </div>

          </div>


          <button
            onClick={() =>
              router.push("/upload")
            }
            className="
              hidden
              sm:flex
              items-center
              gap-2
              px-5
              py-3
              rounded-full
              bg-[#B7F34A]
              text-sm
              font-bold
              text-[#17200D]
              hover:bg-[#A9E940]
              transition
            "
          >
            <Upload className="w-4 h-4" />
            Upload PDF
          </button>

        </div>


        {/* ================= SEARCH ================= */}

        <div className="relative">

          <Search
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              w-5
              h-5
              text-gray-400
            "
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            placeholder="Search your PDFs..."
            className="
              w-full
              h-14
              bg-white
              rounded-2xl
              border
              border-gray-100
              pl-12
              pr-12
              text-sm
              text-gray-800
              placeholder:text-gray-400
              shadow-sm
              focus:outline-none
              focus:ring-2
              focus:ring-[#B7F34A]/60
              focus:border-[#B7F34A]
              transition
            "
          />

          {searchQuery && (
            <button
              onClick={clearSearch}
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                w-7
                h-7
                rounded-full
                bg-gray-100
                flex
                items-center
                justify-center
                hover:bg-gray-200
              "
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}

        </div>


        {/* ================= MOBILE UPLOAD ================= */}

        <button
          onClick={() =>
            router.push("/upload")
          }
          className="
            sm:hidden
            w-full
            py-3
            rounded-full
            bg-[#B7F34A]
            text-sm
            font-bold
            flex
            items-center
            justify-center
            gap-2
          "
        >
          <Upload className="w-4 h-4" />
          Upload PDF
        </button>


        {/* ================= RESULT COUNT ================= */}

        <div className="flex items-center justify-between">

          <p className="text-xs text-gray-500">
            {searchQuery
              ? `${filteredDocuments.length} result${
                  filteredDocuments.length === 1
                    ? ""
                    : "s"
                } found`
              : `${documents.length} document${
                  documents.length === 1
                    ? ""
                    : "s"
                }`}
          </p>

        </div>


        {/* ================= ERROR ================= */}

        {error && (
          <div className="
            bg-red-50
            border
            border-red-100
            text-red-500
            rounded-2xl
            p-4
            text-sm
          ">
            {error}
          </div>
        )}


        {/* ================= LOADING ================= */}

        {loading && (
          <div className="space-y-3">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  bg-white
                  rounded-3xl
                  p-5
                  border
                  border-gray-100
                  animate-pulse
                "
              >
                <div className="flex gap-4">

                  <div className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-gray-100
                  " />

                  <div className="flex-1">

                    <div className="
                      h-4
                      w-48
                      bg-gray-100
                      rounded
                    " />

                    <div className="
                      h-3
                      w-32
                      bg-gray-100
                      rounded
                      mt-3
                    " />

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}


        {/* ================= NO DOCUMENTS ================= */}

        {!loading &&
          !error &&
          documents.length === 0 && (

            <div
              className="
                bg-white
                rounded-[30px]
                border
                border-gray-100
                p-10
                text-center
              "
            >

              <div
                className="
                  w-20
                  h-20
                  rounded-full
                  bg-[#EAF7DC]
                  mx-auto
                  flex
                  items-center
                  justify-center
                "
              >
                <FileText
                  className="
                    w-9
                    h-9
                    text-[#70A548]
                  "
                />
              </div>

              <h2 className="
                text-xl
                font-bold
                mt-5
              ">
                No PDFs yet
              </h2>

              <p className="
                text-sm
                text-gray-400
                mt-2
              ">
                Upload your first study PDF
                to start learning.
              </p>

              <button
                onClick={() =>
                  router.push("/upload")
                }
                className="
                  mt-6
                  px-6
                  py-3
                  rounded-full
                  bg-[#B7F34A]
                  text-sm
                  font-bold
                "
              >
                Upload PDF
              </button>

            </div>
          )}


        {/* ================= SEARCH EMPTY ================= */}

        {!loading &&
          !error &&
          documents.length > 0 &&
          filteredDocuments.length === 0 && (

            <div
              className="
                bg-white
                rounded-[30px]
                border
                border-gray-100
                p-10
                text-center
              "
            >

              <div
                className="
                  w-16
                  h-16
                  rounded-full
                  bg-gray-100
                  mx-auto
                  flex
                  items-center
                  justify-center
                "
              >
                <Search className="w-7 h-7 text-gray-400" />
              </div>

              <h2 className="
                text-lg
                font-bold
                mt-4
              ">
                No PDFs found
              </h2>

              <p className="
                text-sm
                text-gray-400
                mt-1
              ">
                Try another search term.
              </p>

              <button
                onClick={clearSearch}
                className="
                  mt-5
                  px-5
                  py-2.5
                  rounded-full
                  bg-black
                  text-white
                  text-xs
                  font-semibold
                "
              >
                Clear Search
              </button>

            </div>
          )}


        {/* ================= DOCUMENT LIST ================= */}

        {!loading &&
          filteredDocuments.length > 0 && (

            <div className="space-y-3">

              {filteredDocuments.map((doc) => {

                const title =
                  doc.title ||
                  doc.name ||
                  doc.filename ||
                  "Untitled PDF";

                const pages =
                  doc.pages ||
                  doc.page_count ||
                  0;

                const uploadedAt =
                  doc.uploadedAt ||
                  doc.uploaded_at ||
                  "Recently";

                return (
                  <div
                    key={doc.id}
                    className="
                      bg-white
                      rounded-[25px]
                      border
                      border-gray-100
                      p-4
                      sm:p-5
                      shadow-sm
                      hover:shadow-md
                      transition
                    "
                  >

                    <div className="
                      flex
                      flex-col
                      sm:flex-row
                      sm:items-center
                      justify-between
                      gap-4
                    ">

                      {/* FILE INFO */}

                      <div className="
                        flex
                        items-center
                        gap-4
                        min-w-0
                      ">

                        <div
                          className="
                            w-12
                            h-12
                            rounded-2xl
                            bg-[#EAF2FF]
                            flex
                            items-center
                            justify-center
                            shrink-0
                          "
                        >
                          <FileText
                            className="
                              w-6
                              h-6
                              text-blue-500
                            "
                          />
                        </div>


                        <div className="min-w-0">

                          <h3 className="
                            text-sm
                            font-bold
                            text-gray-800
                            truncate
                          ">
                            {title}
                          </h3>

                          <div className="
                            flex
                            items-center
                            gap-2
                            mt-1
                            text-[10px]
                            text-gray-400
                          ">

                            {doc.size && (
                              <>
                                <span>
                                  {doc.size}
                                </span>

                                <span>•</span>
                              </>
                            )}

                            {pages > 0 && (
                              <>
                                <span>
                                  {pages} Pages
                                </span>

                                <span>•</span>
                              </>
                            )}

                            <span className="
                              flex
                              items-center
                              gap-1
                            ">
                              <Clock className="w-3 h-3" />
                              {uploadedAt}
                            </span>

                          </div>

                        </div>

                      </div>


                      {/* ACTIONS */}

                      <div className="
                        flex
                        items-center
                        gap-2
                        sm:shrink-0
                      ">

                        <button
                          onClick={() =>
                            router.push(
                              `/chat?document=${encodeURIComponent(
                                String(doc.id)
                              )}`
                            )
                          }
                          className="
                            flex-1
                            sm:flex-none
                            px-4
                            py-2.5
                            rounded-full
                            bg-[#F0E8FF]
                            text-[#8055D6]
                            text-xs
                            font-semibold
                            flex
                            items-center
                            justify-center
                            gap-1.5
                            hover:bg-[#E7DBFF]
                            transition
                          "
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          Chat
                        </button>


                        <button
                          onClick={() =>
                            router.push(
                              `/quiz?document=${encodeURIComponent(
                                String(doc.id)
                              )}`
                            )
                          }
                          className="
                            flex-1
                            sm:flex-none
                            px-4
                            py-2.5
                            rounded-full
                            bg-[#FFF0D7]
                            text-[#C67A20]
                            text-xs
                            font-semibold
                            flex
                            items-center
                            justify-center
                            gap-1.5
                            hover:bg-[#FFE7C0]
                            transition
                          "
                        >
                          <Brain className="w-3.5 h-3.5" />
                          Quiz
                        </button>


                        <button
                          onClick={() =>
                            console.log(
                              "Document:",
                              doc.id
                            )
                          }
                          className="
                            w-10
                            h-10
                            rounded-full
                            bg-gray-50
                            flex
                            items-center
                            justify-center
                            hover:bg-gray-100
                          "
                        >
                          <MoreVertical
                            className="
                              w-4
                              h-4
                              text-gray-500
                            "
                          />
                        </button>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          )}

      </div>

    </main>
  );
}