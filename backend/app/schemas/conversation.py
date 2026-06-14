from pydantic import BaseModel
from typing import Optional, Dict, Any
from uuid import UUID
from datetime import datetime


class ConversationResponse(BaseModel):
    id: UUID
    customer_id: UUID
    company_id: UUID
    message: str
    sender: str
    intent: Optional[str]
    sentiment: Optional[str]
    confidence: Optional[float]
    channel: str
    metadata: Dict[str, Any]
    needs_human: bool
    handled_by: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
