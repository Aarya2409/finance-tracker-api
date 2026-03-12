import { AppError } from '../middleware/errorHandler';

// Temporary in-memory store — we'll replace with real DB on Day 4
const categories: Array<{ id: string; name: string; userId: string }> = [];

export const categoryService = {
  async getAll(userId: string) {
    return categories.filter(c => c.userId === userId);
  },

  async getById(id: string, userId: string) {
    const category = categories.find(c => c.id === id && c.userId === userId);
    if (!category) {
      throw new AppError('Category not found', 404);
    }
    return category;
  },

  async create(name: string, userId: string) {
    // Business rule: no duplicate names per user
    const exists = categories.find(
      c => c.name.toLowerCase() === name.toLowerCase() && c.userId === userId
    );
    if (exists) {
      throw new AppError('Category with this name already exists', 400);
    }

    const category = {
      id: crypto.randomUUID(),
      name,
      userId,
    };
    categories.push(category);
    return category;
  },

  async delete(id: string, userId: string) {
    const index = categories.findIndex(c => c.id === id && c.userId === userId);
    if (index === -1) {
      throw new AppError('Category not found', 404);
    }
    categories.splice(index, 1);
  },
};