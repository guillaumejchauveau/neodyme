/**
 * @file Module Lecteur du Store.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

export default {
    namespaced: true,
    state     : {
        duration   : 0,
        position   : 0,
        status     : 0,
        statusTypes: {
            READY  : 0,
            LOADING: -1,
            PLAYING: 1
        }
    },
    getters   : {
        /**
         * Determine si le lecteur est dans un statut donne.
         * @param {String} statusType - Le nom du statut.
         * @returns {Boolean}
         */
        playerIs(state) {
            return statusType => state.status === state.statusTypes[statusType]
        }
    },
    mutations : {
        /**
         * Modifie la valeur de la duree des donnees audio en cours de lecture.
         * @param {Number} duration - La duree (en secondes).
         */
        SET_DURATION(state, duration) {
            state.duration = duration
        },
        /**
         * Modifie la valeur de la position dans les donnees audio en cours de lecture.
         * @param {Number} position - La position (en secondes).
         */
        SET_POSITION(state, position) {
            state.position = position
        },
        /**
         * Modifie le statut du lecteur.
         * @param {String} statusType - Le nom du statut.
         */
        SET_STATUS(state, statusType) {
            state.status = state.statusTypes[statusType]
        }
    }
}
