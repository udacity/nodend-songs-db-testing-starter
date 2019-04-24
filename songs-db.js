'use strict'

const Sequelize = require('sequelize')
const path = require('path')
const SongModel = require('./models/song')

class SongsDb {
  constructor (dbFile) {
    this._storage = path.join(__dirname, dbFile)
    this._sequelize = null
    this._song = null
  }

  async _init () {
    this._sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: this._storage
    })

    const Song = this._sequelize.define('song', SongModel)

    this._song = Song
    return this._sequelize.sync()
  }

  async listSongsByArtist (artist) {
    return this._song.findAll({
      where: {
        artist
      }
    })
  }

  async listSongsByArtistAndAlbum (artist, album) {
    return this._song.findAll({
      where: {
        artist,
        album
      }
    })
  }

  async createSong ({ artist, album, song }) {
    return this._song.create({ artist, album, song })
  }

  static async at (dbFile = 'songs.db') {
    const db = new SongsDb(dbFile)
    await db._init()
    return db
  }
}

module.exports = SongsDb
