const db = require('../db')
const jwt = require('jsonwebtoken')
const { JsonWebTokenError } = jwt

// For every request/route validates if we have the authentication token

module.exports = (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) {
    res.status(400).send('JWT not provided')

    return
  }

  const secret = "c79630834183a56cc26a3a8ed69b3d38"

  try {
    const { id } = jwt.verify(token, secret) // destruturação do objecto que resultar, para só extrair o id

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