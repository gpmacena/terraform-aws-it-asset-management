// ============================================
// StatusBadge.tsx - Badge de Status do Ativo
// ============================================

import { cn } from '@/lib/utils';
import type { AssetStatus, AssetType, AssetEnvironment } from '@/types/Asset';

interface StatusBadgeProps {
  status: AssetStatus;
}

interface TypeBadgeProps {
  type: AssetType;
}

interface EnvironmentBadgeProps {
  environment: AssetEnvironment;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const isActive = status === 'ACTIVE';
  
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-mono font-medium',
        isActive 
          ? 'bg-primary/10 text-primary border border-primary/20' 
          : 'bg-destructive/10 text-destructive border border-destructive/20'
      )}
    >
      <span 
        className={cn(
          'w-1.5 h-1.5 rounded-full',
          isActive ? 'bg-primary pulse-dot' : 'bg-destructive'
        )} 
      />
      {isActive ? 'ONLINE' : 'OFFLINE'}
    </span>
  );
}

export function TypeBadge({ type }: TypeBadgeProps) {
  const styles = {
    SERVER: 'bg-accent/10 text-accent border-accent/20',
    DATABASE: 'bg-terminal-purple/10 text-terminal-purple border-terminal-purple/20',
    NETWORK: 'bg-warning/10 text-warning border-warning/20',
  };

  const labels = {
    SERVER: 'SERVER',
    DATABASE: 'DB',
    NETWORK: 'NET',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium border',
        styles[type]
      )}
    >
      {labels[type]}
    </span>
  );
}

export function EnvironmentBadge({ environment }: EnvironmentBadgeProps) {
  const isProd = environment === 'PROD';
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium border',
        isProd 
          ? 'bg-warning/10 text-warning border-warning/20' 
          : 'bg-secondary text-muted-foreground border-border'
      )}
    >
      {environment}
    </span>
  );
}
