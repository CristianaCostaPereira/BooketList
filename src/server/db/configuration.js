const dotenv = require('dotenv').config({path:'C:/Projects/BooketList/.env'})

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_DATABASE = process.env.DB_DATABASE

module.exports = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_DATABASE
}