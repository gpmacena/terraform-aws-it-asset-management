// ============================================
// AssetTable.tsx - Tabela de Ativos
// ============================================

import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Server, Database, Network, Trash2, MoreVertical } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { StatusBadge, TypeBadge, EnvironmentBadge } from './StatusBadge';
import type { Asset } from '@/types/Asset';
import { cn } from '@/lib/utils';

interface AssetTableProps {
  assets: Asset[];
  isLoading?: boolean;
  onDelete?: (id: string) => void;
}

const typeIcons = {
  SERVER: Server,
  DATABASE: Database,
  NETWORK: Network,
};

export function AssetTable({ assets, isLoading, onDelete }: AssetTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId && onDelete) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="terminal-card p-8 text-center">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-secondary rounded w-3/4 mx-auto" />
          <div className="h-4 bg-secondary rounded w-1/2 mx-auto" />
          <div className="h-4 bg-secondary rounded w-2/3 mx-auto" />
        </div>
        <p className="text-muted-foreground mt-4 font-mono text-sm">
          Carregando ativos...
        </p>
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="terminal-card p-8 text-center">
        <Server className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground font-mono">
          Nenhum ativo encontrado
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="terminal-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-mono text-xs uppercase">
                Ativo
              </TableHead>
              <TableHead className="text-muted-foreground font-mono text-xs uppercase">
                Tipo
              </TableHead>
              <TableHead className="text-muted-foreground font-mono text-xs uppercase">
                IP
              </TableHead>
              <TableHead className="text-muted-foreground font-mono text-xs uppercase">
                Status
              </TableHead>
              <TableHead className="text-muted-foreground font-mono text-xs uppercase">
                Ambiente
              </TableHead>
              <TableHead className="text-muted-foreground font-mono text-xs uppercase">
                Criado em
              </TableHead>
              <TableHead className="text-right text-muted-foreground font-mono text-xs uppercase">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset, index) => {
              const Icon = typeIcons[asset.type];
              return (
                <TableRow 
                  key={asset.id}
                  className={cn(
                    'border-border transition-colors',
                    'animate-fade-in'
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-secondary/50">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span className="font-mono text-sm text-foreground">
                        {asset.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <TypeBadge type={asset.type} />
                  </TableCell>
                  <TableCell>
                    <code className="font-mono text-sm text-accent">
                      {asset.ip}
                    </code>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={asset.status} />
                  </TableCell>
                  <TableCell>
                    <EnvironmentBadge environment={asset.environment} />
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {format(new Date(asset.createdAt), "dd MMM yyyy", { locale: ptBR })}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive cursor-pointer"
                          onClick={() => setDeleteId(asset.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remover
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar remoção</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover este ativo? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-secondary border-border">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
