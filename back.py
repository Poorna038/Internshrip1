from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import create_engine, Column, Integer, String, Date, ForeignKey, Numeric, Text
from sqlalchemy.orm import sessionmaker, Session, declarative_base, relationship, joinedload
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from datetime import date
from passlib.context import CryptContext
import bcrypt
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://client_j937_user:IGMpRepvX6V8vq8yoM03LINXnj8lr4PQ@dpg-d4lgbh9r0fns73favtb0-a/client_j937")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class Client(Base):
    __tablename__ = "client"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    pincode = Column(String, nullable=False)
    mobile = Column(String, nullable=False)
    telephone = Column(String, nullable=True)
    email = Column(String, nullable=False)
    pan = Column(String, nullable=False)
    gstin = Column(String, nullable=True)
    stNo = Column(String, nullable=True)
    vatNo = Column(String, nullable=True)
    cstNo = Column(String, nullable=True)
    tanNo = Column(String, nullable=True)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    user_type = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    mobile = Column(String, nullable=False)
    role = Column(String, nullable=False)

class Invoice(Base):
    __tablename__ = "invoices"
    id = Column(Integer, primary_key=True, index=True)
    customer_type = Column(String(50))
    gst_type = Column(String(50))
    client_name = Column(String(100))
    invoice_date = Column(Date)

    items = relationship("InvoiceItem", back_populates="invoice", cascade="all, delete-orphan")

class InvoiceItem(Base):
    __tablename__ = "invoice_items"
    id = Column(Integer, primary_key=True, index=True)
    invoice_id = Column(Integer, ForeignKey("invoices.id", ondelete="CASCADE"))
    particulars = Column(Text)
    amount = Column(Numeric)

    invoice = relationship("Invoice", back_populates="items")

class Element(Base):
    __tablename__ = "elements"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), nullable=False)
    phone = Column(String(15), nullable=False)
    password = Column(Text, nullable=False)

Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

def hash_password_element(password: str):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


class ClientCreate(BaseModel):
    name: str
    address: str
    city: str
    state: str
    pincode: str
    mobile: str
    telephone: Optional[str] = None
    email: str
    pan: str
    gstin: Optional[str] = None
    stNo: Optional[str] = None
    vatNo: Optional[str] = None
    cstNo: Optional[str] = None
    tanNo: Optional[str] = None

class ClientUpdate(ClientCreate):
    pass

class UserBase(BaseModel):
    name: str
    user_type: str
    email: EmailStr
    mobile: str
    role: str

class UserCreate(UserBase):
    pass

class UserUpdate(UserBase):
    pass

class UserOut(UserBase):
    class Config:
        form_mode = True

class InvoiceItemCreate(BaseModel):
    particulars: str
    amount: float

class InvoiceItemOut(BaseModel):
    particulars: str
    amount: float

    class Config:
        form_mode = True

class InvoiceCreateSchema(BaseModel):
    client_name: str
    invoice_date: date
    customer_type: str
    gst_type: str
    items: List[InvoiceItemCreate]

class InvoiceOut(BaseModel):
    id: int
    customer_type: str
    gst_type: str
    client_name: str
    invoice_date: date
    items: List[InvoiceItemOut]

    class Config:
        form_mode = True

class ElementCreate(BaseModel):
    email: str
    phone: str
    password: str

class ElementResponse(BaseModel):
    id: int
    email: str
    phone: str

    class Config:
        form_mode = True

class LoginRequest(BaseModel):
    email: str
    password: str

# ✅ FastAPI App
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- USERS ROUTES --------------------
@app.post("/users", tags=["Users"])
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    new_user = User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created", "user_id": new_user.id}

