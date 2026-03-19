export const mockSuppliers = [
  { id: 'sup-1', name: 'TechCorp Brasil', email: 'contato@techcorp.com.br', categories: ['TI', 'Equipamentos'], isApproved: true, performance: { overallScore: 9.2 } },
  { id: 'sup-2', name: 'Distribuidora Nacional', email: 'vendas@distribuidora.com.br', categories: ['Materiais', 'Escritório'], isApproved: true, performance: { overallScore: 8.5 } },
  { id: 'sup-3', name: 'Logística Express', email: 'comercial@logexpress.com.br', categories: ['Logística'], isApproved: false, performance: { overallScore: 0 } },
];

export const mockRfqs = [
  {
    id: 'rfq-1', number: 'COT-2026-001', title: 'Notebooks para Engenharia', status: 'OPEN',
    deadline: '2026-04-10T12:00:00Z', currency: 'BRL', paymentTerms: '30 dias líquidos',
    auctionEnabled: true,
    createdBy: { firstName: 'Francisco', lastName: '' },
    suppliers: [
      { id: '1', supplierId: 'sup-1', supplier: mockSuppliers[0], invitedAt: '2026-03-01T10:00:00Z', viewedAt: '2026-03-02T10:00:00Z', respondedAt: '2026-03-03T10:00:00Z' },
      { id: '2', supplierId: 'sup-2', supplier: mockSuppliers[1], invitedAt: '2026-03-01T10:00:00Z', viewedAt: null, respondedAt: null }
    ],
    bids: [
      { id: 'bid-1', supplierId: 'sup-1', supplier: mockSuppliers[0], totalPrice: 145000, currency: 'BRL', deliveryDays: 15, paymentTerms: '30 dias', submittedAt: '2026-03-03T10:00:00Z', isWinner: false }
    ],
    items: [
      { id: 'i1', name: 'Notebook Dell Latitude 7420', quantity: 20, unit: 'UN', estimatedPrice: 7500 },
      { id: 'i2', name: 'Monitor Dell 27"', quantity: 20, unit: 'UN', estimatedPrice: 1500 }
    ]
  },
  {
    id: 'rfq-2', number: 'COT-2026-002', title: 'Mobiliário Novo Escritório', status: 'ANALYSIS',
    deadline: '2026-03-15T12:00:00Z', currency: 'BRL', paymentTerms: 'À vista',
    createdBy: { firstName: 'Francisco', lastName: '' },
    suppliers: [], bids: [], items: [
      { id: 'i3', name: 'Cadeira Ergonômica', quantity: 50, unit: 'UN', estimatedPrice: 800 }
    ]
  }
];

export const mockOrders = [
  {
    id: 'ord-1', number: 'PED-2026-042', status: 'PENDING_APPROVAL', totalAmount: 145000, currency: 'BRL',
    deliveryDate: '2026-04-20T00:00:00Z', supplier: mockSuppliers[0], rfq: mockRfqs[0],
    createdAt: '2026-03-18T10:00:00Z', createdBy: { firstName: 'Francisco', lastName: '' }
  },
  {
    id: 'ord-2', number: 'PED-2026-041', status: 'APPROVED', totalAmount: 25000, currency: 'BRL',
    deliveryDate: '2026-03-25T00:00:00Z', supplier: mockSuppliers[1],
    createdAt: '2026-03-10T10:00:00Z', createdBy: { firstName: 'Francisco', lastName: '' }
  }
];

export const mockDashboard = {
  totalSavings: 145200, totalSavingsPct: 12.5, activeSuppliers: 42, rfqsThisMonth: 12, openRfqs: 3, avgCycleTimeDays: 14.2, pendingApprovals: 1
};

export const mockMonthly = [
  { month: 'Out', totalSpend: 120000, totalSavings: 15000, rfqsCreated: 4, ordersCreated: 3 },
  { month: 'Nov', totalSpend: 180000, totalSavings: 22000, rfqsCreated: 6, ordersCreated: 5 },
  { month: 'Dez', totalSpend: 90000,  totalSavings: 10000, rfqsCreated: 2, ordersCreated: 2 },
  { month: 'Jan', totalSpend: 250000, totalSavings: 35000, rfqsCreated: 10, ordersCreated: 8 },
  { month: 'Fev', totalSpend: 210000, totalSavings: 28000, rfqsCreated: 7, ordersCreated: 6 },
  { month: 'Mar', totalSpend: 145000, totalSavings: 18000, rfqsCreated: 5, ordersCreated: 4 },
];

export const mockRanking = [
  { supplierId: 'sup-1', supplierName: 'TechCorp Brasil', ranking: 1, overallScore: 9.2, priceScore: 9.0, deliveryScore: 9.5, qualityScore: 9.0, serviceScore: 9.5, totalOrders: 12 },
  { supplierId: 'sup-2', supplierName: 'Distribuidora Nacional', ranking: 2, overallScore: 8.5, priceScore: 8.0, deliveryScore: 9.0, qualityScore: 8.5, serviceScore: 8.5, totalOrders: 34 },
];
