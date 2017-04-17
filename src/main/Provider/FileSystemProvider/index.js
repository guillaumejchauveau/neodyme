/**
 * @file Definit la classe FileSystemProvider.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import fs from 'fs'
import globStream from 'glob-stream'
import musicMetadata from 'musicmetadata'

/**
 * Classe Provider.
 * @type {Provider}
 */
import Provider from '../'

/**
 * Classe qui represente une source systeme de fichiers.
 * @extends Provider
 */
class FileSystemProvider extends Provider {
  /**
   * Cree une source systeme de fichiers.
   * @param {Object} providerConfig - La configuration de la source.
   */
  constructor (providerConfig) {
    super(providerConfig)

    this.makeTracksList()
  }

  /**
   * Fait la liste des pistes et les enregistre.
   * @throws {Error} Lance une exception si une erreur survient lors de la lecture des metadonnees.
   */
  makeTracksList () {
    // Recupere un Stream de chemins pour chaques fichiers.
    const tracksStream = globStream(`./**/*.@(${this.config.exts})`, {
      cwd: this.config.dir,
      cwdbase: true
    })

    // A chaque fois qu'un chemin est trouve.
    tracksStream.on('data', track => {
      const trackStream = fs.createReadStream(track.path) // Creer un Stream du fichier.
      // Recupere les metadonnees.
      musicMetadata(trackStream, {duration: this.config.duration}, (err, metadatas) => {
        if (err) {
          throw err
        }
        trackStream.close()

        Provider.saveTrack(this, track.path, metadatas)
      })
    })
  }

  /**
   * Recupere les donnees brutes d'une piste.
   * @param {String} path - L'identifiant unique pour la source (ici le chemin du fichier).
   * @returns {Promise} Une promise qui resout un {ArrayBuffer}.
   */
  getDataBuffer (path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) {
          reject(err)
        }

        resolve(data.buffer)
      })
    })
  }
}

export default FileSystemProvider
