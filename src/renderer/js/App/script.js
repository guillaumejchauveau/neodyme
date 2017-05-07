/**
 * @file Composant principal.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

/**
 * Store de l'application.
 * @type {vuex.Store}
 */
import Store from '../Store'
/**
 * Composant Playlist.
 */
import Playlist from './Playlist'

export default {
  methods: {
    /**
     * Fonction declenchee a chaque redimensionnement de la fenetre.
     */
    windowResizeHandler () {
      this.$store.commit('settings/UPDATE_WINDOW_SIZE') // TODO: Debounce
    }
  },
  components: {
    Playlist
  },
  mounted () {
    window.addEventListener('resize', this.windowResizeHandler)
    this.$store.commit('settings/UPDATE_WINDOW_SIZE')
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.windowResizeHandler)
  },
  store: Store
}
