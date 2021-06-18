const authentication = require('../middlewares/authentication')

const readersRouter = require('./internal/reader')

const login = require('./public/login')

module.exports = {
  register(app) {
    app.use('/readers', authentication, readersRouter)
    
    app.post('/login', login)
  }
}