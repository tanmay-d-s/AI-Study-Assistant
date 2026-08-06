from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine

# Import models
from app.models.user import User
from app.models.pdf import PDF
from app.models.chat import Chat
from app.models.quiz import Quiz
from app.models.flashcard import Flashcard

# Import routes
from app.routes.upload import router as upload_router
from app.routes.chat import router as chat_router
from app.routes.quiz import router as quiz_router
from app.routes.flashcards import router as flashcards_router
from app.auth.routes import router as auth_router
from app.routes.dashboard import router as dashboard_router
# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Study Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(upload_router)
app.include_router(chat_router)
app.include_router(quiz_router)
app.include_router(flashcards_router)
app.include_router(auth_router)
app.include_router(dashboard_router)

@app.get("/")
def home():
    return {
        "message": "AI Study Assistant API is running"
    }