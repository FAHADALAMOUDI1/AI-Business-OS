import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, JSON, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base


class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    customer_id = Column(UUID(as_uuid=True), ForeignKey("customers.id"), nullable=False)
    company_id = Column(UUID(as_uuid=True), ForeignKey("companies.id"), nullable=False)

    # Message content
    message = Column(Text, nullable=False)
    sender = Column(String(10), nullable=False)  # 'ai', 'human', 'customer'

    # AI Analysis
    intent = Column(String(50), nullable=True)  # price_inquiry, order, complaint, etc.
    sentiment = Column(String(20), nullable=True)  # positive, neutral, negative
    confidence = Column(String(20), nullable=True)  # 0.0 - 1.0

    # Metadata
    channel = Column(String(20), default="whatsapp")  # whatsapp, instagram, website
    meta = Column("metadata", JSON, default=dict)  # {message_id: "...", media_url: "..."}

    # Human handoff
    needs_human = Column(String(20), default=False)
    handled_by = Column(String(100), nullable=True)  # human agent name

    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Conversation {self.sender}: {self.message[:50]}...>"
