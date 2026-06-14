from fastapi import APIRouter
from app.api import companies, products, conversations, whatsapp

api_router = APIRouter()

api_router.include_router(companies.router)
api_router.include_router(products.router)
api_router.include_router(conversations.router)
api_router.include_router(whatsapp.router)
