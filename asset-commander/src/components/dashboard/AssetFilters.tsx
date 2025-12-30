// ============================================
// AssetFilters.tsx - Filtros de Busca
// ============================================

import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { AssetFilter, AssetType, AssetEnvironment, AssetStatus } from '@/types/Asset';

interface AssetFiltersProps {
  filter: AssetFilter;
  onFilterChange: (filter: AssetFilter) => void;
}

export function AssetFilters({ filter, onFilterChange }: AssetFiltersProps) {
  const hasActiveFilters = filter.type || filter.environment || filter.status;

  const handleTypeChange = (value: string) => {
    onFilterChange({
      ...filter,
      type: value === 'all' ? undefined : value as AssetType,
    });
  };

  const handleEnvironmentChange = (value: string) => {
    onFilterChange({
      ...filter,
      environment: value === 'all' ? undefined : value as AssetEnvironment,
    });
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({
      ...filter,
      status: value === 'all' ? undefined : value as AssetStatus,
    });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium">Filtros:</span>
      </div>

      <Select value={filter.type || 'all'} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-[140px] bg-secondary border-border font-mono text-sm">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          <SelectItem value="all" className="font-mono text-sm">Todos Tipos</SelectItem>
          <SelectItem value="SERVER" className="font-mono text-sm">Servidor</SelectItem>
          <SelectItem value="DATABASE" className="font-mono text-sm">Banco de Dados</SelectItem>
          <SelectItem value="NETWORK" className="font-mono text-sm">Rede</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filter.environment || 'all'} onValueChange={handleEnvironmentChange}>
        <SelectTrigger className="w-[140px] bg-secondary border-border font-mono text-sm">
          <SelectValue placeholder="Ambiente" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          <SelectItem value="all" className="font-mono text-sm">Todos Ambientes</SelectItem>
          <SelectItem value="PROD" className="font-mono text-sm">Produção</SelectItem>
          <SelectItem value="DEV" className="font-mono text-sm">Desenvolvimento</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filter.status || 'all'} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[140px] bg-secondary border-border font-mono text-sm">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          <SelectItem value="all" className="font-mono text-sm">Todos Status</SelectItem>
          <SelectItem value="ACTIVE" className="font-mono text-sm">Online</SelectItem>
          <SelectItem value="INACTIVE" className="font-mono text-sm">Offline</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          Limpar
        </Button>
      )}
    </div>
  );
}
