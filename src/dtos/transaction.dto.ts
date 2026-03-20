import { z } from 'zod';
import { TransactionType } from '@prisma/client';

export const CreateTransactionSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  type: z.nativeEnum(TransactionType),
  description: z.string().min(1, 'Description is required').max(255),
  categoryId: z.string().uuid('Invalid category ID'),
  date: z.string().datetime().optional(),
});

export const UpdateTransactionSchema = CreateTransactionSchema.partial();

export const TransactionFiltersSchema = z.object({
  type: z.nativeEnum(TransactionType).optional(),
  categoryId: z.string().uuid().optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

export type CreateTransactionDto = z.infer<typeof CreateTransactionSchema>;
export type UpdateTransactionDto = z.infer<typeof UpdateTransactionSchema>;
export type TransactionFiltersDto = z.infer<typeof TransactionFiltersSchema>;