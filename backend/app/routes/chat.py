from fastapi import APIRouter
from pydantic import BaseModel

from app.database.storage import pdf_storage, chat_history
from app.services.gemini_service import chat_with_pdf

router = APIRouter()


class ChatRequest(BaseModel):
    question: str


@router.post("/chat")
def chat(request: ChatRequest):

    if not pdf_storage:
        return {
            "error": "Please upload at least one PDF first."
        }

    # Combine all uploaded PDFs
    all_notes = ""

    for filename, text in pdf_storage.items():
        all_notes += f"\n\n===== {filename} =====\n{text}"

    # Initialize chat history
    if "default" not in chat_history:
        chat_history["default"] = []

    # Save user question
    chat_history["default"].append({
        "role": "user",
        "text": request.question
    })

    # Get AI answer
    answer = chat_with_pdf(all_notes, request.question)

    # Save AI answer
    chat_history["default"].append({
        "role": "assistant",
        "text": answer
    })

    return {
        "question": request.question,
        "answer": answer,
        "uploaded_pdfs": list(pdf_storage.keys()),
        "total_pdfs": len(pdf_storage),
        "messages": len(chat_history["default"])
    }