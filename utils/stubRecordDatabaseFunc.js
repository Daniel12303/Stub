import { supabase } from "./databaseInit.js";
import { setStudentScoreDefault, createRandomKey } from "./studentRecordDatabaseFunc.js"

function getDate() {
  let currentDate = new Date()
  let dateString = currentDate.toISOString()

  dateString = dateString.slice(0, dateString.indexOf('T'))

  return dateString
}

export async function getAllData() {
  const { data, error } = await supabase
    .from('stubRecord')
    .select()

  if (error)
    console.log(error.message)

  else
    return data
}

export async function getDataBasedOnDate(date) {
  const { data, error } = await supabase
    .from('stubRecord')
    .select()
    .eq('date', date)

  if (error)
    console.log(error.message)

  else
    return data
}

export async function countDataByDay(date) {
  const { data, error } = await supabase
    .from('stubRecord')
    .select('breakfast, am_snack, lunch, pm_snack, dinner')
    .eq('date', date)

  if (error)
    console.log(error.message)

  else {
    const { breakfast, am_snack, lunch, pm_snack, dinner } = data[0]

    return [breakfast, am_snack, lunch, pm_snack, dinner]
  }
}

export async function countMealByDayDate(meal, date) {
  const { data, error } = await supabase
    .from('stubRecord')
    .select(meal)
    .eq('date', date)

  if (error)
    console.log(error.message)

  else
    return data[0][meal]
}

export async function incrementCountByDate(meal, date) {
  switch (meal) {
    case "breakfast":
      incrementBreakfastByDate(meal, date);
      break;
    case "am_snack":
      incrementAm_SnackByDate(meal, date);
      break;
    case "lunch":
      incrementLunchByDate(meal, date);
      break;
    case "pm_snack":
      incrementPm_SnackByDate(meal, date);
      break;
    case "dinner":
      incrementDinnerByDate(meal, date);
      break;
  }
}

async function incrementBreakfastByDate(meal, date) {
  const stubCount = await countMealByDayDate(meal, date) + 1

  const { error } = await supabase
    .from('stubRecord')
    .update({ breakfast: stubCount })
    .eq('date', date)

  if (error)
    console.log(error)
}

async function incrementAm_SnackByDate(meal, date) {
  const stubCount = await countMealByDayDate(meal, date) + 1

  const { error } = await supabase
    .from('stubRecord')
    .update({ am_snack: stubCount })
    .eq('date', date)

    .insert({ student_code: student_code })
  if (error)
    console.log(error)
}

async function incrementLunchByDate(meal, date) {
  const stubCount = await countMealByDayDate(meal, date) + 1

  const { error } = await supabase
    .from('stubRecord')
    .update({ lunch: stubCount })
    .eq('date', date)

  if (error)
    console.log(error)
}

async function incrementPm_SnackByDate(meal, date) {
  const stubCount = await countMealByDayDate(meal, date) + 1

  const { error } = await supabase
    .from('stubRecord')
    .update({ pm_snack: stubCount })
    .eq('date', date)

  if (error)
    console.log(error)
}

async function incrementDinnerByDate(meal, date) {
  const stubCount = await countMealByDayDate(meal, date) + 1

  const { error } = await supabase
    .from('stubRecord')
    .update({ dinner: stubCount })
    .eq('date', date)

  if (error)
    console.log(error)
}

async function insertDayRecord(breakfast, am_snack, lunch, pm_snack, dinner) {
  const { error } = await supabase
    .from('stubRecord')
    .insert({ breakfastMeal: breakfast, am_snackMeal: am_snack, lunchMeal: lunch, pm_snackMeal: pm_snack, dinnerMeal: dinner })

  if (error)
    console.log(error)

  await setStudentScoreDefault()
  await createRandomKey()
}

export async function getDayFood() {
  const date = getDate()

  const { data, error } = await supabase
    .from('stubRecord')
    .select('breakfastMeal, am_snackMeal, lunchMeal, pm_snackMeal, dinnerMeal')
    .eq('date', date)

  if (error)
    console.log(error.message)

  else
    return data[0]
}
