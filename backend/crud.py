from sqlalchemy.orm import Session
from models import Flower
from schemas import FlowerCreate

def get_flowers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Flower).offset(skip).limit(limit).all()

def get_flower(db: Session, flower_id: int):
    return db.query(Flower).filter(Flower.id == flower_id).first()

def create_flower(db: Session, flower: FlowerCreate):
    db_flower = Flower(**flower.dict())
    db.add(db_flower)
    db.commit()
    db.refresh(db_flower)
    return db_flower

def delete_flower(db: Session, flower_id: int):
    flower = db.query(Flower).filter(Flower.id == flower_id).first()
    if flower:
        db.delete(flower)
        db.commit()
    return flower
