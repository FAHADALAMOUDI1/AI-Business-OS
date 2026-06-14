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

**صنع بحب في السعودية** 🇸🇦
