# Imóvel Gestão - Frontend

Frontend da aplicação de gestão de imóveis desenvolvido em Next.js com TypeScript.

## 🏗️ Arquitetura

Este repositório contém apenas o **frontend** da aplicação. O backend está em um repositório separado:

- **Frontend (este repo)**: Interface do usuário em Next.js
- **Backend**: API FastAPI em Python (repositório separado)

## 🚀 Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS
- **Radix UI** - Componentes acessíveis
- **Docker** - Containerização

## 📁 Estrutura do Projeto

```
├── app/                    # App Router do Next.js
│   ├── page.tsx           # Página inicial
│   ├── layout.tsx         # Layout raiz
│   ├── globals.css        # Estilos globais
│   ├── financeiro/        # Módulo financeiro
│   ├── imoveis/           # Módulo de imóveis
│   ├── inquilinos/        # Módulo de inquilinos
│   ├── manutencao/        # Módulo de manutenção
│   ├── notificacoes/      # Módulo de notificações
│   ├── pagamentos/        # Módulo de pagamentos
│   └── relatorios/        # Módulo de relatórios
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes UI base
│   ├── navigation.tsx    # Navegação
│   └── theme-provider.tsx # Provider de tema
├── lib/                  # Utilitários e configurações
│   ├── api-client.ts     # Cliente para comunicação com API
│   ├── types.ts          # Tipos TypeScript
│   └── utils.ts          # Funções utilitárias
├── public/               # Arquivos estáticos
├── styles/               # Estilos adicionais
├── Dockerfile            # Container de produção
├── Dockerfile.dev        # Container de desenvolvimento
└── docker-compose.yml    # Orquestração Docker
```

## ⚙️ Configuração

### Pré-requisitos

- Node.js 18+
- pnpm
- Docker (opcional)

### Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local` e configure:

```env
# URL da API do backend
NEXT_PUBLIC_API_URL=http://localhost:8000

# Environment
NODE_ENV=development
```

### Instalação Local

```bash
# Instalar dependências
pnpm install

# Executar em modo desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Executar produção
pnpm start
```

## 🐳 Docker

### Desenvolvimento

```bash
# Executar container de desenvolvimento
docker-compose --profile dev up frontend-dev

# Ou usar make
make dev
```

### Produção

```bash
# Build e executar container de produção
docker-compose up frontend --build

# Em background
docker-compose up -d frontend --build
```

## 🔗 Comunicação com Backend

O frontend se comunica com o backend através do cliente API localizado em `lib/api-client.ts`.

### Configuração da API

```typescript
// lib/api-client.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Uso nos componentes
import { apiClient } from '@/lib/api-client';

const properties = await apiClient.getProperties();
```

### Endpoints Disponíveis

- **Imóveis**: `/api/properties`
- **Inquilinos**: `/api/tenants`
- **Contratos**: `/api/contracts`
- **Pagamentos**: `/api/payments`
- **Manutenções**: `/api/maintenances`

## 🏃‍♂️ Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Servidor de desenvolvimento

# Build
pnpm build            # Build de produção
pnpm start            # Executar build

# Qualidade
pnpm lint             # Executar ESLint
pnpm type-check       # Verificar tipos TypeScript

# Docker
pnpm docker:dev       # Container de desenvolvimento
pnpm docker:prod      # Container de produção
```

### Estrutura de Componentes

```typescript
// Exemplo de componente que usa a API
import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Property } from '@/lib/types';

export function PropertiesList() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await apiClient.getProperties();
        setProperties(data);
      } catch (error) {
        console.error('Erro ao carregar imóveis:', error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div>
      {properties.map(property => (
        <div key={property.id}>
          {property.address}
        </div>
      ))}
    </div>
  );
}
```

## 🌐 Deploy

### Vercel (Recomendado)

1. Conecte o repositório ao Vercel
2. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_API_URL`: URL da API de produção

### Docker

```bash
# Build da imagem
docker build -t imovel-frontend .

# Executar container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://api.seudominio.com \
  imovel-frontend
```

## 🔧 Configuração de Backend

Para que o frontend funcione corretamente, certifique-se de que:

1. O backend esteja rodando na URL configurada em `NEXT_PUBLIC_API_URL`
2. O backend tenha CORS configurado para aceitar requisições do frontend
3. Todos os endpoints esperados estejam implementados

### Exemplo de configuração CORS no backend (FastAPI):

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://seudominio.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 📝 Contribuição

1. Clone o repositório
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Faça suas alterações
4. Execute os testes: `pnpm lint`
5. Commit: `git commit -m 'feat: nova funcionalidade'`
6. Push: `git push origin feature/nova-funcionalidade`
7. Abra um Pull Request

## 🐛 Troubleshooting

### Problemas Comuns

**Erro de conexão com a API:**
- Verifique se `NEXT_PUBLIC_API_URL` está correto
- Confirme se o backend está rodando
- Verifique as configurações de CORS no backend

**Erro de build:**
- Execute `pnpm clean` e tente novamente
- Verifique se todas as dependências estão instaladas

**Problemas com Docker:**
- Certifique-se de que o Docker está rodando
- Verifique se as portas não estão em uso
