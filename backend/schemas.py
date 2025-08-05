from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class FlowerBase(BaseModel):
    name: str
    description: Optional[str] = None
    category: Optional[str] = None
    quantity: int
    status: Optional[str] = None

class FlowerCreate(FlowerBase):
    pass

class Flower(FlowerBase):
    id: int
    date_added: datetime
    last_updated: Optional[datetime]

    class Config:
        from_attributes = True
