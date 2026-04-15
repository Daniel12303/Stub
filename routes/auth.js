import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { createClient } from '@supabase/supabase-js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

const __dirname = import.meta.dirname;
dotenv.config({ path: path.join(__dirname, '../.env') })

const router = express.Router()
const supabase = createClient(process.env.PROJECT_URL, process.env.PROJECT_PUBKEY)

router.use(bodyParser.urlencoded({ extended: true }))
router.use(express.json())
router.use(cookieParser())

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const { user, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.log(error.message)
    return res.redirect('/')
  }

  const { data } = await supabase.auth.signInWithPassword({ email, password })
  const logError = await supabase.auth.signInWithPassword({ email, password })['error']


  if (logError) {
    console.log(logError.message)
    return res.redirect('/authPage')
  }

  res.cookie("access_token", data.session.access_token, { httpOnly: true })
  res.redirect('/api/auth/token')
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body
  let { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    console.log(error.message)
    return res.redirect('/authPage')
  }
  
  res.cookie("access_token", data.session.access_token, { httpOnly: true })
  res.redirect('/api/auth/token')
})

router.get('/token', async (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.redirect('/')

  const { data, error } = await supabase.auth.getUser(token)

  if (error) {
    console.log(error.message)
    return res.redirect('/authPage')
  }

  res.redirect('/')
})

router.get('/signout', (req, res) => {
  res.clearCookie("access_token")
  res.redirect('/')
})

export { router as auth }
