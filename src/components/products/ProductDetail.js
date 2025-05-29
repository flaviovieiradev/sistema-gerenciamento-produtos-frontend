// src/components/products/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import productService from '../../services/productService';
import Loading from '../common/Loading';
import { formatDateTime, formatCurrency, formatStockStatus } from '../../utils/formatters';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar os detalhes do produto. Por favor, tente novamente.');
        console.error('Erro ao buscar produto:', err);
        toast.error('Erro ao carregar produto');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm(`Tem certeza que deseja excluir o produto "${product.name}"?\n\nEsta ação não pode ser desfeita.`)) {
      try {
        setDeleting(true);
        await productService.delete(id);
        toast.success('Produto excluído com sucesso!');
        navigate('/products');
      } catch (err) {
        toast.error('Erro ao excluir produto. Por favor, tente novamente.');
        console.error('Erro ao excluir produto:', err);
      } finally {
        setDeleting(false);
      }
    }
  };

  if (loading) {
    return <Loading message="Carregando detalhes do produto..." />;
  }

  if (error || !product) {
    return (
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Erro ao carregar produto
            </h4>
            <p>{error || 'Produto não encontrado'}</p>
            <hr />
            <div className="d-flex gap-2">
              <Link to="/products" className="btn btn-outline-danger">
                <i className="bi bi-arrow-left me-1"></i>
                Voltar para Produtos
              </Link>
              <button className="btn btn-danger" onClick={() => window.location.reload()}>
                <i className="bi bi-arrow-clockwise me-1"></i>
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stockStatus = formatStockStatus(product.stock);

  return (
    <div className="row justify-content-center">
      <div className="col-md-10">
        {/* Cabeçalho */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">
              <i className="bi bi-box me-2 text-success"></i>
              {product.name}
            </h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/products">Produtos</Link>
                </li>
                <li className="breadcrumb-item active">
                  {product.name}
                </li>
              </ol>
            </nav>
          </div>
          <div className="d-flex gap-2">
            <Link to="/products" className="btn btn-outline-secondary">
              <i className="bi bi-arrow-left me-1"></i>
              Voltar
            </Link>
          </div>
        </div>

        <div className="row">
          {/* Coluna Principal - Informações do Produto */}
          <div className="col-md-8">
            {/* Card principal do produto */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">
                  <i className="bi bi-info-circle me-2"></i>
                  Informações do Produto
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-muted small">ID</label>
                    <div className="fw-bold">#{product.id}</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-muted small">Nome</label>
                    <div className="fw-bold">{product.name}</div>
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label text-muted small">Descrição</label>
                    <div className={product.description ? '' : 'text-muted fst-italic'}>
                      {product.description || 'Nenhuma descrição fornecida'}
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-muted small">Categoria</label>
                    <div>
                      {product.category ? (
                        <Link
                          to={`/categories/${product.category.id}`}
                          className="badge bg-primary text-decoration-none fs-6"
                        >
                          <i className="bi bi-tag me-1"></i>
                          {product.category.name}
                        </Link>
                      ) : (
                        <span className="text-muted">Sem categoria</span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-muted small">Status do Estoque</label>
                    <div>
                      <span className={`badge ${stockStatus.class.includes('success') ? 'bg-success' :
                        stockStatus.class.includes('warning') ? 'bg-warning' :
                          stockStatus.class.includes('danger') ? 'bg-danger' : 'bg-info'}`}>
                        <i className="bi bi-circle-fill me-1" style={{ fontSize: '0.6rem' }}></i>
                        {stockStatus.text}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-muted small">Criado em</label>
                    <div>{formatDateTime(product.createdAt)}</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-muted small">Última atualização</label>
                    <div>{formatDateTime(product.updatedAt)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="card shadow-sm">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="bi bi-gear me-2"></i>
                  Ações
                </h5>
              </div>
              <div className="card-body">
                <div className="d-flex gap-2 flex-wrap">
                  <Link
                    to={`/products/${id}/edit`}
                    className="btn btn-warning"
                  >
                    <i className="bi bi-pencil me-1"></i>
                    Editar Produto
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={handleDelete}
                    disabled={deleting}
                  >
                    {deleting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Excluindo...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-trash me-1"></i>
                        Excluir Produto
                      </>
                    )}
                  </button>
                  <Link to="/products/new" className="btn btn-success">
                    <i className="bi bi-plus-circle me-1"></i>
                    Novo Produto
                  </Link>
                  {product.category && (
                    <Link
                      to={`/categories/${product.category.id}`}
                      className="btn btn-info"
                    >
                      <i className="bi bi-tag me-1"></i>
                      Ver Categoria
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Lateral - Preço e Estoque */}
          <div className="col-md-4">
            {/* Card de Preço */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-primary text-white">
                <h6 className="mb-0">
                  <i className="bi bi-currency-dollar me-2"></i>
                  Preço
                </h6>
              </div>
              <div className="card-body text-center">
                <div className="display-4 text-success fw-bold mb-2">
                  {formatCurrency(product.price)}
                </div>
                <p className="text-muted mb-0">Preço unitário</p>
              </div>
            </div>

            {/* Card de Estoque */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-info text-white">
                <h6 className="mb-0">
                  <i className="bi bi-boxes me-2"></i>
                  Estoque
                </h6>
              </div>
              <div className="card-body text-center">
                <div className="display-4 fw-bold mb-2" style={{
                  color: product.stock === 0 ? '#dc3545' :
                    product.stock <= 5 ? '#ffc107' : '#198754'
                }}>
                  {product.stock}
                </div>
                <p className="text-muted mb-2">unidades disponíveis</p>
                <span className={stockStatus.class}>
                  <i className="bi bi-circle-fill me-1" style={{ fontSize: '0.6rem' }}></i>
                  {stockStatus.text}
                </span>
              </div>
            </div>

            {/* Card de Valor Total */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-warning text-dark">
                <h6 className="mb-0">
                  <i className="bi bi-calculator me-2"></i>
                  Valor Total em Estoque
                </h6>
              </div>
              <div className="card-body text-center">
                <div className="h4 text-warning fw-bold mb-2">
                  {formatCurrency(product.price * product.stock)}
                </div>
                <p className="text-muted mb-0">
                  {product.stock} × {formatCurrency(product.price)}
                </p>
              </div>
            </div>

            {/* Alertas de Estoque */}
            {product.stock === 0 && (
              <div className="alert alert-danger">
                <h6 className="alert-heading">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Produto Esgotado!
                </h6>
                <p className="mb-0">Este produto está sem estoque.</p>
              </div>
            )}

            {product.stock > 0 && product.stock <= 5 && (
              <div className="alert alert-warning">
                <h6 className="alert-heading">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Estoque Baixo!
                </h6>
                <p className="mb-0">Este produto tem apenas {product.stock} unidades em estoque.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;