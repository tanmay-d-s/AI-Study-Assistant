from sqlalchemy.orm import Session

from app.models.pdf import PDF


def get_all_pdf_text(db: Session) -> str:
    """
    Combine the text of all uploaded PDFs into one string.
    """

    pdfs = db.query(PDF).all()

    if not pdfs:
        return ""

    all_notes = ""

    for pdf in pdfs:
        all_notes += f"\n\n===== {pdf.filename} =====\n"
        all_notes += pdf.extracted_text

    return all_notes