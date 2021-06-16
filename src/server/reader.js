const reader = []

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

  // Get reader by id
  app.get('/reader/:id', (req, res) => {

    // find(): Get the value of the first element in the array
    const reader = reader.find((reader) => reader.id == req.params.id)

    res.send(reader)
  })

  // Create new reader
  app.post('/reader', (req, res) => {
    const reader = req.body // represents one reader

    reader.id = reader.length + 1 // creates the property id in my object

    reader.push(reader) // inserts into my []

    res.send(reader) // returns the inserted reader {}
  })

  // Update reader
  app.put('/reader/:id', (req, res) => {
    const { id } = req.params // the same as const id = req.params.id

    const data = req.body

    const reader = reader.find((reader) => reader.id == id)

    Object.assign(reader, data) // applies all properties inside of the object

    res.send(reader)
  })

  app.patch('/reader/:id/activated', (req, res) => {
    const { id } = req.params

    const { isActive } = req.body

    const reader = reader.find((reader) => reader.id == id)

    if (isActive) {
      reader.status = 'Active'
    } else {
      reader.status = 'Inactive'
    }

    res.send(reader)
  })

  app.delete('/reader/:id/', (req, res) => {
    const { id } = req.params

    const readerIndex = reader.findIndex((reader) => reader.id == id) // returns the index of the first element in the array that matches the condition or -1 if no match was found

    const reader = reader[readerIndex] // gives the element in the reader [], it is a number

    if (readerIndex !== -1) {
      reader.splice(readerIndex, 1) // removes one element from the []
    }

    res.send(reader)
  })
}