import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, JSON, ForeignKey, Numeric, Text
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    company_id = Column(UUID(as_uuid=True), ForeignKey("companies.id"), nullable=False)
    customer_id = Column(UUID(as_uuid=True), ForeignKey("customers.id"), nullable=False)

    # Order items (flexible for any business)
    # [{product_id: "...", name: "...", quantity: 2, price: 100, notes: "..."}]
    items = Column(JSON, nullable=False)

    # Pricing
    subtotal = Column(Numeric(10, 2), nullable=True)
    tax = Column(Numeric(10, 2), default=0)
    discount = Column(Numeric(10, 2), default=0)
    total = Column(Numeric(10, 2), nullable=True)

    # Order details
    status = Column(String(20), default="pending")  # pending, confirmed, processing, delivered, cancelled, refunded
    payment_status = Column(String(20), default="pending")  # pending, paid, failed, refunded
    payment_method = Column(String(50), nullable=True)

    # Delivery/Appointment
    delivery_type = Column(String(20), nullable=True)  # pickup, delivery, dine_in, at_location
    delivery_address = Column(Text, nullable=True)
    delivery_date = Column(DateTime, nullable=True)
    notes = Column(Text, nullable=True)

    # Source
    source = Column(String(20), default="whatsapp")  # whatsapp, instagram, website, manual

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<Order {self.id} - {self.status}>"
