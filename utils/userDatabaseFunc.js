import { supabase } from "./databaseInit.js";

export async function getAllCode() {
  const { data, error } = await supabase
    .from('userAccounts')
    .select('student_code')

  if (error)
    console.log(error.message)

  else
    return data
}

export async function insertAccounts(userEmail, userStudent_code, userStudent_name, userGrade_level, userSection) {
  const { error } = await supabase
    .from('userAccounts')
    .insert({
      email: userEmail,
      student_code: userStudent_code,
      student_name: userStudent_name,
      grade_level: userGrade_level,
      section: userSection
    })
}

export async function getStudentCodeFromEmail(email) {
  const { data, error } = await supabase
    .from('userAccounts')
    .select('student_code')
    .eq('email', email)

  if (error)
    console.log(error.message)

  else
    return data[0]['student_code']
}

