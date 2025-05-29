// src/components/common/Loading.js
import React from 'react';

const Loading = ({ message = 'Carregando...' }) => {
  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="spinner-border text-primary me-3" role="status">
        <span className="visually-hidden">Carregando...</span>
      </div>
      <span className="text-muted">{message}</span>
    </div>
  );
};

export default Loading;