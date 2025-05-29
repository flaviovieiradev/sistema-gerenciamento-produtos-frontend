// src/pages/categories/CategoryCreatePage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryForm from '../../components/categories/CategoryForm';
import categoryService from '../../services/categoryService';

const CategoryCreatePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const newCategory = await categoryService.create(values);
      toast.success(`Categoria "${newCategory.name}" criada com sucesso!`);
      navigate('/categories');
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Erro ao criar categoria. Por favor, tente novamente.');
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
                <i className="bi bi-plus-circle me-2 text-primary"></i>
                Nova Categoria
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/categories">Categorias</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    Nova Categoria
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
              Dicas para criar uma boa categoria
            </h6>
            <ul className="mb-0">
              <li>Escolha um nome claro e descritivo</li>
              <li>Adicione uma descrição que explique que tipo de produtos pertencem a esta categoria</li>
              <li>Evite criar categorias muito específicas ou muito genéricas</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Formulário */}
      <div className="row justify-content-center">
        <div className="col-md-8">
          <CategoryForm
            onSubmit={handleSubmit}
            loading={loading}
            isEditing={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryCreatePage;