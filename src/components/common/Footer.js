// src/components/common/Footer.js
import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5 className="mb-3">
              <i className="bi bi-box-seam me-2"></i>
              Sistema de Gerenciamento de Produtos
            </h5>
            <p className="mb-0">
              Sistema completo para gerenciamento de produtos e categorias.
            </p>
          </div>
          <div className="col-md-6">
            <h6 className="mb-3">Tecnologias</h6>
            <ul className="list-unstyled">
              <li><i className="bi bi-check-circle me-2"></i>Frontend: React + Bootstrap</li>
              <li><i className="bi bi-check-circle me-2"></i>Backend: Node.js + Express</li>
              <li><i className="bi bi-check-circle me-2"></i>Banco: MySQL + Sequelize</li>
              <li><i className="bi bi-check-circle me-2"></i>Testes: Jest + Cypress</li>
            </ul>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0">&copy; {year} Sistema de Gerenciamento de Produtos. Todos os direitos reservados.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0">Desenvolvido com <i className="bi bi-heart-fill text-danger"></i> usando React e Node.js</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;