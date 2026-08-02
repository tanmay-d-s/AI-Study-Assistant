from pathlib import Path
import shutil

from fastapi import APIRouter, File, UploadFile

from app.database.storage import pdf_storage
from app.services.pdf_service import extract_text_from_pdf
from app.services.gemini_service import generate_summary

router = APIRouter()

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = UPLOAD_DIR / file.filename

    # Save uploaded PDF
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text
    extracted_text = extract_text_from_pdf(file_path)

    # Store PDF text
    pdf_storage[file.filename] = extracted_text

    # Generate AI summary
    summary = generate_summary(extracted_text)

    return {
        "filename": file.filename,
        "characters": len(extracted_text),
        "total_pdfs": len(pdf_storage),
        "summary": summary
    }