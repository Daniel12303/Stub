//package imports
import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import path from 'path'
import { createClient } from '@supabase/supabase-js'
import cors from 'cors'

//routes imports
import { auth } from './routes/auth.js'
import { authPage } from './routes/authPage.js'
import { qrCreator } from './routes/qrCreator.js'
import { getDayFood } from './routes/getDayFood.js'

const app = express()
const __dirname = import.meta.dirname;

//routes middleware
app.use('/api/auth', auth)
app.use('/authPage', authPage)
app.use('/api/getDayFood', getDayFood)
app.use('/api/qrCreator', cors(), qrCreator)

//middleware
app.use(cookieParser())
app.use('/', express.static(path.resolve(__dirname, './static')))

dotenv.config({ path: path.join(__dirname, '../.env') })

const supabase = createClient(process.env.PROJECT_URL, process.env.PROJECT_PUBKEY)

app.get('/', async (req, res) => {
  const token = req.cookies.access_token

  if (token) {
    const { data, error } = await supabase.auth.getUser(token)
    // console.log(data.user)

    if (error) {
      console.log(error.message)
      res.redirect('/authPage')
    }

    res.sendFile(path.resolve(__dirname, './static/home.html'))
  }

  else {
    res.redirect('/authPage')
  }
})

app.listen(5000, console.log('Listening at Port 5000'))
