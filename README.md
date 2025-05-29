# Sistema de Gerenciamento de Produtos - Frontend

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-purple)
![Cypress](https://img.shields.io/badge/Cypress-12.17.2-green)
![License](https://img.shields.io/badge/License-ISC-yellow)

Interface React moderna e responsiva para o Sistema de Gerenciamento de Produtos. Este projeto foi criado com [Create React App](https://github.com/facebook/create-react-app) e oferece uma experiência completa de gerenciamento de produtos e categorias.

## 🚀 Funcionalidades

### ✨ Gerenciamento de Categorias
- **Criar** novas categorias com nome e descrição
- **Visualizar** lista completa de categorias
- **Editar** categorias existentes
- **Excluir** categorias (quando não há produtos associados)
- **Detalhes** completos com produtos relacionados

### 📦 Gerenciamento de Produtos
- **Criar** produtos com informações completas
- **Visualizar** lista de produtos com filtros visuais
- **Editar** produtos existentes
- **Excluir** produtos
- **Detalhes** com informações de estoque e categoria
- **Status visual** do estoque (Alto/Normal/Baixo/Esgotado)

### 🎨 Interface e Experiência
- **Design responsivo** com Bootstrap 5
- **Navegação intuitiva** com breadcrumbs
- **Feedback visual** com toasts de sucesso/erro
- **Formulários validados** com Formik e Yup
- **Loading states** para melhor UX
- **Homepage** com estatísticas em tempo real

## 🛠️ Tecnologias Utilizadas

### Core
- **React 18.2.0** - Biblioteca principal
- **React Router DOM 6.14.1** - Roteamento
- **Bootstrap 5.3.0** - Framework CSS
- **Bootstrap Icons** - Ícones

### Formulários e Validação
- **Formik 2.4.2** - Gerenciamento de formulários
- **Yup 1.2.0** - Validação de esquemas

### HTTP e Estado
- **Axios 1.4.0** - Cliente HTTP
- **React Toastify 9.1.3** - Notificações

### Testes
- **Cypress 12.17.2** - Testes E2E
- **Testing Library** - Testes unitários

## 📁 Estrutura do Projeto

```
frontend/
├── public/
│   ├── index.html              # HTML principal com Bootstrap CDN
│   └── ...
├── src/
│   ├── components/
│   │   ├── categories/         # Componentes de categoria
│   │   │   ├── CategoryForm.js
│   │   │   ├── CategoryList.js
│   │   │   └── CategoryDetail.js
│   │   ├── products/           # Componentes de produto
│   │   │   ├── ProductForm.js
│   │   │   ├── ProductList.js
│   │   │   └── ProductDetail.js
│   │   ├── common/             # Componentes reutilizáveis
│   │   │   ├── Header.js
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   └── Loading.js
│   │   └── layouts/
│   │       └── MainLayout.js
│   ├── pages/
│   │   ├── categories/         # Páginas de categoria
│   │   ├── products/           # Páginas de produto
│   │   ├── HomePage.js
│   │   └── NotFoundPage.js
│   ├── services/
│   │   ├── api.js              # Configuração Axios
│   │   ├── categoryService.js  # API de categorias
│   │   └── productService.js   # API de produtos
│   ├── utils/
│   │   └── formatters.js       # Utilitários de formatação
│   ├── App.js                  # Componente principal
│   └── index.js                # Entry point
├── cypress/
│   ├── e2e/                    # Testes E2E
│   ├── fixtures/               # Dados de teste
│   └── support/                # Comandos customizados
├── cypress.config.js           # Configuração Cypress
├── package.json
└── README.md
```

## 🔧 Pré-requisitos

Antes de executar o projeto, certifique-se de ter:

- **Node.js** 16.0.0 ou superior
- **npm** 8.0.0 ou superior
- **Backend** rodando na porta 3301

## ⚡ Início Rápido

### 1. Instalação
```bash
# Clone o repositório
git clone https://github.com/flaviovieiradev/sistema-gerenciamento-produtos-frontend.git
cd frontend

# Instale as dependências
npm install
```

### 2. Configuração
```bash
# Crie o arquivo .env
echo "REACT_APP_API_URL=http://localhost:3301/api" > .env
```

### 3. Execução
```bash
# Inicie o servidor de desenvolvimento
npm start
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## 📜 Scripts Disponíveis

### Desenvolvimento
```bash
npm start          # Inicia servidor de desenvolvimento
npm run dev        # Alias para npm start
npm run build      # Build de produção
npm run serve      # Serve build de produção
```

### Testes
```bash
npm test                    # Testes unitários React
npm run cypress:open        # Interface gráfica Cypress
npm run cypress:run         # Cypress em linha de comando
npm run test:e2e            # Alias para cypress:run
npm run test:e2e:open       # Alias para cypress:open
npm run test:e2e:headless   # Cypress sem interface
npm run test:all            # Todos os testes
```

### Qualidade de Código
```bash
npm run lint       # Verificar código com ESLint
npm run format     # Formatar código com Prettier
```

## 🧪 Testes

### Testes E2E com Cypress
O projeto inclui testes E2E abrangentes que verificam:

- **Navegação** entre páginas
- **CRUD de categorias** completo
- **CRUD de produtos** completo
- **Validações** de formulários
- **Responsividade** da interface

```bash
# Executar testes E2E
npm run cypress:open    # Interface gráfica
npm run cypress:run     # Linha de comando
```

### Testes Unitários
```bash
# Executar testes unitários
npm test
```

## 🔗 Integração com Backend

A aplicação consome uma API REST que deve estar rodando na porta **3301**. Configure a URL da API no arquivo `.env`:

```env
REACT_APP_API_URL=http://localhost:3301/api
```

### Endpoints utilizados:
- `GET /api/categories` - Listar categorias
- `POST /api/categories` - Criar categoria
- `GET /api/categories/:id` - Detalhes da categoria
- `PUT /api/categories/:id` - Atualizar categoria
- `DELETE /api/categories/:id` - Excluir categoria
- `GET /api/products` - Listar produtos
- `POST /api/products` - Criar produto
- `GET /api/products/:id` - Detalhes do produto
- `PUT /api/products/:id` - Atualizar produto
- `DELETE /api/products/:id` - Excluir produto

## 🎨 Design e UX

### Componentes Visuais
- **Cards responsivos** para exibição de dados
- **Tabelas** com ações inline
- **Formulários** com validação em tempo real
- **Modais** de confirmação para ações destrutivas
- **Toasts** para feedback do usuário
- **Loading states** durante requisições

### Status do Estoque
- 🟢 **Alto**: Mais de 20 unidades
- 🔵 **Normal**: 6-20 unidades  
- 🟡 **Baixo**: 1-5 unidades
- 🔴 **Esgotado**: 0 unidades

### Responsividade
- **Mobile-first** design
- **Breakpoints** Bootstrap
- **Navegação** adaptável
- **Tabelas** responsivas

## 🚀 Build e Deploy

### Build de Produção
```bash
npm run build
```

Cria a pasta `build` com os arquivos otimizados para produção.

### Deploy
O projeto pode ser implantado em qualquer serviço de hospedagem estática:

- **Netlify**
- **Vercel**
- **GitHub Pages**
- **AWS S3**
- **Firebase Hosting**

## 🔧 Configuração Avançada

### Variáveis de Ambiente
```env
REACT_APP_API_URL=http://localhost:3301/api
REACT_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=development
```

### ESLint
O projeto usa configuração padrão do Create React App com regras adicionais para qualidade de código.

### Prettier
Formatação automática de código configurada para manter consistência.

## 🐛 Solução de Problemas

### Problemas Comuns

**1. Erro de conexão com API**
```bash
# Verifique se o backend está rodando
curl http://localhost:3301/api

# Verifique a variável de ambiente
echo $REACT_APP_API_URL
```

**2. Dependências desatualizadas**
```bash
npm update
npm audit fix
```

**3. Cache do navegador**
```bash
# Limpe cache e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Logs e Debug
- Abra **DevTools** do navegador (F12)
- Verifique aba **Console** para erros JavaScript
- Verifique aba **Network** para problemas de API

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para detalhes.

## 🔗 Links Úteis

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)
- [Bootstrap Documentation](https://getbootstrap.com/)
- [Cypress Documentation](https://docs.cypress.io/)
- [Formik Documentation](https://formik.org/)

---

**Desenvolvido com ❤️ usando React e Bootstrap**
