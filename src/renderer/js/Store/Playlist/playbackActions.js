/**
 * @file Actions de lecture du module Liste de lecture du Store.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

export default {
  /**
   * Determine la piste courante, la position et lance la lecture.
   * @param {(Number|{index: Number, position: Number, paused: Boolean})} payload
   * @returns {Promise}
   */
  play (context, payload = null) {
    // Reformatage des donnees a traiter.
    let index = payload
    let position = null
    let paused = false
    if (payload !== null) {
      if (payload.hasOwnProperty('index')) {
        index = payload.index
      }
      if (payload.hasOwnProperty('position')) {
        position = payload.position
      }
      if (payload.hasOwnProperty('paused')) {
        paused = payload.paused
      }
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

               if (!paused) {
                 context.dispatch('playCurrentTrack', position)
                        .then(resolve)
                        .catch(reject)
               } else {
                 resolve()
               }
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
               // Enregistre la derniere position sur la piste courante pour reprendre la lecture.
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
               // Remet a 0 la derniere position sur la piste courante.
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
        return reject(new ReferenceError('No current track'))
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
                                             .then(() => {
                                               context.state.player.emitter.removeAllListeners('endReached')
                                               // Fonction executee quand le lecteur arrive en bout de piste.
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
             .catch(reject)
    })
  }
}
