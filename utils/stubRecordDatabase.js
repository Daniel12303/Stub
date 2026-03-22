// import sql from "./databaseInit.js";

import { supabase } from "./databaseInit.js";

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

