from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import crud, models, schemas
from database import get_db
from auth import get_current_user, router as auth_router
from models import User

app = FastAPI()
app.include_router(auth_router, tags=["auth"])

# CORS middleware dla React Native
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # web app
        "http://127.0.0.1:3000",  # alternatywny web adres
        "http://localhost:3001",  # mobile app (expo)
        "http://192.168.100.3:3000"  # IP jeśli odpalasz web na telefonie przez sieć lokalną
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔓 GET wszystkie kwiaty użytkownika
@app.get("/flowers", response_model=list[schemas.Flower])
def read_flowers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    flowers = crud.get_flowers(db, skip=skip, limit=limit)
    # Tylko te, które należą do użytkownika
    return [flower for flower in flowers if flower.user_id == current_user.id]

# 🔒 GET jeden kwiat, tylko jeśli należy do użytkownika
@app.get("/flowers/{flower_id}", response_model=schemas.Flower)
def read_flower(flower_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    flower = crud.get_flower(db, flower_id=flower_id)
    if flower is None:
        raise HTTPException(status_code=404, detail="Kwiat nie znaleziony")
    if flower.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Brak dostępu")
    return flower

# ✅ POST nowy kwiat
@app.post("/flowers", response_model=schemas.Flower)
def create_flower(flower: schemas.FlowerCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return crud.create_flower(db=db, flower=flower, user_id=current_user.id)

# 🔒 PUT edycja kwiatu (tylko właściciel)
@app.put("/flowers/{flower_id}", response_model=schemas.Flower)
def update_flower(flower_id: int, flower_data: schemas.FlowerCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_flower = crud.get_flower(db, flower_id)
    if db_flower is None:
        raise HTTPException(status_code=404, detail="Kwiat nie znaleziony")
    if db_flower.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Brak dostępu")

    return crud.update_flower(db=db, flower_id=flower_id, flower_data=flower_data)

# 🔒 DELETE – tylko właściciel
@app.delete("/flowers/{flower_id}")
def delete_flower(flower_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    flower = crud.get_flower(db, flower_id)
    if flower is None:
        raise HTTPException(status_code=404, detail="Kwiat nie znaleziony")
    if flower.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Brak dostępu")

    crud.delete_flower(db=db, flower_id=flower_id)
    return {"detail": "Usunięto"}

# 🛠 Test połączenia z bazą
@app.get("/db-test")
def db_test(db: Session = Depends(get_db)):
    try:
        db.execute("SELECT 1")
        return {"status": "Połączenie działa"}
    except Exception as e:
        return {"error": str(e)}
