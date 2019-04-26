'use strict'

const SongsDb = require('../../')
const fs = require('fs')
const path = require('path')
const { genres, songs } = require('../fixtures/sample-data')

const dbFile = path.join(__dirname, '..', '..', 'songs.db')

function wipeDatabase () {
  // Delete db file
  try {
    fs.unlinkSync(dbFile)
  } catch (err) {
    // Ignore
  }
}

async function setupDatabase () {
  const db = await SongsDb.at()
  try {
    for (let genre of genres) {
      await db.createGenre(genre)
    }

    for (let s of songs) {
      const genre = await db.findGenreByName(s.genreName)
      const song = await db.createSong(s)
      song.setGenre(genre)
    }
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = {
  setupDatabase,
  wipeDatabase
}
