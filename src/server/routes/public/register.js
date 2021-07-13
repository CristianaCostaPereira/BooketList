const { validate } = require('indicative/validator')
const bcrypt = require('bcrypt')
const db = require('../../db')


module.exports = (req, res) => { validate(req.body,
  {
    email: 'required|email',
    password: 'required|min:3',
    passwordConfirmation: 'required|min:3|same:password',
    firstName: 'required|min:3|max:45',
    lastName: 'required|min:3|max:45'
  })
  
  .then(async (value) => {
    let encryptedPassword = await bcrypt.hash(value.password, 10)

    db.query('INSERT INTO reader (first_name, last_name, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, now(), now())', 
      [value.firstName, value.lastName, value.email, encryptedPassword], (error, results) => {

      if (error) {
        throw error
      }
      
      res.send({
        status: 'success',
        message: 'Reader created',
      })
    })    
  }).catch((error) => res.status(400).send(error))
}