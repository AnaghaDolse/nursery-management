import express from 'express'
import {
  getPlants,
  addPlant,
  updatePlant,
  deletePlant,
} from '../controllers/plantController.js'

const router = express.Router()

router.get('/', getPlants)
router.post('/', addPlant)
router.put('/:id', updatePlant)
router.delete('/:id', deletePlant)

export default router
