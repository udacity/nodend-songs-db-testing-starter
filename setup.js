'use strict'

const SongsDb = require('./')
const fs = require('fs')
const path = require('path')
const dbFile = path.join(__dirname, 'songs.db')

// Delete db file
try {
  fs.unlinkSync(dbFile)
} catch (err) {
  // Ignore
}

;(async () => {
  const db = await SongsDb.at('songs.db')
  try {
    const songs = [{
      artist: 'Bisou',
      album: 'Music Spaceshift',
      song: 'Bad Flower'
    }, {
      artist: 'Bisou',
      album: 'Music Spaceshift',
      song: 'Panda'
    }, {
      artist: 'Bisou',
      album: 'Music Spaceshift',
      song: 'Industrial'
    }, {
      artist: 'Bisou',
      album: 'Haumea',
      song: 'Moon Answer'
    }, {
      artist: 'Komiku',
      album: `It's time for adventure`,
      song: 'La Citadelle'
    }, {
      artist: 'Komiku',
      album: `It's time for adventure`,
      song: 'Bleu'
    }]

    for (let song of songs) {
      await db.createSong(song)
    }
  } catch (err) {
    console.log(err.message)
  }
})()
