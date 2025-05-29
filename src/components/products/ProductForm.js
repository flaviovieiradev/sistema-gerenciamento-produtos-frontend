// src/components/products/ProductForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import categoryService from '../../services/categoryService';
import Loading from '../common/Loading';
import { formatCurrency } from '../../utils/formatters';

// Esquema de validação com Yup
const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Nome muito curto')
    .max(100, 'Nome muito longo')
    .required('Nome é obrigatório'),
  description: Yup.string()
    .max(500, 'Descrição muito longa'),
  price: Yup.number()
    .positive('Preço deve ser positivo')
    .required('Preço é obrigatório'),
  stock: Yup.number()
    .integer('Estoque deve ser um número inteiro')
    .min(0, 'Estoque não pode ser negativo')
    .required('Estoque é obrigatório'),
  categoryId: Yup.number()
    .required('Categoria é obrigatória')
});

const ProductForm = ({ initialValues, onSubmit, isEditing = false, loading = false }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultValues = {
    name: '',
    description: '',
    price: '',
    stock: 0,
    categoryId: '',
    ...initialValues
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const data = await categoryService.getAll();
        setCategories(data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar categorias. Por favor, tente novamente.');
        toast.error('Erro ao carregar categorias');
        console.error('Erro ao buscar categorias:', err);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCancel = () => {
    navigate('/products');
  };

  if (categoriesLoading) {
    return <Loading message="Carregando categorias..." />;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">
          <i className="bi bi-exclamation-triangle me-2"></i>
          Erro ao carregar formulário
        </h4>
        <p>{error}</p>
        <button className="btn btn-danger" onClick={() => window.location.reload()}>
          <i className="bi bi-arrow-clockwise me-1"></i>
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-success text-white">
        <h5 className="mb-0">
          <i className={`bi ${isEditing ? 'bi-pencil' : 'bi-plus-circle'} me-2`}></i>
          {isEditing ? 'Editar Produto' : 'Novo Produto'}
        </h5>
      </div>
      <div className="card-body">
        <Formik
          initialValues={defaultValues}
          validationSchema={ProductSchema}
          enableReinitialize={true}
          onSubmit={(values, { setSubmitting }) => {
            const formattedValues = {
              ...values,
              price: parseFloat(values.price),
              stock: parseInt(values.stock, 10),
              categoryId: parseInt(values.categoryId, 10)
            };
            onSubmit(formattedValues);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, dirty, isValid, values }) => (
            <Form>
              <div className="row">
                <div className="col-md-8 mb-3">
                  <label htmlFor="name" className="form-label">
                    Nome do Produto *
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Digite o nome do produto"
                    data-testid="product-name-input"
                  />
                  <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="categoryId" className="form-label">
                    Categoria *
                  </label>
                  <Field
                    as="select"
                    id="categoryId"
                    name="categoryId"
                    className="form-select"
                    data-testid="product-category-input"
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="categoryId" component="div" className="text-danger small mt-1" />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Descrição
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="form-control"
                  rows="3"
                  placeholder="Digite uma descrição para o produto (opcional)"
                  data-testid="product-description-input"
                />
                <ErrorMessage name="description" component="div" className="text-danger small mt-1" />
                <div className="form-text">
                  {values.description ? values.description.length : 0}/500 caracteres
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="price" className="form-label">
                    Preço *
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">R$</span>
                    <Field
                      type="number"
                      id="price"
                      name="price"
                      className="form-control"
                      placeholder="0,00"
                      step="0.01"
                      min="0"
                      data-testid="product-price-input"
                    />
                  </div>
                  <ErrorMessage name="price" component="div" className="text-danger small mt-1" />
                  {values.price && (
                    <div className="form-text text-success">
                      Preço formatado: {formatCurrency(values.price)}
                    </div>
                  )}
                </div>

                <div className="col-md-6 mb-4">
                  <label htmlFor="stock" className="form-label">
                    Estoque *
                  </label>
                  <div className="input-group">
                    <Field
                      type="number"
                      id="stock"
                      name="stock"
                      className="form-control"
                      placeholder="0"
                      step="1"
                      min="0"
                      data-testid="product-stock-input"
                    />
                    <span className="input-group-text">un.</span>
                  </div>
                  <ErrorMessage name="stock" component="div" className="text-danger small mt-1" />
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="text-muted small">
                  * Campos obrigatórios
                </div>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                    disabled={isSubmitting || loading}
                  >
                    <i className="bi bi-x-circle me-1"></i>
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={isSubmitting || loading || !dirty || !isValid}
                    data-testid="submit-button"
                  >
                    {(isSubmitting || loading) ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Salvando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-1"></i>
                        {isEditing ? 'Atualizar' : 'Criar'} Produto
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Preview do produto */}
              {values.name && values.price && (
                <div className="mt-4 p-3 bg-light rounded">
                  <h6 className="text-muted mb-2">Preview:</h6>
                  <div className="border rounded p-3 bg-white">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{values.name}</h6>
                        {values.description && (
                          <p className="text-muted small mb-2">{values.description}</p>
                        )}
                        {values.categoryId && (
                          <span className="badge bg-primary">
                            {categories.find(c => c.id === parseInt(values.categoryId))?.name}
                          </span>
                        )}
                      </div>
                      <div className="text-end">
                        <div className="h5 text-success mb-1">
                          {formatCurrency(values.price)}
                        </div>
                        <div className="small text-muted">
                          Estoque: {values.stock || 0} un.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProductForm;