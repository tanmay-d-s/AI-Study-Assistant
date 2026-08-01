from pathlib import Path
import shutil
import os

from fastapi import APIRouter, File, UploadFile
from pypdf import PdfReader
from dotenv import load_dotenv
from google import genai

from app.routes import chat

router = APIRouter()

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = UPLOAD_DIR / file.filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    reader = PdfReader(file_path)

    extracted_text = ""

    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            extracted_text += page_text + "\n"

    # Store the extracted text so the chat endpoint can use it
    chat.pdf_text = extracted_text

    response = client.models.generate_content(
        model="models/gemini-flash-latest",
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