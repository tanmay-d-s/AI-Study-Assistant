import os

from fastapi import APIRouter
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai

router = APIRouter()

# Load API key
load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# This variable will store the uploaded PDF text
pdf_text = ""


class ChatRequest(BaseModel):
    question: str


@router.post("/chat")
def chat(request: ChatRequest):
    global pdf_text

    if not pdf_text:
        return {
            "error": "Please upload a PDF first."
        }

    response = client.models.generate_content(
        model="models/gemini-flash-latest",
        contents=f"""
You are an AI Study Assistant.

Answer ONLY using the information provided in the study material below.

Study Material:
{pdf_text}

Question:
{request.question}
"""
    )

    return {
        "question": request.question,
        "answer": response.text
    }