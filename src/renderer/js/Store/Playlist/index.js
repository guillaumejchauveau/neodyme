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
    tracks: [],
    currentTrackIndex: -1
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
     * @param {(Track|{data: Track, index: Number})} payload - La piste a ajouter.
     */
    ADD_TRACK (state, payload) {
      // Reformatage des donnees a traiter.
      let track = payload
      let index = state.tracks.length
      if (payload.data) {
        track = payload.data
        if (payload.index) {
          index = payload.index
        }
      }

      // Ajoute la piste a l'index sans retirer d'elements.
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
     * Enleve toutes les pistes.
     */
    CLEAR_TRACKS (state) {
      state.tracks = []
    },
    /**
     * Change la piste courante.
     * @param {Number} requestedIndex
     */
    SET_CURRENT_TRACK (state, requestedIndex) {
      let index = requestedIndex

      // Si l'index ne correspond pas a une piste.
      if (index < -1 || index >= state.tracks.length) {
        index = -1
      }

      state.currentTrackIndex = index
    }
  },
  actions
}
