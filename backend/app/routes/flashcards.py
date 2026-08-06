from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.pdf import PDF
from app.models.flashcard import Flashcard
from app.services.gemini_service import generate_flashcards

router = APIRouter()


@router.get("/flashcards")
def flashcards(db: Session = Depends(get_db)):

    latest_pdf = (
        db.query(PDF)
        .order_by(PDF.id.desc())
        .first()
    )

    if not latest_pdf:
        return {
            "error": "Please upload a PDF first."
        }

    flashcard_text = generate_flashcards(
        latest_pdf.extracted_text
    )

    new_flashcard = Flashcard(
        flashcard_text=flashcard_text,
        user_id=latest_pdf.user_id,
        pdf_id=latest_pdf.id,
    )

    db.add(new_flashcard)
    db.commit()

    return {
        "flashcards": flashcard_text,
        "pdf": latest_pdf.filename,
    }