/**
 * @file Module Parametres du Store.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

export default {
    namespaced: true,
    state     : {
        windowSize: { // Dimensions de la fenetre.
            height: 0,
            width : 0
        }
    },
    getters   : {
        setting(state) {
            return key => state[key]
        }
    },
    mutations : {
        /**
         * Met a jour les parametres de dimensions de la fenetre.
         */
        UPDATE_WINDOW_SIZE(state) {
            state.windowSize.height = window.innerHeight
            state.windowSize.width  = window.innerWidth
        }
    }
}