@app.get("/users", tags=["Users"])
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@app.put("/users/{user_id}", tags=["Users"])
def update_user(user_id: int, data: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    for key, value in data.dict().items():
        setattr(user, key, value)
    db.commit()
    return {"message": "User updated"}

@app.delete("/users/{user_id}", tags=["Users"])
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted"}

# -------------------- CLIENT ROUTES --------------------
@app.post("/clients", tags=["Clients"])
def create_client(client: ClientCreate, db: Session = Depends(get_db)):
    new_client = Client(**client.dict())
    db.add(new_client)
    db.commit()
    db.refresh(new_client)
    return {"message": "Client created", "client_id": new_client.id}

@app.get("/clients", tags=["Clients"])
def get_clients(db: Session = Depends(get_db)):
    return db.query(Client).all()

@app.put("/clients/{client_id}", tags=["Clients"])
def update_client(client_id: int, data: ClientUpdate, db: Session = Depends(get_db)):
    client = db.query(Client).filter(Client.id == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    for key, value in data.dict().items():
        setattr(client, key, value)
    db.commit()
    return {"message": "Client updated"}

@app.delete("/clients/{client_id}", tags=["Clients"])
def delete_client(client_id: int, db: Session = Depends(get_db)):
    client = db.query(Client).filter(Client.id == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    db.delete(client)
    db.commit()
    return {"message": "Client deleted"}

# -------------------- INVOICE ROUTES --------------------
@app.post("/invoices", tags=["Invoices"])
def create_invoice(invoice: InvoiceCreateSchema, db: Session = Depends(get_db)):
    new_invoice = Invoice(
        client_name=invoice.client_name,
        invoice_date=invoice.invoice_date,
        customer_type=invoice.customer_type,
        gst_type=invoice.gst_type,
        items=[InvoiceItem(**item.dict()) for item in invoice.items]
    )
    db.add(new_invoice)
    db.commit()
    db.refresh(new_invoice)
    return new_invoice

@app.get("/invoices", response_model=List[InvoiceOut], tags=["Invoices"])
def get_invoices(db: Session = Depends(get_db)):
    return db.query(Invoice).options(joinedload(Invoice.items)).all()

@app.get("/invoices/{invoice_id}", response_model=InvoiceOut, tags=["Invoices"])
def get_invoice(invoice_id: int, db: Session = Depends(get_db)):
    invoice = db.query(Invoice).filter(Invoice.id == invoice_id).options(joinedload(Invoice.items)).first()
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return invoice
@app.delete("/invoices/{invoice_id}", tags=["Invoices"])
def delete_invoice(invoice_id: int, db: Session = Depends(get_db)):
    invoice = db.query(Invoice).filter(Invoice.id == invoice_id).first()
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    
    db.delete(invoice)
    db.commit()
    return {"message": "Invoice deleted"}

@app.put("/invoices/{invoice_id}", response_model=InvoiceOut,tags=["Invoices"])
def update_invoice(invoice_id: int, invoice_data: InvoiceCreateSchema, db: Session = Depends(get_db)):
    invoice = db.query(Invoice).filter(Invoice.id == invoice_id).options(joinedload(Invoice.items)).first()
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")

    # Update invoice main fields
    invoice.client_name = invoice_data.client_name
    invoice.invoice_date = invoice_data.invoice_date
    invoice.customer_type = invoice_data.customer_type
    invoice.gst_type = invoice_data.gst_type

    # Clear existing items
    invoice.items.clear()
    db.flush()  # Optional but helps to avoid constraint issues

    # Add updated items
    for item in invoice_data.items:
        invoice.items.append(InvoiceItem(**item.dict()))

    db.commit()
    db.refresh(invoice)
    return invoice

# -------------------- ELEMENT ROUTES --------------------
@app.post("/elements/", response_model=ElementResponse, tags=["Elements"])
def create_element(element: ElementCreate, db: Session = Depends(get_db)):
    db_element = db.query(Element).filter(Element.email == element.email).first()
    if db_element:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(element.password)
    new_element = Element(
        email=element.email,
        phone=element.phone,
        password=hashed_password
    )
    db.add(new_element)
    db.commit()
    db.refresh(new_element)
    return new_element


@app.get("/elements/", response_model=List[ElementResponse],tags=["Elements"])
def get_elements(db: Session = Depends(get_db)):
    return db.query(Element).all()

@app.get("/elements/{element_id}", response_model=ElementResponse,tags=["Elements"])
def get_element(element_id: int, db: Session = Depends(get_db)):
    element = db.query(Element).filter(Element.id == element_id).first()
    if not element:
        raise HTTPException(status_code=404, detail="Element not found")
    return element

@app.put("/elements/{element_id}", response_model=ElementResponse,tags=["Elements"])
def update_element(element_id: int, data: ElementCreate, db: Session = Depends(get_db)):
    element = db.query(Element).filter(Element.id == element_id).first()
    if not element:
        raise HTTPException(status_code=404, detail="Element not found")
    element.email = data.email
    element.phone = data.phone
    element.password = hash_password_element(data.password)
    db.commit()
    db.refresh(element)
    return element

@app.delete("/elements/{element_id}", response_model=ElementResponse,tags=["Elements"])
def delete_element(element_id: int, db: Session = Depends(get_db)):
    element = db.query(Element).filter(Element.id == element_id).first()
    if not element:
        raise HTTPException(status_code=404, detail="Element not found")
    db.delete(element)
    db.commit()
    return element

@app.post("/elements-login", tags=["Elements"])
def element_login(request: LoginRequest, db: Session = Depends(get_db)):
    element = db.query(Element).filter(Element.email == request.email).first()
    if not element:
        raise HTTPException(status_code=404, detail="Invalid email or password")
    
    if not verify_password(request.password, element.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    return {
        "message": "Login successful",
        "user": {
            "id": element.id,
            "email": element.email,
            "phone": element.phone
        }
    }
# TEMP: create DB tables via HTTP (remove after use)
@app.get("/create-tables-temp")
def create_tables_temp():
    # WARNING: remove this endpoint immediately after running once
    Base.metadata.create_all(bind=engine)
    return {"message": "Tables created"}

