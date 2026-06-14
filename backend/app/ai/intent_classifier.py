from typing import Dict, Optional
from openai import AsyncOpenAI
from app.core.config import get_settings

settings = get_settings()


class IntentClassifier:
    """
    يصنف نية الرسالة لتحديد الإجراء المناسب.
    يستخدم نموذج أصغر (gpt-4o-mini) للسرعة والتكلفة.
    """

    INTENTS = {
        "price_inquiry": "الاستفسار عن السعر",
        "product_inquiry": "الاستفسار عن منتج/خدمة",
        "order": "طلب شراء أو حجز",
        "complaint": "شكوى أو استياء",
        "appointment": "حجز موعد",
        "availability": "الاستفسار عن التوفر",
        "location": "الاستفسار عن الموقع/العنوان",
        "hours": "ساعات العمل",
        "human_request": "طلب التحدث مع إنسان",
        "greeting": "تحية أو ترحيب",
        "goodbye": "وداع أو شكر",
        "other": "أخرى"
    }

    def __init__(self):
        self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

    async def classify(self, message: str, context: Optional[dict] = None) -> str:
        """
        يصنف نية الرسالة
        """
        prompt = f"""صنف نية الرسالة التالية إلى واحدة من هذه الفئات:
{', '.join(self.INTENTS.keys())}

الرسالة: "{message}"

أجب بكلمة واحدة فقط (اسم الفئة بالإنجليزية)."""

        try:
            response = await self.client.chat.completions.create(
                model=settings.OPENAI_MODEL_MINI,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=20,
                temperature=0.1
            )

            intent = response.choices[0].message.content.strip().lower()

            # Validate intent
            if intent in self.INTENTS:
                return intent

            # Try to match partial
            for key in self.INTENTS.keys():
                if key in intent:
                    return key

            return "other"

        except Exception:
            return "other"

    async def analyze_sentiment(self, message: str) -> str:
        """
        يحلل مشاعر الرسالة
        """
        prompt = f"""حلل مشاعر الرسالة التالية:
"{message}"

أجب بكلمة واحدة فقط: positive, neutral, أو negative."""

        try:
            response = await self.client.chat.completions.create(
                model=settings.OPENAI_MODEL_MINI,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=10,
                temperature=0.1
            )

            sentiment = response.choices[0].message.content.strip().lower()

            if sentiment in ["positive", "neutral", "negative"]:
                return sentiment
            return "neutral"

        except Exception:
            return "neutral"

    def get_action(self, intent: str) -> Dict:
        """
        يحدد الإجراء بناءً على النية
        """
        actions = {
            "price_inquiry": {
                "action": "show_price",
                "needs_product": True,
                "notify_human": False
            },
            "product_inquiry": {
                "action": "show_product",
                "needs_product": True,
                "notify_human": False
            },
            "order": {
                "action": "create_order",
                "needs_confirmation": True,
                "notify_human": False
            },
            "complaint": {
                "action": "handle_complaint",
                "escalate": True,
                "notify_human": True,
                "priority": "high"
            },
            "appointment": {
                "action": "check_availability",
                "needs_date": True,
                "notify_human": False
            },
            "availability": {
                "action": "check_stock",
                "notify_human": False
            },
            "location": {
                "action": "send_location",
                "notify_human": False
            },
            "hours": {
                "action": "send_hours",
                "notify_human": False
            },
            "human_request": {
                "action": "handoff",
                "notify_human": True,
                "ai_message": "حاضر، سأحولك الآن لأحد ممثلينا..."
            },
            "greeting": {
                "action": "greet",
                "notify_human": False
            },
            "goodbye": {
                "action": "goodbye",
                "notify_human": False
            },
            "other": {
                "action": "general_response",
                "notify_human": False
            }
        }

        return actions.get(intent, actions["other"])
