import { Router } from 'express'
import { login, createAdmin } from '../controllers/auth.controller'

const router = Router()
router.post('/login', login)
router.post('/register', createAdmin)

export default router