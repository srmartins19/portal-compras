import { mockDashboard, mockMonthly, mockRanking, mockRfqs, mockSuppliers, mockOrders } from './mock-data';
import axios from 'axios';

const delay = (ms = 400) => new Promise(res => setTimeout(res, ms));

export const api = axios.create({ baseURL: '/' });

export const rfqsApi = {
  list: async (p?: any) => { await delay(); return { data: { data: mockRfqs, total: mockRfqs.length, page: 1, totalPages: 1 } }; },
  get: async (id: string) => { await delay(); return { data: (mockRfqs.find(r => r.id === id) || mockRfqs[0]) as any }; },
  updateStatus: async (id: string, s: string) => { await delay(); return { data: { success: true } }; },
};

export const suppliersApi = {
  list: async (p?: any) => { await delay(); return { data: { data: mockSuppliers, total: mockSuppliers.length, page: 1, totalPages: 1 } }; },
  get: async (id: string) => { await delay(); return { data: (mockSuppliers.find(s => s.id === id) || mockSuppliers[0]) as any }; },
};

export const ordersApi = {
  list: async (p?: any) => { await delay(); return { data: { data: mockOrders, total: mockOrders.length, page: 1, totalPages: 1 } }; },
  get: async (id: string) => { await delay(); return { data: (mockOrders.find(o => o.id === id) || mockOrders[0]) as any }; },
};

export const analyticsApi = {
  dashboard: async () => { await delay(); return { data: mockDashboard }; },
  monthly: async (months?: number) => { await delay(); return { data: mockMonthly }; },
  ranking: async () => { await delay(); return { data: mockRanking }; },
};

export const authApi = {
  login: async (data?: any) => { 
    await delay(); 
    return { 
      data: { 
        accessToken: 'token-falso-estatico', 
        user: { 
          id: 'u1', 
          firstName: 'Francisco', 
          lastName: 'Martins', // O CAMPO QUE ESTÁ TRAVANDO O BUILD
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
