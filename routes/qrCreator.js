import express from 'express'
import QRCode from 'qrcode'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'node:fs/promises';
import fS from 'fs';
import timers from 'node:timers/promises'

import { createClient } from '@supabase/supabase-js'

import { getStudentCodeFromEmail } from '../utils/userDatabaseFunc.js'
import { getRandomKey } from '../utils/studentRecordDatabaseFunc.js'
const __dirname = import.meta.dirname;

dotenv.config({ path: path.join(__dirname, '../.env') })

const supabase = createClient(process.env.PROJECT_URL, process.env.PROJECT_PUBKEY)
const router = express.Router()

router.use(express.json())
router.use(cookieParser())
router.use(express.urlencoded({ extended: false }))

router.get('/:meal', async (req, res) => {
  const token = req.cookies.access_token
  if (!token) res.redirect('/authPage')

  const { data, error } = await supabase.auth.getUser(token)

  if (error) {
    console.log(error.message)
    res.redirect('/authPage')
  }

  const email = data.user.email
  const student_code = await getStudentCodeFromEmail(email)

  const meal = req.params.meal
  const randomKey = await getRandomKey(student_code)
  const filePath = path.resolve(__dirname, `../qrAssets/${student_code}_${meal}code.png`)

  if (!fS.existsSync(filePath)) {
    const mealList = ['breakfast', 'amsnack', 'lunch', 'pmsnack', 'dinner']

    for (let i = 0; i < 5; i++) {
      QRCode.toFile(`./qrAssets/${student_code}_${mealList[i]}code.png`, `${student_code}_${mealList[i]}_${randomKey}`, {
        width: 1000,
        color: {
          dark: '#ffffff',  // Blue dots
          light: '#0000' // Transparent background
        }
      }, function (err) {
        if (err) throw err
      })
    }

    await waitForFile(filePath, 20000, 100)
  }

  console.log("exists")
  res.sendFile(filePath)
})

async function collectCheckData(req, res, next) {
}

async function waitForFile(filePath, timeout, interval) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    try {
      await fs.access(filePath);
      console.log('exists')
      return true; // File exists
    } catch {
      await timers.setTimeout(interval);
    }
  }
  throw new Error(`Timeout: File ${filePath} not created within ${timeout}ms`);
}

export { router as qrCreator }
