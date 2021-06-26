const { validate } = require('indicative/validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') // Para importar o pacote

const db = require('../../db')

module.exports = (req, res) => { validate(req.body,
  {
    email: 'required|email',
    password: 'required'
  }).then((value) => {
    db.query('SELECT * FROM reader WHERE email = ?', [value.email], (error, results) => {
      console.log(results);
  
      if (results.length === 0) {
        res.status(400).send('Cannot find any account that matches the given email and password')

      } else {
        bcrypt.compare(value.password, results[0].password)
          .then((match) => {
            if (match) {
              const secret = "c79630834183a56cc26a3a8ed69b3d38"

              // sign para criptografar um valor usando o secret
              const token = jwt.sign({id: results[0].reader_id}, secret) // will give me my token

              let returnValue = {
                token: token,
                reader: {
                  readerId: 2,
                  firstName: 'Cris',
                  lastName: 'Pereira'
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