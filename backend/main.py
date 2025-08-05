from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import crud, models, schemas
from database import get_db
from schemas import UserCreate, UserLogin, UserResponse
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends, HTTPException
from auth import get_current_user


from auth import verify_password, create_access_token
from schemas import Token
from auth import hash_password
from schemas import UserCreate, UserResponse
from models import User
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import crud

app = FastAPI()


@app.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = crud.get_user_by_username(db, user.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    hashed_pw = hash_password(user.password)
    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_pw
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/login", response_model=UserResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = crud.authenticate_user(db, user.username, user.password)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return db_user
@app.get("/flowers", response_model=list[schemas.Flower])
def read_flowers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_flowers(db, skip=skip, limit=limit)

@app.get("/flowers/{flower_id}", response_model=schemas.Flower)
def read_flower(flower_id: int, db: Session = Depends(get_db)):
    db_flower = crud.get_flower(db, flower_id=flower_id)
    if db_flower is None:
        raise HTTPException(status_code=404, detail="Flower not found")
    return db_flower

@app.post("/flowers", response_model=schemas.Flower)
def create_flower(
    flower: schemas.FlowerCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return crud.create_flower(db=db, flower=flower, user_id=current_user.id)


@app.delete("/flowers/{flower_id}")
def delete_flower(flower_id: int, db: Session = Depends(get_db)):
    flower = crud.delete_flower(db=db, flower_id=flower_id)
    if not flower:
        raise HTTPException(status_code=404, detail="Flower not found")
    return {"detail": "Deleted"}


@app.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_username(db, form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}