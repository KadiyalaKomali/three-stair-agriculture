"""
Database Configuration Options for EcoTriFarm

This file demonstrates how to configure different databases.
Choose one of the configurations below and update your .env file accordingly.
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

# Create base class for models
Base = declarative_base()

def get_database_engine():
    """
    Create database engine based on DATABASE_URL in .env file
    Supports: PostgreSQL, MySQL, SQLite, SQL Server
    """
    return create_engine(settings.DATABASE_URL)

def get_session_local():
    """Create session factory"""
    engine = get_database_engine()
    return sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    """Get database session."""
    SessionLocal = get_session_local()
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    """Create all database tables."""
    engine = get_database_engine()
    Base.metadata.create_all(bind=engine)

# Database Configuration Examples:

# 1. PostgreSQL (Current Default)
# DATABASE_URL=postgresql://username:password@localhost:5432/ecotrifarm

# 2. MySQL/MariaDB
# DATABASE_URL=mysql+pymysql://username:password@localhost:3306/ecotrifarm

# 3. SQLite (Local File Database)
# DATABASE_URL=sqlite:///./ecotrifarm.db

# 4. SQL Server
# DATABASE_URL=mssql+pyodbc://username:password@server/database?driver=ODBC+Driver+17+for+SQL+Server

# 5. Oracle
# DATABASE_URL=oracle+cx_oracle://username:password@localhost:1521/xe