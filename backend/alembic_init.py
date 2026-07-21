# PyGeospatial Hub - Alembic Configuration
# Database migration setup (Section 10)

from app.models.models import Base
from app.models.database import engine


def init_db():
    """Create all database tables"""
    Base.metadata.create_all(bind=engine)
    print("✓ Database tables created successfully")


def drop_db():
    """Drop all database tables (use with caution)"""
    Base.metadata.drop_all(bind=engine)
    print("✓ Database tables dropped")


if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == "drop":
        drop_db()
    else:
        init_db()
