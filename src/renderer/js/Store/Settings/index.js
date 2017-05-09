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
 * Parametres de la partie Panel.
 */
import panel from './panel'

export default {
  namespaced: true,
  state: {
    windowSize: { // Dimensions de la fenetre (en pixels).
      height: 0,
      width: 0
    },
    criterion: {
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
     * Met a jour des dimensions de la fenetre.
     */
    UPDATE_WINDOW_SIZE (state) {
      state.windowSize.height = window.innerHeight
      state.windowSize.width = window.innerWidth
    }
  }
}
