import sql from "./databaseInit.js";

async function getAll() {
  const result = await sql`select * from "userAccounts";`
  console.log(result)
}

async function insertAccounts(userEmail, userStudent_code, userStudent_name, userGrade_level, userSection) {
  const user = {
    email: userEmail,
    student_code: userStudent_code,
    student_name: userStudent_name,
    grade_level: userGrade_level,
    section: userSection
  }
  await sql`
    INSERT INTO "userAccounts"
        ${sql(user, 'email', 'student_code', 'student_name', 'grade_level', 'section')}
    `;
}

export { insertAccounts }
