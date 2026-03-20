import { Request, Response, NextFunction } from 'express';
import { categoryService } from '../services/category.service';
import { z } from 'zod';
import { AuthError } from '../middleware/errorHandler';

const CreateCategorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(50),
});

export const categoryController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new AuthError();
      const categories = await categoryService.getAll(req.user.id);
      res.status(200).json({ data: categories, count: categories.length });
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new AuthError();
      const { name } = CreateCategorySchema.parse(req.body);
      const category = await categoryService.create(name, req.user.id);
      res.status(201).json({ data: category });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new AuthError();
      const id = req.params.id as string;
      await categoryService.delete(id, req.user.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};