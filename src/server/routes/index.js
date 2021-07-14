const authentication = require('../middlewares/authentication')

const readersRouter = require('./internal/reader')

const login = require('./public/login')

const register = require('./public/register')

module.exports = {
  register(app) {
    app.use('/readers', authentication, readersRouter)

    app.post('/login', login)

    app.post('/register', register)
  }
}