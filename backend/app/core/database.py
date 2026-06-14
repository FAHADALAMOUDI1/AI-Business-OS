from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from app.core.config import get_settings

settings = get_settings()

# Attempt to create async engine; if driver missing (e.g. aiosqlite), fall back to None
engine = None
AsyncSessionLocal = None
try:
    engine = create_async_engine(
        settings.DATABASE_URL,
        echo=settings.DEBUG,
        future=True,
    )

    # Create async session factory
    AsyncSessionLocal = async_sessionmaker(
        engine,
        class_=AsyncSession,
        expire_on_commit=False,
        autoflush=False,
    )
except Exception as e:
    # In local/dev environments it's acceptable to not have a DB available.
    print(f"Warning: database engine could not be created: {e}")

# Base class for models
Base = declarative_base()


async def get_db():
    """Dependency for getting database session. Raises if DB is unavailable."""
    if AsyncSessionLocal is None:
        raise RuntimeError("Database is not available in this environment")

    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
