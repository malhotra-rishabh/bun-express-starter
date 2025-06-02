import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export const validateRequest = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = await schema.validateAsync(req.body, {
        abortEarly: false,
        stripUnknown: true
      });
      req.body = validatedBody;
      next();
    } catch (error: any) {
      if (error.isJoi) {
        res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: error.details.map((detail: any) => ({
            field: detail.path[0],
            message: detail.message
          }))
        });
      }
      next(error);
    }
  };
}; 