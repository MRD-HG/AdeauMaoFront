import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/ui/pagination';
import { Plus, Download, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEquipmentList } from '../../hooks/useEquipment';
import { useAuth } from '../../contexts/AuthContext';
import EquipmentTable from '../../components/equipment/EquipmentTable';
import EquipmentFilters from '../../components/equipment/EquipmentFilters';

const EquipmentListPage = () => {
  const [filters, setFilters] = useState({
    pageNumber: 1,
    pageSize: 10,
    searchTerm: '',
    typeEquipement: '',
    fabricant: '',
    etatOperationnel: '',
    dateFrom: '',
    dateTo: '',
    sortBy: 'nom',
    sortDescending: false,
  });

  const { hasAnyRole } = useAuth();
  const canCreate = hasAnyRole(['Administrator', 'Manager']);

  const { data, isLoading, error } = useEquipmentList(filters);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      pageNumber: 1,
      pageSize: 10,
      searchTerm: '',
      typeEquipement: '',
      fabricant: '',
      etatOperationnel: '',
      dateFrom: '',
      dateTo: '',
      sortBy: 'nom',
      sortDescending: false,
    });
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, pageNumber: page }));
  };

  const equipment = data?.data?.items || [];
  const totalCount = data?.data?.totalCount || 0;
  const totalPages = data?.data?.totalPages || 0;
  const currentPage = data?.data?.pageNumber || 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Équipements</h1>
          <p className="text-gray-600 mt-1">
            Gestion des équipements industriels ({totalCount} équipements)
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Importer
          </Button>
          {canCreate && (
            <Button asChild>
              <Link to="/equipment/new">
                <Plus className="mr-2 h-4 w-4" />
                Nouvel équipement
              </Link>
            </Button>
          )}
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardContent className="pt-6">
            <EquipmentFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Equipment Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Liste des équipements</CardTitle>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="text-center py-12">
                <div className="text-red-600 mb-2">
                  Erreur lors du chargement des équipements
                </div>
                <p className="text-gray-500 text-sm">
                  {error.message || 'Une erreur inattendue s\'est produite'}
                </p>
              </div>
            ) : (
              <EquipmentTable 
                equipment={equipment} 
                isLoading={isLoading}
              />
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={page === currentPage}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </motion.div>
      )}
    </div>
  );
};

export default EquipmentListPage;

