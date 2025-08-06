from sqlalchemy.orm import Session
from models import Flower
from schemas import FlowerCreate
from models import User
from passlib.hash import bcrypt
from sqlalchemy.orm import Session
from sqlalchemy.orm import Session
import models
import schemas



def get_flowers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Flower).offset(skip).limit(limit).all()

def get_flower(db: Session, flower_id: int):
    return db.query(Flower).filter(Flower.id == flower_id).first()

def create_flower(db: Session, flower: FlowerCreate, user_id: int):
    db_flower = Flower(**flower.dict(), user_id=user_id)
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

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def create_user(db: Session, user):
    hashed_pw = bcrypt.hash(user.password)
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_pw
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user:
        return None
    if not bcrypt.verify(password, user.hashed_password):
        return None
    return user

def update_flower(db: Session, flower_id: int, flower_data: schemas.FlowerCreate):
    db_flower = db.query(models.Flower).filter(models.Flower.id == flower_id).first()
    if db_flower is None:
        return None

    db_flower.name = flower_data.name
    db_flower.description = flower_data.description
    db_flower.category = flower_data.category
    db_flower.quantity = flower_data.quantity
    db_flower.status = flower_data.status

    db.commit()
    db.refresh(db_flower)
    return db_flower