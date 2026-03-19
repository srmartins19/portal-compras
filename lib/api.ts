import { mockDashboard, mockMonthly, mockRanking, mockRfqs, mockSuppliers, mockOrders } from './mock-data';
import axios from 'axios';

const delay = (ms = 400) => new Promise(res => setTimeout(res, ms));

export const api = axios.create({ baseURL: '/' });

// Exportação 1: RFQs
export const rfqsApi = {
  list: async (params?: any) => { await delay(); return { data: { data: mockRfqs, total: mockRfqs.length, page: 1, totalPages: 1 } }; },
  get: async (id: string) => { await delay(); return { data: mockRfqs.find(r => r.id === id) || mockRfqs[0] }; },
  create: async (data: any) => { await delay(); return { data: { id: 'rfq-new' } }; },
  updateStatus: async (id: string, status: string) => { await delay(); return { data: { success: true } }; },
  invite: async (id: string, supplierIds: string[]) => { await delay(); return { data: { success: true } }; },
  comparison: async (id: string) => { await delay(); return { data: [] }; },
  selectWinner: async (id: string, supplierId: string) => { await delay(); return { data: { success: true } }; },
};

// Exportação 2: Fornecedores
export const suppliersApi = {
  list: async (params?: any) => { await delay(); return { data: { data: mockSuppliers, total: mockSuppliers.length, page: 1, totalPages: 1 } }; },
  create: async (data: any) => { await delay(); return { data: { id: 'sup-new' } }; },
  get: async (id: string) => { await delay(); return { data: mockSuppliers.find(s => s.id === id) || mockSuppliers[0] }; },
  approve: async (id: string) => { await delay(); return { data: { success: true } }; },
};

// Exportação 3: Pedidos (Orders)
export const ordersApi = {
  list: async (params?: any) => { await delay(); return { data: { data: mockOrders, total: mockOrders.length, page: 1, totalPages: 1 } }; },
  generateFromRfq: async (rfqId: string) => { await delay(); return { data: { id: 'ord-new' } }; },
  updateStatus: async (id: string, status: string) => { await delay(); return { data: { success: true } }; },
};

// Exportação 4: Analytics
export const analyticsApi = {
  dashboard: async () => { await delay(); return { data: mockDashboard }; },
  priceHistory: async (itemId: string) => { await delay(); return { data: [] }; },
  ranking: async () => { await delay(); return { data: mockRanking }; },
  monthly: async (months?: number) => { await delay(); return { data: mockMonthly }; },
  getSupplierParticipation: async () => { await delay(); return { data: [] }; },
};

// Exportação 5: Auth
export const authApi = {
  login: async (data?: any) => { 
    await delay(); 
    return { 
      data: { 
        accessToken: 'token-falso', 
        user: { 
          id: 'u1', 
          firstName: 'Francisco', 
          lastName: 'Martins', 
          email: 'francisco@casasbahia.com.br', 
          role: 'BUYER', 
          companyId: 'c1',
          company: { 
            id: 'c1', 
            name: 'Casas Bahia',
            slug: 'casas-bahia',
            plan: 'ENTERPRISE'
          } 
        } 
      } 
    }; 
  },
  register: async (data?: any) => { await delay(); return { data: { success: true } }; }
};
