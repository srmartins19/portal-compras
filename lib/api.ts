import { mockDashboard, mockMonthly, mockRanking, mockRfqs, mockSuppliers, mockOrders } from './mock-data';
import axios from 'axios';

const delay = (ms = 400) => new Promise(res => setTimeout(res, ms));

export const api = axios.create({ baseURL: '/' });

export const rfqsApi = {
  list: async (p?: any) => { await delay(); return { data: { data: mockRfqs, total: 1, page: 1, totalPages: 1 } }; },
  get: async (id: string) => { await delay(); return { data: (mockRfqs[0] as any) }; },
  create: async (data: any) => { await delay(); return { data: { id: 'rfq-new' } }; },
  updateStatus: async (id: string, s: string) => { await delay(); return { data: { success: true } }; },
  // ADICIONADO PARA RESOLVER O ERRO ATUAL:
  invite: async (id: string, supplierIds: string[]) => { await delay(); return { data: { success: true } }; },
  comparison: async (id: string) => { await delay(); return { data: [] }; },
  selectWinner: async (id: string, sId: string) => { await delay(); return { data: { success: true } }; },
};

export const suppliersApi = {
  list: async (p?: any) => { await delay(); return { data: { data: mockSuppliers, total: 1, page: 1, totalPages: 1 } }; },
  get: async (id: string) => { await delay(); return { data: (mockSuppliers[0] as any) }; },
  create: async (data: any) => { await delay(); return { data: { id: 'sup-new' } }; },
  approve: async (id: string) => { await delay(); return { data: { success: true } }; },
};

export const ordersApi = {
  list: async (p?: any) => { await delay(); return { data: { data: mockOrders, total: 1, page: 1, totalPages: 1 } }; },
  get: async (id: string) => { await delay(); return { data: (mockOrders[0] as any) }; },
  generateFromRfq: async (id: string) => { await delay(); return { data: { id: 'ord-new' } }; },
  updateStatus: async (id: string, s: string) => { await delay(); return { data: { success: true } }; },
};

export const analyticsApi = {
  dashboard: async () => { await delay(); return { data: mockDashboard }; },
  monthly: async () => { await delay(); return { data: mockMonthly }; },
  ranking: async () => { await delay(); return { data: mockRanking }; },
  priceHistory: async (id: string) => { await delay(); return { data: [] }; },
  getSupplierParticipation: async () => { await delay(); return { data: [] }; },
};

export const authApi = {
  login: async (d?: any) => { 
    await delay(); 
    return { 
      data: { 
        accessToken: 'tk', 
        user: { 
          id: 'u1', 
          firstName: 'Francisco', 
          lastName: 'Martins', 
          email: 'francisco@casasbahia.com.br', 
          role: 'BUYER', 
          companyId: 'c1',
          company: { id: 'c1', name: 'Casas Bahia', slug: 'cb', plan: 'ENT' } 
        } as any 
      } 
    }; 
  },
  register: async (d?: any) => { await delay(); return { data: { success: true } }; }
};
