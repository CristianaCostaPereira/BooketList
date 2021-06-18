const router = require('express').Router()
const { validate } = require('indicative/validator')
const { sanitize } = require('indicative/sanitizer')
const bcrypt = require('bcrypt')

const db = require('../../db')
const dotenv = require('dotenv').config({path:'C:/Projects/BooketList/.env'})

const API_KEY = process.env.API_KEY
console.log(API_KEY)


module.exports = router

router.get('/:id/books', (req, res) => {
  const { id } = req.params
  db.query('SELECT * FROM book b JOIN book_reader br ON b.book_id = br.book_id where br.reader_id = ?', [id], (error, results) => {
  
    if (error) {
      throw error
    }

    res.send({
      code: 200,
      meta: null,
      data: results
    })
  })
})
