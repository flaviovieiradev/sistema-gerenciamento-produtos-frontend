// src/services/categoryService.js
import api from './api';

const categoryService = {
  // Listar todas as categorias
  getAll: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Buscar uma categoria por ID
  getById: async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  // Criar uma nova categoria
  create: async (categoryData) => {
    const response = await api.post('/categories', categoryData);
    return response.data;
  },

  // Atualizar uma categoria existente
  update: async (id, categoryData) => {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
  },

  // Excluir uma categoria
  delete: async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  }
};

export default categoryService;