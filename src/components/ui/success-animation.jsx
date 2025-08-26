import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Check, X } from 'lucide-react';
import { cn } from '../../lib/utils';

// Success checkmark animation
export const SuccessCheckmark = ({ size = 'md', className }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24',
  };

  return (
    <motion.div
      className={cn('relative', sizeClasses[size], className)}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 10,
        delay: 0.1 
      }}
    >
      {/* Circle background */}
      <motion.div
        className="absolute inset-0 bg-green-100 rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Checkmark */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.svg
          className={cn('text-green-600', sizeClasses[size])}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.3,
              ease: "easeInOut" 
            }}
          />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
};

// Error X animation
export const ErrorX = ({ size = 'md', className }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24',
  };

  return (
    <motion.div
      className={cn('relative', sizeClasses[size], className)}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 10,
        delay: 0.1 
      }}
    >
      {/* Circle background */}
      <motion.div
        className="absolute inset-0 bg-red-100 rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* X mark */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.svg
          className={cn('text-red-600', sizeClasses[size])}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.3,
              ease: "easeInOut" 
            }}
          />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
};

// Success message with animation
export const SuccessMessage = ({ 
  title = "Succès!", 
  message, 
  onClose,
  autoClose = true,
  duration = 3000,
  className 
}) => {
  React.useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  return (
    <motion.div
      className={cn(
        'bg-white rounded-lg shadow-lg border border-green-200 p-6 max-w-md mx-auto',
        className
      )}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start space-x-4">
        <SuccessCheckmark size="md" />
        
        <div className="flex-1">
          <motion.h3
            className="text-lg font-semibold text-gray-900 mb-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h3>
          
          {message && (
            <motion.p
              className="text-gray-600"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {message}
            </motion.p>
          )}
        </div>
        
        {onClose && (
          <motion.button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="h-5 w-5" />
          </motion.button>
        )}
      </div>
      
      {/* Progress bar for auto-close */}
      {autoClose && (
        <motion.div
          className="mt-4 h-1 bg-green-200 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-green-500"
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: duration / 1000, ease: "linear" }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

// Error message with animation
export const ErrorMessage = ({ 
  title = "Erreur!", 
  message, 
  onClose,
  onRetry,
  className 
}) => {
  return (
    <motion.div
      className={cn(
        'bg-white rounded-lg shadow-lg border border-red-200 p-6 max-w-md mx-auto',
        className
      )}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start space-x-4">
        <ErrorX size="md" />
        
        <div className="flex-1">
          <motion.h3
            className="text-lg font-semibold text-gray-900 mb-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h3>
          
          {message && (
            <motion.p
              className="text-gray-600 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {message}
            </motion.p>
          )}
          
          {/* Action buttons */}
          <motion.div
            className="flex space-x-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {onRetry && (
              <motion.button
                onClick={onRetry}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Réessayer
              </motion.button>
            )}
            
            {onClose && (
              <motion.button
                onClick={onClose}
                className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Fermer
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Floating success notification
export const FloatingSuccess = ({ message, onClose }) => {
  return (
    <motion.div
      className="fixed top-4 right-4 z-50"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3">
        <CheckCircle className="h-5 w-5" />
        <span className="font-medium">{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="text-green-100 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default SuccessCheckmark;

