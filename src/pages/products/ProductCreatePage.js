// src/pages/products/ProductCreatePage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductForm from '../../components/products/ProductForm';
import productService from '../../services/productService';

const ProductCreatePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const newProduct = await productService.create(values);
      toast.success(`Produto "${newProduct.name}" criado com sucesso!`);
      navigate('/products');
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Erro ao criar produto. Por favor, tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Cabeçalho */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="mb-2">
                <i className="bi bi-plus-circle me-2 text-success"></i>
                Novo Produto
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/products">Produtos</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    Novo Produto
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Dicas */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="alert alert-success">
            <h6 className="alert-heading">
              <i className="bi bi-lightbulb me-2"></i>
              Dicas para criar um bom produto
            </h6>
            <ul className="mb-0">
              <li><strong>Nome:</strong> Escolha um nome claro e descritivo para o produto</li>
              <li><strong>Descrição:</strong> Adicione detalhes importantes como características e especificações</li>
              <li><strong>Categoria:</strong> Selecione a categoria que melhor classifica seu produto</li>
              <li><strong>Preço:</strong> Defina um preço competitivo e realista</li>
              <li><strong>Estoque:</strong> Informe a quantidade disponível para venda</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Ações rápidas */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card bg-light">
            <div className="card-body">
              <h6 className="card-title">
                <i className="bi bi-lightning me-2"></i>
                Ações Rápidas
              </h6>
              <div className="d-flex gap-2 flex-wrap">
                <Link to="/categories" className="btn btn-outline-primary btn-sm">
                  <i className="bi bi-tags me-1"></i>
                  Ver Categorias
                </Link>
                <Link to="/categories/new" className="btn btn-outline-primary btn-sm">
                  <i className="bi bi-plus-circle me-1"></i>
                  Nova Categoria
                </Link>
                <Link to="/products" className="btn btn-outline-secondary btn-sm">
                  <i className="bi bi-list me-1"></i>
                  Ver Produtos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulário */}
      <div className="row justify-content-center">
        <div className="col-md-10">
          <ProductForm
            onSubmit={handleSubmit}
            loading={loading}
            isEditing={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreatePage;