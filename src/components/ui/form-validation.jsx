import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { Input } from './input';
import { Label } from './label';
import { cn } from '../../lib/utils';

// Validation rules
export const validationRules = {
  required: (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return 'Ce champ est obligatoire';
    }
    return null;
  },
  
  email: (value) => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Veuillez entrer une adresse email valide';
    }
    return null;
  },
  
  minLength: (min) => (value) => {
    if (!value) return null;
    if (value.length < min) {
      return `Minimum ${min} caractères requis`;
    }
    return null;
  },
  
  maxLength: (max) => (value) => {
    if (!value) return null;
    if (value.length > max) {
      return `Maximum ${max} caractères autorisés`;
    }
    return null;
  },
  
  pattern: (regex, message) => (value) => {
    if (!value) return null;
    if (!regex.test(value)) {
      return message || 'Format invalide';
    }
    return null;
  },
  
  numeric: (value) => {
    if (!value) return null;
    if (isNaN(value) || isNaN(parseFloat(value))) {
      return 'Veuillez entrer un nombre valide';
    }
    return null;
  },
  
  phone: (value) => {
    if (!value) return null;
    const phoneRegex = /^(\+33|0)[1-9](\d{8})$/;
    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
      return 'Veuillez entrer un numéro de téléphone valide';
    }
    return null;
  },
  
  password: (value) => {
    if (!value) return null;
    const errors = [];
    
    if (value.length < 8) {
      errors.push('Au moins 8 caractères');
    }
    if (!/[A-Z]/.test(value)) {
      errors.push('Une majuscule');
    }
    if (!/[a-z]/.test(value)) {
      errors.push('Une minuscule');
    }
    if (!/\d/.test(value)) {
      errors.push('Un chiffre');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      errors.push('Un caractère spécial');
    }
    
    if (errors.length > 0) {
      return `Le mot de passe doit contenir: ${errors.join(', ')}`;
    }
    return null;
  },
  
  confirmPassword: (originalPassword) => (value) => {
    if (!value) return null;
    if (value !== originalPassword) {
      return 'Les mots de passe ne correspondent pas';
    }
    return null;
  },
};

// Animated form field component
export const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  rules = [],
  required = false,
  disabled = false,
  className,
  children,
  ...props
}) => {
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const validate = (val) => {
    const allRules = required ? [validationRules.required, ...rules] : rules;
    
    for (const rule of allRules) {
      const result = rule(val);
      if (result) {
        return result;
      }
    }
    return null;
  };
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(e);
    
    if (touched) {
      const validationError = validate(newValue);
      setError(validationError);
    }
  };
  
  const handleBlur = (e) => {
    setTouched(true);
    const validationError = validate(e.target.value);
    setError(validationError);
    
    if (onBlur) {
      onBlur(e);
    }
  };
  
  const isValid = touched && !error && value;
  const hasError = touched && error;
  
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label htmlFor={name} className="flex items-center space-x-1">
          <span>{label}</span>
          {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      
      <div className="relative">
        {children || (
          <Input
            id={name}
            name={name}
            type={inputType}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              'transition-all duration-200',
              hasError && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              isValid && 'border-green-500 focus:border-green-500 focus:ring-green-500',
              type === 'password' && 'pr-10'
            )}
            {...props}
          />
        )}
        
        {/* Password visibility toggle */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
        
        {/* Validation icons */}
        {(hasError || isValid) && type !== 'password' && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {hasError ? (
              <AlertCircle className="h-4 w-4 text-red-500" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
          </motion.div>
        )}
      </div>
      
      {/* Error message */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-1 text-sm text-red-600"
          >
            <AlertCircle className="h-3 w-3 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Success message */}
      <AnimatePresence>
        {isValid && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-1 text-sm text-green-600"
          >
            <CheckCircle className="h-3 w-3 flex-shrink-0" />
            <span>Valide</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Form validation hook
export const useFormValidation = (initialValues, validationSchema) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const validate = (fieldName, value) => {
    const rules = validationSchema[fieldName] || [];
    
    for (const rule of rules) {
      const result = rule(value);
      if (result) {
        return result;
      }
    }
    return null;
  };
  
  const validateAll = () => {
    const newErrors = {};
    let isValid = true;
    
    Object.keys(validationSchema).forEach(fieldName => {
      const error = validate(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    setTouched(Object.keys(validationSchema).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {}));
    
    return isValid;
  };
  
  const handleChange = (fieldName, value) => {
    setValues(prev => ({ ...prev, [fieldName]: value }));
    
    if (touched[fieldName]) {
      const error = validate(fieldName, value);
      setErrors(prev => ({ ...prev, [fieldName]: error }));
    }
  };
  
  const handleBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    const error = validate(fieldName, values[fieldName]);
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  };
  
  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };
  
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    isValid: Object.keys(errors).length === 0 && Object.keys(touched).length > 0,
  };
};

export default FormField;

