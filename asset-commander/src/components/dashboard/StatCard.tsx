// ============================================
// StatCard.tsx - Card de Estatística Individual
// ============================================

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  subtitle?: string;
}

const variantStyles = {
  default: 'border-border',
  success: 'border-terminal-green/30',
  warning: 'border-warning/30',
  danger: 'border-destructive/30',
  info: 'border-accent/30',
};

const iconVariantStyles = {
  default: 'text-muted-foreground',
  success: 'text-terminal-green',
  warning: 'text-warning',
  danger: 'text-destructive',
  info: 'text-accent',
};

export function StatCard({ title, value, icon: Icon, variant = 'default', subtitle }: StatCardProps) {
  return (
    <div 
      className={cn(
        'terminal-card p-4 border-l-2 animate-fade-in',
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            {title}
          </p>
          <p className="metric-value text-3xl">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
        <div className={cn('p-2 rounded-md bg-secondary/50', iconVariantStyles[variant])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
