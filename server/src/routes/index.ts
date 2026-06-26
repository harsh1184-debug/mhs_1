import { Router } from 'express'
import authRoutes from './auth.routes'
import productRoutes from './products.routes'
import rfqRoutes from './rfqs.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/products', productRoutes)
router.use('/rfqs', rfqRoutes)

export default router