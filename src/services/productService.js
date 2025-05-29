// src/services/productService.js
import api from './api';

const productService = {
  // Listar todos os produtos
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },

  // Buscar um produto por ID
  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Criar um novo produto
  create: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  // Atualizar um produto existente
  update: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  // Excluir um produto
  delete: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  }
};

export default productService;