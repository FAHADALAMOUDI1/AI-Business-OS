import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, JSON, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base


class Customer(Base):
    __tablename__ = "customers"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    company_id = Column(UUID(as_uuid=True), ForeignKey("companies.id"), nullable=False)
    phone = Column(String(20), nullable=False)
    name = Column(String(100), nullable=True)
    email = Column(String(100), nullable=True)

    # AI Data
    preferences = Column(JSON, default=dict)
    tags = Column(JSON, default=list)  # ["vip", "frequent", "complainer"]

    # Status
    status = Column(String(20), default="lead")  # lead, interested, customer, vip, churned

    # Stats
    total_orders = Column(String(20), default=0)
    total_spent = Column(String(20), default=0)
    last_contact = Column(DateTime, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<Customer {self.name or self.phone}>"
