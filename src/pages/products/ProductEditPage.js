// src/pages/products/ProductEditPage.js
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductForm from '../../components/products/ProductForm';
import productService from '../../services/productService';
import Loading from '../../components/common/Loading';

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar produto. Por favor, tente novamente.');
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

  const handleSubmit = async (values) => {
    try {
      setSaving(true);
      const updatedProduct = await productService.update(id, values);
      toast.success(`Produto "${updatedProduct.name}" atualizado com sucesso!`);
      navigate('/products');
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Erro ao atualizar produto. Por favor, tente novamente.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading message="Carregando produto..." />;
  }

  if (error || !product) {
    return (
      <div className="container">
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
      </div>
    );
  }

  return (
    <div className="container">
      {/* Cabeçalho */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="mb-2">
                <i className="bi bi-pencil me-2 text-warning"></i>
                Editar Produto
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/products">Produtos</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to={`/products/${id}`}>{product.name}</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    Editar
                  </li>
                </ol>
              </nav>
            </div>
            <div>
              <Link to={`/products/${id}`} className="btn btn-outline-secondary">
                <i className="bi bi-eye me-1"></i>
                Ver Detalhes
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Informação atual */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="alert alert-info">
            <h6 className="alert-heading">
              <i className="bi bi-info-circle me-2"></i>
              Editando produto: {product.name}
            </h6>
            <div className="row">
              <div className="col-md-6">
                <p className="mb-1">
                  <strong>Categoria atual:</strong> {product.category?.name || 'Sem categoria'}
                </p>
                <p className="mb-1">
                  <strong>Preço atual:</strong> R$ {product.price}
                </p>
              </div>
              <div className="col-md-6">
                <p className="mb-1">
                  <strong>Estoque atual:</strong> {product.stock} unidades
                </p>
                <p className="mb-0">
                  As alterações serão aplicadas imediatamente após salvar.
                </p>
              </div>
            </div>
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
                {product.category && (
                  <Link to={`/categories/${product.category.id}`} className="btn btn-outline-info btn-sm">
                    <i className="bi bi-tag me-1"></i>
                    Ver Categoria: {product.category.name}
                  </Link>
                )}
                <Link to="/products" className="btn btn-outline-secondary btn-sm">
                  <i className="bi bi-list me-1"></i>
                  Ver Todos os Produtos
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
            initialValues={{
              name: product.name,
              description: product.description || '',
              price: product.price,
              stock: product.stock,
              categoryId: product.categoryId
            }}
            onSubmit={handleSubmit}
            loading={saving}
            isEditing={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductEditPage;