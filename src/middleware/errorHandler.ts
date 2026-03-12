import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';


export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

export class AuthError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

// Global error handler - must have 4 params for Express to recognise it

// export const errorHandler = (
//   err: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (err instanceof AppError) {
//     res.status(err.statusCode).json({
//       error: err.message,
//       statusCode: err.statusCode,
//     });
//     return;
//   }

//   // Unexpected error - don't leak details to client
//   console.error('UNEXPECTED ERROR:', err);
//   res.status(500).json({
//     error: 'Internal server error',
//     statusCode: 500,
//   });
// };


export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Validation Error',
      messages: err.issues.map(i => ({
        field: i.path.join('.'),
        message: i.message,
      })),
    });
    return;
  }

  // Handle our custom errors
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
      statusCode: err.statusCode,
    });
    return;
  }

  // Unexpected error
  console.error('UNEXPECTED ERROR:', err);
  res.status(500).json({
    error: 'Internal server error',
    statusCode: 500,
  });
};
