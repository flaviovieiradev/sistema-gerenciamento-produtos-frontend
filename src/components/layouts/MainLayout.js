// src/components/layouts/MainLayout.js
import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container flex-grow-1 py-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;