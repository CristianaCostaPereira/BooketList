const router = require('express').Router()
const { validate } = require('indicative/validator')
const { sanitize } = require('indicative/sanitizer')
const bcrypt = require('bcrypt')

const db = require('../../db')
const axios = require('axios');
const dotenv = require('dotenv').config({path:'C:/Projects/BooketList/.env'})


const API_KEY = process.env.API_KEY
console.log(API_KEY)

// function removePasswordProperty(object) {
//   delete object.password
// }


module.exports = (app) => {
  app.get('/reader', (req, res) => {
      res.send({
        code: 200,
        meta: {
          pagination: {
            total: reader.length,
            pages: 1,
            page: 1,
            limit: undefined
          }
        },
        data: reader
      })
  })


  app.get('/test', async (req, res) => {
    // db.query(`SELECT * FROM reader`, (error, results) => {
    //   if (error) {
    //     throw error
    //   }

    //   res.send(results)
    // })
    // Make a request for a user with a given ID

    try {
      //axios was giving circular json error
      // applyed sugestion of deconstructing response
      // https://dev.to/sarah_chima/destructuring-assignment---arrays-16f
      
      const { data: result } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=hRQbSgAACAAJ&key=${API_KEY}`);

      res.send(result)
    } catch (error) {
      console.error(error);
    }

  })
}



// router.get('/', (req, res) => {
//   const { page, limit } = req.query

//   db.query('SELECT COUNT(*) FROM reader', (error, results) => {
//     if (error) {
//       throw error
//     }

//     const count = results[0]['COUNT(*)']

//     const _limit = Number(limit) || 20
//     const _page = Number(page) || 1

//     const offset = (_page - 1) * _limit

//     db.query('SELECT * FROM reader LIMIT ?, ?', [offset, _limit], (error, results, _) => {
//       if (error) {
//         throw error
//       }

//       const pages = Math.ceil(count / _limit)

//       res.send({
//         code: 200,
//         meta: {
//           pagination: {
//             total: count,
//             pages: pages,
//             page: _page,
//           }
//         },
//         data: results,
//       })
//     })
//   })
// })



// router.get('/', (req, res) => {
//   const { name } = req.query

//   db.query(`SELECT * FROM reader WHERE first_name LIKE "%${name}%";`, [name], (error, results) => {
//     if (error) {
//       throw error
//     }

//     res.send(results)
//   })
// })

// router.get('/search', (req, res) => {
//   const { name } = req.query

//   db.query(`SELECT * FROM reader WHERE first_name LIKE "%${name}%";`, [name], (error, results) => {
//     if (error) {
//       throw error
//     }

//     res.send(results)
//   })
// })

router.get('/:id', (req, res, next) => {
  const { id } = req.params

  db.query('SELECT * FROM reader WHERE id = ? LIMIT 1', [id], (error, results, _) => {
    if (error) {
      throw error
    }

    removePasswordProperty(results[0])

    res.send({
      code: 200,
      meta: null,
      data: results[0]
    })
  })
})

// router.post('/', (req, res) => {
//   const reader = req.body

//   validate(user, {
//     first_name: 'required',
//     last_name: 'required',
//     email: 'required|email',
//     password: 'required|min:6',
//     passwordSame: 'required|same:password'
//   }).then((value) => {
//     sanitize(value, {
//       email: 'trim|lowerCase',
//       password: 'trim'
//     })

//     delete value.passwordSame

//     bcrypt.hash(value.password, 10).then((hash) => {
//       value.password = hash

//       db.query('INSERT INTO reader SET ?', [value], (error, results, _) => {
//         if (error) {
//           throw error
//         }

//         const { insertId } = results

//         db.query('SELECT * FROM reader WHERE id = ? LIMIT 1', [insertId], (error, results, _) => {
//           if (error) {
//             throw error
//           }

//           removePasswordProperty(results[0])

//           res.send({
//             code: 200,
//             meta: null,
//             data: results[0]
//           })
//         })
//       })
//     }).catch((error) => { throw error })


//   }).catch((error) => {
//     res.status(400).send(error)
//   })
// })

router.put('/:id', (req, res) => {
  const { id } = req.params

  const reader = req.body

  validate(reader, {
    email: 'email',
    status: 'boolean',
    password: 'min:6',
    passwordSame: 'requiredIf:password|same:password'
  }).then(async (value) => {
    sanitize(value, {
      email: 'trim|lowerCase',
      password: 'trim'
    })

    if (value.password) {
      value.password = await bcrypt.hash(value.password, 10)

      delete value.passwordSame
    }

    db.query('UPDATE reader SET ? WHERE id = ?', [value, id], (error, results, _) => {
      if (error) {
        throw error
      }

      db.query('SELECT * FROM reader WHERE id = ? LIMIT 1', [id], (error, results, _) => {
        if (error) {
          throw error
        }

        removePasswordProperty(results[0])

        res.send({
          code: 200,
          meta: null,
          data: results[0]
        })
      })
    })
  }).catch((error) => {
    res.status(400).send(error)
  })
})

// router.patch('/:id/activated', (req, res) => {
//   const { id } = req.params

//   const { isActive } = req.body

//   const status = isActive ? 1 : 0

//   db.query('UPDATE reader SET status = ? WHERE id = ?', [status, id], (error, results, _) => {
//     if (error) {
//       throw error
//     }

//     res.send(isActive)
//   })
// })

// router.delete('/:id', (req, res) => {
//   const { id } = req.params

//   db.query('SELECT * FROM reader WHERE id = ?', [id], (error, results, _) => {
//     if (error) {
//       throw error
//     }

//     const [reader] = results

//     db.query('DELETE FROM reader WHERE id = ?', [id], (error, _, __) => {
//       if (error) {
//         throw error
//       }

//       res.send({
//         code: 200,
//         meta: null,
//         data: reader
//       })
//     })
//   })
// })

// module.exports = router