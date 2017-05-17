/**
 * @file Module Parametres du Store.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

/**
 * Parametres de la Liste de lecture.
 */
import playlist from './playlist'
/**
 * Parametres du Panel.
 */
import panel from './panel'

export default {
  namespaced: true,
  state: {
    /**
     * Les dimensions de la fenetre (en pixels).
     * @type {{height: Number, width: Number}}
     */
    windowSize: {
      height: 0,
      width: 0
    },
    criterion: {
      /**
       * Les types de criteres pris en charge.
       * @type {Array<String>}
       */
      types: [
        'artist',
        'album',
        'title',
        'trackNumber',
        'duration'
      ]
    },
    playlist,
    panel
  },
  mutations: {
    /**
     * Met a jour les dimensions de la fenetre.
     */
    UPDATE_WINDOW_SIZE (state) {
      state.windowSize.height = window.innerHeight
      state.windowSize.width = window.innerWidth
    }
  }
}
