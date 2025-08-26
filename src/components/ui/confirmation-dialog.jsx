import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './alert-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, XCircle, Info, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const ConfirmationDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  onConfirm,
  onCancel,
  variant = 'default',
  loading = false,
  destructive = false,
  icon: CustomIcon,
  children,
}) => {
  const variants = {
    default: {
      icon: Info,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      confirmClass: 'bg-blue-600 hover:bg-blue-700',
    },
    destructive: {
      icon: AlertTriangle,
      iconColor: 'text-red-600',
      iconBg: 'bg-red-100',
      confirmClass: 'bg-red-600 hover:bg-red-700',
    },
    success: {
      icon: CheckCircle,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
      confirmClass: 'bg-green-600 hover:bg-green-700',
    },
    warning: {
      icon: AlertTriangle,
      iconColor: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
      confirmClass: 'bg-yellow-600 hover:bg-yellow-700',
    },
    delete: {
      icon: Trash2,
      iconColor: 'text-red-600',
      iconBg: 'bg-red-100',
      confirmClass: 'bg-red-600 hover:bg-red-700',
    },
  };

  const currentVariant = destructive ? variants.destructive : variants[variant];
  const Icon = CustomIcon || currentVariant.icon;

  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <AlertDialogHeader>
            <div className="flex items-center space-x-3">
              <motion.div
                className={cn('p-2 rounded-full', currentVariant.iconBg)}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              >
                <Icon className={cn('h-5 w-5', currentVariant.iconColor)} />
              </motion.div>
              <div className="flex-1">
                <AlertDialogTitle className="text-left">
                  {title}
                </AlertDialogTitle>
              </div>
            </div>
          </AlertDialogHeader>

          <AlertDialogDescription className="text-left mt-4">
            {description}
          </AlertDialogDescription>

          {children && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {children}
            </motion.div>
          )}

          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel
              onClick={handleCancel}
              disabled={loading}
              className="mr-2"
            >
              {cancelText}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              disabled={loading}
              className={cn(
                'text-white',
                currentVariant.confirmClass,
                loading && 'opacity-50 cursor-not-allowed'
              )}
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center space-x-2"
                  >
                    <motion.div
                      className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Traitement...</span>
                  </motion.div>
                ) : (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {confirmText}
                  </motion.span>
                )}
              </AnimatePresence>
            </AlertDialogAction>
          </AlertDialogFooter>
        </motion.div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Specialized confirmation dialogs
export const DeleteConfirmationDialog = ({
  open,
  onOpenChange,
  onConfirm,
  itemName,
  itemType = 'élément',
  loading = false,
}) => (
  <ConfirmationDialog
    open={open}
    onOpenChange={onOpenChange}
    title="Confirmer la suppression"
    description={
      itemName
        ? `Êtes-vous sûr de vouloir supprimer "${itemName}" ? Cette action est irréversible.`
        : `Êtes-vous sûr de vouloir supprimer cet ${itemType} ? Cette action est irréversible.`
    }
    confirmText="Supprimer"
    cancelText="Annuler"
    onConfirm={onConfirm}
    variant="delete"
    loading={loading}
    destructive
  />
);

export const SaveConfirmationDialog = ({
  open,
  onOpenChange,
  onConfirm,
  hasUnsavedChanges = false,
  loading = false,
}) => (
  <ConfirmationDialog
    open={open}
    onOpenChange={onOpenChange}
    title="Sauvegarder les modifications"
    description={
      hasUnsavedChanges
        ? "Vous avez des modifications non sauvegardées. Voulez-vous les sauvegarder maintenant ?"
        : "Voulez-vous sauvegarder les modifications ?"
    }
    confirmText="Sauvegarder"
    cancelText="Annuler"
    onConfirm={onConfirm}
    variant="success"
    loading={loading}
  />
);

export const LogoutConfirmationDialog = ({
  open,
  onOpenChange,
  onConfirm,
  loading = false,
}) => (
  <ConfirmationDialog
    open={open}
    onOpenChange={onOpenChange}
    title="Confirmer la déconnexion"
    description="Êtes-vous sûr de vouloir vous déconnecter ? Toutes les données non sauvegardées seront perdues."
    confirmText="Se déconnecter"
    cancelText="Annuler"
    onConfirm={onConfirm}
    variant="warning"
    loading={loading}
  />
);

export default ConfirmationDialog;

