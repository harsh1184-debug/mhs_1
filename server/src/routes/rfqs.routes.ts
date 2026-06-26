import { Router } from 'express'
import { createRFQ, listRFQs, updateRFQStatus } from '../controllers/rfqs.controller'
import { adminAuth } from '../middleware/auth'

const router = Router()
router.post('/', createRFQ)
router.get('/', adminAuth, listRFQs)
router.patch('/:id/status', adminAuth, updateRFQStatus)

export default router