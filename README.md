# AI Business OS

نظام ذكي لإدارة الأعمال بالذكاء الاصطناعي — يجمع بين الرد التلقائي على واتساب، إدارة العملاء، تحليل المبيعات، والتسويق الآلي.

## المميزات

- **رد واتساب ذكي**: يفهم العربية واللهجات ويرد تلقائياً
- **CRM ذكي**: يحفظ العملاء ويتابعهم
- **تحليل المبيعات**: يفهم البيانات ويولد insights
- **تسويق آلي**: يولد منشورات وحملات
- **موظف افتراضي**: مساعد داخلي يعرف كل بيانات الشركة
- **عام لكل الأنشطة**: يتكيف مع المطاعم، المحلات، الخدمات، العيادات، وأكثر

## التقنيات

### Backend
- Python 3.11
- FastAPI (async)
- SQLAlchemy + asyncpg (PostgreSQL)
- OpenAI GPT-4o
- Redis

### Frontend
- Next.js 14
- React 18
- Tailwind CSS
- TypeScript

### Infrastructure
- Docker + Docker Compose
- PostgreSQL 16
- Redis 7

## متطلبات التشغيل

- Docker & Docker Compose
- Python 3.11+ (للتطوير المحلي)
- Node.js 20+ (للتطوير المحلي)

## التشغيل

### 1. نسخ الملفات

```bash
git clone <repo-url>
cd ai-business-os
```

### 2. إعداد المتغيرات البيئية

```bash
cp .env.example .env
# عدل الملف وأضف:
# - OPENAI_API_KEY
# - WHATSAPP_TOKEN
# - WHATSAPP_PHONE_ID
# - WHATSAPP_VERIFY_TOKEN
```

### 3. تشغيل Docker Compose

```bash
docker-compose up --build
```

### 4. فتح التطبيق

- Backend API: http://localhost:8000
- Frontend: http://localhost:3000
- API Docs: http://localhost:8000/docs

## API Endpoints

### الشركات
- `POST /api/v1/companies/` — إنشاء شركة
- `GET /api/v1/companies/` — قائمة الشركات
- `GET /api/v1/companies/{id}` — جلب شركة
- `PUT /api/v1/companies/{id}` — تحديث شركة
- `DELETE /api/v1/companies/{id}` — حذف شركة

### المنتجات
- `POST /api/v1/products/` — إضافة منتج
- `GET /api/v1/products/company/{company_id}` — منتجات شركة
- `GET /api/v1/products/{id}` — جلب منتج
- `PUT /api/v1/products/{id}` — تحديث منتج
- `DELETE /api/v1/products/{id}` — حذف منتج

### المحادثات
- `GET /api/v1/conversations/company/{company_id}` — محادثات شركة
- `GET /api/v1/conversations/customer/{customer_id}` — محادثات عميل
- `GET /api/v1/conversations/needs-human/{company_id}` — تحتاج تدخل بشري

### WhatsApp Webhook
- `GET /api/v1/webhook/whatsapp` — التحقق من Webhook
- `POST /api/v1/webhook/whatsapp` — استقبال الرسائل

## أنواع الأنشطة المدعومة

| النوع | الوصف |
|-------|-------|
| `restaurant` | مطاعم وكافيهات |
| `retail` | محلات تجارية |
| `service` | شركات خدمات |
| `clinic` | عيادات ومراكز صحية |
| `salon` | صالونات وسبا |
| `gym` | أندية رياضية |
| `other` | أي نشاط آخر |


## المساهمة

نرحب بالمساهمات! يرجى فتح issue أو pull request.

## الترخيص

MIT License

---


<img width="1323" height="680" alt="image" src="https://github.com/user-attachments/assets/dbc551aa-5955-45ac-b648-bb1bdb2c68d5" />
<img width="1423" height="680" alt="image(1)" src="https://github.com/user-attachments/assets/bf2fd36f-830f-4092-b5cd-0302bee620cc" />
<img width="1334" height="680" alt="image(2)" src="https://github.com/user-attachments/assets/23ff9538-4b4e-46be-a5c7-fcbd2cbaf49a" />
<img width="1331" height="680" alt="image(3)" src="https://github.com/user-attachments/assets/9d3e7c29-d097-4f70-bf90-4e8765317ed5" />



**صنع بحب في السعودية** 🇸🇦
