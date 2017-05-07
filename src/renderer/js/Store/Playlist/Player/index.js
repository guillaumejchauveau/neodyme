/**
 * @file Module Lecteur du Store.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import EventEmitter from 'events'

/**
 * Actions du module Lecteur.
 */
import actions from './actions'

export default {
  namespaced: true,
  state: {
    audioContext: new AudioContext(),
    audioBuffer: null,
    audioSource: null,
    duration: 0,
    position: 0,
    startTime: 0,
    status: 0,
    statusTypes: {
      READY: 0,
      LOADING: -1,
      PLAYING: 1
    },
    emitter: new EventEmitter(),
    positionUpdater: null
  },
  getters: {
    /**
     * Permet de determine si le lecteur est dans un statut donne.
     * @param {String} statusType - Le nom du statut.
     * @returns {Boolean}
     */
    playerIs (state) {
      return statusType => state.status === state.statusTypes[statusType]
    }
  },
  mutations: {
    /**
     * Enregistre les donnees audio en cours de lecture.
     * @param {AudioBuffer|null} value - Les donnees audio.
     */
    SET_AUDIO_BUFFER (state, value) {
      state.audioBuffer = value
    },
    /**
     * Enregistre la source audio utilisee pour lire les donnees audio.
     * @param {AudioScheduledSourceNode|null} value - La source audio.
     */
    SET_AUDIO_SOURCE (state, value) {
      state.audioSource = value
    },
    /**
     * Enregistre la duree des donnees audio en cours de lecture.
     * @param {Number} duration - La duree (en secondes).
     */
    SET_DURATION (state, duration) {
      state.duration = duration
    },
    /**
     * Enregistre la position dans les donnees audio en cours de lecture.
     * @param {Number} position - La position (en secondes).
     */
    SET_POSITION (state, position) {
      state.position = position
    },
    /**
     * Enregistre le temps du context audio au lancement de la lecture.
     * @param {Number} offset - Un decalage a soustraire au temps.
     */
    UPDATE_START_TIME (state, offset = 0) {
      state.startTime = Math.round(state.audioContext.currentTime - offset)
    },
    /**
     * Modifie le statut du lecteur.
     * @param {String} statusType - Le nom du statut.
     */
    SET_STATUS (state, statusType) {
      state.status = state.statusTypes[statusType]
    }
  },
  actions
}
