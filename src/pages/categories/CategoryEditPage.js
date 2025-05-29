// src/pages/categories/CategoryEditPage.js
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryForm from '../../components/categories/CategoryForm';
import categoryService from '../../services/categoryService';
import Loading from '../../components/common/Loading';

const CategoryEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const data = await categoryService.getById(id);
        setCategory(data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar categoria. Por favor, tente novamente.');
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

  const handleSubmit = async (values) => {
    try {
      setSaving(true);
      const updatedCategory = await categoryService.update(id, values);
      toast.success(`Categoria "${updatedCategory.name}" atualizada com sucesso!`);
      navigate('/categories');
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Erro ao atualizar categoria. Por favor, tente novamente.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading message="Carregando categoria..." />;
  }

  if (error || !category) {
    return (
      <div className="container">
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
                Editar Categoria
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/categories">Categorias</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to={`/categories/${id}`}>{category.name}</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    Editar
                  </li>
                </ol>
              </nav>
            </div>
            <div>
              <Link to={`/categories/${id}`} className="btn btn-outline-secondary">
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
              Editando categoria: {category.name}
            </h6>
            <p className="mb-0">
              Você está editando a categoria "{category.name}".
              As alterações serão aplicadas imediatamente após salvar.
            </p>
          </div>
        </div>
      </div>

      {/* Formulário */}
      <div className="row justify-content-center">
        <div className="col-md-8">
          <CategoryForm
            initialValues={{
              name: category.name,
              description: category.description || ''
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

export default CategoryEditPage;