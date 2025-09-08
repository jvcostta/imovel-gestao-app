# Imóvel Gestão App

Sistema de gestão de imóveis com backend em FastAPI (Python) e frontend em Next.js.

## Estrutura do Projeto

```
├── backend/          # API FastAPI em Python
├── frontend/         # Aplicação Next.js
├── scripts/          # Scripts SQL para inicialização do banco
└── docker-compose.yml # Orquestração dos containers
```

## Tecnologias Utilizadas

### Backend
- **FastAPI** - Framework web moderno e rápido para Python
- **SQLAlchemy** - ORM para Python
- **MySQL** - Banco de dados relacional
- **Pydantic** - Validação de dados
- **Docker** - Containerização

### Frontend
- **Next.js** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS
- **Radix UI** - Componentes acessíveis

## Como Executar

### Pré-requisitos
- Docker
- Docker Compose

### Executando com Docker

1. Clone o repositório
2. Execute o comando:

```bash
docker-compose up --build
```

### Serviços Disponíveis

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Documentação da API**: http://localhost:8000/docs
- **MySQL**: localhost:3306

### Dados de Acesso MySQL

- **Host**: localhost
- **Port**: 3306
- **Database**: imovel_gestao
- **User**: app_user
- **Password**: app_password
- **Root Password**: admin123

## Estrutura da API

### Endpoints Principais

#### Imóveis
- `GET /api/properties` - Listar imóveis
- `POST /api/properties` - Criar imóvel
- `GET /api/properties/{id}` - Obter imóvel
- `PUT /api/properties/{id}` - Atualizar imóvel
- `DELETE /api/properties/{id}` - Deletar imóvel

#### Inquilinos
- `GET /api/tenants` - Listar inquilinos
- `POST /api/tenants` - Criar inquilino
- `GET /api/tenants/{id}` - Obter inquilino
- `PUT /api/tenants/{id}` - Atualizar inquilino
- `DELETE /api/tenants/{id}` - Deletar inquilino

#### Contratos
- `GET /api/contracts` - Listar contratos
- `POST /api/contracts` - Criar contrato
- `GET /api/contracts/{id}` - Obter contrato

#### Pagamentos
- `GET /api/payments` - Listar pagamentos
- `POST /api/payments` - Criar pagamento
- `PUT /api/payments/{id}` - Atualizar pagamento

#### Manutenções
- `GET /api/maintenances` - Listar manutenções
- `POST /api/maintenances` - Criar manutenção
- `PUT /api/maintenances/{id}` - Atualizar manutenção

## Desenvolvimento

### Backend (FastAPI)

Para desenvolvimento local do backend:

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend (Next.js)

Para desenvolvimento local do frontend:

```bash
cd frontend
pnpm install
pnpm dev
```

## Banco de Dados

O banco de dados é automaticamente inicializado com as tabelas necessárias através dos scripts SQL na pasta `scripts/`.

### Principais Tabelas
- `properties` - Imóveis
- `tenants` - Inquilinos
- `contracts` - Contratos
- `payments` - Pagamentos
- `maintenances` - Manutenções

## Logs e Monitoramento

Para visualizar os logs dos containers:

```bash
# Todos os serviços
docker-compose logs -f

# Serviço específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

## Parar os Serviços

```bash
docker-compose down
```

Para remover também os volumes (dados do banco):

```bash
docker-compose down -v
```
