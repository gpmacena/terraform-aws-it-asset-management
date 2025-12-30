// ============================================
// Dashboard.tsx - Componente Principal do Dashboard
// ============================================

import { useState } from 'react';
import { 
  Server, 
  Activity, 
  AlertTriangle, 
  Shield, 
  Database,
  Network,
  Terminal
} from 'lucide-react';
import { StatCard } from './StatCard';
import { AssetTable } from './AssetTable';
import { AssetFilters } from './AssetFilters';
import { useAssets, useAssetStats, useDeleteAsset } from '@/hooks/useAssets';
import type { AssetFilter } from '@/types/Asset';

export function Dashboard() {
  const [filter, setFilter] = useState<AssetFilter>({});
  
  const { data: assets = [], isLoading: assetsLoading } = useAssets(filter);
  const { data: stats, isLoading: statsLoading } = useAssetStats();
  const deleteAsset = useDeleteAsset();

  const handleDelete = (id: string) => {
    deleteAsset.mutate(id);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Terminal className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground font-mono">
                IT Asset Management
              </h1>
              <p className="text-sm text-muted-foreground">
                Dashboard de Monitoramento de Infraestrutura
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Grid */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Visão Geral
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total de Ativos"
              value={stats?.total ?? 0}
              icon={Server}
              variant="info"
              subtitle="Cadastrados no sistema"
            />
            <StatCard
              title="Online"
              value={stats?.online ?? 0}
              icon={Activity}
              variant="success"
              subtitle="Ativos operacionais"
            />
            <StatCard
              title="Offline"
              value={stats?.offline ?? 0}
              icon={AlertTriangle}
              variant="danger"
              subtitle="Requerem atenção"
            />
            <StatCard
              title="Produção"
              value={stats?.production ?? 0}
              icon={Shield}
              variant="warning"
              subtitle="Ambiente crítico"
            />
          </div>
        </section>

        {/* Secondary Stats */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Por Categoria
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Servidores"
              value={stats?.servers ?? 0}
              icon={Server}
              variant="info"
            />
            <StatCard
              title="Bancos de Dados"
              value={stats?.databases ?? 0}
              icon={Database}
              variant="default"
            />
            <StatCard
              title="Dispositivos de Rede"
              value={stats?.network ?? 0}
              icon={Network}
              variant="warning"
            />
          </div>
        </section>

        {/* Asset Table */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Lista de Ativos ({assets.length})
            </h2>
            <AssetFilters filter={filter} onFilterChange={setFilter} />
          </div>
          <AssetTable 
            assets={assets} 
            isLoading={assetsLoading || statsLoading}
            onDelete={handleDelete}
          />
        </section>

        {/* Footer Info */}
        <footer className="pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="pulse-dot" />
              <span className="font-mono">Sistema operando normalmente</span>
            </div>
            <div className="font-mono text-xs">
              API: <code className="text-accent">localhost:8080/api</code> | 
              Mode: <code className="text-warning">MOCK</code>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
