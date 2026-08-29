import express from 'express'
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
} from '../controllers/orderController.js'
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, createOrder)
router.get('/', authMiddleware, getMyOrders)
router.get('/admin', authMiddleware, isAdmin, getAllOrders)
router.patch('/:orderId/status', authMiddleware, isAdmin, updateOrderStatus)

export default router
