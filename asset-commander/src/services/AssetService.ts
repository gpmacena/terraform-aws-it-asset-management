// ============================================
// AssetService.ts - Serviço de Comunicação com API
// ============================================
// 
// CONFIGURAÇÃO PARA DEVOPS:
// -------------------------
// Para alternar entre mock e API real, mude apenas USE_MOCK_DATA para false
// e configure API_BASE_URL com a URL do seu backend Java Spring Boot.
//
// Variáveis de ambiente suportadas:
// - VITE_API_BASE_URL: URL base da API (ex: http://localhost:8080/api)
// - VITE_USE_MOCK_DATA: "true" ou "false"
//

import type { 
  Asset, 
  AssetFilter, 
  AssetStats, 
  CreateAssetRequest, 
  UpdateAssetRequest,
  ApiResponse 
} from '@/types/Asset';

// ============================================
// CONFIGURAÇÃO - ALTERE AQUI PARA PRODUÇÃO
// ============================================
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== 'false'; // Default: true (mock)

// ============================================
// DADOS MOCKADOS PARA DESENVOLVIMENTO
// ============================================
const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'prod-web-server-01',
    type: 'SERVER',
    ip: '10.0.1.10',
    status: 'ACTIVE',
    environment: 'PROD',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'prod-db-postgresql',
    type: 'DATABASE',
    ip: '10.0.1.20',
    status: 'ACTIVE',
    environment: 'PROD',
    createdAt: '2024-01-10T08:00:00Z'
  },
  {
    id: '3',
    name: 'dev-api-gateway',
    type: 'SERVER',
    ip: '10.0.2.10',
    status: 'ACTIVE',
    environment: 'DEV',
    createdAt: '2024-02-01T14:20:00Z'
  },
  {
    id: '4',
    name: 'prod-redis-cache',
    type: 'DATABASE',
    ip: '10.0.1.30',
    status: 'INACTIVE',
    environment: 'PROD',
    createdAt: '2024-01-20T16:45:00Z'
  },
  {
    id: '5',
    name: 'prod-load-balancer',
    type: 'NETWORK',
    ip: '10.0.1.1',
    status: 'ACTIVE',
    environment: 'PROD',
    createdAt: '2024-01-05T09:00:00Z'
  },
  {
    id: '6',
    name: 'dev-mongodb-cluster',
    type: 'DATABASE',
    ip: '10.0.2.20',
    status: 'ACTIVE',
    environment: 'DEV',
    createdAt: '2024-02-10T11:30:00Z'
  },
  {
    id: '7',
    name: 'prod-firewall-main',
    type: 'NETWORK',
    ip: '10.0.0.1',
    status: 'ACTIVE',
    environment: 'PROD',
    createdAt: '2024-01-02T07:00:00Z'
  },
  {
    id: '8',
    name: 'dev-k8s-worker-01',
    type: 'SERVER',
    ip: '10.0.2.100',
    status: 'INACTIVE',
    environment: 'DEV',
    createdAt: '2024-02-15T13:00:00Z'
  },
  {
    id: '9',
    name: 'prod-elasticsearch',
    type: 'DATABASE',
    ip: '10.0.1.40',
    status: 'ACTIVE',
    environment: 'PROD',
    createdAt: '2024-01-25T10:00:00Z'
  },
  {
    id: '10',
    name: 'prod-vpn-gateway',
    type: 'NETWORK',
    ip: '10.0.0.5',
    status: 'ACTIVE',
    environment: 'PROD',
    createdAt: '2024-01-08T15:30:00Z'
  }
];

// ============================================
// FUNÇÕES AUXILIARES
// ============================================
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  console.log(`[AssetService] ${options.method || 'GET'} ${url}`);
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`[AssetService] Response:`, data);
    
    return { data, success: true };
  } catch (error) {
    console.error(`[AssetService] Error:`, error);
    throw error;
  }
}

