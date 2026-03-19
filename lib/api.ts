import { mockDashboard, mockMonthly, mockRanking, mockRfqs, mockSuppliers, mockOrders } from './mock-data';
import axios from 'axios';

const delay = (ms = 400) => new Promise(res => setTimeout(res, ms));
export const api = axios.create({ baseURL: '/' });

export const rfqsApi = {
  list: async (params?: any) => { await delay(); return { data: { data: mockRfqs, total: mockRfqs.length, page: 1, totalPages: 1 } }; },
  get: async (id: string) => { await delay(); return { data: mockRfqs.find(r => r.id === id) || mockRfqs[0] }; },
};

export const ordersApi = {
  list: async (params?: any) => { await delay(); return { data: { data: mockOrders, total: mockOrders.length, page: 1, totalPages: 1 } }; },
};

export const authApi = {
  login: async (data?: any) => { 
    await delay(); 
    return { 
      data: { 
        accessToken: 'token-falso', 
        user: { 
          id: 'u1', firstName: 'Francisco', lastName: 'Martins', email: 'francisco@casasbahia.com.br', 
          role: 'BUYER', companyId: 'c1',
          company: { id: 'c1', name: 'Casas Bahia', slug: 'casas-bahia', plan: 'ENTERPRISE' } 
        } 
      } 
    }; 
  },
  register: async (data?: any) => { await delay(); return { data: { success: true } }; }
};
