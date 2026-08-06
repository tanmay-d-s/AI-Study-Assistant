from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.database import get_db
from app.models.pdf import PDF
from app.models.chat import Chat
from app.models.quiz import Quiz
from app.models.flashcard import Flashcard

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/stats")
def dashboard_stats(db: Session = Depends(get_db)):
    pdf_count = db.query(func.count(PDF.id)).scalar()
    chat_count = db.query(func.count(Chat.id)).scalar()
    quiz_count = db.query(func.count(Quiz.id)).scalar()
    flashcard_count = db.query(func.count(Flashcard.id)).scalar()

    recent_pdfs = (
        db.query(PDF)
        .order_by(PDF.id.desc())
        .limit(5)
        .all()
    )

    recent_uploads = [
        {
            "id": pdf.id,
            "filename": pdf.filename,
            "upload_date": pdf.upload_date,
        }
        for pdf in recent_pdfs
    ]

    return {
        "pdfs": pdf_count,
        "chats": chat_count,
        "quizzes": quiz_count,
        "flashcards": flashcard_count,
        "recent_uploads": recent_uploads,
    }