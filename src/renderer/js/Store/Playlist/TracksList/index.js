/**
 * @file Module Liste des pistes du Store.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

export default {
    namespaced: true,
    state     : {
        isOpen: false
    },
    mutations : {
        /**
         * Ouvre la liste des pistes.
         */
        OPEN(state) {
            state.isOpen = true
        },
        /**
         * Ferme la liste des pistes.
         */
        CLOSE(state) {
            state.isOpen = false
        }
    }
}
