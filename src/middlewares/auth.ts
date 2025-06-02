import { Request, Response, NextFunction } from 'express';
import { verifyToken, extractTokenFromHeader } from '../utils/jwt';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    const decoded = verifyToken(token);
    
    // Add user info to request object
    req.user = decoded;
    next();
  } catch (error: any) {
    res.status(401).json({
      status: 'error',
      message: error.message || 'Unauthorized - Invalid or expired token'
    });
  }
}; 