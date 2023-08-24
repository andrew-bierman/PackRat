import express from 'express'
import { getParks } from '../controllers/getParks/index'

const router = express.Router()

router.get('/', getParks)

export default router
