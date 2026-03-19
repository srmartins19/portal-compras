import { mockDashboard, mockMonthly, mockRanking, mockRfqs, mockSuppliers, mockOrders } from './mock-data';

// Simulador de carregamento (deixa a tela carregar por meio segundo para parecer real)
const delay = (ms = 400) => new Promise(res => setTimeout(res, ms));

export const rfqsApi = {
  list: async () => { await delay(); return { data: { data: mockRfqs, total: mockRfqs.length, page: 1, totalPages: 1 } }; },
  get: async (id: string) => { await delay(); return { data: mockRfqs.find(r => r.id === id) || mockRfqs[0] }; },
  create: async (data: any) => { await delay(); return { data: { id: 'rfq-new' } }; },
  updateStatus: async () => { await delay(); return { data: { success: true } }; },
  invite: async () => { await delay(); return { data: { success: true } }; },
  comparison: async (id: string) => { await delay(); return { data: [] }; },
  selectWinner: async () => { await delay(); return { data: { success: true } }; },
};

export const suppliersApi = {
  list: async () => { await delay(); return { data: { data: mockSuppliers, total: mockSuppliers.length, page: 1, totalPages: 1 } }; },
  create: async (data: any) => { await delay(); return { data: { id: 'sup-new' } }; },
  approve: async () => { await delay(); return { data: { success: true } }; },
};

export const ordersApi = {
  list: async () => { await delay(); return { data: { data: mockOrders, total: mockOrders.length, page: 1, totalPages: 1 } }; },
  generateFromRfq: async () => { await delay(); return { data: { id: 'ord-new' } }; },
  updateStatus: async () => { await delay(); return { data: { success: true } }; },
};

export const analyticsApi = {
  dashboard: async () => { await delay(); return { data: mockDashboard }; },
  priceHistory: async () => { await delay(); return { data: [] }; },
  ranking: async () => { await delay(); return { data: mockRanking }; },
  monthly: async () => { await delay(); return { data: mockMonthly }; },
  getSupplierParticipation: async () => { await delay(); return { data: [] }; },
};

export const authApi = {
  // Login falso: Aceita qualquer email/senha e te loga no sistema
  login: async () => { 
    await delay(); 
    return { 
      data: { 
        accessToken: 'token-falso-para-demo', 
        user: { id: 'u1', firstName: 'Francisco', lastName: 'Martins', email: 'francisco@empresa.com.br', role: 'ADMIN', company: { name: 'Casas Bahia' } } 
      } 
    }; 
  },
  register: async () => { await delay(); return { data: { success: true } }; },
};

import axios from 'axios';
export const api = axios.create({ baseURL: '/' });
