import os

from fastapi import APIRouter
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai

from app.database.storage import pdf_storage, chat_history

router = APIRouter()

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


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

    # Build conversation history
    history = ""

    for msg in chat_history["default"]:
        history += f"{msg['role']}: {msg['text']}\n"

    prompt = f"""
You are an AI Study Assistant.

Use ONLY the uploaded study material to answer.

Uploaded PDFs:
{all_notes}

Conversation History:
{history}

Current Question:
{request.question}
"""

    response = client.models.generate_content(
        model="models/gemini-flash-latest",
        contents=prompt
    )

    answer = response.text

    # Save AI response
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