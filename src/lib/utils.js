import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO, isValid } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Date formatting utilities
export const formatDate = (date, formatString = "dd/MM/yyyy") => {
  if (!date) return "";
  
  try {
    const parsedDate = typeof date === "string" ? parseISO(date) : date;
    if (!isValid(parsedDate)) return "";
    return format(parsedDate, formatString);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

export const formatDateTime = (date) => {
  return formatDate(date, "dd/MM/yyyy HH:mm");
};

// Status utilities
export const getStatusColor = (status) => {
  const statusColors = {
    // Work Order Status
    'AFaire': 'bg-gray-100 text-gray-800',
    'EnCours': 'bg-blue-100 text-blue-800',
    'Termine': 'bg-green-100 text-green-800',
    'Valide': 'bg-emerald-100 text-emerald-800',
    
    // Request Status
    'Nouvelle': 'bg-yellow-100 text-yellow-800',
    'EnAttenteOT': 'bg-orange-100 text-orange-800',
    'Cloturee': 'bg-gray-100 text-gray-800',
    
    // Priority
    'Urgent': 'bg-red-100 text-red-800',
    'Elevee': 'bg-orange-100 text-orange-800',
    'Moyenne': 'bg-yellow-100 text-yellow-800',
    'Faible': 'bg-green-100 text-green-800',
    
    // Equipment Status
    'En service': 'bg-green-100 text-green-800',
    'En maintenance': 'bg-orange-100 text-orange-800',
    'Hors service': 'bg-red-100 text-red-800',
    'En attente': 'bg-gray-100 text-gray-800',
  };
  
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};

// Form validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Number formatting
export const formatCurrency = (amount, currency = 'MAD') => {
  if (amount === null || amount === undefined) return '';
  
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Text utilities
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Error handling utilities
export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.response?.data?.errors?.length > 0) {
    return error.response.data.errors.join(', ');
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'Une erreur inattendue s\'est produite';
};
export const getCriticiteColor = (criticite) => {
  const criticiteColors = {
    'Haute criticité': 'bg-red-100 text-red-800 border-red-200',
    'Moyenne criticité': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Faible criticité': 'bg-blue-100 text-blue-800 border-blue-200',
  };
  return criticiteColors[criticite] || 'bg-gray-100 text-gray-800 border-gray-200';
};
