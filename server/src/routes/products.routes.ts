import { Router } from 'express'
import { listProducts, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller'
import { adminAuth } from '../middleware/auth'

const router = Router()
router.get('/', listProducts)
router.post('/', adminAuth, createProduct)
router.put('/:id', adminAuth, updateProduct)
router.delete('/:id', adminAuth, deleteProduct)

export default router