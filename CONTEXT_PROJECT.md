# Documentação Técnica - Projeto PassaoLink.com.br

Este documento serve como um guia técnico completo para o desenvolvimento do projeto PassaoLink.com.br. Ele detalha a arquitetura, tecnologias, configuração do ambiente e o estado atual do desenvolvimento.

## 1. Status Atual do Projeto

O projeto está em **fase de desenvolvimento ativa**. A API backend está funcional e o painel de administração (`admin-hub`) está conectado a ela, com funcionalidades de autenticação e gerenciamento de produtos implementadas.

**O que foi feito:**
- **Monorepo:** A estrutura do monorepo foi criada com **Turborepo** e **npm Workspaces**.
- **Serviços:** Os três serviços principais (`frontend-publico`, `admin-hub`, `api-hub-link`) estão estruturados.
- **Backend (`api-hub-link`):**
  - **Arquitetura em Camadas:** Implementada uma arquitetura limpa com `interfaces`, `repositories`, `usecases`, `services` e `routes`.
  - **Endpoints:** Todos os endpoints para autenticação de usuários (`/auth`) e CRUD de produtos (`/products`) estão funcionais.
  - **Serviços:** Um `JwtService` foi implementado para lidar com a geração e verificação de tokens.
  - **Banco de Dados:**
    - Ambiente containerizado com **PostgreSQL** via Docker.
    - Schema do Prisma (`schema.prisma`) definido e migração inicial executada.
- **Frontend (`admin-hub`):**
  - **Conexão com a API:** O painel de administração agora consome a `api-hub-link`.
  - **Cliente de API:** Um cliente `axios` foi configurado para gerenciar as requisições, incluindo a injeção automática do token JWT.
  - **Autenticação:** A tela de login é funcional e armazena o token do usuário no `localStorage`.
  - **Gerenciamento de Produtos:** O dashboard agora lista, cria, edita e exclui produtos através de chamadas à API.

**Próximos Passos:**
1.  Conectar o `frontend-publico` com a `api-hub-link` para exibir os produtos.
2.  Desenvolver a UI da vitrine pública para listar produtos, filtrar por categoria e visualizar detalhes.
3.  Implementar testes para garantir a qualidade e estabilidade da API e dos frontends.

## 2. Arquitetura e Tecnologias

### 2.1. Visão Geral
- **Monorepo:** [Turborepo](https://turbo.build/repo)
- **Gerenciador de Pacotes:** [npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)

### 2.2. Frontend (`admin-hub` e `frontend-publico`)
- **Framework:** [React](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [shadcn/ui](https://ui.shadcn.com/)
- **Cliente HTTP:** [Axios](https://axios-http.com/) (para chamadas à API)
- **Gerenciamento de Estado (Server):** [TanStack Query (React Query)](https://tanstack.com/query/latest)

### 2.3. Backend (`api-hub-link`)
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express](https://expressjs.com/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
- **Autenticação:** [JSON Web Tokens (JWT)](https://jwt.io/)
- **Containerização (BD):** [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

## 3. Como Configurar e Rodar o Ambiente

Siga os passos abaixo para configurar o ambiente de desenvolvimento completo.

### 3.1. Pré-requisitos
- Node.js (v18 ou superior)
- npm (v7 ou superior, para suporte a workspaces)
- Docker e Docker Compose

### 3.2. Configuração do Ambiente

1.  **Clone o Repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd passaolink.com.br
    ```

2.  **Configure as Variáveis de Ambiente:**
    - **API (`apps/api-hub-link/.env`):**
      ```env
      # Variáveis para o Docker Compose
      POSTGRES_USER=user
      POSTGRES_PASSWORD=password
      POSTGRES_DB=mydb

      # URL de conexão para o Prisma
      DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
      
      # Chave secreta para JWT
      JWT_SECRET="sua-chave-super-secreta"
      ```
    - **Admin Hub (`apps/admin-hub/.env.development`):**
      ```env
      # URL base da API para o ambiente de desenvolvimento
      VITE_API_BASE_URL=http://localhost:3000
      ```

3.  **Instale as Dependências:**
    - A partir da raiz do projeto (`compraCerta`), instale todas as dependências.
    ```bash
    npm install
    ```

### 3.3. Executando o Projeto

1.  **Inicie o Banco de Dados:**
    ```bash
    # A partir da raiz do projeto
    npm run docker:up --workspace=@passaolink.com.br/api-hub-link
    ```

2.  **Execute a Migração do Banco de Dados (se for a primeira vez):**
    ```bash
    # A partir da raiz do projeto
    npm run prisma:migrate --workspace=@passaolink.com.br/api-hub-link
    ```

3.  **Inicie todos os Serviços em Modo de Desenvolvimento:**
    ```bash
    # A partir da raiz do projeto
    npm run dev
    ```
    - A API estará em `http://localhost:3000`.
    - O Admin Hub estará em `http://localhost:8080`.
    - O Frontend Público estará em `http://localhost:8081`.

## 4. Estrutura de Diretórios

### 4.1. API (`api-hub-link`)

A API segue uma arquitetura limpa para separação de responsabilidades.

- `src/`
  - `app.ts`: Instância do Express, configuração de middlewares e registro de rotas.
  - `server.ts`: Ponto de entrada que inicia o servidor HTTP.
  - `routes/`: Define os endpoints da API (ex: `/products`). Mapeia requisições para os casos de uso.
  - `usecases/`: Contém a lógica de negócios principal. Cada caso de uso é uma classe separada.
  - `repositories/`: Abstrai o acesso aos dados, interagindo diretamente com o Prisma.
  - `services/`: Implementações de serviços auxiliares, como o `JwtService`.
  - `interfaces/`: Define os contratos (interfaces e tipos TypeScript) para todas as camadas.

### 4.2. Frontend (`admin-hub`)

- `src/`
  - `main.tsx`: Ponto de entrada da aplicação React.
  - `App.tsx`: Configuração de providers (React Query, Router) e definição das rotas principais.
  - `pages/`: Componentes que representam páginas completas (ex: `Dashboard.tsx`, `Login.tsx`).
  - `components/`: Componentes reutilizáveis (ex: `ProductTable.tsx`, `ProductForm.tsx`).
    - `ui/`: Componentes base do `shadcn/ui`.
  - `services/`: Serviços auxiliares, como o cliente `api.ts` (Axios).
  - `hooks/`: Hooks customizados (ex: `use-toast.ts`).
  - `lib/`: Funções utilitárias (ex: `utils.ts`).
