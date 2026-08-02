import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def generate_summary(text: str):
    prompt = f"""
You are an AI Study Assistant.

Summarize the following study material in simple language.

{text}
"""

    response = client.models.generate_content(
        model="models/gemini-flash-latest",
        contents=prompt
    )

    return response.text


def chat_with_pdf(pdf_text: str, question: str):
    prompt = f"""
You are an AI Study Assistant.

Answer ONLY using the uploaded study material.

If the answer is not present in the notes, clearly say:
"I couldn't find that information in the uploaded study material."

Study Material:
{pdf_text}

Question:
{question}
"""

    response = client.models.generate_content(
        model="models/gemini-flash-latest",
        contents=prompt
    )

    return response.text


def generate_quiz(pdf_text: str):
    prompt = f"""
Generate 10 MCQs from these notes.

Each question must have:
- Question
- A
- B
- C
- D
- Correct Answer

Notes:

{pdf_text}
"""

    response = client.models.generate_content(
        model="models/gemini-flash-latest",
        contents=prompt
    )

    return response.text


def generate_flashcards(pdf_text: str):
    prompt = f"""
Generate 10 flashcards.

Format:

Front:
Back:

Notes:

{pdf_text}
"""

    response = client.models.generate_content(
        model="models/gemini-flash-latest",
        contents=prompt
    )

    return response.text