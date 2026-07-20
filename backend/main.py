from pathlib import Path
import shutil
import os

from dotenv import load_dotenv
from google import genai

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader

# Load .env file
load_dotenv()

# Create Gemini client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI(title="AI Study Assistant API")

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "AI Study Assistant API is running"}


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    # Save uploaded PDF
    file_path = UPLOAD_DIR / file.filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Read PDF
    reader = PdfReader(file_path)

    extracted_text = ""

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            extracted_text += page_text + "\n"

    # Ask Gemini for summary
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"""
Summarize the following study notes in simple language.

{extracted_text}
"""
    )

    return {
        "filename": file.filename,
        "characters": len(extracted_text),
        "preview": extracted_text[:500],
        "summary": response.text,
    }