// src/components/categories/CategoryDetail.js
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import categoryService from '../../services/categoryService';
import Loading from '../common/Loading';
import { formatDateTime, formatCurrency } from '../../utils/formatters';

const CategoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const data = await categoryService.getById(id);
        setCategory(data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar os detalhes da categoria. Por favor, tente novamente.');
        console.error('Erro ao buscar categoria:', err);
        toast.error('Erro ao carregar categoria');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCategory();
    }
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm(`Tem certeza que deseja excluir a categoria "${category.name}"?\n\nEsta ação não pode ser desfeita.`)) {
      try {
        setDeleting(true);
        await categoryService.delete(id);
        toast.success('Categoria excluída com sucesso!');
        navigate('/categories');
      } catch (err) {
        if (err.response && err.response.status === 400) {
          toast.error('Não é possível excluir essa categoria pois existem produtos associados a ela.');
        } else {
          toast.error('Erro ao excluir categoria. Por favor, tente novamente.');
        }
        console.error('Erro ao excluir categoria:', err);
      } finally {
        setDeleting(false);
      }
    }
  };

  if (loading) {
    return <Loading message="Carregando detalhes da categoria..." />;
  }

  if (error || !category) {
    return (
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Erro ao carregar categoria
            </h4>
            <p>{error || 'Categoria não encontrada'}</p>
            <hr />
            <div className="d-flex gap-2">
              <Link to="/categories" className="btn btn-outline-danger">
                <i className="bi bi-arrow-left me-1"></i>
                Voltar para Categorias
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

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        {/* Cabeçalho */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">
              <i className="bi bi-tag me-2 text-primary"></i>
              {category.name}
            </h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/categories">Categorias</Link>
                </li>
                <li className="breadcrumb-item active">
                  {category.name}
                </li>
              </ol>
            </nav>
          </div>
          <div className="d-flex gap-2">
            <Link to="/categories" className="btn btn-outline-secondary">
              <i className="bi bi-arrow-left me-1"></i>
              Voltar
            </Link>
          </div>
        </div>

        {/* Detalhes da Categoria */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">
              <i className="bi bi-info-circle me-2"></i>
              Informações da Categoria
            </h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label text-muted small">ID</label>
                <div className="fw-bold">#{category.id}</div>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label text-muted small">Nome</label>
                <div className="fw-bold">{category.name}</div>
              </div>
              <div className="col-12 mb-3">
                <label className="form-label text-muted small">Descrição</label>
                <div className={category.description ? '' : 'text-muted fst-italic'}>
                  {category.description || 'Nenhuma descrição fornecida'}
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label text-muted small">Criado em</label>
                <div>{formatDateTime(category.createdAt)}</div>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label text-muted small">Última atualização</label>
                <div>{formatDateTime(category.updatedAt)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Produtos da Categoria */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-success text-white">
            <h5 className="mb-0">
              <i className="bi bi-box me-2"></i>
              Produtos nesta Categoria
              {category.products && (
                <span className="badge bg-light text-dark ms-2">
                  {category.products.length}
                </span>
              )}
            </h5>
          </div>
          <div className="card-body">
            {category.products && category.products.length > 0 ? (
              <div className="row">
                {category.products.map((product) => (
                  <div key={product.id} className="col-md-6 mb-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <h6 className="card-title">{product.name}</h6>
                        <p className="card-text text-muted small">
                          {product.description || 'Sem descrição'}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong className="text-success">
                              {formatCurrency(product.price)}
                            </strong>
                            <div className="small text-muted">
                              Estoque: {product.stock} un.
                            </div>
                          </div>
                          <Link
                            to={`/products/${product.id}`}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <i className="bi bi-eye me-1"></i>
                            Ver
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <i className="bi bi-inbox text-muted" style={{ fontSize: '3rem' }}></i>
                <h6 className="text-muted mt-3">Nenhum produto nesta categoria</h6>
                <p className="text-muted">Que tal adicionar o primeiro produto?</p>
                <Link to="/products/new" className="btn btn-success">
                  <i className="bi bi-plus-circle me-1"></i>
                  Adicionar Produto
                </Link>
              </div>
            )}
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
                to={`/categories/${id}/edit`}
                className="btn btn-warning"
              >
                <i className="bi bi-pencil me-1"></i>
                Editar Categoria
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
                    Excluir Categoria
                  </>
                )}
              </button>
              <Link to="/products/new" className="btn btn-success">
                <i className="bi bi-plus-circle me-1"></i>
                Adicionar Produto nesta Categoria
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;