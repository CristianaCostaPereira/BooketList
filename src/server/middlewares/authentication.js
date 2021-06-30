const db = require('../db')
const jwt = require('jsonwebtoken')
const { JsonWebTokenError } = jwt
const dotenv = require('dotenv').config({path:'C:/Projects/BooketList/.env'})

// For every request/route validates if we have the authentication token
module.exports = (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) {
    res.status(400).send('JWT not provided')

    return
  }

  const AUTHENTICATION_SECRET = process.env.AUTHENTICATION_SECRET
  console.log(AUTHENTICATION_SECRET);

  try {
    const { id } = jwt.verify(token, AUTHENTICATION_SECRET) // destruturação do objecto que resultar, para só extrair o id

    db.query('SELECT * FROM reader WHERE reader_id = ?', [id], (error, results) => {
      if (error) {
        throw error
      }

      // If the id does not exist / not valid
      if (results.length === 0) {
        res.status(401).send('You don\'t have enough privilegies to access this resource')

      } else {
        next()
      }
    })

  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      res.status(400).send('Invalid JWT provided')

    } else {
      res.status(401).send('Unknown error trying to verify the provided JWT')
    }
  }
}