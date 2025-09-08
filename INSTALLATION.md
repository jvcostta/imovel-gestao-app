# Guia de Instalação e Configuração

## Opção 1: Com Docker (Recomendado)

### Pré-requisitos
1. Instale o Docker Desktop: https://www.docker.com/products/docker-desktop/
2. Certifique-se de que o Docker Desktop está rodando

### Executando
```bash
docker-compose up --build
```

## Opção 2: Desenvolvimento Local (Sem Docker)

### Backend (FastAPI)

1. **Instale o Python 3.11+**: https://www.python.org/downloads/
2. **Instale as dependências**:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Configure o banco MySQL local**:
   - Instale MySQL: https://dev.mysql.com/downloads/installer/
   - Crie o banco de dados:
     ```sql
     CREATE DATABASE imovel_gestao;
     CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'app_password';
     GRANT ALL PRIVILEGES ON imovel_gestao.* TO 'app_user'@'localhost';
     FLUSH PRIVILEGES;
     ```
   - Execute os scripts SQL da pasta `scripts/`

4. **Configure as variáveis de ambiente**:
   Edite o arquivo `backend/.env`:
   ```env
   MYSQL_USER=app_user
   MYSQL_PASSWORD=app_password
   MYSQL_HOST=localhost
   MYSQL_DATABASE=imovel_gestao
   ```

5. **Execute o backend**:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

### Frontend (Next.js)

1. **Instale o Node.js 18+**: https://nodejs.org/
2. **Instale o pnpm**: `npm install -g pnpm`
3. **Instale as dependências**:
   ```bash
   cd frontend
   pnpm install
   ```
4. **Execute o frontend**:
   ```bash
   cd frontend
   pnpm dev
   ```

### Serviços Locais
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000
- **Documentação da API**: http://localhost:8000/docs

## Opção 3: Usando XAMPP (Windows)

1. **Instale o XAMPP**: https://www.apachefriends.org/download.html
2. **Inicie o MySQL no XAMPP**
3. **Configure o banco usando phpMyAdmin**: http://localhost/phpmyadmin
4. **Ajuste as configurações do backend para usar localhost:3306**

## Testando a API

Após iniciar o backend, você pode testar a API usando:

### Curl
```bash
# Listar imóveis
curl http://localhost:8000/api/properties

# Criar um imóvel
curl -X POST http://localhost:8000/api/properties \
  -H "Content-Type: application/json" \
  -d '{
    "address": "Rua Example, 123",
    "property_type": "apartamento",
    "area": 80.5,
    "rooms": 2,
    "bathrooms": 1,
    "description": "Apartamento bem localizado",
    "monthly_rent": 1500.00
  }'
```

### Documentação Interativa
Acesse: http://localhost:8000/docs

## Solução de Problemas

### Docker não inicia
- Verifique se o Docker Desktop está instalado e rodando
- No Windows, certifique-se de que a virtualização está habilitada no BIOS

### Erro de conexão com MySQL
- Verifique se o MySQL está rodando
- Confirme as credenciais no arquivo `.env`
- Teste a conexão usando um cliente MySQL

### Porta já em uso
- Altere as portas no `docker-compose.yml` se necessário
- Para desenvolvimento local, use portas diferentes (ex: 3001, 8001)

### Problemas com dependências do Python
```bash
# Linux/Mac - Instalar dependências do sistema
sudo apt-get install python3-dev default-libmysqlclient-dev build-essential

# Windows - Instalar Microsoft C++ Build Tools
# https://visualstudio.microsoft.com/visual-cpp-build-tools/
```
