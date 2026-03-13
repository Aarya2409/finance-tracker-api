import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.transaction.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create test user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.create({
    data: {
      id: 'temp-user-123',
      email: 'test@test.com',
      name: 'Test User',
      password: hashedPassword,
      role: 'USER',
    },
  });

  console.log('✅ Seed complete. Test user created:', user.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());