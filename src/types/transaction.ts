export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  description: string;
  categoryId: string;
  userId: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionFilters {
  type?: TransactionType;
  categoryId?: string;
  from?: Date;
  to?: Date;
  limit?: number;
  offset?: number;
}