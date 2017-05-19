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
/**
 * Module Liste des pistes.
 */
import tracksList from './TracksList'

export default {
  namespaced: true,
  modules: {
    player,
    tracksList
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
    }
  },
  mutations: {
    /**
     * Ajoute une piste a la liste de lecture.
     * @param {(Track|{data: Track, index: Number})} payload - La piste a ajouter, avec l'indice ou la placer
     * (decale toutes les pistes a et apres l'indice, falcutatif).
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

      // Met a jour l'etat du suivi du point de repere de la Liste des pistes.
      if (!state.tracksList.waypointItemTracking) {
        // Si la Liste des pistes est positionee sur la piste courante.
        state.tracksList.waypointItemTracking = state.tracksList.currentItem === state.currentTrackIndex
      }
      // Si le nouvel indice va sur -1, laisse la Liste des pistes sur son ancienne position.
      if (state.tracksList.waypointItemTracking && index === -1) {
        state.tracksList.waypointItemTracking = false
        state.tracksList.currentItem = state.currentTrackIndex
      }

      state.currentTrackIndex = index
    },
    /**
     * Enregistre la position pour une reprise eventuelle.
     */
    SAVE_CURRENT_TRACK_POSITION (state) {
      state.savedCurrentTrackPosition = state.player.position
    }
  },
  actions
}
