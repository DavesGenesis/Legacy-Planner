// API client for backend communication

import { PlanningState, CalculationResults } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'API request failed');
      }

      return data.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  /**
   * Calculate all metrics
   */
  async calculateAll(params: PlanningState): Promise<CalculationResults> {
    return this.request<CalculationResults>('/calculations/all', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  /**
   * Get constants (asset classes, inflation data, defaults)
   */
  async getConstants(): Promise<any> {
    return this.request('/constants');
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<{ message: string; timestamp: string }> {
    return this.request('/health');
  }

  /**
   * Update allocation
   */
  async updateAllocation(
    currentAllocations: Record<string, number>,
    changedAsset: string,
    newValue: number
  ): Promise<any> {
    return this.request('/calculations/allocation/update', {
      method: 'POST',
      body: JSON.stringify({ currentAllocations, changedAsset, newValue }),
    });
  }
}

export const apiClient = new ApiClient();