function simulateDelay(ms: number = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// API SERVICE METHODS
// ============================================
export const AssetService = {
  /**
   * Busca todos os ativos com filtros opcionais
   */
  async getAll(filter?: AssetFilter): Promise<Asset[]> {
    console.log('[AssetService] getAll called with filter:', filter);

    if (USE_MOCK_DATA) {
      await simulateDelay();
      let result = [...mockAssets];
      
      if (filter?.type) {
        result = result.filter(a => a.type === filter.type);
      }
      if (filter?.environment) {
        result = result.filter(a => a.environment === filter.environment);
      }
      if (filter?.status) {
        result = result.filter(a => a.status === filter.status);
      }
      
      console.log('[AssetService] Mock response:', result.length, 'assets');
      return result;
    }

    // API Real - ajuste o endpoint conforme seu backend
    const params = new URLSearchParams();
    if (filter?.type) params.append('type', filter.type);
    if (filter?.environment) params.append('environment', filter.environment);
    if (filter?.status) params.append('status', filter.status);
    
    const queryString = params.toString();
    const endpoint = `/assets${queryString ? `?${queryString}` : ''}`;
    
    const response = await apiRequest<Asset[]>(endpoint);
    return response.data;
  },

  /**
   * Busca um ativo pelo ID
   */
  async getById(id: string): Promise<Asset | null> {
    console.log('[AssetService] getById called with id:', id);

    if (USE_MOCK_DATA) {
      await simulateDelay();
      return mockAssets.find(a => a.id === id) || null;
    }

    const response = await apiRequest<Asset>(`/assets/${id}`);
    return response.data;
  },

  /**
   * Cria um novo ativo
   */
  async create(asset: CreateAssetRequest): Promise<Asset> {
    console.log('[AssetService] create called with:', asset);

    if (USE_MOCK_DATA) {
      await simulateDelay();
      const newAsset: Asset = {
        ...asset,
        id: String(mockAssets.length + 1),
        createdAt: new Date().toISOString(),
      };
      mockAssets.push(newAsset);
      console.log('[AssetService] Created mock asset:', newAsset);
      return newAsset;
    }

    const response = await apiRequest<Asset>('/assets', {
      method: 'POST',
      body: JSON.stringify(asset),
    });
    return response.data;
  },

  /**
   * Atualiza um ativo existente
   */
  async update(asset: UpdateAssetRequest): Promise<Asset> {
    console.log('[AssetService] update called with:', asset);

    if (USE_MOCK_DATA) {
      await simulateDelay();
      const index = mockAssets.findIndex(a => a.id === asset.id);
      if (index === -1) throw new Error('Asset not found');
      
      mockAssets[index] = { ...mockAssets[index], ...asset };
      console.log('[AssetService] Updated mock asset:', mockAssets[index]);
      return mockAssets[index];
    }

    const response = await apiRequest<Asset>(`/assets/${asset.id}`, {
      method: 'PUT',
      body: JSON.stringify(asset),
    });
    return response.data;
  },

  /**
   * Remove um ativo
   */
  async delete(id: string): Promise<void> {
    console.log('[AssetService] delete called with id:', id);

    if (USE_MOCK_DATA) {
      await simulateDelay();
      const index = mockAssets.findIndex(a => a.id === id);
      if (index !== -1) {
        mockAssets.splice(index, 1);
        console.log('[AssetService] Deleted mock asset with id:', id);
      }
      return;
    }

    await apiRequest(`/assets/${id}`, { method: 'DELETE' });
  },

  /**
   * Calcula estatísticas dos ativos
   */
  async getStats(): Promise<AssetStats> {
    console.log('[AssetService] getStats called');

    const assets = await this.getAll();
    
    const stats: AssetStats = {
      total: assets.length,
      online: assets.filter(a => a.status === 'ACTIVE').length,
      offline: assets.filter(a => a.status === 'INACTIVE').length,
      production: assets.filter(a => a.environment === 'PROD').length,
      development: assets.filter(a => a.environment === 'DEV').length,
      servers: assets.filter(a => a.type === 'SERVER').length,
      databases: assets.filter(a => a.type === 'DATABASE').length,
      network: assets.filter(a => a.type === 'NETWORK').length,
    };

    console.log('[AssetService] Stats:', stats);
    return stats;
  },
};

export default AssetService;
