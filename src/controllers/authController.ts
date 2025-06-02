import { Request, Response } from 'express';
import { compare } from '@node-rs/bcrypt';
import User from '../models/User';
import { generateToken } from '../utils/jwt';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
      return;
    }

    // Verify password
    const isValidPassword = await compare(String(password), String(user.password));
    if (!isValidPassword) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
      return;
    }

    // Generate JWT token
    const token = generateToken(user);

    // Remove password from response
    const userWithoutPassword = user.get();
    userWithoutPassword.password = '<redacted>';

    res.status(200).json({
      status: 'success',
      message: 'Logged in successfully',
      data: {
        user: userWithoutPassword,
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};