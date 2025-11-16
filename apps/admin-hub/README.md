# Admin Hub

Painel de administração para o passaolink.com.br.

## Tecnologias

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Axios
- React Query

## Configuração

Antes de iniciar, você precisa configurar a variável de ambiente para a URL da API.

1.  Crie um arquivo chamado `.env.development` na raiz deste diretório (`apps/admin-hub`).
2.  Adicione o seguinte conteúdo ao arquivo:

    ```env
    VITE_API_BASE_URL=http://localhost:3000
    ```

## Como rodar localmente

Certifique-se de que a [API (`api-hub-link`)](../api-hub-link/README.md) esteja rodando.

```sh
# 1. A partir da raiz do monorepo (ex: /passaolink.com.br)
# 2. Instale as dependências
npm install

# 3. Inicie todos os serviços (incluindo este)
npm run dev
```

O Admin Hub estará disponível em `http://localhost:8080`.