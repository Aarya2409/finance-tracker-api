import { Request, Response, NextFunction } from 'express';
import { transactionService } from '../services/transaction.service';
import {
  CreateTransactionSchema,
  UpdateTransactionSchema,
  TransactionFiltersSchema,
} from '../dtos/transaction.dto';
import { AuthError } from '../middleware/errorHandler';

export const transactionController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new AuthError();
      const filters = TransactionFiltersSchema.parse(req.query);
      const result = await transactionService.getAll(req.user.id, filters);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new AuthError();
      const transaction = await transactionService.getById(
      req.params.id as string,
        req.user.id
      );
      res.status(200).json({ data: transaction });
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new AuthError();
      const data = CreateTransactionSchema.parse(req.body);
      const transaction = await transactionService.create(req.user.id, data);
      res.status(201).json({ data: transaction });
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new AuthError();
      const data = UpdateTransactionSchema.parse(req.body);
      const transaction = await transactionService.update(
          req.params.id as string,
        req.user.id,
        data
      );
      res.status(200).json({ data: transaction });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new AuthError();
      await transactionService.delete(  req.params.id as string, req.user.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new AuthError();
      const stats = await transactionService.getStats(req.user.id);
      res.status(200).json({ data: stats });
    } catch (error) {
      next(error);
    }
  },
};