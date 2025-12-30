// ============================================
// useAssets.ts - Hook para Gerenciamento de Ativos
// ============================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AssetService } from '@/services/AssetService';
import type { Asset, AssetFilter, CreateAssetRequest, UpdateAssetRequest } from '@/types/Asset';
import { useToast } from '@/hooks/use-toast';

const QUERY_KEY = 'assets';
const STATS_KEY = 'asset-stats';

export function useAssets(filter?: AssetFilter) {
  return useQuery({
    queryKey: [QUERY_KEY, filter],
    queryFn: () => AssetService.getAll(filter),
    staleTime: 30000, // 30 seconds
  });
}

export function useAssetStats() {
  return useQuery({
    queryKey: [STATS_KEY],
    queryFn: () => AssetService.getStats(),
    staleTime: 30000,
  });
}

export function useAssetById(id: string) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => AssetService.getById(id),
    enabled: !!id,
  });
}

export function useCreateAsset() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (asset: CreateAssetRequest) => AssetService.create(asset),
    onSuccess: (newAsset) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [STATS_KEY] });
      toast({
        title: 'Ativo criado',
        description: `${newAsset.name} foi adicionado com sucesso.`,
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao criar ativo',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateAsset() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (asset: UpdateAssetRequest) => AssetService.update(asset),
    onSuccess: (updatedAsset) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [STATS_KEY] });
      toast({
        title: 'Ativo atualizado',
        description: `${updatedAsset.name} foi atualizado com sucesso.`,
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao atualizar ativo',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteAsset() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => AssetService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [STATS_KEY] });
      toast({
        title: 'Ativo removido',
        description: 'O ativo foi removido com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao remover ativo',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}
