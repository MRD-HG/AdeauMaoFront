import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { Badge } from '../ui/badge';
import { 
  Search, 
  Filter, 
  X, 
  Calendar as CalendarIcon,
  SlidersHorizontal
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '../../lib/utils';

const EquipmentFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  isLoading = false 
}) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value,
      pageNumber: 1, // Reset to first page when filtering
    });
  };

  const handleDateChange = (key, date) => {
    onFiltersChange({
      ...filters,
      [key]: date ? format(date, 'yyyy-MM-dd') : '',
      pageNumber: 1,
    });
  };

  const getActiveFiltersCount = () => {
    const activeFilters = Object.entries(filters).filter(([key, value]) => {
      if (key === 'pageNumber' || key === 'pageSize') return false;
      return value && value !== '';
    });
    return activeFilters.length;
  };

  const hasActiveFilters = getActiveFiltersCount() > 0;

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher par nom, référence, type ou fabricant..."
            value={filters.searchTerm || ''}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            className="pl-10"
            disabled={isLoading}
          />
        </div>
        
        {/* Advanced filters toggle */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="relative">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filtres
              {hasActiveFilters && (
                <Badge 
                  variant="secondary" 
                  className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Filtres avancés</h4>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearFilters}
                    className="h-auto p-1 text-xs"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Effacer
                  </Button>
                )}
              </div>

              {/* Equipment type filter */}
              <div className="space-y-2">
                <Label>Type d'équipement</Label>
                <Select
                  value={filters.typeEquipement || ''}
                  onValueChange={(value) => handleFilterChange('typeEquipement', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous les types</SelectItem>
                    <SelectItem value="Compresseur">Compresseur</SelectItem>
                    <SelectItem value="Pompe">Pompe</SelectItem>
                    <SelectItem value="Moteur">Moteur</SelectItem>
                    <SelectItem value="Ventilateur">Ventilateur</SelectItem>
                    <SelectItem value="Convoyeur">Convoyeur</SelectItem>
                    <SelectItem value="Autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Manufacturer filter */}
              <div className="space-y-2">
                <Label>Fabricant</Label>
                <Select
                  value={filters.fabricant || ''}
                  onValueChange={(value) => handleFilterChange('fabricant', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les fabricants" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous les fabricants</SelectItem>
                    <SelectItem value="Atlas Copco">Atlas Copco</SelectItem>
                    <SelectItem value="Grundfos">Grundfos</SelectItem>
                    <SelectItem value="ABB">ABB</SelectItem>
                    <SelectItem value="Siemens">Siemens</SelectItem>
                    <SelectItem value="Schneider Electric">Schneider Electric</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status filter */}
              <div className="space-y-2">
                <Label>État opérationnel</Label>
                <Select
                  value={filters.etatOperationnel || ''}
                  onValueChange={(value) => handleFilterChange('etatOperationnel', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les états" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous les états</SelectItem>
                    <SelectItem value="En service">En service</SelectItem>
                    <SelectItem value="En maintenance">En maintenance</SelectItem>
                    <SelectItem value="Hors service">Hors service</SelectItem>
                    <SelectItem value="En attente">En attente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date range filters */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label>Date de début</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !filters.dateFrom && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.dateFrom ? (
                          format(new Date(filters.dateFrom), "dd/MM/yyyy")
                        ) : (
                          "Sélectionner"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={filters.dateFrom ? new Date(filters.dateFrom) : undefined}
                        onSelect={(date) => handleDateChange('dateFrom', date)}
                        locale={fr}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Date de fin</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !filters.dateTo && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.dateTo ? (
                          format(new Date(filters.dateTo), "dd/MM/yyyy")
                        ) : (
                          "Sélectionner"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={filters.dateTo ? new Date(filters.dateTo) : undefined}
                        onSelect={(date) => handleDateChange('dateTo', date)}
                        locale={fr}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Sort options */}
              <div className="space-y-2">
                <Label>Trier par</Label>
                <div className="flex space-x-2">
                  <Select
                    value={filters.sortBy || 'nom'}
                    onValueChange={(value) => handleFilterChange('sortBy', value)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nom">Nom</SelectItem>
                      <SelectItem value="reference">Référence</SelectItem>
                      <SelectItem value="typeEquipement">Type</SelectItem>
                      <SelectItem value="fabricant">Fabricant</SelectItem>
                      <SelectItem value="dateMiseEnService">Date de mise en service</SelectItem>
                      <SelectItem value="dateCreation">Date de création</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={filters.sortDescending ? 'desc' : 'asc'}
                    onValueChange={(value) => handleFilterChange('sortDescending', value === 'desc')}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asc">↑</SelectItem>
                      <SelectItem value="desc">↓</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="flex items-center space-x-2 flex-wrap">
          <span className="text-sm text-gray-500">Filtres actifs:</span>
          {Object.entries(filters).map(([key, value]) => {
            if (!value || value === '' || key === 'pageNumber' || key === 'pageSize') return null;
            
            let displayValue = value;
            if (key === 'dateFrom' || key === 'dateTo') {
              displayValue = format(new Date(value), 'dd/MM/yyyy');
            }
            
            return (
              <Badge key={key} variant="secondary" className="text-xs">
                {key === 'searchTerm' ? 'Recherche' : 
                 key === 'typeEquipement' ? 'Type' :
                 key === 'fabricant' ? 'Fabricant' :
                 key === 'etatOperationnel' ? 'État' :
                 key === 'dateFrom' ? 'Depuis' :
                 key === 'dateTo' ? 'Jusqu\'au' :
                 key}: {displayValue}
                <button
                  onClick={() => handleFilterChange(key, '')}
                  className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-6 px-2 text-xs"
          >
            Effacer tout
          </Button>
        </div>
      )}
    </div>
  );
};

export default EquipmentFilters;

