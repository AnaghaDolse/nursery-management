import express from 'express'
import {
  getPlants,
  addPlant,
  updatePlant,
  deletePlant,
} from '../controllers/plantController.js'
import { upload } from '../middleware/upload.js'

const router = express.Router()

router.get('/', getPlants)
router.post('/', upload.single('image'), addPlant)
router.put('/:id', upload.single('image'), updatePlant)
router.delete('/:id', deletePlant)

export default router
