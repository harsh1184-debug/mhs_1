import { Response } from 'express'
import prisma from '../lib/prisma'
import { sendRFQNotification } from '../lib/email'

export async function createRFQ(req: any, res: Response) {
  const { clientName, hospitalName, email, phone, productId } = req.body

  const product = await prisma.product.findUnique({ where: { id: productId } })
  if (!product) return res.status(404).json({ message: 'Product not found' })

  const rfq = await prisma.rfq.create({
    data: { clientName, hospitalName, email, phone, productId },
    include: { product: true },
  })

  try {
    await sendRFQNotification({
      clientName,
      hospitalName,
      email,
      phone,
      productName: product.name,
      productBrand: product.brand,
    })
  } catch (err) {
    console.error('Email send failed:', err)
  }

  res.status(201).json(rfq)
}

export async function listRFQs(_req: any, res: Response) {
  const rfqs = await prisma.rfq.findMany({
    include: { product: { select: { name: true, brand: true } } },
    orderBy: { createdAt: 'desc' },
  })
  res.json(rfqs)
}

export async function updateRFQStatus(req: any, res: Response) {
  const { id } = req.params
  const { status } = req.body
  const rfq = await prisma.rfq.update({ where: { id }, data: { status } })
  res.json(rfq)
}