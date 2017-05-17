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
    /**
     * Le contexte audio (Web Audio API).
     * @type {AudioContext}
     */
    audioContext: new AudioContext(),
    /**
     * Les donnees audio (Web Audio API).
     * @type {AudioBuffer}
     */
    audioBuffer: null,
    /**
     * La source audio (Web Audio API).
     * @type {AudioScheduledSourceNode}
     */
    audioSource: null,
    /**
     * La duree des donnees audio (en secondes).
     * @type {Number}
     */
    duration: 0,
    /**
     * La position dans les donnees audio (en secondes).
     * @type {Number}
     */
    position: 0,
    /**
     * Le temps du contexte audio au lancement de la lecture (en secondes).
     * @type {Number}
     */
    startTime: 0,
    /**
     * Le numero du status du lecteur.
     * @type {Number}
     */
    status: 0,
    /**
     * Les types de status du lecteur.
     */
    statusTypes: {
      /**
       * Le lecteur est pret, en attente.
       */
      READY: 0,
      /**
       * Le lecteur est en chargement, aucune action n'est possible.
       */
      LOADING: -1,
      /**
       * Le lecteur a lance une lecture, en attente.
       */
      PLAYING: 1
    },
    /**
     * L'emetteur d'evenements servant d'interface avec la Web Audio API.
     */
    emitter: new EventEmitter()
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
     * Enregistre les donnees audio.
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
     * Enregistre la duree des donnees audio.
     * @param {Number} duration - La duree (en secondes).
     */
    SET_DURATION (state, duration) {
      state.duration = duration
    },
    /**
     * Enregistre la position dans les donnees audio.
     * @param {Number} position - La position (en secondes).
     */
    SET_POSITION (state, position) {
      state.position = position
    },
    /**
     * Enregistre le temps du contexte audio au lancement de la lecture.
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
