/**
 * @file Actions du module Lecteur du Store.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

export default {
  /**
   * Decode et enregistre les donnees audio.
   * @param {ArrayBuffer} arrayBuffer - Donnees brutes.
   * @returns {Promise}
   */
  setAudioBuffer (context, arrayBuffer) {
    return new Promise((resolve, reject) => {
      context.commit('SET_STATUS', 'LOADING')
      context.state
             .audioContext
             .decodeAudioData(arrayBuffer)
             .then(audioBuffer => {
               context.commit('SET_AUDIO_BUFFER', audioBuffer)
               context.commit('SET_DURATION', Math.round(audioBuffer.duration))
               context.commit('SET_STATUS', 'READY')
               resolve()
             })
             .catch(reject)
    })
  },
  /**
   * Efface les donnees audio.
   */
  clearBuffer (context) {
    context.commit('SET_AUDIO_BUFFER', null)
    context.commit('SET_POSITION', 0)
    context.commit('SET_DURATION', 0)
  },
  /**
   * Cree une source audio pour le contexte audio. Met en place un ecouteur quand la source audio arrete la lecture.
   */
  connectSource (context) {
    // Cree la source audio.
    context.commit('SET_AUDIO_SOURCE', context.state.audioContext.createBufferSource())
    // Passe les donnees audio a la source audio.
    context.state.audioSource.buffer = context.state.audioBuffer
    // Connecte la source audio a la sortie audio.
    context.state.audioSource.connect(context.state.audioContext.destination)

    // Cree un interval charge de mettre a jour la position toutes les 1 secondes.
    const positionUpdaterIntervalID = setInterval(() => {
      context.dispatch('updatePosition')
    }, 1000)

    // Quand la source audio s'arrete de lire (par arret manuel ou automatique).
    context.state.audioSource.onended = () => {
      context.dispatch('updatePosition')
      // Desactive la mise a jour automatique de la position.
      clearInterval(positionUpdaterIntervalID)

      // Detruit la source audio.
      context.commit('SET_STATUS', 'LOADING')
      context.state.audioSource.disconnect()
      context.commit('SET_AUDIO_SOURCE', null)
      context.commit('SET_STATUS', 'READY')

      // Si position correspond a la duree (moins 1 seconde pour eviter des problemes d'arrondis).
      if (context.state.position >= context.state.duration - 1) {
        context.commit('SET_POSITION', context.state.duration)
        // Emet un evenement pour indiquer que la source audio est arrivee au bout des donnees audio.
        context.state.emitter.emit('endReached')
      } else {
        // Emet un evenement pour indiquer que la source audio a ete arretee manuellement.
        context.state.emitter.emit('stopped')
      }
    }
  },
  /**
   * Lance la lecture des donnees audio.
   * @param {Number} position - La position de demarrage dans les donnees audio (en secondes).
   * @returns {Promise}
   */
  start (context, position = 0) {
    return new Promise((resolve, reject) => {
      context.dispatch('stop')
             .then(() => {
               context.dispatch('connectSource')
               context.commit('UPDATE_START_TIME', position)
               context.commit('SET_POSITION', position)
               // Lance la lecture au temps 0 du contexte et a position dans les donnees audio.
               context.state.audioSource.start(0, position)
               context.commit('SET_STATUS', 'PLAYING')

               resolve()
             })
             .catch(reject)
    })
  },
  /**
   * Arrete la lecture des donnees audio.
   * @returns {Promise}
   */
  stop (context) {
    return new Promise((resolve, reject) => {
      if (context.getters['playerIs']('PLAYING')) {
        try {
          context.state.audioSource.stop()
        } catch (exception) {
          reject(exception)
        }
      } else {
        return resolve()
      }

      context.state.emitter.once('stopped', resolve)
    })
  },
  /**
   * Actualise la position dans les donnees audio.
   */
  updatePosition (context) {
    if (context.getters['playerIs']('PLAYING')) {
      context.commit('SET_POSITION', Math.round(context.state.audioContext.currentTime - context.state.startTime))
    }
  }
}
