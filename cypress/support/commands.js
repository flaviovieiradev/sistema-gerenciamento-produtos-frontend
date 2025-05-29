// cypress/support/commands.js

// Comando para criar uma categoria via API
Cypress.Commands.add('createCategory', (categoryData = {}) => {
  const defaultCategory = {
    name: 'Categoria Teste Cypress',
    description: 'Categoria criada pelo Cypress para testes'
  };

  const category = { ...defaultCategory, ...categoryData };

  return cy.request({
    method: 'POST',
    url: 'http://localhost:3301/api/categories',
    body: category
  }).then((response) => {
    expect(response.status).to.eq(201);
    return response.body;
  });
});

// Comando para criar um produto via API
Cypress.Commands.add('createProduct', (productData = {}) => {
  return cy.createCategory().then((category) => {
    const defaultProduct = {
      name: 'Produto Teste Cypress',
      description: 'Produto criado pelo Cypress para testes',
      price: 99.99,
      stock: 10,
      categoryId: category.id
    };

    const product = { ...defaultProduct, ...productData };

    return cy.request({
      method: 'POST',
      url: 'http://localhost:3301/api/products',
      body: product
    }).then((response) => {
      expect(response.status).to.eq(201);
      return { product: response.body, category };
    });
  });
});

// Comando para limpar dados de teste
Cypress.Commands.add('cleanupTestData', () => {
  // Buscar e excluir produtos de teste
  cy.request('GET', 'http://localhost:3301/api/products').then((response) => {
    const products = response.body;
    products.forEach((product) => {
      if (product.name.includes('Teste') || product.name.includes('Cypress')) {
        cy.request('DELETE', `http://localhost:3301/api/products/${product.id}`);
      }
    });
  });

  // Buscar e excluir categorias de teste
  cy.request('GET', 'http://localhost:3301/api/categories').then((response) => {
    const categories = response.body;
    categories.forEach((category) => {
      if (category.name.includes('Teste') || category.name.includes('Cypress')) {
        cy.request({
          method: 'DELETE',
          url: `http://localhost:3301/api/categories/${category.id}`,
          failOnStatusCode: false // Não falha se a categoria tiver produtos
        });
      }
    });
  });
});

// Comando para navegar para uma página
Cypress.Commands.add('navigateTo', (page) => {
  const routes = {
    home: '/',
    categories: '/categories',
    newCategory: '/categories/new',
    products: '/products',
    newProduct: '/products/new'
  };

  cy.visit(routes[page] || page);
});

// Comando para preencher formulário de categoria
Cypress.Commands.add('fillCategoryForm', (categoryData) => {
  if (categoryData.name) {
    cy.get('[data-testid="category-name-input"]').clear().type(categoryData.name);
  }
  if (categoryData.description) {
    cy.get('[data-testid="category-description-input"]').clear().type(categoryData.description);
  }
});

// Comando para preencher formulário de produto
Cypress.Commands.add('fillProductForm', (productData) => {
  if (productData.name) {
    cy.get('[data-testid="product-name-input"]').clear().type(productData.name);
  }
  if (productData.description) {
    cy.get('[data-testid="product-description-input"]').clear().type(productData.description);
  }
  if (productData.price) {
    cy.get('[data-testid="product-price-input"]').clear().type(productData.price.toString());
  }
  if (productData.stock !== undefined) {
    cy.get('[data-testid="product-stock-input"]').clear().type(productData.stock.toString());
  }
  if (productData.categoryId) {
    cy.get('[data-testid="product-category-input"]').select(productData.categoryId.toString());
  }
});

// Comando para aguardar o carregamento da página
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible');
  cy.get('[data-testid="loading"]').should('not.exist');
});

// Comando para verificar toast de sucesso
Cypress.Commands.add('verifySuccessToast', (message) => {
  cy.get('.Toastify__toast--success').should('be.visible');
  if (message) {
    cy.get('.Toastify__toast--success').should('contain', message);
  }
});

// Comando para verificar toast de erro
Cypress.Commands.add('verifyErrorToast', (message) => {
  cy.get('.Toastify__toast--error').should('be.visible');
  if (message) {
    cy.get('.Toastify__toast--error').should('contain', message);
  }
});