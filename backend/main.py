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
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import get_db
from fastapi import FastAPI
import auth  # <- jeśli masz auth.py w folderze "routes"
from database import get_db
from auth import router as auth_router




app = FastAPI()
app.include_router(auth_router, tags=["auth"])


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




@app.get("/db-test")
def db_test(db: Session = Depends(get_db)):
    try:
        db.execute("SELECT 1")
        return {"status": "Połączenie działa"}
    except Exception as e:
        return {"error": str(e)}