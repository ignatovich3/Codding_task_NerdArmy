from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import crud, models, schemas
from database import get_db

app = FastAPI()

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
def create_flower(flower: schemas.FlowerCreate, db: Session = Depends(get_db)):
    return crud.create_flower(db=db, flower=flower)

@app.delete("/flowers/{flower_id}")
def delete_flower(flower_id: int, db: Session = Depends(get_db)):
    flower = crud.delete_flower(db=db, flower_id=flower_id)
    if not flower:
        raise HTTPException(status_code=404, detail="Flower not found")
    return {"detail": "Deleted"}
