// src/components/categories/CategoryForm.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Esquema de validação com Yup
const CategorySchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Nome muito curto')
    .max(100, 'Nome muito longo')
    .required('Nome é obrigatório'),
  description: Yup.string()
    .max(500, 'Descrição muito longa')
});

const CategoryForm = ({ initialValues, onSubmit, isEditing = false, loading = false }) => {
  const navigate = useNavigate();

  const defaultValues = {
    name: '',
    description: '',
    ...initialValues
  };

  const handleCancel = () => {
    navigate('/categories');
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">
          <i className={`bi ${isEditing ? 'bi-pencil' : 'bi-plus-circle'} me-2`}></i>
          {isEditing ? 'Editar Categoria' : 'Nova Categoria'}
        </h5>
      </div>
      <div className="card-body">
        <Formik
          initialValues={defaultValues}
          validationSchema={CategorySchema}
          enableReinitialize={true}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, dirty, isValid, values }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nome da Categoria *
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Digite o nome da categoria"
                  data-testid="category-name-input"
                />
                <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="form-label">
                  Descrição
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="form-control"
                  rows="4"
                  placeholder="Digite uma descrição para a categoria (opcional)"
                  data-testid="category-description-input"
                />
                <ErrorMessage name="description" component="div" className="text-danger small mt-1" />
                <div className="form-text">
                  {values.description ? values.description.length : 0}/500 caracteres
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
                    className="btn btn-primary"
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
                        {isEditing ? 'Atualizar' : 'Criar'} Categoria
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Preview da categoria */}
              {values.name && (
                <div className="mt-4 p-3 bg-light rounded">
                  <h6 className="text-muted mb-2">Preview:</h6>
                  <div className="border rounded p-2 bg-white">
                    <strong>{values.name}</strong>
                    {values.description && (
                      <div className="text-muted small mt-1">{values.description}</div>
                    )}
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

export default CategoryForm;