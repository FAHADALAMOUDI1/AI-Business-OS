from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from typing import List
from uuid import UUID

from app.core.database import get_db
from app.models.conversation import Conversation
from app.models.customer import Customer
from app.schemas.conversation import ConversationResponse

router = APIRouter(prefix="/conversations", tags=["conversations"])


@router.get("/company/{company_id}", response_model=List[ConversationResponse])
async def list_company_conversations(company_id: UUID, db: AsyncSession = Depends(get_db)):
    """
    قائمة محادثات شركة محددة
    """
    result = await db.execute(
        select(Conversation)
        .where(Conversation.company_id == company_id)
        .order_by(desc(Conversation.created_at))
    )
    conversations = result.scalars().all()
    return conversations


@router.get("/customer/{customer_id}", response_model=List[ConversationResponse])
async def list_customer_conversations(customer_id: UUID, db: AsyncSession = Depends(get_db)):
    """
    قائمة محادثات عميل محدد
    """
    result = await db.execute(
        select(Conversation)
        .where(Conversation.customer_id == customer_id)
        .order_by(Conversation.created_at)
    )
    conversations = result.scalars().all()
    return conversations


@router.get("/needs-human/{company_id}")
async def list_needs_human(company_id: UUID, db: AsyncSession = Depends(get_db)):
    """
    قائمة المحادثات التي تحتاج تدخل بشري
    """
    result = await db.execute(
        select(Conversation, Customer)
        .join(Customer, Conversation.customer_id == Customer.id)
        .where(
            Conversation.company_id == company_id,
            Conversation.needs_human == True
        )
        .order_by(desc(Conversation.created_at))
    )

    conversations = result.all()
    return [
        {
            "conversation": conv,
            "customer": customer
        }
        for conv, customer in conversations
    ]
