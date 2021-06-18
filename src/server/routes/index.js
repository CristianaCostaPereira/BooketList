const authentication = require('../middlewares/authentication')

const readersRouter = require('./internal/reader')

const login = require('./public/login')
const bcrypt = require('bcrypt')

module.exports = {
  register(app) {
    app.use('/readers', authentication, readersRouter)
    
    app.post('/login', login)

    // to generate hash
    // app.get('/encrypt', async (req, res) => {

    //   //receber uma string password e converter para hash
    //   let result = await bcrypt.hash('1234', 10)
      
    //   res.send(
    //     {
    //       unencrypted: '1234',
    //       encrypted: result
    //     }
    //   )
    // })
  }
}