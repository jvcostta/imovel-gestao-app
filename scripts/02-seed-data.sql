-- Adding sample data for testing the real estate management system

-- Inserir propriedades de exemplo
INSERT INTO properties (address, property_type, area, rooms, bathrooms, description, amenities, monthly_rent, status) VALUES
('Rua das Flores, 123 - Centro', 'apartamento', 85.50, 2, 1, 'Apartamento moderno no centro da cidade', ARRAY['ar_condicionado', 'varanda', 'portaria_24h'], 1500.00, 'ocupado'),
('Av. Paulista, 456 - Bela Vista', 'apartamento', 120.00, 3, 2, 'Apartamento amplo com vista para a cidade', ARRAY['piscina', 'academia', 'garagem'], 2800.00, 'disponivel'),
('Rua Comercial, 789 - Vila Madalena', 'comercial', 200.00, 0, 2, 'Loja térrea em rua movimentada', ARRAY['vitrine', 'deposito', 'banheiro_adaptado'], 3500.00, 'ocupado'),
('Rua Residencial, 321 - Jardins', 'casa', 180.00, 4, 3, 'Casa com quintal e garagem para 2 carros', ARRAY['quintal', 'churrasqueira', 'garagem_2_vagas'], 4200.00, 'manutencao');

-- Inserir inquilinos de exemplo
INSERT INTO tenants (name, email, phone, cpf, birth_date, occupation, monthly_income, emergency_contact_name, emergency_contact_phone) VALUES
('João Silva Santos', 'joao.silva@email.com', '(11) 99999-1234', '123.456.789-01', '1985-03-15', 'Engenheiro de Software', 8000.00, 'Maria Silva Santos', '(11) 98888-5678'),
('Ana Paula Oliveira', 'ana.oliveira@email.com', '(11) 88888-9876', '987.654.321-02', '1990-07-22', 'Designer Gráfica', 4500.00, 'Carlos Oliveira', '(11) 97777-4321'),
('Empresa Tech Solutions Ltda', 'contato@techsolutions.com', '(11) 77777-5555', '12.345.678/0001-90', NULL, 'Empresa de Tecnologia', 25000.00, 'Roberto Tech', '(11) 96666-7890');

-- Inserir contratos de exemplo
INSERT INTO contracts (property_id, tenant_id, start_date, end_date, monthly_rent, deposit_amount, payment_due_day, late_fee_percentage, status) VALUES
(1, 1, '2024-01-01', '2025-01-01', 1500.00, 3000.00, 5, 2.00, 'ativo'),
(3, 3, '2024-02-15', '2026-02-15', 3500.00, 7000.00, 10, 2.50, 'ativo');

-- Inserir pagamentos de exemplo
INSERT INTO payments (contract_id, due_date, amount, paid_date, paid_amount, late_fee, payment_method, status) VALUES
(1, '2024-01-05', 1500.00, '2024-01-05', 1500.00, 0, 'pix', 'pago'),
(1, '2024-02-05', 1500.00, '2024-02-07', 1530.00, 30.00, 'transferencia', 'pago'),
(1, '2024-03-05', 1500.00, NULL, NULL, 0, NULL, 'pendente'),
(2, '2024-02-10', 3500.00, '2024-02-10', 3500.00, 0, 'transferencia', 'pago'),
(2, '2024-03-10', 3500.00, NULL, NULL, 0, NULL, 'pendente');

-- Inserir despesas de exemplo
INSERT INTO expenses (property_id, category, description, amount, expense_date, status) VALUES
(1, 'manutencao', 'Reparo no encanamento da cozinha', 350.00, '2024-01-15', 'pago'),
(1, 'imposto', 'IPTU 2024 - 1ª parcela', 280.00, '2024-02-01', 'pago'),
(4, 'manutencao', 'Pintura externa da casa', 1200.00, '2024-02-20', 'pendente'),
(2, 'administracao', 'Taxa de condomínio', 450.00, '2024-03-01', 'pago');

-- Inserir solicitações de manutenção de exemplo
INSERT INTO maintenance_requests (property_id, tenant_id, title, description, priority, category, status, estimated_cost, assigned_to) VALUES
(1, 1, 'Vazamento na torneira da cozinha', 'A torneira da cozinha está pingando constantemente, causando desperdício de água', 'media', 'hidraulica', 'aberta', 150.00, 'João Encanador'),
(3, 3, 'Lâmpada queimada no banheiro', 'A lâmpada do banheiro principal queimou e precisa ser substituída', 'baixa', 'eletrica', 'concluida', 50.00, 'Elétrica Silva'),
(1, 1, 'Ar condicionado não está gelando', 'O ar condicionado do quarto principal não está resfriando adequadamente', 'alta', 'eletrica', 'em_andamento', 300.00, 'Refrigeração Pro');

-- Inserir notificações de exemplo
INSERT INTO notifications (type, title, message, related_id, related_type, is_read, scheduled_for) VALUES
('pagamento_vencendo', 'Pagamento Vencendo', 'O pagamento do contrato #1 vence em 3 dias', 3, 'payment', FALSE, '2024-03-02 09:00:00'),
('manutencao', 'Nova Solicitação de Manutenção', 'Nova solicitação de manutenção para a propriedade Rua das Flores, 123', 1, 'maintenance', FALSE, NOW()),
('pagamento_atrasado', 'Pagamento em Atraso', 'O pagamento do contrato #2 está em atraso há 2 dias', 5, 'payment', FALSE, '2024-03-12 10:00:00');
