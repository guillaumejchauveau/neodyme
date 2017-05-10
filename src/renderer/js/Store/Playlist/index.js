/**
 * @file Module Liste de lecture du Store.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

/**
 * Actions du module Liste de lecture.
 */
import actions from './actions'

/**
 * Module Lecteur.
 */
import player from './Player'

export default {
  namespaced: true,
  modules: {
    player
  },
  state: {
    /**
     * Les pistes de la Liste de lecture.
     * @type {Array<Track>}
     */
    tracks: [],
    /**
     * L'indice de la piste courante.
     * @type {Number}
     */
    currentTrackIndex: -1,
    /**
     * L'ouverture de la liste des pistes est-elle demandee.
     * @type {Boolean}
     */
    tracksListActivationRequested: false,
    /**
     * La derniere position enregistree sur la piste courante (en secondes).
     * @type {Number}
     */
    savedCurrentTrackPosition: 0
  },
  getters: {
    /**
     * Permet d'obtenir le nombre de pistes.
     * @returns {Number}
     */
    tracksCount (state) {
      return state.tracks.length
    },
    /**
     * Permet d'obtenir la piste courante.
     * @returns {Track|null}
     */
    currentTrack (state) {
      return (state.currentTrackIndex === -1) ? null : state.tracks[state.currentTrackIndex]
    },
    /**
     * Permet de determine si la liste des pistes doit etre affichee.
     * @returns {Boolean}
     */
    tracksListActive (state, getters) {
      return getters.tracksCount && state.tracksListActivationRequested
    }
  },
  mutations: {
    /**
     * Ajoute une piste a la liste de lecture.
     * @param {(Track|{data: Track, index: Number})} payload - La piste a ajouter.
     */
    ADD_TRACK (state, payload) {
      // Reformatage des donnees a traiter.
      let track = payload
      let index = state.tracks.length
      if (payload.data) {
        track = payload.data
        if (typeof payload.index !== 'undefined' && payload.index !== null) {
          index = payload.index
        }
      }

      // Ajoute la piste a l'indice sans retirer d'elements.
      state.tracks.splice(index, 0, track)
    },
    /**
     * Enleve une piste a la liste de lecture.
     * @param {Number} index - L'index de la piste.
     */
    REMOVE_TRACK (state, index) {
      state.tracks.splice(index, 1)
    },
    /**
     * Efface la liste de lecture.
     */
    CLEAR_TRACKS (state) {
      state.tracks = []
    },
    /**
     * Change de piste courante.
     * @param {Number} requestedIndex
     */
    SET_CURRENT_TRACK (state, requestedIndex) {
      let index = requestedIndex

      // Si l'indice ne correspond pas a une piste.
      if (index < -1 || index >= state.tracks.length) {
        index = -1
      }

      state.currentTrackIndex = index
    },
    /**
     * Enregistre la position pour une reprise eventuelle.
     */
    SAVE_CURRENT_TRACK_POSITION (state) {
      state.savedCurrentTrackPosition = state.player.position
    },
    /**
     * Ouvre la liste des pistes.
     */
    OPEN_TRACKS_LIST (state) {
      state.tracksListActivationRequested = true
    },
    /**
     * Ferme la liste des pistes.
     */
    CLOSE_TRACKS_LIST (state) {
      state.tracksListActivationRequested = false
    }
  },
  actions
}
