import express from 'express'
import { getDayFood } from '../utils/stubRecordDatabaseFunc.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const dayFood = await getDayFood()
  res.send(dayFood)
})

export { router as getDayFood }
