# main.py
from models import Base
from database import engine

# Tworzy wszystkie tabele (jeśli nie istnieją)
Base.metadata.create_all(bind=engine)

print("Tabela flowers została utworzona w bazie danych PostgreSQL.")
