// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import categoryService from '../services/categoryService';
import productService from '../services/productService';
import Loading from '../components/common/Loading';

const HomePage = () => {
  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [categoriesData, productsData] = await Promise.all([
          categoryService.getAll(),
          productService.getAll()
        ]);

        setStats({
          categories: categoriesData.length,
          products: productsData.length,
          loading: false
        });
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  if (stats.loading) {
    return <Loading message="Carregando estatísticas..." />;
  }

  return (
    <div className="container">
      {/* Hero Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="bg-primary text-white rounded p-5 text-center">
            <h1 className="display-4 mb-3">
              <i className="bi bi-box-seam me-3"></i>
              Sistema de Gerenciamento de Produtos
            </h1>
            <p className="lead mb-4">
              Gerencie seus produtos e categorias de forma simples e eficiente
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/products" className="btn btn-light btn-lg">
                <i className="bi bi-box me-2"></i>
                Ver Produtos
              </Link>
              <Link to="/categories" className="btn btn-outline-light btn-lg">
                <i className="bi bi-tags me-2"></i>
                Ver Categorias
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row mb-5">
        <div className="col-md-6 mb-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <div className="text-primary mb-3">
                <i className="bi bi-tags" style={{ fontSize: '3rem' }}></i>
              </div>
              <h3 className="card-title">{stats.categories}</h3>
              <p className="card-text text-muted">Categorias Cadastradas</p>
              <Link to="/categories" className="btn btn-primary">
                <i className="bi bi-eye me-1"></i>
                Visualizar
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <div className="text-success mb-3">
                <i className="bi bi-box" style={{ fontSize: '3rem' }}></i>
              </div>
              <h3 className="card-title">{stats.products}</h3>
              <p className="card-text text-muted">Produtos Cadastrados</p>
              <Link to="/products" className="btn btn-success">
                <i className="bi bi-eye me-1"></i>
                Visualizar
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 className="text-center mb-4">Ações Rápidas</h2>
          <div className="row">
            <div className="col-md-3 mb-3">
              <Link to="/categories/new" className="card text-decoration-none h-100">
                <div className="card-body text-center">
                  <i className="bi bi-plus-circle text-primary" style={{ fontSize: '2rem' }}></i>
                  <h6 className="card-title mt-2">Nova Categoria</h6>
                  <p className="card-text small text-muted">Criar uma nova categoria</p>
                </div>
              </Link>
            </div>
            <div className="col-md-3 mb-3">
              <Link to="/products/new" className="card text-decoration-none h-100">
                <div className="card-body text-center">
                  <i className="bi bi-plus-circle text-success" style={{ fontSize: '2rem' }}></i>
                  <h6 className="card-title mt-2">Novo Produto</h6>
                  <p className="card-text small text-muted">Adicionar um novo produto</p>
                </div>
              </Link>
            </div>
            <div className="col-md-3 mb-3">
              <Link to="/categories" className="card text-decoration-none h-100">
                <div className="card-body text-center">
                  <i className="bi bi-list-ul text-info" style={{ fontSize: '2rem' }}></i>
                  <h6 className="card-title mt-2">Listar Categorias</h6>
                  <p className="card-text small text-muted">Ver todas as categorias</p>
                </div>
              </Link>
            </div>
            <div className="col-md-3 mb-3">
              <Link to="/products" className="card text-decoration-none h-100">
                <div className="card-body text-center">
                  <i className="bi bi-list-ul text-warning" style={{ fontSize: '2rem' }}></i>
                  <h6 className="card-title mt-2">Listar Produtos</h6>
                  <p className="card-text small text-muted">Ver todos os produtos</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="row">
        <div className="col-12">
          <h2 className="text-center mb-4">Funcionalidades</h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="text-center">
                <i className="bi bi-shield-check text-success" style={{ fontSize: '2.5rem' }}></i>
                <h5 className="mt-3">Seguro e Confiável</h5>
                <p className="text-muted">Sistema desenvolvido com as melhores práticas de segurança</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="text-center">
                <i className="bi bi-lightning text-warning" style={{ fontSize: '2.5rem' }}></i>
                <h5 className="mt-3">Rápido e Eficiente</h5>
                <p className="text-muted">Interface otimizada para uma experiência fluida</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="text-center">
                <i className="bi bi-phone text-info" style={{ fontSize: '2.5rem' }}></i>
                <h5 className="mt-3">Responsivo</h5>
                <p className="text-muted">Funciona perfeitamente em dispositivos móveis e desktop</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;