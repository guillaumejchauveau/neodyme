/**
 * @file Actions de lecture du module Liste de lecture du Store.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

export default {
  /**
   * Determine la piste courante, la position et lance la lecture.
   * @param {(Number|{index: Number, position: Number})} payload
   * @returns {Promise}
   */
  play (context, payload = null) {
    // Reformatage des donnees a traiter.
    let index = payload
    let position = null
    if (typeof payload.index !== 'undefined') {
      index = payload.index
    }
    if (typeof payload.position !== 'undefined') {
      position = payload.position
    }

    // Traitement.
    return new Promise((resolve, reject) => {
      if (context.getters['player/playerIs']('LOADING')) {
        return reject(new Error('Player is loading'))
      }
      if (!context.getters['tracksCount']) {
        return reject(new Error('No tracks'))
      }

      context.dispatch('player/stop')
             .then(() => {
               // Si une piste specifique est demandee.
               if (index !== null) {
                 context.commit('SET_CURRENT_TRACK', index)
               }
               // S'il n'y a pas de piste courante.
               if (context.state.currentTrackIndex === -1) {
                 context.commit('SET_CURRENT_TRACK', 0)
               }

               // S'il n'y a pas de position demandee.
               if (position === null) {
                 position = context.state.savedCurrentTrackPosition
               }

               context.dispatch('playCurrentTrack', position)
                      .then(resolve)
                      .catch(reject)
             })
             .catch(reject)
    })
  },
  /**
   * Arrete la lecture et enregistre la position d'arret.
   * @returns {Promise}
   */
  pause (context) {
    return new Promise((resolve, reject) => {
      if (context.getters['player/playerIs']('LOADING')) {
        return reject(new Error('Player is loading'))
      }

      context.dispatch('player/stop')
             .then(() => {
               context.commit('SAVE_CURRENT_TRACK_POSITION')

               resolve()
             })
             .catch(reject)
    })
  },
  /**
   * Arrete la lecture des pistes.
   * @returns {Promise}
   */
  stop (context) {
    return new Promise((resolve, reject) => {
      if (context.getters['player/playerIs']('LOADING')) {
        return reject(new Error('Player is loading'))
      }

      context.dispatch('player/stop')
             .then(() => {
               context.dispatch('player/clearBuffer')
               context.commit('SAVE_CURRENT_TRACK_POSITION')
               context.commit('SET_CURRENT_TRACK', -1)

               resolve()
             })
             .catch(reject)
    })
  },
  /**
   * Passe a la piste prescedente.
   * @returns {Promise}
   */
  previous (context) {
    return new Promise((resolve, reject) => {
      if (context.getters['player/playerIs']('LOADING')) {
        return reject(new Error('Player is loading'))
      }

      context.dispatch('player/stop')
             .then(() => {
               context.commit('SET_CURRENT_TRACK', context.state.currentTrackIndex - 1)
               context.dispatch('playCurrentTrack')
                      .then(resolve)
                      .catch(reject)
             })
             .catch(reject)
    })
  },
  /**
   * Passe a la piste suivante.
   * @returns {Promise}
   */
  next (context) {
    return new Promise((resolve, reject) => {
      if (context.getters['player/playerIs']('LOADING')) {
        return reject(new Error('Player is loading'))
      }

      context.dispatch('player/stop')
             .then(() => {
               context.commit('SET_CURRENT_TRACK', context.state.currentTrackIndex + 1)
               context.dispatch('playCurrentTrack')
                      .then(resolve)
                      .catch(reject)
             })
             .catch(reject)
    })
  },
  /**
   * Efface la liste de lecture.
   * @returns {Promise}
   */
  clear (context) {
    return new Promise((resolve, reject) => {
      if (context.getters['player/playerIs']('LOADING')) {
        return reject(new Error('Player is loading'))
      }

      context.dispatch('stop')
             .then(() => {
               context.commit('CLEAR_TRACKS')
               resolve()
             })
             .catch(reject)
    })
  },
  /**
   * Lance la lecture de la piste courante.
   * @param {Number} position - La position sur la piste (en secondes).
   * @returns {Promise}
   */
  playCurrentTrack (context, position = 0) {
    return new Promise((resolve, reject) => {
      if (context.getters['player/playerIs']('LOADING')) {
        return reject(new Error('Player is loading'))
      }
      const currentTrack = context.getters['currentTrack']
      if (!currentTrack) {
        reject(new ReferenceError('No current track'))
      }

      context.dispatch('player/stop')
             .then(() => {
               context.commit('player/SET_STATUS', 'LOADING')

               // Charge les donnees brutes.
               currentTrack.loadDataBuffer()
                           .then(() => {
                             // Convertit les donnees brutes.
                             context.dispatch('player/setAudioBuffer', currentTrack.dataBuffer)
                                    .then(() => {
                                      // Lance la lecture.
                                      context.dispatch('player/start', position)
                                      context.state.player.emitter.removeAllListeners('endReached')
                                      context.state.player.emitter.once('endReached', () => {
                                        context.dispatch('next')
                                               .catch(() => {
                                                 context.dispatch('stop')
                                               })
                                      })

                                      resolve()
                                    })
                                    .catch(reject)
                           })
                           .catch(reject)
             })
             .catch(reject)
    })
  }
}
