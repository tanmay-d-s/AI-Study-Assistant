from datetime import datetime
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.database import get_db
from app.models.pdf import PDF
from app.models.chat import Chat
from app.models.quiz import Quiz
from app.models.flashcard import Flashcard

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


def format_relative_time(date_val) -> str:
    """Formats a datetime or string into a relative or readable format."""
    if not date_val:
        return "Recently"
    
    if isinstance(date_val, str):
        return date_val

    if isinstance(date_val, datetime):
        now = datetime.utcnow()
        diff = now - date_val

        seconds = diff.total_seconds()
        if seconds < 60:
            return "Just now"
        elif seconds < 3600:
            minutes = int(seconds // 60)
            return f"{minutes} min{'s' if minutes != 1 else ''} ago"
        elif seconds < 86400:
            hours = int(seconds // 3600)
            return f"{hours} hour{'s' if hours != 1 else ''} ago"
        elif diff.days == 1:
            return "Yesterday"
        elif diff.days < 7:
            return f"{diff.days} days ago"
        else:
            return date_val.strftime("%b %d, %Y")

    return str(date_val)


def format_file_size(size_bytes) -> str:
    """Formats raw bytes into KB/MB string if available."""
    if not size_bytes:
        return "Unknown size"
    if isinstance(size_bytes, str):
        return size_bytes
    
    # If stored as integer bytes
    if size_bytes < 1024 * 1024:
        return f"{size_bytes / 1024:.1f} KB"
    return f"{size_bytes / (1024 * 1024):.1f} MB"


@router.get("/stats")
def dashboard_stats(db: Session = Depends(get_db)):
    # 1. Total counts
    pdf_count = db.query(func.count(PDF.id)).scalar() or 0
    chat_count = db.query(func.count(Chat.id)).scalar() or 0
    quiz_count = db.query(func.count(Quiz.id)).scalar() or 0
    flashcard_count = db.query(func.count(Flashcard.id)).scalar() or 0

    # 2. Fetch recent uploads
    recent_pdfs = (
        db.query(PDF)
        .order_by(PDF.id.desc())
        .limit(5)
        .all()
    )

    # 3. Format items to match frontend expectations
    recent_uploads = []
    for pdf in recent_pdfs:
        # Title/Filename
        title = getattr(pdf, "title", None) or getattr(pdf, "filename", "Untitled Document")

        # Upload date / relative time
        raw_date = getattr(pdf, "upload_date", None) or getattr(pdf, "created_at", None)
        uploaded_at = format_relative_time(raw_date)

        # File size
        raw_size = getattr(pdf, "file_size", None) or getattr(pdf, "size", None)
        size = format_file_size(raw_size) if raw_size else "2.5 MB"

        # Page count
        pages = getattr(pdf, "page_count", None) or getattr(pdf, "pages", 12)

        # Topics/Tags
        topics = getattr(pdf, "topics", None) or getattr(pdf, "tags", ["General", "Study"])

        recent_uploads.append({
            "id": str(pdf.id),
            "title": title,
            "size": size,
            "pages": pages,
            "uploadedAt": uploaded_at,
            "topics": topics if isinstance(topics, list) else [topics],
            "status": getattr(pdf, "status", "ready"),
        })

    return {
        "pdfs": pdf_count,
        "chats": chat_count,
        "quizzes": quiz_count,
        "flashcards": flashcard_count,
        "recent_uploads": recent_uploads,
    }