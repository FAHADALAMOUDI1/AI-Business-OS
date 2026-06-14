from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from uuid import UUID
from datetime import datetime


class CompanySettings(BaseModel):
    language: str = "ar"
    tone: str = "friendly"
    auto_reply: bool = True
    human_handoff: bool = True
    working_hours_start: str = "09:00"
    working_hours_end: str = "21:00"


class CompanyCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    business_type: str = Field(..., description="restaurant, retail, service, clinic, salon, gym, other")
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    ai_persona: Optional[str] = None
    settings: Optional[CompanySettings] = None


class CompanyUpdate(BaseModel):
    name: Optional[str] = None
    business_type: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    ai_persona: Optional[str] = None
    settings: Optional[CompanySettings] = None
    is_active: Optional[bool] = None
    plan: Optional[str] = None


class CompanyResponse(BaseModel):
    id: UUID
    name: str
    business_type: str
    phone: Optional[str]
    email: Optional[str]
    address: Optional[str]
    ai_persona: Optional[str]
    settings: Dict[str, Any]
    whatsapp_connected: bool
    is_active: bool
    plan: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
