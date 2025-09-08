from sqlalchemy import Column, Integer, String, Decimal, DateTime, Date, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class Property(Base):
    __tablename__ = "properties"
    
    id = Column(Integer, primary_key=True, index=True)
    address = Column(Text, nullable=False)
    property_type = Column(String(50), nullable=False)  # 'apartamento', 'casa', 'comercial'
    area = Column(Decimal(10, 2))
    rooms = Column(Integer)
    bathrooms = Column(Integer)
    description = Column(Text)
    monthly_rent = Column(Decimal(10, 2), nullable=False)
    status = Column(String(20), default="disponivel")  # 'ocupado', 'disponivel', 'manutencao'
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    contracts = relationship("Contract", back_populates="property")
    maintenances = relationship("Maintenance", back_populates="property")

class Tenant(Base):
    __tablename__ = "tenants"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phone = Column(String(20))
    cpf = Column(String(14), unique=True)
    birth_date = Column(Date)
    occupation = Column(String(255))
    monthly_income = Column(Decimal(10, 2))
    emergency_contact_name = Column(String(255))
    emergency_contact_phone = Column(String(20))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    contracts = relationship("Contract", back_populates="tenant")

class Contract(Base):
    __tablename__ = "contracts"
    
    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey("properties.id"), nullable=False)
    tenant_id = Column(Integer, ForeignKey("tenants.id"), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    monthly_rent = Column(Decimal(10, 2), nullable=False)
    deposit_amount = Column(Decimal(10, 2))
    status = Column(String(20), default="ativo")  # 'ativo', 'encerrado', 'rescindido'
    terms = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    property = relationship("Property", back_populates="contracts")
    tenant = relationship("Tenant", back_populates="contracts")
    payments = relationship("Payment", back_populates="contract")

class Payment(Base):
    __tablename__ = "payments"
    
    id = Column(Integer, primary_key=True, index=True)
    contract_id = Column(Integer, ForeignKey("contracts.id"), nullable=False)
    amount = Column(Decimal(10, 2), nullable=False)
    due_date = Column(Date, nullable=False)
    payment_date = Column(Date)
    payment_method = Column(String(50))  # 'dinheiro', 'pix', 'transferencia', 'boleto'
    status = Column(String(20), default="pendente")  # 'pago', 'pendente', 'atrasado'
    reference_month = Column(String(7))  # Format: YYYY-MM
    late_fee = Column(Decimal(10, 2), default=0)
    discount = Column(Decimal(10, 2), default=0)
    observations = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    contract = relationship("Contract", back_populates="payments")

class Maintenance(Base):
    __tablename__ = "maintenances"
    
    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey("properties.id"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    category = Column(String(50))  # 'hidraulica', 'eletrica', 'pintura', 'geral'
    priority = Column(String(20), default="media")  # 'baixa', 'media', 'alta', 'urgente'
    status = Column(String(20), default="aberto")  # 'aberto', 'em_andamento', 'concluido', 'cancelado'
    cost = Column(Decimal(10, 2))
    contractor_name = Column(String(255))
    contractor_contact = Column(String(255))
    scheduled_date = Column(Date)
    completion_date = Column(Date)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    property = relationship("Property", back_populates="maintenances")
