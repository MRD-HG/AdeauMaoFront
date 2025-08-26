import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary', 
  className,
  text,
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const colorClasses = {
    primary: 'border-primary',
    secondary: 'border-gray-600',
    white: 'border-white',
    blue: 'border-blue-600',
    green: 'border-green-600',
    red: 'border-red-600',
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const dotsVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const dotVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const Spinner = () => (
    <motion.div
      className={cn(
        'border-2 border-t-transparent rounded-full',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      variants={spinnerVariants}
      animate="animate"
    />
  );

  const PulseSpinner = () => (
    <motion.div
      className={cn(
        'rounded-full bg-current',
        sizeClasses[size],
        colorClasses[color].replace('border-', 'text-'),
        className
      )}
      variants={pulseVariants}
      animate="animate"
    />
  );

  const DotsSpinner = () => (
    <motion.div
      className="flex space-x-1"
      variants={dotsVariants}
      animate="animate"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn(
            'w-2 h-2 rounded-full bg-current',
            colorClasses[color].replace('border-', 'text-')
          )}
          variants={dotVariants}
        />
      ))}
    </motion.div>
  );

  const content = (
    <div className={cn(
      'flex flex-col items-center justify-center space-y-4',
      fullScreen && 'min-h-screen'
    )}>
      <Spinner />
      {text && (
        <motion.p
          className="text-sm text-gray-600 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div
        className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

// Specialized loading components
export const ButtonSpinner = ({ className }) => (
  <motion.div
    className={cn('h-4 w-4 border-2 border-white border-t-transparent rounded-full', className)}
    variants={{
      animate: {
        rotate: 360,
        transition: {
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }
      }
    }}
    animate="animate"
  />
);

export const TableSpinner = () => (
  <div className="flex justify-center py-8">
    <LoadingSpinner size="lg" text="Chargement des données..." />
  </div>
);

export const PageSpinner = ({ text = "Chargement..." }) => (
  <LoadingSpinner fullScreen text={text} />
);

export const InlineSpinner = ({ size = 'sm', className }) => (
  <LoadingSpinner size={size} className={cn('inline-block', className)} />
);

export default LoadingSpinner;

