from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.pdf import PDF
from app.models.quiz import Quiz
from app.services.gemini_service import generate_quiz

router = APIRouter()


@router.get("/quiz")
def quiz(db: Session = Depends(get_db)):

    latest_pdf = (
        db.query(PDF)
        .order_by(PDF.id.desc())
        .first()
    )

    if not latest_pdf:
        return {
            "error": "Please upload a PDF first."
        }

    quiz_text = generate_quiz(
        latest_pdf.extracted_text
    )

    new_quiz = Quiz(
        quiz_text=quiz_text,
        user_id=latest_pdf.user_id,
        pdf_id=latest_pdf.id,
    )

    db.add(new_quiz)
    db.commit()

    return {
        "quiz": quiz_text,
        "pdf": latest_pdf.filename,
    }