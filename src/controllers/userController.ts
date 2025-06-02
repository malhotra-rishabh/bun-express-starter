import { Request, Response } from 'express';
import { hash } from '@node-rs/bcrypt';
import User from '../models/User';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] } // Exclude password from the query
    });

    res.status(200).json({
      status: 'success',
      data: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(409).json({
        status: 'error',
        message: 'User with this email already exists'
      });
      return; // Add return statement to prevent further execution
    }

    // Hash password with salt rounds of 10
    const hashedPassword = await hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user.get();

    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: userWithoutPassword
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}; 