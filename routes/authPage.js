import express from 'express'
import path from 'path'

const router = express.Router()
const __dirname = import.meta.dirname;

router.use(express.static(path.resolve(__dirname, '../static/authPage.html')))

router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../static/authPage.html'))
})

export { router as authPage }
