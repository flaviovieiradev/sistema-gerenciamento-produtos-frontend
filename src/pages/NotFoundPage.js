// src/pages/NotFoundPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container text-center py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="mb-4">
            <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: '5rem' }}></i>
          </div>
          <h1 className="display-4 mb-3">404</h1>
          <h2 className="mb-3">Página não encontrada</h2>
          <p className="lead mb-4">
            A página que você está procurando não existe ou foi movida.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/" className="btn btn-primary">
              <i className="bi bi-house me-2"></i>
              Voltar ao Início
            </Link>
            <Link to="/products" className="btn btn-outline-primary">
              <i className="bi bi-box me-2"></i>
              Ver Produtos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;