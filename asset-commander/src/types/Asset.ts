// ============================================
// Asset.ts - Tipos do Sistema de Gestão de Ativos
// ============================================

export type AssetType = 'SERVER' | 'DATABASE' | 'NETWORK';
export type AssetStatus = 'ACTIVE' | 'INACTIVE';
export type AssetEnvironment = 'DEV' | 'PROD';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  ip: string;
  status: AssetStatus;
  environment: AssetEnvironment;
  createdAt: string; // ISO date string
}

export interface AssetFilter {
  type?: AssetType;
  environment?: AssetEnvironment;
  status?: AssetStatus;
}

export interface AssetStats {
  total: number;
  online: number;
  offline: number;
  production: number;
  development: number;
  servers: number;
  databases: number;
  network: number;
}

// Request/Response types para API
export interface CreateAssetRequest {
  name: string;
  type: AssetType;
  ip: string;
  status: AssetStatus;
  environment: AssetEnvironment;
}

export interface UpdateAssetRequest extends Partial<CreateAssetRequest> {
  id: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
