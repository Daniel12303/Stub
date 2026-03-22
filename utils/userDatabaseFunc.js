import { supabase } from "./databaseInit.js";

async function getAll() {
  const result = await sql`select * from "userAccounts";`
  console.log(result)
}

async function insertAccounts(userEmail, userStudent_code, userStudent_name, userGrade_level, userSection) {
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

export { insertAccounts }
