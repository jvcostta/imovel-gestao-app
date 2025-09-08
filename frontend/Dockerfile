FROM node:18-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Instalar pnpm e dependências
RUN npm install -g pnpm
RUN pnpm install

# Copiar código da aplicação
COPY . .

# Build da aplicação
RUN pnpm build

# Expor porta
EXPOSE 3000

# Comando para executar a aplicação
CMD ["pnpm", "start"]
