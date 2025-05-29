// src/utils/formatters.js

// Formatar valores monetários
export const formatCurrency = (value) => {
  if (value === null || value === undefined) return 'R$ 0,00';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

// Formatar números
export const formatNumber = (value, decimals = 0) => {
  if (value === null || value === undefined) return '0';

  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};

// Formatar datas
export const formatDate = (date) => {
  if (!date) return '-';

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(date));
};

// Formatar data e hora
export const formatDateTime = (date) => {
  if (!date) return '-';

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

// Truncar texto
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Capitalizar primeira letra
export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Formatar status do estoque
export const formatStockStatus = (stock) => {
  if (stock === 0) return { text: 'Esgotado', class: 'text-danger' };
  if (stock <= 5) return { text: 'Baixo', class: 'text-warning' };
  if (stock <= 20) return { text: 'Normal', class: 'text-info' };
  return { text: 'Alto', class: 'text-success' };
};