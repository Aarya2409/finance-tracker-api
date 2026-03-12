import { Request, Response, NextFunction } from 'express';
import { categoryService } from '../services/category.service';
import { z } from 'zod';

const CreateCategorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(50),
});

export const categoryController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      // Hardcoded userId for now — Day 5 we'll get this from JWT token
      const userId = 'temp-user-123';
      const categories = await categoryService.getAll(userId);
      res.status(200).json({ data: categories, count: categories.length });
    } catch (error) {
      next(error); // passes error to global error handler
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = 'temp-user-123';
      const { name } = CreateCategorySchema.parse(req.body);
      const category = await categoryService.create(name, userId);
      res.status(201).json({ data: category });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = 'temp-user-123';
      const  id  = req.params.id as string;
      await categoryService.delete(id, userId);
      res.status(204).send(); // 204 = success, no content to return
    } catch (error) {
      next(error);
    }
  },
};