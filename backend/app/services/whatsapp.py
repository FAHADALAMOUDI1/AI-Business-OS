import httpx
from typing import Optional
from app.core.config import get_settings

settings = get_settings()


class WhatsAppService:
    """
    خدمة التواصل مع WhatsApp Business API
    """

    BASE_URL = f"https://graph.facebook.com/{settings.WHATSAPP_API_VERSION}"

    def __init__(self):
        self.token = settings.WHATSAPP_TOKEN
        self.phone_id = settings.WHATSAPP_PHONE_ID
        self.headers = {
            "Authorization": f"Bearer {self.token}",
            "Content-Type": "application/json"
        }

    async def send_text_message(self, to: str, message: str) -> dict:
        """
        إرسال رسالة نصية
        """
        url = f"{self.BASE_URL}/{self.phone_id}/messages"

        payload = {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": to,
            "type": "text",
            "text": {
                "body": message,
                "preview_url": False
            }
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=self.headers, json=payload)
            return response.json()

    async def send_template_message(self, to: str, template_name: str, language: str = "ar") -> dict:
        """
        إرسال رسالة باستخدام قالب (Template)
        """
        url = f"{self.BASE_URL}/{self.phone_id}/messages"

        payload = {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": to,
            "type": "template",
            "template": {
                "name": template_name,
                "language": {
                    "code": language
                }
            }
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=self.headers, json=payload)
            return response.json()

    async def send_location(self, to: str, latitude: float, longitude: float, name: str, address: str) -> dict:
        """
        إرسال موقع الشركة
        """
        url = f"{self.BASE_URL}/{self.phone_id}/messages"

        payload = {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": to,
            "type": "location",
            "location": {
                "latitude": latitude,
                "longitude": longitude,
                "name": name,
                "address": address
            }
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=self.headers, json=payload)
            return response.json()

    async def mark_as_read(self, message_id: str) -> dict:
        """
        وضع علامة "مقروء" على الرسالة
        """
        url = f"{self.BASE_URL}/{self.phone_id}/messages"

        payload = {
            "messaging_product": "whatsapp",
            "status": "read",
            "message_id": message_id
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=self.headers, json=payload)
            return response.json()

    async def get_business_profile(self) -> dict:
        """
        جلب معلومات حساب الأعمال
        """
        url = f"{self.BASE_URL}/{self.phone_id}/whatsapp_business_profile"

        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=self.headers)
            return response.json()


# Singleton instance
whatsapp_service = WhatsAppService()
