-- Adding sample data for testing the real estate management system

-- Inserir propriedades de exemplo
INSERT INTO properties (address, property_type, area, rooms, bathrooms, description, monthly_rent, status) VALUES
('Rua das Flores, 123 - Centro', 'apartamento', 85.50, 2, 1, 'Apartamento moderno no centro da cidade', 1500.00, 'ocupado'),
('Av. Paulista, 456 - Bela Vista', 'apartamento', 120.00, 3, 2, 'Apartamento amplo com vista para a cidade', 2800.00, 'disponivel'),
('Rua Comercial, 789 - Vila Madalena', 'comercial', 200.00, 0, 2, 'Loja térrea em rua movimentada', 3500.00, 'ocupado'),
('Rua Residencial, 321 - Jardins', 'casa', 180.00, 4, 3, 'Casa com quintal e garagem para 2 carros', 4200.00, 'manutencao');

-- Inserir inquilinos de exemplo
INSERT INTO tenants (name, email, phone, cpf, birth_date, occupation, monthly_income, emergency_contact_name, emergency_contact_phone) VALUES
('João Silva Santos', 'joao.silva@email.com', '(11) 99999-1234', '123.456.789-01', '1985-03-15', 'Engenheiro de Software', 8000.00, 'Maria Silva Santos', '(11) 98888-5678'),
('Ana Paula Oliveira', 'ana.oliveira@email.com', '(11) 88888-9876', '987.654.321-02', '1990-07-22', 'Designer Gráfica', 4500.00, 'Carlos Oliveira', '(11) 97777-4321'),
('Empresa Tech Solutions Ltda', 'contato@techsolutions.com', '(11) 77777-5555', '12.345.678/0001-90', NULL, 'Empresa de Tecnologia', 25000.00, 'Roberto Tech', '(11) 96666-7890');

-- Inserir contratos de exemplo
INSERT INTO contracts (property_id, tenant_id, start_date, end_date, monthly_rent, deposit_amount, status, terms) VALUES
(1, 1, '2024-01-01', '2025-01-01', 1500.00, 3000.00, 'ativo', 'Contrato de locação residencial padrão'),
(3, 3, '2024-02-15', '2026-02-15', 3500.00, 7000.00, 'ativo', 'Contrato de locação comercial com cláusulas específicas');

-- Inserir pagamentos de exemplo
INSERT INTO payments (contract_id, amount, due_date, payment_date, payment_method, status, reference_month, late_fee, discount) VALUES
(1, 1500.00, '2024-01-05', '2024-01-05', 'pix', 'pago', '2024-01', 0, 0),
(1, 1500.00, '2024-02-05', '2024-02-07', 'transferencia', 'pago', '2024-02', 30.00, 0),
(1, 1500.00, '2024-03-05', NULL, NULL, 'pendente', '2024-03', 0, 0),
(2, 3500.00, '2024-02-10', '2024-02-10', 'transferencia', 'pago', '2024-02', 0, 0),
(2, 3500.00, '2024-03-10', NULL, NULL, 'pendente', '2024-03', 0, 0);

-- Inserir manutenções de exemplo
INSERT INTO maintenances (property_id, title, description, category, priority, status, cost, contractor_name, contractor_contact, scheduled_date) VALUES
(1, 'Vazamento na torneira da cozinha', 'A torneira da cozinha está pingando constantemente, causando desperdício de água', 'hidraulica', 'media', 'aberto', 150.00, 'João Encanador', '(11) 99999-0001', '2024-03-15'),
(3, 'Lâmpada queimada no banheiro', 'A lâmpada do banheiro principal queimou e precisa ser substituída', 'eletrica', 'baixa', 'concluido', 50.00, 'Elétrica Silva', '(11) 99999-0002', '2024-02-28'),
(1, 'Ar condicionado não está gelando', 'O ar condicionado do quarto principal não está resfriando adequadamente', 'eletrica', 'alta', 'em_andamento', 300.00, 'Refrigeração Pro', '(11) 99999-0003', '2024-03-10');
