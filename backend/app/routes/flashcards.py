from fastapi import APIRouter

from app.database.storage import pdf_storage
from app.services.gemini_service import generate_flashcards

router = APIRouter()


@router.get("/flashcards")
def flashcards():

    if not pdf_storage:
        return {
            "error": "Please upload at least one PDF first."
        }

    all_notes = ""

    for filename, text in pdf_storage.items():
        all_notes += f"\n\n===== {filename} =====\n{text}"

    flashcards = generate_flashcards(all_notes)

    return {
        "uploaded_pdfs": list(pdf_storage.keys()),
        "total_pdfs": len(pdf_storage),
        "flashcards": flashcards
    }