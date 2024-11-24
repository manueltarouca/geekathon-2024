import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../database/prisma';
import { INTERNAL_SERVER_ERROR } from '../utils/http/error.model';
import * as userService from '../services/user.service';

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userService.createUser(email, hashedPassword);

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR.status).json({ error: INTERNAL_SERVER_ERROR.message });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });
    res.json({
      token,
      user: {
        email: user.email,
        role: user.role,
        registeredAt: user.registeredAt,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR.status).json({ error: INTERNAL_SERVER_ERROR.message });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: (req as any).user.id },
      select: {
        email: true,
        role: true,
        lastLogin: true,
        registeredAt: true,
      },
    });

    res.json(user);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR.status).json({ error: INTERNAL_SERVER_ERROR.message });
  }
}
