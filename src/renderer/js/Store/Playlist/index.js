/**
 * @file Module Liste de lecture du Store.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

/**
 * Actions du module Playlist.
 */
import actions from './actions'

/**
 * Module contenant l'etat du lecteur.
 */
import player from './Player'
/**
 * Module contenant l'etat de la liste de lecture.
 */
import tracksList from './TracksList'

export default {
    namespaced: true,
    modules   : {
        player,
        tracksList
    },
    state     : {
        tracks           : [],
        currentTrackIndex: -1,
    },
    getters   : {
        /**
         * Permet d'obtenir le nombre de pistes.
         * @returns {Number}
         */
        tracksCount(state) {
            return state.tracks.length
        },
        /**
         * Permet d'obtenir la piste courante.
         * @returns {Track|null}
         */
        currentTrack(state) {
            return (state.currentTrackIndex === -1) ? null : state.tracks[state.currentTrackIndex]
        }
    },
    mutations : {
        /**
         * Ajoute une piste a la liste de lecture.
         * @param {(Track|{data: Track, index: Number})} payload - La piste a ajouter.
         */
        ADD_TRACK(state, payload) {
            // Reformatage des donnees a traiter.
            let track = payload
            let index = -1
            if (payload.data) {
                track = payload.data
                index = payload.index
            }
            
            // Traitement.
            state.tracks.splice(index, 0, track) // Ajoute la piste a l'index sans retirer d'elements.
        },
        /**
         * Enleve une piste a la liste de lecture.
         * @param {Number} index - L'index de la piste.
         */
        REMOVE_TRACK(state, index) {
            state.tracks.splice(index, 1)
        },
        /**
         * Enleve toutes les pistes.
         */
        CLEAR_TRACKS(state) {
            state.tracks = []
        },
        /**
         * Change la piste courante.
         * @param {Number} index
         */
        SET_CURRENT_TRACK(state, index) {
            if (index < -1 || index >= state.tracks.length) { // Si l'index ne correspond pas a une piste.
                index = -1
            }
            
            state.currentTrackIndex = index
        }
    },
    actions
}
