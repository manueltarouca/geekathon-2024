import prisma from '../database/prisma';

export async function createUser(email: string, hashedPassword: string) {
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
    select: {
      email: true,
      role: true,
      registeredAt: true,
      lastLogin: true,
    },
  });
}
