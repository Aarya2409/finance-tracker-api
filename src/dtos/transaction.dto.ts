import { z } from 'zod';
import { TransactionType } from '../types/transaction';

export const CreateTransactionSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  type: z.nativeEnum(TransactionType),
  description: z.string().min(1, 'Description is required').max(255),
  categoryId: z.string().uuid('Invalid category ID'),
  date: z.string().datetime().optional(),
});

export const UpdateTransactionSchema = CreateTransactionSchema.partial();

export type CreateTransactionDto = z.infer<typeof CreateTransactionSchema>;
export type UpdateTransactionDto = z.infer<typeof UpdateTransactionSchema>;

