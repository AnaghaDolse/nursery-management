import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { addToCart } from '../controllers/cartController.js'

const router = express.Router()

router.post('/', authMiddleware, addToCart)

export default router
