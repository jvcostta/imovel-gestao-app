from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import date, datetime
from decimal import Decimal

# ==================== PROPERTY SCHEMAS ====================
class PropertyBase(BaseModel):
    address: str
    property_type: str
    area: Optional[Decimal] = None
    rooms: Optional[int] = None
    bathrooms: Optional[int] = None
    description: Optional[str] = None
    monthly_rent: Decimal
    status: Optional[str] = "disponivel"

class PropertyCreate(PropertyBase):
    pass

class PropertyUpdate(BaseModel):
    address: Optional[str] = None
    property_type: Optional[str] = None
    area: Optional[Decimal] = None
    rooms: Optional[int] = None
    bathrooms: Optional[int] = None
    description: Optional[str] = None
    monthly_rent: Optional[Decimal] = None
    status: Optional[str] = None

class Property(PropertyBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# ==================== TENANT SCHEMAS ====================
class TenantBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    cpf: Optional[str] = None
    birth_date: Optional[date] = None
    occupation: Optional[str] = None
    monthly_income: Optional[Decimal] = None
    emergency_contact_name: Optional[str] = None
    emergency_contact_phone: Optional[str] = None

class TenantCreate(TenantBase):
    pass

class TenantUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    cpf: Optional[str] = None
    birth_date: Optional[date] = None
    occupation: Optional[str] = None
    monthly_income: Optional[Decimal] = None
    emergency_contact_name: Optional[str] = None
    emergency_contact_phone: Optional[str] = None

class Tenant(TenantBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# ==================== CONTRACT SCHEMAS ====================
class ContractBase(BaseModel):
    property_id: int
    tenant_id: int
    start_date: date
    end_date: date
    monthly_rent: Decimal
    deposit_amount: Optional[Decimal] = None
    status: Optional[str] = "ativo"
    terms: Optional[str] = None

class ContractCreate(ContractBase):
    pass

class ContractUpdate(BaseModel):
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    monthly_rent: Optional[Decimal] = None
    deposit_amount: Optional[Decimal] = None
    status: Optional[str] = None
    terms: Optional[str] = None

class Contract(ContractBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# ==================== PAYMENT SCHEMAS ====================
class PaymentBase(BaseModel):
    contract_id: int
    amount: Decimal
    due_date: date
    payment_date: Optional[date] = None
    payment_method: Optional[str] = None
    status: Optional[str] = "pendente"
    reference_month: Optional[str] = None
    late_fee: Optional[Decimal] = 0
    discount: Optional[Decimal] = 0
    observations: Optional[str] = None

class PaymentCreate(PaymentBase):
    pass

class PaymentUpdate(BaseModel):
    amount: Optional[Decimal] = None
    payment_date: Optional[date] = None
    payment_method: Optional[str] = None
    status: Optional[str] = None
    late_fee: Optional[Decimal] = None
    discount: Optional[Decimal] = None
    observations: Optional[str] = None

class Payment(PaymentBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# ==================== MAINTENANCE SCHEMAS ====================
class MaintenanceBase(BaseModel):
    property_id: int
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    priority: Optional[str] = "media"
    status: Optional[str] = "aberto"
    cost: Optional[Decimal] = None
    contractor_name: Optional[str] = None
    contractor_contact: Optional[str] = None
    scheduled_date: Optional[date] = None
    completion_date: Optional[date] = None

class MaintenanceCreate(MaintenanceBase):
    pass

class MaintenanceUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    cost: Optional[Decimal] = None
    contractor_name: Optional[str] = None
    contractor_contact: Optional[str] = None
    scheduled_date: Optional[date] = None
    completion_date: Optional[date] = None

class Maintenance(MaintenanceBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
