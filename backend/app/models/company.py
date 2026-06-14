import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, JSON, Text
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base


class Company(Base):
    __tablename__ = "companies"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False)
    business_type = Column(String(50), nullable=False)  # restaurant, retail, service, clinic, etc.
    phone = Column(String(20), nullable=True)
    email = Column(String(100), nullable=True)
    address = Column(Text, nullable=True)

    # AI Settings
    settings = Column(JSON, default=dict)
    ai_persona = Column(Text, nullable=True)

    # WhatsApp
    whatsapp_number = Column(String(20), nullable=True)
    whatsapp_connected = Column(String(20), default=False)

    # Status
    is_active = Column(String(20), default=True)
    plan = Column(String(20), default="starter")  # starter, growth, pro

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<Company {self.name}>"
