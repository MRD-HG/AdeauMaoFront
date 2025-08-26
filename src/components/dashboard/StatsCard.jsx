import React from 'react';
import { Card, CardContent } from '../ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const StatsCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon, 
  color = 'text-blue-600',
  bgColor = 'bg-blue-50',
  delay = 0 
}) => {
  const isPositiveTrend = trend === 'up';
  const changeColor = isPositiveTrend ? 'text-green-600' : 'text-red-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm h-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
              <div className="flex items-baseline space-x-2">
                <motion.p 
                  className="text-3xl font-bold text-gray-900"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: delay + 0.2 }}
                >
                  {value}
                </motion.p>
                {change && (
                  <motion.div 
                    className="flex items-center space-x-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: delay + 0.4 }}
                  >
                    {isPositiveTrend ? (
                      <TrendingUp className={cn('h-4 w-4', changeColor)} />
                    ) : (
                      <TrendingDown className={cn('h-4 w-4', changeColor)} />
                    )}
                    <span className={cn('text-sm font-medium', changeColor)}>
                      {change}
                    </span>
                  </motion.div>
                )}
              </div>
              {change && (
                <p className="text-xs text-gray-500 mt-1">par rapport au mois dernier</p>
              )}
            </div>
            
            <motion.div 
              className={cn('p-3 rounded-xl', bgColor)}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: delay + 0.1,
                type: "spring",
                stiffness: 200 
              }}
            >
              <Icon className={cn('h-6 w-6', color)} />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsCard;

