// cypress/support/e2e.js
import './commands';

// Configurações globais do Cypress
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retorna false para evitar que o Cypress falhe no teste devido a exceções não capturadas
  // que são esperadas em algumas situações
  return false;
});

// Configurações antes de cada teste
beforeEach(() => {
  // Limpar localStorage e sessionStorage antes de cada teste
  cy.clearLocalStorage();
  cy.clearCookies();

  // Interceptar e mockar respostas da API se necessário
  cy.intercept('GET', '**/api/categories', { fixture: 'categories.json' }).as('getCategories');
  cy.intercept('GET', '**/api/products', { fixture: 'products.json' }).as('getProducts');
});