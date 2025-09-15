# Makefile para facilitar o desenvolvimento

.PHONY: dev prod build clean install

# Desenvolvimento
dev:
	docker-compose --profile dev up frontend-dev

# Produção
prod:
	docker-compose up frontend --build -d

# Build local
build:
	pnpm build

# Limpar cache e node_modules
clean:
	rm -rf .next node_modules

# Instalar dependências
install:
	pnpm install

# Logs do container
logs:
	docker-compose logs -f frontend

# Parar containers
stop:
	docker-compose down

# Health check da API
health:
	curl -f http://localhost:8000/ || echo "Backend não está rodando"