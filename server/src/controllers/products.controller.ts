import { Response } from 'express'
import prisma from '../lib/prisma'

export async function listProducts(_req: any, res: Response) {
  const products = await prisma.product.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      brand: true,
      category: true,
      description: true,
      imageUrls: true,
      pdfUrl: true,
      createdAt: true,
    },
  })
  res.json(products)
}

export async function createProduct(req: any, res: Response) {
  const { name, brand, category, description, imageUrls, pdfUrl, isPublished } = req.body
  const product = await prisma.product.create({
    data: { name, brand, category, description, imageUrls: imageUrls ?? [], pdfUrl, isPublished: isPublished ?? true },
  })
  res.status(201).json(product)
}

export async function updateProduct(req: any, res: Response) {
  const { id } = req.params
  const data = req.body
  const product = await prisma.product.update({ where: { id }, data })
  res.json(product)
}

export async function deleteProduct(req: any, res: Response) {
  const { id } = req.params
  await prisma.product.update({ where: { id }, data: { isPublished: false } })
  res.json({ message: 'Product archived' })
}