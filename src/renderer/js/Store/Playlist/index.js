/**
 * @file Module Liste de lecture du Store.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

export default {
    namespaced: true,
    state     : {
        tracks      : [
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
        ],
        currentTrack: -1
    },
    getters: {
        /**
         * Permet d'obtenir le nombre de pistes.
         * @returns {Number}
         */
        tracksCount(state) {
            return state.tracks.length
        }
    },
    mutations: {
        /**
         * Ajoute une piste a la liste de lecture.
         * @param {Object} track - La piste a ajouter.
         * @returns {Number} L'index de la nouvelle piste.
         */
        ADD_TRACK(state, track) {
            return state.tracks.push(track)
        },
        /**
         * Enleve une piste a la liste de lecture.
         * @param {Number} index - L'index de la piste.
         */
        REMOVE_TRACK(state, index) {
            delete state.tracks[index]
        }
    }
}
