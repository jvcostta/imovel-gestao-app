// API Client para comunicação com o backend FastAPI
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // ==================== PROPERTIES ====================
  async getProperties(skip = 0, limit = 100) {
    return this.request(`/api/properties?skip=${skip}&limit=${limit}`);
  }

  async getProperty(id: number) {
    return this.request(`/api/properties/${id}`);
  }

  async createProperty(data: any) {
    return this.request('/api/properties', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProperty(id: number, data: any) {
    return this.request(`/api/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProperty(id: number) {
    return this.request(`/api/properties/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== TENANTS ====================
  async getTenants(skip = 0, limit = 100) {
    return this.request(`/api/tenants?skip=${skip}&limit=${limit}`);
  }

  async getTenant(id: number) {
    return this.request(`/api/tenants/${id}`);
  }

  async createTenant(data: any) {
    return this.request('/api/tenants', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTenant(id: number, data: any) {
    return this.request(`/api/tenants/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTenant(id: number) {
    return this.request(`/api/tenants/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== CONTRACTS ====================
  async getContracts(skip = 0, limit = 100) {
    return this.request(`/api/contracts?skip=${skip}&limit=${limit}`);
  }

  async getContract(id: number) {
    return this.request(`/api/contracts/${id}`);
  }

  async createContract(data: any) {
    return this.request('/api/contracts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ==================== PAYMENTS ====================
  async getPayments(skip = 0, limit = 100) {
    return this.request(`/api/payments?skip=${skip}&limit=${limit}`);
  }

  async createPayment(data: any) {
    return this.request('/api/payments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePayment(id: number, data: any) {
    return this.request(`/api/payments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // ==================== MAINTENANCES ====================
  async getMaintenances(skip = 0, limit = 100) {
    return this.request(`/api/maintenances?skip=${skip}&limit=${limit}`);
  }

  async createMaintenance(data: any) {
    return this.request('/api/maintenances', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateMaintenance(id: number, data: any) {
    return this.request(`/api/maintenances/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // ==================== HEALTH CHECK ====================
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL}/`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Instância singleton do cliente API
export const apiClient = new ApiClient();

// Hook para usar em componentes React
export const useApi = () => {
  return apiClient;
};

export default ApiClient;