// src/pages/products/ProductsPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../../components/products/ProductList';

const ProductsPage = () => {
  return (
    <div className="container">
      {/* Cabeçalho */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="mb-2">
                <i className="bi bi-box me-2 text-success"></i>
                Gerenciar Produtos
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    Produtos
                  </li>
                </ol>
              </nav>
            </div>
            <div>
              <Link to="/products/new" className="btn btn-success">
                <i className="bi bi-plus-circle me-2"></i>
                Novo Produto
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Informações úteis */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="alert alert-info">
            <h6 className="alert-heading">
              <i className="bi bi-info-circle me-2"></i>
              Sobre os Produtos
            </h6>
            <p className="mb-2">
              Gerencie todos os produtos da sua loja. Cada produto deve estar associado a uma categoria.
            </p>
            <div className="d-flex gap-3 small">
              <span><i className="bi bi-circle-fill text-success me-1"></i> <strong>Alto:</strong> Mais de 20 unidades</span>
              <span><i className="bi bi-circle-fill text-info me-1"></i> <strong>Normal:</strong> 6-20 unidades</span>
              <span><i className="bi bi-circle-fill text-warning me-1"></i> <strong>Baixo:</strong> 1-5 unidades</span>
              <span><i className="bi bi-circle-fill text-danger me-1"></i> <strong>Esgotado:</strong> 0 unidades</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className="row">
        <div className="col-12">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;