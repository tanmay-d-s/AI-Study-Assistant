from pathlib import Path
import shutil

from fastapi import APIRouter, File, UploadFile, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.auth.dependencies import get_current_user
from app.models.user import User
from app.models.pdf import PDF
from app.services.pdf_service import extract_text_from_pdf
from app.services.gemini_service import generate_summary


router = APIRouter()

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Check file type
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="Please select a file."
        )

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    # Create a unique filename for the user
    file_path = UPLOAD_DIR / file.filename

    # Save PDF
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract PDF text
    extracted_text = extract_text_from_pdf(file_path)

    if not extracted_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Could not extract text from this PDF."
        )

    # Generate AI summary
    summary = generate_summary(extracted_text)

    # Save PDF in PostgreSQL
    new_pdf = PDF(
        filename=file.filename,
        extracted_text=extracted_text,
        summary=summary,
        user_id=current_user.id,
    )

    db.add(new_pdf)
    db.commit()
    db.refresh(new_pdf)

    return {
        "message": "PDF uploaded successfully!",
        "id": new_pdf.id,
        "filename": new_pdf.filename,
        "characters": len(extracted_text),
        "summary": summary,
        "user_id": current_user.id,
    }