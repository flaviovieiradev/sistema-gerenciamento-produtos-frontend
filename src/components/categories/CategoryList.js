// src/components/categories/CategoryList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import categoryService from '../../services/categoryService';
import Loading from '../common/Loading';
import { formatDateTime } from '../../utils/formatters';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAll();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar categorias. Por favor, tente novamente.');
      console.error('Erro ao buscar categorias:', err);
      toast.error('Erro ao carregar categorias');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, categoryName) => {
    if (window.confirm(`Tem certeza que deseja excluir a categoria "${categoryName}"?`)) {
      try {
        await categoryService.delete(id);
        toast.success('Categoria excluída com sucesso!');
        fetchCategories(); // Recarrega a lista após excluir
      } catch (err) {
        if (err.response && err.response.status === 400) {
          toast.error('Não é possível excluir essa categoria pois existem produtos associados a ela.');
        } else {
          toast.error('Erro ao excluir categoria. Por favor, tente novamente.');
        }
        console.error('Erro ao excluir categoria:', err);
      }
    }
  };

  if (loading) {
    return <Loading message="Carregando categorias..." />;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="bi bi-exclamation-triangle me-2"></i>
        {error}
        <button className="btn btn-outline-danger btn-sm ms-3" onClick={fetchCategories}>
          <i className="bi bi-arrow-clockwise me-1"></i>
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className="bi bi-tags me-2"></i>
          Lista de Categorias ({categories.length})
        </h5>
        <Link to="/categories/new" className="btn btn-light btn-sm">
          <i className="bi bi-plus-circle me-1"></i> Nova Categoria
        </Link>
      </div>
      <div className="card-body">
        {categories.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-inbox text-muted" style={{ fontSize: '3rem' }}></i>
            <h5 className="text-muted mt-3">Nenhuma categoria encontrada</h5>
            <p className="text-muted">Que tal criar a primeira categoria?</p>
            <Link to="/categories/new" className="btn btn-primary">
              <i className="bi bi-plus-circle me-1"></i>
              Criar Primeira Categoria
            </Link>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Criado em</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} data-testid={`category-${category.id}`}>
                    <td className="text-muted">#{category.id}</td>
                    <td>
                      <strong>{category.name}</strong>
                    </td>
                    <td>
                      <span className="text-muted">
                        {category.description || 'Sem descrição'}
                      </span>
                    </td>
                    <td className="text-muted small">
                      {formatDateTime(category.createdAt)}
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <Link
                          to={`/categories/${category.id}`}
                          className="btn btn-sm btn-outline-info"
                          title="Ver detalhes"
                        >
                          <i className="bi bi-eye"></i>
                        </Link>
                        <Link
                          to={`/categories/${category.id}/edit`}
                          className="btn btn-sm btn-outline-warning"
                          title="Editar"
                        >
                          <i className="bi bi-pencil"></i>
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(category.id, category.name)}
                          title="Excluir"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;