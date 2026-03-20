import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import {
  CreateTransactionDto,
  UpdateTransactionDto,
  TransactionFiltersDto,
} from '../dtos/transaction.dto';

export const transactionService = {
  async getAll(userId: string, filters: TransactionFiltersDto) {
    const where: any = { userId };

    if (filters.type) where.type = filters.type;
    if (filters.categoryId) where.categoryId = filters.categoryId;
    if (filters.from || filters.to) {
      where.date = {};
      if (filters.from) where.date.gte = new Date(filters.from);
      if (filters.to) where.date.lte = new Date(filters.to);
    }

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        include: { category: true },
        orderBy: { date: 'desc' },
        take: filters.limit,
        skip: filters.offset,
      }),
      prisma.transaction.count({ where }),
    ]);

    return { transactions, total, limit: filters.limit, offset: filters.offset };
  },

  async getById(id: string, userId: string) {
    const transaction = await prisma.transaction.findFirst({
      where: { id, userId },
      include: { category: true },
    });
    if (!transaction) throw new AppError('Transaction not found', 404);
    return transaction;
  },

  async create(userId: string, data: CreateTransactionDto) {
    // Verify category belongs to this user
    const category = await prisma.category.findFirst({
      where: { id: data.categoryId, userId },
    });
    if (!category) throw new AppError('Category not found', 404);

    return prisma.transaction.create({
      data: {
        ...data,
        userId,
        date: data.date ? new Date(data.date) : new Date(),
      },
      include: { category: true },
    });
  },

  async update(id: string, userId: string, data: UpdateTransactionDto) {
    const transaction = await prisma.transaction.findFirst({
      where: { id, userId },
    });
    if (!transaction) throw new AppError('Transaction not found', 404);

    if (data.categoryId) {
      const category = await prisma.category.findFirst({
        where: { id: data.categoryId, userId },
      });
      if (!category) throw new AppError('Category not found', 404);
    }

    return prisma.transaction.update({
      where: { id },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
      },
      include: { category: true },
    });
  },

  async delete(id: string, userId: string) {
    const transaction = await prisma.transaction.findFirst({
      where: { id, userId },
    });
    if (!transaction) throw new AppError('Transaction not found', 404);
    await prisma.transaction.delete({ where: { id } });
  },

  async getStats(userId: string) {
    const [income, expense, count] = await Promise.all([
      prisma.transaction.aggregate({
        where: { userId, type: 'INCOME' },
        _sum: { amount: true },
        _count: true,
      }),
      prisma.transaction.aggregate({
        where: { userId, type: 'EXPENSE' },
        _sum: { amount: true },
        _count: true,
      }),
      prisma.transaction.count({ where: { userId } }),
    ]);

    const totalIncome = income._sum.amount || 0;
    const totalExpense = expense._sum.amount || 0;

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      transactionCount: count,
      incomeCount: income._count,
      expenseCount: expense._count,
    };
  },
};