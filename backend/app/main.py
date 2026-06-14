from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.database import engine, Base
from app.api import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    إدارة دورة حياة التطبيق
    """
    if engine is not None:
        try:
            async with engine.begin() as conn:
                await conn.run_sync(Base.metadata.create_all)
        except Exception as e:
            # لا نفشل بدء التطبيق فقط بسبب قاعدة بيانات غير متاحة محلياً
            print(f"Warning: could not initialize DB on startup: {e}")
    else:
        print("Warning: database engine is not available; skipping DB initialization")

    yield

    if engine is not None:
        await engine.dispose()


app = FastAPI(
    title="AI Business OS",
    description="نظام ذكي لإدارة الأعمال بالذكاء الاصطناعي",
    version="0.1.0",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
async def root():
    return {
        "message": "AI Business OS API",
        "version": "0.1.0",
        "status": "running"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
