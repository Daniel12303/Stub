import { supabase } from "./databaseInit.js";
import { getAllCode } from "./userDatabaseFunc.js"

export async function initializeStudentScore() {
  const data = await getAllCode()

  for (let i = 0; i < data.length; i++) {
    const student_code = data[i]['student_code']

    const { error } = await supabase
      .from('studentTotalRecord')
      .insert({
        student_code: student_code,
        breakfast: 0,
        am_snack: 0,
        lunch: 0,
        pm_snack: 0,
        dinner: 0,
      })
    if (error)
      console.log(error)
  }
}

export async function resetStudentScore() {
  const data = await getAllCode()

  for (let i = 0; i < data.length; i++) {
    const student_code = data[i]['student_code']

    const { error } = await supabase
      .from('studentTotalRecord')
      .update({
        breakfast: 0,
        am_snack: 0,
        lunch: 0,
        pm_snack: 0,
        dinner: 0,
      })
      .eq('student_code', student_code)
    if (error)
      console.log(error)
  }
}

export async function checkStudentScore(student_code, meal) {
  const { data, error } = await supabase
    .from('studentTotalRecord')
    .select(meal)
    .eq('student_code', student_code)

  if (error)
    console.log(error.message)


  else {
    return data[0][meal]
  }
}

export async function changeTotalMealScore(student_code, meal) {
  switch (meal) {
    case "breakfast":
      changeBreakfastScore(student_code, meal);
      break;
    case "am_snack":
      changeAm_SnackScore(student_code, meal);
      break;
    case "lunch":
      changeLunchScore(student_code, meal);
      break;
    case "pm_snack":
      changePm_SnackScore(student_code, meal);
      break;
    case "dinner":
      changeDinnerScore(student_code, meal);
      break;
  }
}


export async function changeBreakfastScore(student_code, meal) {
  let mealScore = await checkStudentScore(student_code, meal) + 1

  const { error } = await supabase
    .from('studentTotalRecord')
    .update({ breakfast: mealScore })
    .eq('student_code', student_code)

  if (error)
    console.log(error)
}

export async function changeAm_SnackScore(student_code, meal) {
  let mealScore = await checkStudentScore(student_code, meal) + 1

  const { error } = await supabase
    .from('studentTotalRecord')
    .update({ am_snack: mealScore })
    .eq('student_code', student_code)

  if (error)
    console.log(error)
}

export async function changeLunchScore(student_code, meal) {
  let mealScore = await checkStudentScore(student_code, meal) + 1

  const { error } = await supabase
    .from('studentTotalRecord')
    .update({ lunch: mealScore })
    .eq('student_code', student_code)

  if (error)
    console.log(error)
}

export async function changePm_SnackScore(student_code, meal) {
  let mealScore = await checkStudentScore(student_code, meal) + 1

  const { error } = await supabase
    .from('studentTotalRecord')
    .update({ pm_snack: mealScore })
    .eq('student_code', student_code)

  if (error)
    console.log(error)
}

export async function changeDinnerScore(student_code, meal) {
  let mealScore = await checkStudentScore(student_code, meal) + 1

  const { error } = await supabase
    .from('studentTotalRecord')
    .update({ dinner: mealScore })
    .eq('student_code', student_code)

  if (error)
    console.log(error)
}
