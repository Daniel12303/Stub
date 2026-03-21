import csv from "csv-parser"
import fs from 'fs'
import path from 'path'
import { insertAccounts } from './userDatabaseFunc.js'
import { createClient } from '@supabase/supabase-js'

const __dirname = import.meta.dirname;
const supabase = createClient(process.env.PROJECT_URL, process.env.PROJECT_PUBKEY)
const results = []

fs.createReadStream(path.resolve(__dirname, '../account.csv'))
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', async () => {
    for (let i = 0; i < results.length; i++) {
      let { email, password, student_code, student_name, grade_level, section } = results[i]

      insertAccounts(email, student_code, student_name, grade_level, section)

      const { error } = await supabase.auth.signUp({ email, password });
      if (error) console.log(error.message)
    }
  });
