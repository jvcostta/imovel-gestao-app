-- Creating database schema for real estate management system

-- Tabela de Imóveis (Properties)
CREATE TABLE IF NOT EXISTS properties (
  id SERIAL PRIMARY KEY,
  address TEXT NOT NULL,
  property_type VARCHAR(50) NOT NULL, -- 'apartamento', 'casa', 'comercial'
  area DECIMAL(10,2),
  rooms INTEGER,
  bathrooms INTEGER,
  description TEXT,
  amenities TEXT[], -- Array de comodidades
  monthly_rent DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'disponivel', -- 'ocupado', 'disponivel', 'manutencao'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Inquilinos (Tenants)
CREATE TABLE IF NOT EXISTS tenants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  cpf VARCHAR(14) UNIQUE,
  birth_date DATE,
  occupation VARCHAR(255),
  monthly_income DECIMAL(10,2),
  emergency_contact_name VARCHAR(255),
  emergency_contact_phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Contratos (Contracts)
CREATE TABLE IF NOT EXISTS contracts (
  id SERIAL PRIMARY KEY,
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  tenant_id INTEGER REFERENCES tenants(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  monthly_rent DECIMAL(10,2) NOT NULL,
  deposit_amount DECIMAL(10,2),
  payment_due_day INTEGER DEFAULT 5, -- Dia do vencimento (1-31)
  late_fee_percentage DECIMAL(5,2) DEFAULT 2.00, -- Percentual de multa por atraso
  status VARCHAR(20) DEFAULT 'ativo', -- 'ativo', 'encerrado', 'suspenso'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Pagamentos (Payments)
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  contract_id INTEGER REFERENCES contracts(id) ON DELETE CASCADE,
  due_date DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  paid_date DATE,
  paid_amount DECIMAL(10,2),
  late_fee DECIMAL(10,2) DEFAULT 0,
  payment_method VARCHAR(50), -- 'pix', 'transferencia', 'dinheiro', 'cartao'
  status VARCHAR(20) DEFAULT 'pendente', -- 'pendente', 'pago', 'atrasado', 'parcial'
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Despesas (Expenses)
CREATE TABLE IF NOT EXISTS expenses (
  id SERIAL PRIMARY KEY,
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  category VARCHAR(100) NOT NULL, -- 'manutencao', 'imposto', 'seguro', 'administracao'
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  expense_date DATE NOT NULL,
  receipt_url TEXT, -- URL para comprovante
  status VARCHAR(20) DEFAULT 'pendente', -- 'pendente', 'pago', 'aprovado'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Solicitações de Manutenção (Maintenance Requests)
CREATE TABLE IF NOT EXISTS maintenance_requests (
  id SERIAL PRIMARY KEY,
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  tenant_id INTEGER REFERENCES tenants(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  priority VARCHAR(20) DEFAULT 'media', -- 'baixa', 'media', 'alta', 'urgente'
  category VARCHAR(100), -- 'eletrica', 'hidraulica', 'pintura', 'limpeza'
  status VARCHAR(20) DEFAULT 'aberta', -- 'aberta', 'em_andamento', 'concluida', 'cancelada'
  estimated_cost DECIMAL(10,2),
  actual_cost DECIMAL(10,2),
  assigned_to VARCHAR(255), -- Nome do prestador de serviço
  scheduled_date DATE,
  completed_date DATE,
  photos TEXT[], -- Array de URLs das fotos
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Notificações (Notifications)
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL, -- 'pagamento_vencendo', 'pagamento_atrasado', 'manutencao', 'contrato_vencendo'
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  related_id INTEGER, -- ID relacionado (payment_id, contract_id, etc.)
  related_type VARCHAR(50), -- 'payment', 'contract', 'maintenance'
  is_read BOOLEAN DEFAULT FALSE,
  scheduled_for TIMESTAMP,
  sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_contracts_property_id ON contracts(property_id);
CREATE INDEX IF NOT EXISTS idx_contracts_tenant_id ON contracts(tenant_id);
CREATE INDEX IF NOT EXISTS idx_payments_contract_id ON payments(contract_id);
CREATE INDEX IF NOT EXISTS idx_payments_due_date ON payments(due_date);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_expenses_property_id ON expenses(property_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_requests_property_id ON maintenance_requests(property_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_requests_status ON maintenance_requests(status);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
