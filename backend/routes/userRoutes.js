import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { toggleFavorite } from '../controllers/userController.js'
import { getFavorites } from '../controllers/userController.js'

const router = express.Router()

router.post('/favorites/:plantId', authMiddleware, toggleFavorite)
router.get('/favorites', authMiddleware, getFavorites)

export default router
