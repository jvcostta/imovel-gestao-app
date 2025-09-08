-- Creating database schema for real estate management system

-- Tabela de Imóveis (Properties)
CREATE TABLE IF NOT EXISTS properties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  address TEXT NOT NULL,
  property_type VARCHAR(50) NOT NULL, -- 'apartamento', 'casa', 'comercial'
  area DECIMAL(10,2),
  rooms INT,
  bathrooms INT,
  description TEXT,
  monthly_rent DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'disponivel', -- 'ocupado', 'disponivel', 'manutencao'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Inquilinos (Tenants)
CREATE TABLE IF NOT EXISTS tenants (
  id INT AUTO_INCREMENT PRIMARY KEY,
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Contratos (Contracts)
CREATE TABLE IF NOT EXISTS contracts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT,
  tenant_id INT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  monthly_rent DECIMAL(10,2) NOT NULL,
  deposit_amount DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'ativo', -- 'ativo', 'encerrado', 'rescindido'
  terms TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);

-- Tabela de Pagamentos (Payments)
CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contract_id INT,
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE NOT NULL,
  payment_date DATE,
  payment_method VARCHAR(50), -- 'dinheiro', 'pix', 'transferencia', 'boleto'
  status VARCHAR(20) DEFAULT 'pendente', -- 'pago', 'pendente', 'atrasado'
  reference_month VARCHAR(7), -- Format: YYYY-MM
  late_fee DECIMAL(10,2) DEFAULT 0,
  discount DECIMAL(10,2) DEFAULT 0,
  observations TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (contract_id) REFERENCES contracts(id) ON DELETE CASCADE
);

-- Tabela de Manutenções (Maintenances)
CREATE TABLE IF NOT EXISTS maintenances (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50), -- 'hidraulica', 'eletrica', 'pintura', 'geral'
  priority VARCHAR(20) DEFAULT 'media', -- 'baixa', 'media', 'alta', 'urgente'
  status VARCHAR(20) DEFAULT 'aberto', -- 'aberto', 'em_andamento', 'concluido', 'cancelado'
  cost DECIMAL(10,2),
  contractor_name VARCHAR(255),
  contractor_contact VARCHAR(255),
  scheduled_date DATE,
  completion_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);
