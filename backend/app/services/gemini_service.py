import os
import time

from dotenv import load_dotenv
from google import genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is not set in the .env file.")

client = genai.Client(api_key=GEMINI_API_KEY)

MODEL_NAME = "gemini-3.6-flash"


def generate_content(prompt: str):
    """
    Send a prompt to Gemini with automatic retry
    for temporary server errors.
    """

    last_error = None

    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model=MODEL_NAME,
                contents=prompt,
            )

            return response.text

        except Exception as error:
            last_error = error

            error_text = str(error)

            # Retry temporary Gemini server errors
            if "503" in error_text or "UNAVAILABLE" in error_text:
                if attempt < 2:
                    time.sleep(2 * (attempt + 1))
                    continue

            raise last_error

    raise last_error


def generate_summary(text: str):
    prompt = f"""
You are an AI Study Assistant.

Summarize the following study material in simple language.

Use:
- Simple explanations
- Important points
- Key concepts
- Short paragraphs

Study Material:

{text}
"""

    return generate_content(prompt)


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

    return generate_content(prompt)


def generate_quiz(pdf_text: str):
    prompt = f"""
You are an AI Study Assistant.

Generate 10 multiple-choice questions from the following study material.

For every question provide:

Question:
A:
B:
C:
D:
Correct Answer:

Make the questions useful for exam preparation.

Study Material:

{pdf_text}
"""

    return generate_content(prompt)


def generate_flashcards(pdf_text: str):
    prompt = f"""
You are an AI Study Assistant.

Generate 10 useful flashcards from the following study material.

Use exactly this format:

Front:
Back:

Front:
Back:

Keep the answers concise and useful for revision.

Study Material:

{pdf_text}
"""

    return generate_content(prompt)