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
      data: results
    })
  })
})

router.post('/:id/books/make-favorite', (req, res) => {
  const { id } = req.params

  const { google_api_id } = req.body

  try {
    // validate if book exists
    db.query('SELECT book_id FROM book WHERE google_api_id = ?', [google_api_id], (error, results) => {
      if (error) {
        throw error
      }

      // res.send(results)

      if (results.length === 0) {
        // When book not found
        db.query('INSERT INTO book (google_api_id, created_at, updated_at) VALUES (?, now(), now())', [google_api_id], (error, results) => {
          if (error) {
            throw error
          }
          // return results.insertId
        })
      }
    })
    res.send('success')

  } catch (error) {
    res.status(400).send(error)
  }
})
