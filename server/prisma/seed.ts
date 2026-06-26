import type { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import prisma from '../src/lib/prisma'

async function main() {
  const hashed = await bcrypt.hash('admin123', 10)
  await prisma.admin.create({
    data: {
      email: 'info@medelec.com',
      password: hashed,
      name: 'Ramesh Khurdi',
    },
  })
  console.log('Admin seeded: info@medelec.com / admin123')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())