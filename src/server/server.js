// const express = require('express')

// const server = express()

// const EXPRESS_PORT = 3000

// module.exports = {
//   // bootstrap é uma propriedade que invoca uma função
//   bootstrap: (callback) => {
//     server.listen(EXPRESS_PORT, () => {
//       console.log(`Listening on port ${EXPRESS_PORT}`);
      
//       if (callback) {
//         callback(server)
//       }
//     })
//   }
// }

const express = require ('express')
const bodyParser = require('body-parser')
const mysql = require ('mysql2')

// import JS files
const reader = require('./routes/internal/reader')

const PORT = 3000

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = mysql.createConnection({
  host: 'localhost', // Could be an IP
  user: 'root',
  password: 'Admin123',
  database: 'booketlist',
})

db.connect((error) => {
  if (error) {
    throw error
  }

  reader(app, db)

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  })
})