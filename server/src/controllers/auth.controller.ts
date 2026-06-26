import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from '../config/env'
import { AuthRequest } from '../middleware/auth'
import { Response } from 'express'
import prisma from '../lib/prisma'

export async function login(req: AuthRequest, res: Response) {
  const { email, password } = req.body
  const admin = await prisma.admin.findUnique({ where: { email } })
  if (!admin) return res.status(401).json({ message: 'Invalid credentials' })

  const valid = await bcrypt.compare(password, admin.password)
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' })

  const token = jwt.sign(
    { id: admin.id, email: admin.email, name: admin.name ?? undefined },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  )

  res.json({ token, admin: { id: admin.id, email: admin.email, name: admin.name } })
}

export async function createAdmin(req: AuthRequest, res: Response) {
  const { email, password, name } = req.body
  const hashed = await bcrypt.hash(password, 10)
  const admin = await prisma.admin.create({
    data: { email, password: hashed, name },
    select: { id: true, email: true, name: true, createdAt: true },
  })
  res.status(201).json(admin)
}