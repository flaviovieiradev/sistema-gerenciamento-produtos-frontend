// src/pages/categories/CategoriesPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import CategoryList from '../../components/categories/CategoryList';

const CategoriesPage = () => {
  return (
    <div className="container">
      {/* Cabeçalho */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="mb-2">
                <i className="bi bi-tags me-2 text-primary"></i>
                Gerenciar Categorias
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    Categorias
                  </li>
                </ol>
              </nav>
            </div>
            <div>
              <Link to="/categories/new" className="btn btn-primary">
                <i className="bi bi-plus-circle me-2"></i>
                Nova Categoria
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
              Sobre as Categorias
            </h6>
            <p className="mb-0">
              As categorias ajudam a organizar seus produtos de forma eficiente.
              Cada produto deve estar associado a uma categoria.
            </p>
          </div>
        </div>
      </div>

      {/* Lista de Categorias */}
      <div className="row">
        <div className="col-12">
          <CategoryList />
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;