// src/components/products/ProductList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import productService from '../../services/productService';
import Loading from '../common/Loading';
import { formatCurrency, formatDateTime, formatStockStatus } from '../../utils/formatters';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar produtos. Por favor, tente novamente.');
      console.error('Erro ao buscar produtos:', err);
      toast.error('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, productName) => {
    if (window.confirm(`Tem certeza que deseja excluir o produto "${productName}"?\n\nEsta ação não pode ser desfeita.`)) {
      try {
        await productService.delete(id);
        toast.success('Produto excluído com sucesso!');
        fetchProducts(); // Recarrega a lista após excluir
      } catch (err) {
        toast.error('Erro ao excluir produto. Por favor, tente novamente.');
        console.error('Erro ao excluir produto:', err);
      }
    }
  };

  if (loading) {
    return <Loading message="Carregando produtos..." />;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="bi bi-exclamation-triangle me-2"></i>
        {error}
        <button className="btn btn-outline-danger btn-sm ms-3" onClick={fetchProducts}>
          <i className="bi bi-arrow-clockwise me-1"></i>
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className="bi bi-box me-2"></i>
          Lista de Produtos ({products.length})
        </h5>
        <Link to="/products/new" className="btn btn-light btn-sm">
          <i className="bi bi-plus-circle me-1"></i> Novo Produto
        </Link>
      </div>
      <div className="card-body">
        {products.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-inbox text-muted" style={{ fontSize: '3rem' }}></i>
            <h5 className="text-muted mt-3">Nenhum produto encontrado</h5>
            <p className="text-muted">Que tal criar o primeiro produto?</p>
            <Link to="/products/new" className="btn btn-success">
              <i className="bi bi-plus-circle me-1"></i>
              Criar Primeiro Produto
            </Link>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Produto</th>
                  <th>Categoria</th>
                  <th>Preço</th>
                  <th>Estoque</th>
                  <th>Status</th>
                  <th>Criado em</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const stockStatus = formatStockStatus(product.stock);
                  return (
                    <tr key={product.id} data-testid={`product-${product.id}`}>
                      <td className="text-muted">#{product.id}</td>
                      <td>
                        <div>
                          <strong>{product.name}</strong>
                          {product.description && (
                            <div className="text-muted small" style={{ maxWidth: '200px' }}>
                              {product.description.length > 50
                                ? `${product.description.substring(0, 50)}...`
                                : product.description
                              }
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        {product.category ? (
                          <span className="badge bg-primary">
                            {product.category.name}
                          </span>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </td>
                      <td>
                        <strong className="text-success">
                          {formatCurrency(product.price)}
                        </strong>
                      </td>
                      <td>
                        <span className="fw-bold">
                          {product.stock}
                        </span>
                        <span className="text-muted small"> un.</span>
                      </td>
                      <td>
                        <span className={stockStatus.class}>
                          <i className="bi bi-circle-fill me-1" style={{ fontSize: '0.6rem' }}></i>
                          {stockStatus.text}
                        </span>
                      </td>
                      <td className="text-muted small">
                        {formatDateTime(product.createdAt)}
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <Link
                            to={`/products/${product.id}`}
                            className="btn btn-sm btn-outline-info"
                            title="Ver detalhes"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>
                          <Link
                            to={`/products/${product.id}/edit`}
                            className="btn btn-sm btn-outline-warning"
                            title="Editar"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(product.id, product.name)}
                            title="Excluir"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Estatísticas rápidas */}
        {products.length > 0 && (
          <div className="row mt-4">
            <div className="col-md-3">
              <div className="card bg-primary text-white">
                <div className="card-body text-center">
                  <h5 className="card-title">{products.length}</h5>
                  <p className="card-text small">Total de Produtos</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-success text-white">
                <div className="card-body text-center">
                  <h5 className="card-title">
                    {formatCurrency(products.reduce((sum, p) => sum + parseFloat(p.price), 0))}
                  </h5>
                  <p className="card-text small">Valor Total</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-info text-white">
                <div className="card-body text-center">
                  <h5 className="card-title">
                    {products.reduce((sum, p) => sum + p.stock, 0)}
                  </h5>
                  <p className="card-text small">Estoque Total</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-warning text-white">
                <div className="card-body text-center">
                  <h5 className="card-title">
                    {products.filter(p => p.stock <= 5).length}
                  </h5>
                  <p className="card-text small">Estoque Baixo</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;