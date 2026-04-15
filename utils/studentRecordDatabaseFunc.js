import { supabase } from "./databaseInit.js";
import { incrementCountByDate } from "./stubRecordDatabaseFunc.js"
import { getAllCode } from "./userDatabaseFunc.js"
import { changeTotalMealScore } from "./studentTotalRecordDatabaseFunc.js"

function getDate() {
  let currentDate = new Date()
  let dateString = currentDate.toISOString()

  dateString = dateString.slice(0, dateString.indexOf('T'))

  return dateString
}

export async function initializeStudentScore() {
  const data = await getAllCode()

  for (let i = 0; i < data.length; i++) {
    const student_code = data[i]['student_code']

    const { error } = await supabase
      .from('studentRecord')
      .insert({ student_code: student_code })

    if (error)
      console.log(error)
  }
}

export async function setStudentScoreDefault() {
  const { error } = await supabase
    .from('studentRecord')
    .update({ breakfast: 1, am_snack: 1, lunch: 1, pm_snack: 1, dinner: 1 })
    .neq('student_code', 0)

  if (error)
    console.log(error.message)
}

export async function checkDayScore(student_code, meal) {
  let dateString = getDate()
  console.log(student_code, dateString, meal)

  const { data, error } = await supabase
    .from('studentRecord')
    .select(meal)
    .eq('student_code', student_code)

  if (error)
    console.log(error)

  else
    return data[0][meal]
}

export async function changeMealScore(student_code, meal, val) {
  let dateString = getDate()

  switch (meal) {
    case "breakfast":
      changeBreakfastScore(student_code, meal, val);
      break;
    case "am_snack":
      changeAm_SnackScore(student_code, meal, val);
      break;
    case "lunch":
      changeLunchScore(student_code, meal, val);
      break;
    case "pm_snack":
      changePm_SnackScore(student_code, meal, val);
      break;
    case "dinner":
      changeDinnerScore(student_code, meal, val);
      break;
  }

  if (val == -1) {
    incrementCountByDate(meal, dateString)
    changeTotalMealScore(student_code, meal)
  }
}

export async function changeBreakfastScore(student_code, meal, val) {
  let dayScore = await checkDayScore(student_code, meal) + val

  const { error } = await supabase
    .from('studentRecord')
    .update({ breakfast: dayScore })
    .eq('student_code', student_code)

  if (error)
    console.log(error)
}

export async function changeAm_SnackScore(student_code, meal, val) {
  let dayScore = await checkDayScore(student_code, meal) + val

  const { error } = await supabase
    .from('studentRecord')
    .update({ am_snack: dayScore })
    .eq('student_code', student_code)

  if (error)
    console.log(error)
}

export async function changeLunchScore(student_code, meal, val) {
  let dayScore = await checkDayScore(student_code, meal) + val

  const { error } = await supabase
    .from('studentRecord')
    .update({ lunch: dayScore })
    .eq('student_code', student_code)

  if (error)
    console.log(error)
}

export async function changePm_SnackScore(student_code, meal, val) {
  let dayScore = await checkDayScore(student_code, meal) + val

  const { error } = await supabase
    .from('studentRecord')
    .update({ pm_snack: dayScore })
    .eq('student_code', student_code)

  if (error)
    console.log(error)
}

export async function changeDinnerScore(student_code, meal, val) {
  let dayScore = await checkDayScore(student_code, meal) + val

  const { error } = await supabase
    .from('studentRecord')
    .update({ dinner: dayScore })
    .eq('student_code', student_code)

  if (error)
    console.log(error)
}

export async function createRandomKey() {
  const student_codes = await getAllCode()

  for (let i = 0; i < student_codes.length; i++) {
    const code = student_codes[i]['student_code']

    let err = false;

    do {
      let randomKey = Math.floor(Math.random() * (1000)) + 1
      randomKey = code - randomKey

      const { error } = await supabase
        .from('studentRecord')
        .update({ randomKey: randomKey })
        .eq("student_code", code)

      if (error) {
        console.log(error.message)
        err = true
      }

      else
        err = false

    } while (err)
  }
}

export async function resetRandomKey() {
  const { error } = await supabase
    .from('studentRecord')
    .update({ randomKey: null })
    .neq('student_code', 0)

  if (error)
    console.log(error.message)
}

export async function getRandomKey(student_code) {
  const { data, error } = await supabase
    .from('studentRecord')
    .select('randomKey')
    .eq('student_code', student_code)

  if (error)
    console.log(error.message)

  return data[0]['randomKey']
}
