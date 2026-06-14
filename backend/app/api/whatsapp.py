from fastapi import APIRouter, Request, BackgroundTasks, HTTPException, Query
from app.services.conversation_engine import ConversationEngine
from app.core.config import get_settings

settings = get_settings()
router = APIRouter(prefix="/webhook", tags=["webhook"])


@router.get("/whatsapp")
async def verify_webhook(
    hub_mode: str = Query(..., alias="hub.mode"),
    hub_verify_token: str = Query(..., alias="hub.verify_token"),
    hub_challenge: str = Query(..., alias="hub.challenge")
):
    """
    التحقق من Webhook عند إعداد WhatsApp Business API
    """
    if hub_mode == "subscribe" and hub_verify_token == settings.WHATSAPP_VERIFY_TOKEN:
        return int(hub_challenge)

    raise HTTPException(status_code=403, detail="Verification failed")


@router.post("/whatsapp")
async def receive_whatsapp_message(request: Request, background_tasks: BackgroundTasks):
    """
    استقبال رسائل WhatsApp الواردة
    """
    data = await request.json()

    try:
        # استخراج البيانات من webhook
        entry = data.get("entry", [{}])[0]
        changes = entry.get("changes", [{}])[0]
        value = changes.get("value", {})

        # التحقق من وجود رسالة
        messages = value.get("messages", [])
        if not messages:
            return {"status": "no_message"}

        message = messages[0]

        # استخراج معلومات الرسالة
        phone_number = message.get("from")
        message_type = message.get("type")
        message_id = message.get("id")

        # التعامل فقط مع الرسائل النصية
        if message_type != "text":
            return {"status": "unsupported_type", "type": message_type}

        message_text = message.get("text", {}).get("body", "")

        # TODO: تحديد company_id من رقم الهاتف
        # في الإنتاج: يجب ربط رقم الهاتف بـ company_id
        company_id = "placeholder-company-id"  # سيتم استبداله لاحقاً

        # معالجة الرسالة في الخلفية
        background_tasks.add_task(
            _process_message,
            company_id=company_id,
            phone_number=phone_number,
            message_text=message_text,
            message_id=message_id
        )

        return {"status": "received", "message_id": message_id}

    except Exception as e:
        return {"status": "error", "detail": str(e)}


async def _process_message(company_id: str, phone_number: str, message_text: str, message_id: str):
    """
    معالجة الرسالة (تعمل في الخلفية)
    """
    try:
        engine = ConversationEngine(company_id=company_id)
        await engine.process_incoming_message(
            customer_phone=phone_number,
            message_text=message_text,
            message_id=message_id
        )
    except Exception as e:
        # تسجيل الخطأ (سيتم إضافة logging لاحقاً)
        print(f"Error processing message: {e}")
