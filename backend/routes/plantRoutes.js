import express from 'express'
import { getPlans, addPlant } from '../controllers/plantController.js'

const router = express.Router()

router.get('/', getPlans)
router.post('/', addPlant)

export default router
