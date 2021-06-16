const authentication = require('../middlewares/authentication')

const readerRouter = require('./internal/reader')

const login = require('./public/login')

module.exports = {
  register(app) {
    app.use('/reader', authentication, readerRouter)
    
    app.post('/login', login)
  }
}