from sqlalchemy.orm import Session
from typing import List, Optional
import models
import schemas
from datetime import datetime

# ==================== PROPERTY CRUD ====================
def get_property(db: Session, property_id: int):
    return db.query(models.Property).filter(models.Property.id == property_id).first()

def get_properties(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Property).offset(skip).limit(limit).all()

def create_property(db: Session, property: schemas.PropertyCreate):
    db_property = models.Property(**property.dict())
    db.add(db_property)
    db.commit()
    db.refresh(db_property)
    return db_property

def update_property(db: Session, property_id: int, property: schemas.PropertyUpdate):
    db_property = db.query(models.Property).filter(models.Property.id == property_id).first()
    if db_property:
        update_data = property.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_property, field, value)
        db_property.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_property)
    return db_property

def delete_property(db: Session, property_id: int):
    db_property = db.query(models.Property).filter(models.Property.id == property_id).first()
    if db_property:
        db.delete(db_property)
        db.commit()
        return True
    return False

# ==================== TENANT CRUD ====================
def get_tenant(db: Session, tenant_id: int):
    return db.query(models.Tenant).filter(models.Tenant.id == tenant_id).first()

def get_tenants(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Tenant).offset(skip).limit(limit).all()

def create_tenant(db: Session, tenant: schemas.TenantCreate):
    db_tenant = models.Tenant(**tenant.dict())
    db.add(db_tenant)
    db.commit()
    db.refresh(db_tenant)
    return db_tenant

def update_tenant(db: Session, tenant_id: int, tenant: schemas.TenantUpdate):
    db_tenant = db.query(models.Tenant).filter(models.Tenant.id == tenant_id).first()
    if db_tenant:
        update_data = tenant.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_tenant, field, value)
        db_tenant.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_tenant)
    return db_tenant

def delete_tenant(db: Session, tenant_id: int):
    db_tenant = db.query(models.Tenant).filter(models.Tenant.id == tenant_id).first()
    if db_tenant:
        db.delete(db_tenant)
        db.commit()
        return True
    return False

# ==================== CONTRACT CRUD ====================
def get_contract(db: Session, contract_id: int):
    return db.query(models.Contract).filter(models.Contract.id == contract_id).first()

def get_contracts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Contract).offset(skip).limit(limit).all()

def create_contract(db: Session, contract: schemas.ContractCreate):
    db_contract = models.Contract(**contract.dict())
    db.add(db_contract)
    db.commit()
    db.refresh(db_contract)
    return db_contract

def update_contract(db: Session, contract_id: int, contract: schemas.ContractUpdate):
    db_contract = db.query(models.Contract).filter(models.Contract.id == contract_id).first()
    if db_contract:
        update_data = contract.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_contract, field, value)
        db_contract.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_contract)
    return db_contract

# ==================== PAYMENT CRUD ====================
def get_payment(db: Session, payment_id: int):
    return db.query(models.Payment).filter(models.Payment.id == payment_id).first()

def get_payments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Payment).offset(skip).limit(limit).all()

def create_payment(db: Session, payment: schemas.PaymentCreate):
    db_payment = models.Payment(**payment.dict())
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment

def update_payment(db: Session, payment_id: int, payment: schemas.PaymentUpdate):
    db_payment = db.query(models.Payment).filter(models.Payment.id == payment_id).first()
    if db_payment:
        update_data = payment.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_payment, field, value)
        db_payment.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_payment)
    return db_payment

# ==================== MAINTENANCE CRUD ====================
def get_maintenance(db: Session, maintenance_id: int):
    return db.query(models.Maintenance).filter(models.Maintenance.id == maintenance_id).first()

def get_maintenances(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Maintenance).offset(skip).limit(limit).all()

def create_maintenance(db: Session, maintenance: schemas.MaintenanceCreate):
    db_maintenance = models.Maintenance(**maintenance.dict())
    db.add(db_maintenance)
    db.commit()
    db.refresh(db_maintenance)
    return db_maintenance

def update_maintenance(db: Session, maintenance_id: int, maintenance: schemas.MaintenanceUpdate):
    db_maintenance = db.query(models.Maintenance).filter(models.Maintenance.id == maintenance_id).first()
    if db_maintenance:
        update_data = maintenance.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_maintenance, field, value)
        db_maintenance.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_maintenance)
    return db_maintenance
