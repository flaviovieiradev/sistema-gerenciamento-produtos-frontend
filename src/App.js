// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainLayout from './components/layouts/MainLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

// Páginas de Categoria (vamos criar depois)
import CategoriesPage from './pages/categories/CategoriesPage';
import CategoryCreatePage from './pages/categories/CategoryCreatePage';
import CategoryEditPage from './pages/categories/CategoryEditPage';
import CategoryDetailPage from './pages/categories/CategoryDetailPage';

// Páginas de Produto (vamos criar depois)
import ProductsPage from './pages/products/ProductsPage';
import ProductCreatePage from './pages/products/ProductCreatePage';
import ProductEditPage from './pages/products/ProductEditPage';
import ProductDetailPage from './pages/products/ProductDetailPage';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <MainLayout>
        <Routes>
          {/* Página inicial */}
          <Route path="/" element={<HomePage />} />

          {/* Rotas de categorias */}
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/new" element={<CategoryCreatePage />} />
          <Route path="/categories/:id" element={<CategoryDetailPage />} />
          <Route path="/categories/:id/edit" element={<CategoryEditPage />} />

          {/* Rotas de produtos */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/new" element={<ProductCreatePage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/products/:id/edit" element={<ProductEditPage />} />

          {/* Página 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;