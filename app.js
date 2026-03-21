//package imports
import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import path from 'path'
import { createClient } from '@supabase/supabase-js'

//routes imports
import { auth } from './routes/auth.js'

const app = express()

//routes middleware
app.use('/api/auth', auth)

//middleware
app.use(cookieParser())
app.use(express.static('./static'))

const __dirname = import.meta.dirname;
dotenv.config({ path: path.join(__dirname, '../.env') })

const supabase = createClient(process.env.PROJECT_URL, process.env.PROJECT_PUBKEY)

app.get('/', async (req, res) => {
  const token = req.cookies.access_token

  if (token) {
    const { data, error } = await supabase.auth.getUser(token)

    if (error) {
      console.log(error.message)
      res.redirect('/authPage')
    }

    res.send(data.user.email)
  }

  else
    res.sendFile(path.resolve(__dirname, './static/index.html'))
})

app.get('/authPage', (req, res) => {
  res.sendFile(path.resolve(__dirname, './static/authPage.html'))
})

app.listen(5000, console.log('Listening at Port 5000'))
