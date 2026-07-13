import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { addToCart, getCart, removeFromCart, updateQuantity } from '../controllers/cartController.js'

const router = express.Router()

router.post('/', authMiddleware, addToCart)
router.get('/', authMiddleware, getCart)
router.delete('/:plantId', authMiddleware, removeFromCart)
router.patch('/updateQuantity/:plantId', authMiddleware, updateQuantity)

export default router
