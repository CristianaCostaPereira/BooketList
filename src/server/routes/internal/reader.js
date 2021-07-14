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

  db.query('SELECT b.book_id, b.google_api_id, br.* FROM book b JOIN book_reader br ON b.book_id = br.book_id where br.reader_id = ?', [id], (error, results) => {
    if (error) {
      throw error
    }

    res.send({
      code: 200,
      data: results
    })
  })
})

// Associar livro a reader (adicionar favorito)
router.post('/:id/books/make-favorite', (req, res) => {
  const reader_id = req.params.id

  const { 
    google_api_id,
    purchase_date,
    reader_rating,
    start_reading,
    end_reading,
    edition_number,
    reading_time,
  } = req.body

  try {
    // validate if book exists
    db.query('SELECT book_id FROM book WHERE google_api_id = ?', [google_api_id], (error, results) => {
      if (error) {
        throw error
      }

      if (results.length === 0) {
        // When book not found insert into book table
        db.query('INSERT INTO book (google_api_id, created_at, updated_at) VALUES (?, now(), now())', [google_api_id], (error, results) => {
          if (error) {
            throw error
          }
        })
      }

      // book exists on DB for certain and get his id to insert it into book_reader pivot table
      db.query('SELECT book_id FROM book WHERE google_api_id = ?', [google_api_id], (error, results) => {
        if (error) {
          throw error
        }
        console.log(results)
        let book_id = results[0].book_id // [0] because it comes inside of an array

        //check if book is already favorite
        db.query('SELECT book_reader_id FROM book_reader WHERE book_id = ? AND reader_id = ?', [book_id, reader_id], (error, results) => {
          if (results.length > 0) {
            res.send({
              status: 'error',
              message: 'Book already set as favorite'
            })
            return
          }

          var data = {
            reader_id,
            book_id,
            purchase_date,
            reader_rating,
            start_reading,
            end_reading,
            edition_number,
            reading_time 
          }
  
          db.query('INSERT INTO book_reader SET ?', data, (error, results) => {
            if (error) {
              throw error
            }
            res.send({
              status: 'success',
              message: 'Book added as favorite'
            })
          })
        })
      })
    })

  } catch (error) {
    res.status(400).send(error)
  }
})

router.put('/:id/books/:bookId', (req, res) => {
  const { id, bookId } = req.params

  const bodyData = {
    start_reading,
    end_reading,
    purchase_date,
    reader_rating,
    reading_time,
    edition_number
  } = req.body


  validate(bodyData, {
    start_reading: 'date',
    end_reading: 'date',
    purchase_date: 'date',
    reader_rating: 'number',
    reading_time: 'number',
    edition_number: 'number'

  }).then(async (value) => {
    sanitize(value, {
      start_reading: 'trim',
      end_reading: 'trim',
      purchase_date: 'trim',
      reader_rating: 'trim',
      reading_time: 'trim',
      edition_number: 'trim'
    })

    db.query('UPDATE book_reader SET ? WHERE reader_id = ? AND book_id = ?', [bodyData, id, bookId], (error, results) => {
      if (error) {
        throw error
      }

      let response = {
        status: 'success',
        message: 'Favorite book successfully edited',
      }
      res.send(response)
    })

  }).catch((error) => {
    res.send({
      status: 'error',
      message: 'Invalid fields',
      errors: error
    })
  })
})

router.delete('/:id/books/:bookId', (req, res) => {
  const {id, bookId} = req.params

  db.query('DELETE FROM book_reader WHERE reader_id = ? AND book_id = ?', [id, bookId], (error, results) => {
    if (error) {
      throw error
    }

    res.send({
      status: 'success',
      message: 'Book removed from favorite list'
    })
  })
})