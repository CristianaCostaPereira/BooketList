const { validate } = require('indicative/validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') // Para importar o pacote
const dotenv = require('dotenv').config({path:'C:/Projects/BooketList/.env'})

const db = require('../../db')

module.exports = (req, res) => { validate(req.body,
  {
    email: 'required|email',
    password: 'required'
  }).then((value) => {
    db.query('SELECT * FROM reader WHERE email = ? LIMIT 1', [value.email], (error, results) => {
  
      if (results.length === 0) {
        res.status(400).send('Cannot find any account that matches the given email and password')

      } else {
        bcrypt.compare(value.password, results[0].password)
          .then((match) => {
            if (match) {
              const AUTHENTICATION_SECRET = process.env.AUTHENTICATION_SECRET
              console.log(AUTHENTICATION_SECRET)

              // sign para criptografar um valor usando o secret
              const token = jwt.sign({id: results[0].reader_id}, AUTHENTICATION_SECRET) // will give me my token

              let returnValue = {
                token: token,
                reader: {
                  readerId: results[0].reader_id,
                  firstName: results[0].first_name,
                  lastName: results[0].last_name
                }
              }

              res.send(returnValue)

            } else {
              res.status(400).send('Cannot find any account that matches the given email and password')
            }
          }).catch((error) => { throw error })
      }
    })
  }).catch((error) => res.status(400).send(error))
}