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

import CriteriaSet from '../Criterion/CriteriaSet'

export default {
  methods: {
    /**
     * Fonction declenchee a chaque redimensionnement de la fenetre.
     */
    windowResizeHandler () {
      this.$nextTick(() => {
        this.$store.commit('settings/UPDATE_WINDOW_SIZE')
      })
    }
  },
  components: {
    Playlist
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.windowResizeHandler)
      this.$store.commit('settings/UPDATE_WINDOW_SIZE')

      setTimeout(() => {
        const test = new CriteriaSet()
        this.$store.dispatch('playlist/addCriteriaSet', test)
      }, 2000)
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.windowResizeHandler)
  },
  store: Store
}
