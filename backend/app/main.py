from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import upload
from app.routes import chat
from app.routes import quiz
from app.routes import flashcards

app = FastAPI(title="AI Study Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router)
app.include_router(chat.router)
app.include_router(quiz.router)
app.include_router(flashcards.router)


@app.get("/")
def home():
    return {
        "message": "AI Study Assistant API is running"
    }