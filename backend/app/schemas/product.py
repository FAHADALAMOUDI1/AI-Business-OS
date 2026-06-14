from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from uuid import UUID
from decimal import Decimal
from datetime import datetime


class ProductCreate(BaseModel):
    company_id: UUID
    name: str = Field(..., min_length=1, max_length=100)
    category: Optional[str] = None
    description: Optional[str] = None
    price: Optional[Decimal] = None
    cost: Optional[Decimal] = None
    attributes: Optional[Dict[str, Any]] = None
    is_available: bool = True
    image_url: Optional[str] = None


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    price: Optional[Decimal] = None
    cost: Optional[Decimal] = None
    attributes: Optional[Dict[str, Any]] = None
    is_available: Optional[bool] = None
    image_url: Optional[str] = None


class ProductResponse(BaseModel):
    id: UUID
    company_id: UUID
    name: str
    category: Optional[str]
    description: Optional[str]
    price: Optional[Decimal]
    cost: Optional[Decimal]
    attributes: Dict[str, Any]
    is_available: bool
    image_url: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
