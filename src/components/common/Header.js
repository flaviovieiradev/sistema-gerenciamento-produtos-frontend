// src/components/common/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header className="bg-dark text-white py-3">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/" className="text-white text-decoration-none">
            <h1 className="h3 mb-0">
              <i className="bi bi-box-seam me-2"></i>
              Sistema de Gerenciamento de Produtos
            </h1>
          </Link>
        </div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;