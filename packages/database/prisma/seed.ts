import { PrismaClient, UserRole, BillingPlan } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding BidFlow database...');

  // Demo company
  const company = await prisma.company.upsert({
    where: { slug: 'razzo-industria' },
    update: {},
    create: {
      name: 'Razzo Indústria LTDA',
      slug: 'razzo-industria',
      taxId: '12.345.678/0001-90',
      email: 'compras@razzo.com.br',
      phone: '(11) 3333-4444',
      plan: BillingPlan.PRO,
    },
  });
  console.log('✓ Company created:', company.name);

  // Admin user
  const adminPassword = await bcrypt.hash('admin123!', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@razzo.com.br' },
    update: {},
    create: {
      companyId: company.id,
      email: 'admin@razzo.com.br',
      passwordHash: adminPassword,
      firstName: 'Maria',
      lastName: 'Ribeiro',
      role: UserRole.ADMIN,
    },
  });

  // Buyer user
  const buyerPassword = await bcrypt.hash('buyer123!', 10);
  await prisma.user.upsert({
    where: { email: 'comprador@razzo.com.br' },
    update: {},
    create: {
      companyId: company.id,
      email: 'comprador@razzo.com.br',
      passwordHash: buyerPassword,
      firstName: 'Carlos',
      lastName: 'Dantas',
      role: UserRole.BUYER,
    },
  });

  // Sample suppliers
  const suppliers = [
    { name: 'TechSupply LTDA', email: 'vendas@techsupply.com.br', contactName: 'Pedro Henrique' },
    { name: 'OfficePro Express', email: 'comercial@officepro.com.br', contactName: 'Marina Souza' },
    { name: 'LogiMaster Transportes', email: 'licitacao@logimaster.com.br', contactName: 'Roberto Farias' },
  ];

  for (const s of suppliers) {
    const pw = await bcrypt.hash('supplier123!', 10);
    await prisma.supplier.upsert({
      where: { email_companyId: { email: s.email, companyId: company.id } },
      update: {},
      create: {
        companyId: company.id,
        name: s.name,
        email: s.email,
        contactName: s.contactName,
        isApproved: true,
        portalAccess: true,
        passwordHash: pw,
        categories: ['MRO', 'Equipamentos'],
      },
    });
  }

  // Sample items
  const items = [
    { code: 'IT-001', name: 'Notebook Dell i7', category: 'TI', unit: 'UN' },
    { code: 'IT-002', name: 'Mouse sem fio Logitech', category: 'TI', unit: 'UN' },
    { code: 'MRO-001', name: 'Disco de Corte 7"', category: 'MRO', unit: 'UN' },
  ];

  for (const item of items) {
    await prisma.item.create({
      data: { companyId: company.id, ...item },
    }).catch(() => {}); // ignore duplicate
  }

  console.log('✓ Seed completed successfully');
  console.log('');
  console.log('📋 Credentials:');
  console.log('  Admin:   admin@razzo.com.br / admin123!');
  console.log('  Buyer:   comprador@razzo.com.br / buyer123!');
  console.log('  Supplier portal: vendas@techsupply.com.br / supplier123!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
