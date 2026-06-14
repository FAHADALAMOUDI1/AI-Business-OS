from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from datetime import datetime

from app.core.config import get_settings
from app.core.database import AsyncSessionLocal
from app.ai.prompt_builder import CompanyPromptBuilder
from app.ai.intent_classifier import IntentClassifier
from app.services.whatsapp import whatsapp_service
from app.models.conversation import Conversation
from app.models.customer import Customer
from app.models.company import Company
from app.models.product import Product

settings = get_settings()


class ConversationEngine:
    """
    المحرك الرئيسي لمعالجة المحادثات
    """

    def __init__(self, company_id: str):
        self.company_id = company_id
        self.prompt_builder = CompanyPromptBuilder()
        self.intent_classifier = IntentClassifier()

    async def process_incoming_message(self, customer_phone: str, message_text: str, message_id: str = None):
        """
        معالجة رسالة واردة من العميل
        """
        async with AsyncSessionLocal() as session:
            # 1. جلب أو إنشاء العميل
            customer = await self._get_or_create_customer(session, customer_phone)

            # 2. جلب بيانات الشركة
            company = await self._get_company(session)

            # 3. جلب سياق المحادثة
            conversation_history = await self._get_conversation_history(session, customer.id)

            # 4. تصنيف النية
            intent = await self.intent_classifier.classify(message_text)
            sentiment = await self.intent_classifier.analyze_sentiment(message_text)

            # 5. تحديد الإجراء
            action = self.intent_classifier.get_action(intent)

            # 6. حفظ رسالة العميل
            await self._save_message(
                session, customer.id, company.id,
                message_text, "customer", intent, sentiment
            )

            # 7. التحقق من طلب التحويل للبشري
            if action["action"] == "handoff":
                await self._handle_handoff(session, customer, message_text, company)
                return action.get("ai_message", "سأحولك الآن...")

            # 8. توليد الرد بالـ AI
            ai_response = await self._generate_ai_response(
                session, company, customer, message_text, conversation_history
            )

            # 9. حفظ رد الـ AI
            await self._save_message(
                session, customer.id, company.id,
                ai_response, "ai", None, None
            )

            # 10. إرسال الرد عبر WhatsApp
            await whatsapp_service.send_text_message(customer_phone, ai_response)

            # 11. تحديث آخر تواصل
            customer.last_contact = datetime.utcnow()
            await session.commit()

            return ai_response

    async def _get_or_create_customer(self, session: AsyncSession, phone: str) -> Customer:
        """جلب أو إنشاء عميل"""
        result = await session.execute(
            select(Customer).where(
                Customer.phone == phone,
                Customer.company_id == self.company_id
            )
        )
        customer = result.scalar_one_or_none()

        if not customer:
            customer = Customer(
                company_id=self.company_id,
                phone=phone,
                status="lead"
            )
            session.add(customer)
            await session.commit()
            await session.refresh(customer)

        return customer

    async def _get_company(self, session: AsyncSession) -> Company:
        """جلب بيانات الشركة"""
        result = await session.execute(
            select(Company).where(Company.id == self.company_id)
        )
        return result.scalar_one()

    async def _get_conversation_history(self, session: AsyncSession, customer_id: str, limit: int = 10) -> List[dict]:
        """جلب تاريخ المحادثة"""
        result = await session.execute(
            select(Conversation)
            .where(Conversation.customer_id == customer_id)
            .order_by(desc(Conversation.created_at))
            .limit(limit)
        )

        conversations = result.scalars().all()

        # ترتيب من الأقدم للأحدث
        history = []
        for conv in reversed(conversations):
            role = "user" if conv.sender == "customer" else "assistant"
            history.append({
                "sender": role,
                "message": conv.message
            })

        return history

    async def _get_products(self, session: AsyncSession) -> List[dict]:
        """جلب منتجات الشركة"""
        result = await session.execute(
            select(Product)
            .where(
                Product.company_id == self.company_id,
                Product.is_available == True
            )
        )

        products = result.scalars().all()
        return [
            {
                "id": str(p.id),
                "name": p.name,
                "price": float(p.price) if p.price else None,
                "description": p.description,
                "category": p.category
            }
            for p in products
        ]

    async def _generate_ai_response(self, session, company, customer, message, history):
        """توليد رد AI"""
        # تحويل الشركة إلى dict
        company_dict = {
            "id": str(company.id),
            "name": company.name,
            "business_type": company.business_type,
            "ai_persona": company.ai_persona or "",
            "settings": company.settings or {}
        }

        # جلب المنتجات
        products = await self._get_products(session)

        # بناء الـ prompt
        system_prompt = self.prompt_builder.build_system_prompt(company_dict, products)

        # توليد الرد
        response = await self.prompt_builder.generate_response(
            message=message,
            system_prompt=system_prompt,
            conversation_history=history
        )

        return response

    async def _save_message(self, session, customer_id, company_id, message, sender, intent, sentiment):
        """حفظ رسالة في قاعدة البيانات"""
        conversation = Conversation(
            customer_id=customer_id,
            company_id=company_id,
            message=message,
            sender=sender,
            intent=intent,
            sentiment=sentiment
        )
        session.add(conversation)
        await session.commit()

    async def _handle_handoff(self, session, customer, message, company):
        """معالجة طلب التحويل للبشري"""
        # حفظ الرسالة كـ needs_human
        conversation = Conversation(
            customer_id=customer.id,
            company_id=company.id,
            message=message,
            sender="customer",
            needs_human=True
        )
        session.add(conversation)
        await session.commit()

        # TODO: إرسال إشعار للإدارة (WebSocket, Push Notification, Email)
        # هذا سيتم تنفيذه لاحقاً
