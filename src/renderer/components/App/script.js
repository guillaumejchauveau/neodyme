/**
 * @file Composant principal.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import debounce from 'lodash.debounce'

/**
 * Store de l'application.
 * @type {vuex.Store}
 */
import Store from '../../js/Store'
/**
 * Composant Playlist.
 */
import Playlist from './Playlist'
/**
 * Composant Panel.
 */
import Panel from './Panel'

export default {
  methods: {
    /**
     * Fonction declenchee a chaque redimensionnement de la fenetre.
     */
    windowResizeHandler () {
      this.$store.commit('settings/UPDATE_WINDOW_SIZE')
    }
  },
  components: {
    Playlist,
    Panel
  },
  mounted () {
    // Quand la fenetre est redimensionnee (La fonction est appelee avec un systeme anti-rebonds pour eviter un trop
    // grand nombre d'appel).
    window.addEventListener('resize', debounce(this.windowResizeHandler, 100, {
      leading: true,
      maxWait: 100
    }))
    this.$store.commit('settings/UPDATE_WINDOW_SIZE')
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.windowResizeHandler)
  },
  store: Store
}
