import sql from "./databaseInit.js";

async function getAll() {
  const result = await sql`select * from "userAccounts";`
  console.log(result)
}

getAll()
