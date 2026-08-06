from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.chat import Chat
from app.models.pdf import PDF
from app.services.gemini_service import chat_with_pdf

router = APIRouter()


class ChatRequest(BaseModel):
    question: str


@router.post("/chat")
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
):
    latest_pdf = (
        db.query(PDF)
        .order_by(PDF.id.desc())
        .first()
    )

    if not latest_pdf:
        return {
            "error": "Please upload a PDF first."
        }

    answer = chat_with_pdf(
        latest_pdf.extracted_text,
        request.question
    )

    new_chat = Chat(
        question=request.question,
        answer=answer,
        user_id=latest_pdf.user_id,
        pdf_id=latest_pdf.id,
    )

    db.add(new_chat)
    db.commit()

    return {
        "question": request.question,
        "answer": answer,
        "pdf": latest_pdf.filename,
    }