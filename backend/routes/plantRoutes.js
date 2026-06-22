import express from 'express'
import {
  getPlants,
  addPlant,
  updatePlant,
  deletePlant,
  getPlantById,
} from '../controllers/plantController.js'
import { upload } from '../middleware/upload.js'
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getPlants)
router.get('/:id', getPlantById)
router.post('/', authMiddleware, isAdmin, upload.single('image'), addPlant)
router.put('/:id', authMiddleware, isAdmin, upload.single('image'), updatePlant)
router.delete('/:id', authMiddleware, isAdmin, deletePlant)

export default router
