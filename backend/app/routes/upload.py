from pathlib import Path
import shutil

from fastapi import APIRouter, File, UploadFile, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.pdf import PDF

from app.database.storage import pdf_storage
from app.services.pdf_service import extract_text_from_pdf
from app.services.gemini_service import generate_summary

router = APIRouter()

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    file_path = UPLOAD_DIR / file.filename

    # Save uploaded PDF
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text
    extracted_text = extract_text_from_pdf(file_path)

    # Store PDF text temporarily in memory
    pdf_storage[file.filename] = extracted_text

    # Save PDF details to PostgreSQL
    new_pdf = PDF(
        filename=file.filename,
        extracted_text=extracted_text,
        user_id=1,  # Temporary until JWT integration
    )

    db.add(new_pdf)
    db.commit()
    db.refresh(new_pdf)

    # Generate AI summary
    summary = generate_summary(extracted_text)

    return {
        "filename": file.filename,
        "characters": len(extracted_text),
        "total_pdfs": len(pdf_storage),
        "summary": summary,
        "pdf_id": new_pdf.id,
    }