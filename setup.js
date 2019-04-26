'use strict'

const { setupDatabase } = require('./tests/util/storage')

setupDatabase()
  .then(() => console.log('Database setup complete'))
  .catch(err => console.error(err.message))
