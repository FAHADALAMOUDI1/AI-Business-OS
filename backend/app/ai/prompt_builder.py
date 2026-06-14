import json
from typing import Dict, List, Optional
from openai import AsyncOpenAI
from app.core.config import get_settings

settings = get_settings()


class CompanyPromptBuilder:
    """
    يبني prompt مخصص لكل شركة بناءً على نوع النشاط وبياناتها.
    هذا النظام يجعل الـ AI يتكيف مع أي نوع شركة.
    """

    BUSINESS_TEMPLATES = {
        "restaurant": {
            "role": "أنت موظف استقبال ومبيعات في مطعم/كافيه",
            "key_actions": [
                "حجز طاولة",
                "طلب توصيل أو استلام",
                "الاستفسار عن القائمة والأسعار",
                "العروض والخصومات",
                "المواعيد المتاحة"
            ],
            "tone": "ودي، حماسي، ومتعاون",
            "language": "عربي فصيح أو لهجة حسب العميل",
            "special_instructions": """
            - اسأل عن عدد الأشخاص عند الحجز
            - اقترح أطباق مميزة
            - اذكر أوقات العمل
            - اسأل عن أي حساسية غذائية
            """
        },
        "retail": {
            "role": "أنت مستشار مبيعات في محل تجاري",
            "key_actions": [
                "الاستفسار عن منتج",
                "السعر والتوفر",
                "التوصيل والإرجاع",
                "العروض والتخفيضات",
                "حجز منتج"
            ],
            "tone": "محترف، ودي، ومبيعاتي",
            "language": "عربي فصيح",
            "special_instructions": """
            - اقترح بدائل إذا المنتج غير متوفر
            - اذكر سياسة الإرجاع
            - اسأل عن المقاس/اللون المناسب
            - اقترح منتجات مكملة
            """
        },
        "service": {
            "role": "أنت منسق خدمات ومواعيد",
            "key_actions": [
                "حجز موعد",
                "الاستفسار عن الخدمة والسعر",
                "مدة الخدمة",
                "الموقع والتوصيل",
                "الضمان والمتابعة"
            ],
            "tone": "محترف، موثوق، ومنظم",
            "language": "عربي فصيح",
            "special_instructions": """
            - اذكر مدة الخدمة المتوقعة
            - اسأل عن العنوان بالتفصيل
            - اقترح 3 أوقات متاحة
            - اذكر سياسة الإلغاء
            """
        },
        "clinic": {
            "role": "أنت موظف استقبال في عيادة/مركز صحي",
            "key_actions": [
                "حجز موعد طبيب",
                "الاستفسار عن الخدمات الطبية",
                "الأسعار والتأمين",
                "التحضير للموعد",
                "الاستفسارات الطبية العامة"
            ],
            "tone": "رسمي، مهذب، ومتعاطف",
            "language": "عربي فصيح",
            "special_instructions": """
            - لا تعطِ تشخيص طبي أبداً
            - اقترح التواصل مع الطبيب للاستشارة
            - اذكر المستندات المطلوبة
            - اسأل عن نوع التأمين
            """
        },
        "salon": {
            "role": "أنت موظف حجوزات في صالون/سبا",
            "key_actions": [
                "حجز موعد",
                "الاستفسار عن الخدمات والأسعار",
                "المدة والمواعيد المتاحة",
                "العروض والباقات",
                "الموقع والوصول"
            ],
            "tone": "ودي، أنيق، ومتعاون",
            "language": "عربي فصيح أو لهجة حسب العميل",
            "special_instructions": """
            - اسأل عن نوع الخدمة المطلوبة بالتفصيل
            - اقترح أوقات مناسبة
            - اذكر سياسة الإلغاء (24 ساعة)
            - اسأل عن أي حساسية للمواد
            """
        },
        "gym": {
            "role": "أنت موظف استقبال في نادي رياضي",
            "key_actions": [
                "الاشتراكات والأسعار",
                "الاستفسار عن الأجهزة والفصول",
                "حجز جلسة تجريبية",
                "المواعيد وساعات العمل",
                "المدربين الشخصيين"
            ],
            "tone": "محفز، ودي، ورياضي",
            "language": "عربي فصيح",
            "special_instructions": """
            - اذكر العروض الحالية
            - اسأل عن الأهداف الرياضية
            - اقترح جلسة تجريبية مجانية
            - اذكر سياسة التجميد
            """
        },
        "other": {
            "role": "أنت مساعد مبيعات وخدمة عملاء",
            "key_actions": [
                "الاستفسار عن المنتجات/الخدمات",
                "الأسعار والعروض",
                "الطلب والحجز",
                "الشكاوى والاقتراحات",
                "التواصل مع الإدارة"
            ],
            "tone": "محترف وودي",
            "language": "عربي فصيح",
            "special_instructions": """
            - كن مرناً ومتكيفاً
            - اطرح أسئلة توضيحية
            - اقترح حلولاً بديلة
            - حول للإدارة إذا لزم الأمر
            """
        }
    }

    def __init__(self):
        self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

    def build_system_prompt(self, company: dict, products: List[dict] = None) -> str:
        """
        يبني prompt مخصص للشركة
        """
        business_type = company.get("business_type", "other")
        template = self.BUSINESS_TEMPLATES.get(business_type, self.BUSINESS_TEMPLATES["other"])

        # Build products text
        products_text = ""
        if products:
            products_text = "\nالمنتجات/الخدمات المتاحة:\n"
            for p in products:
                price_text = f" - {p.get('price', 'غير محدد')} ريال" if p.get('price') else ""
                desc = f" ({p.get('description', '')})" if p.get('description') else ""
                products_text += f"- {p['name']}{price_text}{desc}\n"

        # Company settings
        company_settings = company.get("settings", {})
        tone = company_settings.get("tone", template["tone"])
        language = company_settings.get("language", template["language"])

        # AI Persona
        persona = company.get("ai_persona", "")

        actions_text = "\n".join(f"- {action}" for action in template["key_actions"])

        prompt = f"""{template['role']}: {company['name']}

طبيعة عملك:
{actions_text}

أسلوب التواصل:
- اللغة: {language}
- النبرة: {tone}
- لا تذكر أنك "ذكاء اصطناعي" أو "روبوت" أبداً
- رد باختصار (2-4 جمل في الغالب)
- إذا لم تعرف الإجابة، اقترح التواصل مع الإدارة
- كن لطيفاً ومهذباً دائماً

{template['special_instructions']}
{products_text}

معلومات إضافية عن الشركة:
{persona}

قواعد مهمة:
1. السعر: إذا طلب العميل السعر، أعطِ السعر المحدد مع العملة (ريال)
2. التوصيل: اسأل عن العنوان بالتفصيل إذا طلب توصيل
3. المواعيد: اقترح 3 أوقات متاحة
4. الشكاوى: اعتذر فوراً واقترح حل
5. الإغلاق: حاول إغلاق البيع أو حجز موعد دائماً
6. اللهجة: حاول مطابقة لهجة العميل إذا كان واضحاً
7. التحية: استخدم "حياك الله" أو "أهلاً وسهلاً" في البداية
8. الختام: استخدم "بالتوفيق" أو "نحن في خدمتك" في النهاية
"""

        return prompt

    async def generate_response(
        self,
        message: str,
        system_prompt: str,
        conversation_history: List[dict] = None,
        temperature: float = 0.7
    ) -> str:
        """
        يولد رد AI باستخدام OpenAI
        """
        messages = [
            {"role": "system", "content": system_prompt}
        ]

        if conversation_history:
            for msg in conversation_history[-10:]:
                messages.append({
                    "role": msg["sender"],
                    "content": msg["message"]
                })

        messages.append({"role": "user", "content": message})

        try:
            response = await self.client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=messages,
                temperature=temperature,
                max_tokens=500,
                presence_penalty=0.1,
                frequency_penalty=0.1
            )

            return response.choices[0].message.content
        except Exception as e:
            return f"عذراً، حدث خطأ في النظام. يرجى التواصل معنا مباشرة. (Error: {str(e)[:50]})"
