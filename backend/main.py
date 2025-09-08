from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import models
import schemas
import crud
from database import SessionLocal, engine

# Criar tabelas
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Imóvel Gestão API", version="1.0.0")

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend Next.js
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency para DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Imóvel Gestão API"}

# ==================== IMÓVEIS ====================
@app.get("/api/properties", response_model=List[schemas.Property])
def get_properties(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    properties = crud.get_properties(db, skip=skip, limit=limit)
    return properties

@app.post("/api/properties", response_model=schemas.Property)
def create_property(property: schemas.PropertyCreate, db: Session = Depends(get_db)):
    return crud.create_property(db=db, property=property)

@app.get("/api/properties/{property_id}", response_model=schemas.Property)
def get_property(property_id: int, db: Session = Depends(get_db)):
    db_property = crud.get_property(db, property_id=property_id)
    if db_property is None:
        raise HTTPException(status_code=404, detail="Imóvel não encontrado")
    return db_property

@app.put("/api/properties/{property_id}", response_model=schemas.Property)
def update_property(property_id: int, property: schemas.PropertyUpdate, db: Session = Depends(get_db)):
    db_property = crud.update_property(db, property_id=property_id, property=property)
    if db_property is None:
        raise HTTPException(status_code=404, detail="Imóvel não encontrado")
    return db_property

@app.delete("/api/properties/{property_id}")
def delete_property(property_id: int, db: Session = Depends(get_db)):
    success = crud.delete_property(db, property_id=property_id)
    if not success:
        raise HTTPException(status_code=404, detail="Imóvel não encontrado")
    return {"message": "Imóvel deletado com sucesso"}

# ==================== INQUILINOS ====================
@app.get("/api/tenants", response_model=List[schemas.Tenant])
def get_tenants(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    tenants = crud.get_tenants(db, skip=skip, limit=limit)
    return tenants

@app.post("/api/tenants", response_model=schemas.Tenant)
def create_tenant(tenant: schemas.TenantCreate, db: Session = Depends(get_db)):
    return crud.create_tenant(db=db, tenant=tenant)

@app.get("/api/tenants/{tenant_id}", response_model=schemas.Tenant)
def get_tenant(tenant_id: int, db: Session = Depends(get_db)):
    db_tenant = crud.get_tenant(db, tenant_id=tenant_id)
    if db_tenant is None:
        raise HTTPException(status_code=404, detail="Inquilino não encontrado")
    return db_tenant

@app.put("/api/tenants/{tenant_id}", response_model=schemas.Tenant)
def update_tenant(tenant_id: int, tenant: schemas.TenantUpdate, db: Session = Depends(get_db)):
    db_tenant = crud.update_tenant(db, tenant_id=tenant_id, tenant=tenant)
    if db_tenant is None:
        raise HTTPException(status_code=404, detail="Inquilino não encontrado")
    return db_tenant

@app.delete("/api/tenants/{tenant_id}")
def delete_tenant(tenant_id: int, db: Session = Depends(get_db)):
    success = crud.delete_tenant(db, tenant_id=tenant_id)
    if not success:
        raise HTTPException(status_code=404, detail="Inquilino não encontrado")
    return {"message": "Inquilino deletado com sucesso"}

# ==================== CONTRATOS ====================
@app.get("/api/contracts", response_model=List[schemas.Contract])
def get_contracts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    contracts = crud.get_contracts(db, skip=skip, limit=limit)
    return contracts

@app.post("/api/contracts", response_model=schemas.Contract)
def create_contract(contract: schemas.ContractCreate, db: Session = Depends(get_db)):
    return crud.create_contract(db=db, contract=contract)

@app.get("/api/contracts/{contract_id}", response_model=schemas.Contract)
def get_contract(contract_id: int, db: Session = Depends(get_db)):
    db_contract = crud.get_contract(db, contract_id=contract_id)
    if db_contract is None:
        raise HTTPException(status_code=404, detail="Contrato não encontrado")
    return db_contract

# ==================== PAGAMENTOS ====================
@app.get("/api/payments", response_model=List[schemas.Payment])
def get_payments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    payments = crud.get_payments(db, skip=skip, limit=limit)
    return payments

@app.post("/api/payments", response_model=schemas.Payment)
def create_payment(payment: schemas.PaymentCreate, db: Session = Depends(get_db)):
    return crud.create_payment(db=db, payment=payment)

@app.put("/api/payments/{payment_id}", response_model=schemas.Payment)
def update_payment(payment_id: int, payment: schemas.PaymentUpdate, db: Session = Depends(get_db)):
    db_payment = crud.update_payment(db, payment_id=payment_id, payment=payment)
    if db_payment is None:
        raise HTTPException(status_code=404, detail="Pagamento não encontrado")
    return db_payment

# ==================== MANUTENÇÕES ====================
@app.get("/api/maintenances", response_model=List[schemas.Maintenance])
def get_maintenances(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    maintenances = crud.get_maintenances(db, skip=skip, limit=limit)
    return maintenances

@app.post("/api/maintenances", response_model=schemas.Maintenance)
def create_maintenance(maintenance: schemas.MaintenanceCreate, db: Session = Depends(get_db)):
    return crud.create_maintenance(db=db, maintenance=maintenance)

@app.put("/api/maintenances/{maintenance_id}", response_model=schemas.Maintenance)
def update_maintenance(maintenance_id: int, maintenance: schemas.MaintenanceUpdate, db: Session = Depends(get_db)):
    db_maintenance = crud.update_maintenance(db, maintenance_id=maintenance_id, maintenance=maintenance)
    if db_maintenance is None:
        raise HTTPException(status_code=404, detail="Manutenção não encontrada")
    return db_maintenance

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
