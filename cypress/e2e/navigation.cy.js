// cypress/e2e/navigation.cy.js
describe('Navegação da Aplicação', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve navegar para a página inicial', () => {
    cy.get('h1').should('contain', 'Sistema de Gerenciamento de Produtos');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('deve navegar para a página de categorias', () => {
    cy.get('nav').contains('Categorias').click();
    cy.url().should('include', '/categories');
    cy.get('h1').should('contain', 'Gerenciar Categorias');
  });

  it('deve navegar para a página de produtos', () => {
    cy.get('nav').contains('Produtos').click();
    cy.url().should('include', '/products');
    cy.get('h1').should('contain', 'Gerenciar Produtos');
  });

  it('deve navegar para nova categoria', () => {
    cy.get('nav').contains('Categorias').click();
    cy.get('a').contains('Nova Categoria').click();
    cy.url().should('include', '/categories/new');
    cy.get('h1').should('contain', 'Nova Categoria');
  });

  it('deve navegar para novo produto', () => {
    cy.get('nav').contains('Produtos').click();
    cy.get('a').contains('Novo Produto').click();
    cy.url().should('include', '/products/new');
    cy.get('h1').should('contain', 'Novo Produto');
  });

  it('deve retornar à página inicial ao clicar no logo', () => {
    cy.get('nav').contains('Produtos').click();
    cy.get('header a').first().click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('deve mostrar breadcrumbs corretos', () => {
    cy.get('nav').contains('Categorias').click();
    cy.get('.breadcrumb').should('be.visible');
    cy.get('.breadcrumb').should('contain', 'Home');
    cy.get('.breadcrumb').should('contain', 'Categorias');
  });

  it('deve mostrar página 404 para rota inexistente', () => {
    cy.visit('/rota-inexistente', { failOnStatusCode: false });
    cy.get('h1').should('contain', '404');
    cy.get('h2').should('contain', 'Página não encontrada');
  });

  it('deve ter links funcionais na página 404', () => {
    cy.visit('/rota-inexistente', { failOnStatusCode: false });
    cy.get('a').contains('Voltar ao Início').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('deve ter navbar responsiva', () => {
    cy.viewport(768, 1024); // Tablet view
    cy.get('.navbar-toggler').should('be.visible');

    cy.viewport(1200, 800); // Desktop view
    cy.get('.navbar-toggler').should('not.be.visible');
  });
});