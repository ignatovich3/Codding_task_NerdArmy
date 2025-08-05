from dotenv import load_dotenv
load_dotenv()  # <- to MUSI być na górze

import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL")  # <- to pobiera z .env
if DATABASE_URL is None:
    raise ValueError("Brak DATABASE_URL. Czy plik .env istnieje?")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

